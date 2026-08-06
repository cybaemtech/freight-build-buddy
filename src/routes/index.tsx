import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import {
  BOX_CATALOG,
  Box,
  CARRIERS,
  CONFIG,
  PROT_LEVELS,
  RFQState,
  STEP_LABELS,
  TOTAL_STEPS,
  buildRFQPDF,
  computeCosts,
  computeFits,
  genRFQ,
  initialState,
  routeLabel,
} from "@/lib/rfq-logic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RFQ — Packaging & Freight RFQ Builder | VEVRA PACKAGING" },
      {
        name: "description",
        content:
          "Build a packaging and freight RFQ in minutes: size the right carton, set protection, choose transport mode and carrier, and send it to VEVRA PACKAGING.",
      },
      { property: "og:title", content: "RFQ — Packaging & Freight RFQ Builder" },
      {
        property: "og:description",
        content:
          "Carton sizing, protection levels, freight mode and carrier preference — one guided RFQ for VEVRA PACKAGING.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RFQBuilder,
});

type Setter = <K extends keyof RFQState>(key: K, value: RFQState[K]) => void;

function Choice({
  label,
  icon,
  selected,
  onClick,
}: {
  label: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div className={`choice${selected ? " sel" : ""}`} onClick={onClick}>
      {icon ? <span className="ic">{icon}</span> : null}
      {label}
    </div>
  );
}

function RFQBuilder() {
  const [state, setState] = useState<RFQState>(initialState);
  const [currentStep, setCurrentStep] = useState(1);
  const [dimErr, setDimErr] = useState(false);
  const [contactErr, setContactErr] = useState(false);
  const [rfqNumber, setRfqNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ emailed: boolean; error: string } | null>(null);

  const set: Setter = (key, value) => setState((s) => ({ ...s, [key]: value }));

  const { fits, eff, th } = useMemo(() => computeFits(state), [state]);

  // Keep the selected carton in sync with the current fit list (same rules as the original engine)
  const chosen: Box | null = useMemo(() => {
    if (fits.length === 0) {
      return {
        name: "Custom / Made-to-size",
        L: eff[2],
        W: eff[1],
        H: eff[0],
        cost: 0,
        custom: true,
      };
    }
    const match = state.selectedBox && fits.find((f) => f.name === state.selectedBox!.name);
    return match || fits[0]!;
  }, [fits, eff, state.selectedBox]);

  const effectiveState: RFQState = { ...state, selectedBox: chosen };
  const costs = computeCosts(effectiveState);

  const validateStep = (step: number) => {
    if (step === 2) {
      const ok = !!(state.pLength && state.pWidth && state.pHeight && state.pWeight);
      setDimErr(!ok);
      return ok;
    }
    if (step === 7) {
      const ok = !!(state.cName && state.cEmail);
      setContactErr(!ok);
      return ok;
    }
    return true;
  };

  const changeStep = (dir: number) => {
    if (dir > 0 && !validateStep(currentStep)) return;
    const next = currentStep + dir;
    if (next < 1 || next > TOTAL_STEPS) return;
    if (next === 6 && !rfqNumber) setRfqNumber(genRFQ());
    setCurrentStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(7)) return;
    setSubmitting(true);
    const number = rfqNumber || genRFQ();
    if (!rfqNumber) setRfqNumber(number);

    const pdfDoc = await buildRFQPDF(effectiveState, number);
    const fileName = `${number}.pdf`;

    const emailed = false;
    const emailError = "";
    // EmailJS delivery stays disabled until CONFIG.emailjs is filled in;
    // the customer always receives a local PDF copy as a fallback.
    pdfDoc.save(fileName);
    setSubmitting(false);
    setSubmitted({ emailed, error: emailError });
  };

  const carriers =
    state.shipmentType === "International" ? CARRIERS.International : CARRIERS.Domestic;

  return (
    <div className="rfq-page">
      <div className="wrap">
        <header className="brand">
          <img src={vevraLogo.url} alt="VEVRA Packaging Pvt. Ltd. logo" className="logo" />
          <div className="brand-text">
            <div className="mark">Request For Quotation [RFQ]</div>
            <div className="tag">PACKAGING &amp; FREIGHT RFQ BUILDER — VEVRA PACKAGING</div>
          </div>
        </header>

        <div className="rail">
          {STEP_LABELS.map((label, idx) => (
            <div
              key={label}
              className={`tick${idx + 1 < currentStep ? " done" : ""}${
                idx + 1 === currentStep ? " active" : ""
              }`}
            >
              <div className="num">{idx + 1}</div>
              <div className="lbl">{label}</div>
            </div>
          ))}
        </div>

        <div className="card">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="step">
              <h1 className="step-title">Where is this shipment going?</h1>
              <p className="step-sub">
                Tell us the route so we can size boxes and estimate freight correctly.
              </p>

              <div className="field">
                <label>Shipment type</label>
                <div className="choice-row">
                  {[
                    { v: "Domestic", i: "🏠" },
                    { v: "International", i: "🌍" },
                  ].map((o) => (
                    <Choice
                      key={o.v}
                      label={o.v}
                      icon={o.i}
                      selected={state.shipmentType === o.v}
                      onClick={() => setState((s) => ({ ...s, shipmentType: o.v, carrier: null }))}
                    />
                  ))}
                </div>
              </div>

              {state.shipmentType === "Domestic" ? (
                <div className="grid">
                  <div className="field">
                    <label>Origin PIN code</label>
                    <input
                      type="text"
                      placeholder="411057"
                      value={state.originPin}
                      onChange={(e) => set("originPin", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Destination PIN code</label>
                    <input
                      type="text"
                      placeholder="560001"
                      value={state.destPin}
                      onChange={(e) => set("destPin", e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="grid">
                  <div className="field">
                    <label>Origin country</label>
                    <input
                      type="text"
                      placeholder="India"
                      value={state.originCountry}
                      onChange={(e) => set("originCountry", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Origin city</label>
                    <input
                      type="text"
                      placeholder="Pune"
                      value={state.originCity}
                      onChange={(e) => set("originCity", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Destination country</label>
                    <input
                      type="text"
                      placeholder="United Arab Emirates"
                      value={state.destCountry}
                      onChange={(e) => set("destCountry", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Destination city</label>
                    <input
                      type="text"
                      placeholder="Dubai"
                      value={state.destCity}
                      onChange={(e) => set("destCity", e.target.value)}
                    />
                  </div>
                </div>
              )}

              <hr className="section-div" />
              <div className="grid">
                <div className="field">
                  <label>Shipment purpose</label>
                  <select value={state.purpose} onChange={(e) => set("purpose", e.target.value)}>
                    {["Commercial", "Personal", "Sample", "Gift", "Return"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Priority</label>
                  <select
                    value={state.transportPref}
                    onChange={(e) => set("transportPref", e.target.value)}
                  >
                    {["Balanced (cost + speed)", "Cheapest", "Fastest"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="step">
              <h2 className="step-title">Tell us about the product</h2>
              <p className="step-sub">
                Dimensions and weight drive the box match and the chargeable weight.
              </p>

              <div className="grid">
                <div className="field">
                  <label>Product name</label>
                  <input
                    type="text"
                    placeholder="e.g. Laptop"
                    value={state.productName}
                    onChange={(e) => set("productName", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Category</label>
                  <select value={state.category} onChange={(e) => set("category", e.target.value)}>
                    {[
                      "Electronics",
                      "Medical",
                      "Food",
                      "Apparel",
                      "Books",
                      "Furniture",
                      "Industrial",
                      "Automotive",
                      "Chemicals",
                      "Glass",
                      "Ceramics",
                      "Artwork",
                      "Liquids",
                      "Dangerous Goods",
                      "Other",
                    ].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid g3">
                <div className="field">
                  <label>Product value (per unit)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="25000"
                    value={state.prodValue}
                    onChange={(e) => set("prodValue", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Currency</label>
                  <select value={state.currency} onChange={(e) => set("currency", e.target.value)}>
                    {["INR", "USD", "EUR", "AED", "GBP"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Quantity (units / cartons)</label>
                  <input
                    type="number"
                    min="1"
                    value={state.qty}
                    onChange={(e) => set("qty", e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label>HS code (optional)</label>
                <input
                  type="text"
                  placeholder="84713010"
                  value={state.hsCode}
                  onChange={(e) => set("hsCode", e.target.value)}
                />
              </div>

              <hr className="section-div" />
              <p className="subhead">Dimensions &amp; weight (per unit)</p>
              <div className="grid g3">
                {(
                  [
                    ["Length", "pLength", "220"],
                    ["Width", "pWidth", "150"],
                    ["Height", "pHeight", "90"],
                  ] as const
                ).map(([label, key, ph]) => (
                  <div className="field" key={key}>
                    <label>{label}</label>
                    <input
                      type="number"
                      min="0"
                      placeholder={ph}
                      value={state[key]}
                      onChange={(e) => set(key, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="grid">
                <div className="field">
                  <label>Dimension unit</label>
                  <div className="choice-row">
                    {["mm", "cm", "inch"].map((u) => (
                      <Choice
                        key={u}
                        label={u}
                        selected={state.dimUnit === u}
                        onClick={() => set("dimUnit", u)}
                      />
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label>Weight per unit</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      type="number"
                      min="0"
                      placeholder="2.5"
                      style={{ flex: 2 }}
                      value={state.pWeight}
                      onChange={(e) => set("pWeight", e.target.value)}
                    />
                    <select
                      style={{ flex: 1 }}
                      value={state.weightUnit}
                      onChange={(e) => set("weightUnit", e.target.value)}
                    >
                      <option value="kg">Kg</option>
                      <option value="g">Gram</option>
                      <option value="lb">Pound</option>
                    </select>
                  </div>
                </div>
              </div>
              {dimErr && (
                <div className="err">
                  Please enter product length, width, height and weight to continue.
                </div>
              )}

              <hr className="section-div" />
              <div className="grid g3">
                {(
                  [
                    ["Stackable", "stackable"],
                    ["Temperature sensitive", "tempSensitive"],
                    ["Hazardous", "hazardous"],
                  ] as const
                ).map(([label, key]) => (
                  <div className="field" key={key}>
                    <label>{label}</label>
                    <div className="choice-row">
                      {["Yes", "No"].map((v) => (
                        <Choice
                          key={v}
                          label={v}
                          selected={state[key] === v}
                          onClick={() => set(key, v)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="step">
              <h2 className="step-title">How much protection does it need?</h2>
              <p className="step-sub">
                This sets the padding material and thickness added around the product before it's
                boxed.
              </p>

              <div className="field">
                <label>Protection level</label>
                <div className="choice-row">
                  {PROT_LEVELS.map((p) => (
                    <Choice
                      key={p.value}
                      label={p.value}
                      selected={state.protLevel === p.value}
                      onClick={() =>
                        setState((s) => ({
                          ...s,
                          protLevel: p.value,
                          protMat: p.mat,
                          protTh: p.th,
                        }))
                      }
                    />
                  ))}
                </div>
                <p className="hint">
                  {state.protMat} · {state.protTh}mm padding added on every side
                </p>
              </div>

              <div className="grid">
                <div className="field">
                  <label>Packing thickness override (mm, optional)</label>
                  <input
                    type="number"
                    placeholder={`Auto: ${state.protTh}`}
                    value={state.thickOverride}
                    onChange={(e) => set("thickOverride", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Void fill</label>
                  <select value={state.voidFill} onChange={(e) => set("voidFill", e.target.value)}>
                    {["None", "Paper", "Air Pillow", "Foam Chips", "Honeycomb Paper"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Orientation requirement</label>
                <div className="choice-row">
                  {[
                    { v: "Can Rotate", l: "Can rotate freely" },
                    { v: "This Side Up", l: "This side up only" },
                  ].map((o) => (
                    <Choice
                      key={o.v}
                      label={o.l}
                      selected={state.orientation === o.v}
                      onClick={() => set("orientation", o.v)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div className="step">
              <h2 className="step-title">Recommended carton</h2>
              <p className="step-sub">
                Matched against standard corrugated stock sizes using your padded product
                dimensions.
              </p>

              {fits.length === 0 ? (
                <div className="err">
                  No standard stock box fits — this shipment needs a custom carton. Our team will
                  follow up with a made-to-size quote.
                </div>
              ) : (
                <>
                  <BoxViz chosen={chosen!} eff={eff} th={th} />
                  <p className="subhead">Choose carton</p>
                  <div>
                    {fits.slice(0, 4).map((f, i) => (
                      <div
                        key={f.name}
                        className={`box-pick${f.name === chosen!.name ? " sel" : ""}`}
                        onClick={() => set("selectedBox", f)}
                      >
                        <div>
                          <div className="name">
                            {f.name}{" "}
                            <span className={`badge ${i === 0 ? "best" : "alt"}`}>
                              {i === 0 ? "Best Fit" : "Alternative"}
                            </span>
                          </div>
                          <div className="dims">
                            {f.L}×{f.W}×{f.H} mm · {Math.round((f.remaining ?? 0) * 100)}% free
                            space
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 5 */}
          {currentStep === 5 && (
            <div className="step">
              <h2 className="step-title">Transport &amp; carrier preference</h2>
              <p className="step-sub">
                Pick a mode and, if you have one, a preferred carrier — otherwise we'll recommend
                one.
              </p>

              <div className="field">
                <label>Mode of transport</label>
                <div className="mode-grid">
                  {[
                    { v: "Road", i: "🚚" },
                    { v: "Air", i: "✈️" },
                    { v: "Sea", i: "🚢" },
                    { v: "Rail", i: "🚆" },
                  ].map((o) => (
                    <Choice
                      key={o.v}
                      label={o.v}
                      icon={o.i}
                      selected={state.mode === o.v}
                      onClick={() => set("mode", o.v)}
                    />
                  ))}
                </div>
              </div>

              <p className="subhead">Preferred carrier (optional)</p>
              <div className="carrier-grid">
                {carriers.map((name) => (
                  <div
                    key={name}
                    className={`carrier-card${state.carrier === name ? " sel" : ""}`}
                    onClick={() => set("carrier", name)}
                  >
                    {name}
                  </div>
                ))}
              </div>

              <hr className="section-div" />
              <div className="checkbox-line">
                <input
                  type="checkbox"
                  id="remoteArea"
                  checked={state.remoteArea}
                  onChange={(e) => set("remoteArea", e.target.checked)}
                />
                <label
                  htmlFor="remoteArea"
                  style={{ margin: 0, textTransform: "none", fontWeight: 400 }}
                >
                  Destination is a remote / rural area
                </label>
              </div>
            </div>
          )}

          {/* STEP 6 — RFQ review (cost is intentionally never shown to the customer) */}
          {currentStep === 6 && (
            <div className="step">
              <h2 className="step-title">Review your RFQ</h2>
              <p className="step-sub">
                Check the details below, then continue to add your contact details so we can send
                this request.
              </p>
              <div className="rfq-id">{rfqNumber}</div>

              <div className="summary-block">
                <h4>Shipment</h4>
                <div className="summary-grid">
                  <div>
                    <span>Type</span>
                    {state.shipmentType}
                  </div>
                  <div>
                    <span>Route</span>
                    {routeLabel(state)}
                  </div>
                  <div>
                    <span>Purpose</span>
                    {state.purpose}
                  </div>
                  <div>
                    <span>Priority</span>
                    {state.transportPref}
                  </div>
                </div>
              </div>

              <div className="summary-block">
                <h4>Product</h4>
                <div className="summary-grid">
                  <div>
                    <span>Name</span>
                    {state.productName || "—"}
                  </div>
                  <div>
                    <span>Category</span>
                    {state.category}
                  </div>
                  <div>
                    <span>Quantity</span>
                    {state.qty}
                  </div>
                  <div>
                    <span>Value</span>
                    {state.currency} {state.prodValue || 0} / unit
                  </div>
                  <div>
                    <span>Dimensions</span>
                    {state.pLength}×{state.pWidth}×{state.pHeight} {state.dimUnit}
                  </div>
                  <div>
                    <span>Weight</span>
                    {state.pWeight} {state.weightUnit} / unit
                  </div>
                  <div>
                    <span>HS Code</span>
                    {state.hsCode || "Not Provided"}
                  </div>
                  <div>
                    <span>Stackable</span>
                    {state.stackable}
                  </div>
                  <div>
                    <span>Temperature sensitive</span>
                    {state.tempSensitive}
                  </div>
                  <div>
                    <span>Hazardous</span>
                    {state.hazardous}
                  </div>
                </div>
              </div>

              <div className="summary-block">
                <h4>Packaging</h4>
                <div className="summary-grid">
                  <div>
                    <span>Recommended carton</span>
                    {chosen!.name}{" "}
                    {chosen!.custom ? "" : `(${chosen!.L}×${chosen!.W}×${chosen!.H} mm)`}
                  </div>
                  <div>
                    <span>Protection level</span>
                    {state.protLevel}
                  </div>
                  <div>
                    <span>Protection</span>
                    {state.protMat} · {state.protTh}mm
                  </div>
                  <div>
                    <span>Void fill</span>
                    {state.voidFill}
                  </div>
                  <div>
                    <span>Orientation requirement</span>
                    {state.orientation}
                  </div>
                  <div>
                    <span>Chargeable weight</span>
                    {costs.chargeableWeight.toFixed(2)} kg
                  </div>
                </div>
              </div>

              <div className="summary-block">
                <h4>Transport</h4>
                <div className="summary-grid">
                  <div>
                    <span>Mode</span>
                    {state.mode}
                  </div>
                  <div>
                    <span>Preferred carrier</span>
                    {state.carrier || "No preference — recommend best fit"}
                  </div>
                  <div>
                    <span>Destination is a remote / rural area</span>
                    {state.remoteArea ? "Yes" : "No"}
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* STEP 7 */}
          {currentStep === 7 && (
            <div className="step">
              <h2 className="step-title">Where should we send this RFQ?</h2>
              <p className="step-sub">
                We'll email a PDF copy of this RFQ to you and notify our team to follow up with a
                confirmed quote.
              </p>

              <div className="grid">
                <div className="field">
                  <label>Full name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={state.cName}
                    onChange={(e) => set("cName", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Company</label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={state.cCompany}
                    onChange={(e) => set("cCompany", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid">
                <div className="field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={state.cEmail}
                    onChange={(e) => set("cEmail", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 90000 00000"
                    value={state.cPhone}
                    onChange={(e) => set("cPhone", e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label>Additional notes</label>
                <textarea
                  placeholder="Anything else we should know about this shipment..."
                  value={state.cNotes}
                  onChange={(e) => set("cNotes", e.target.value)}
                />
              </div>
              {contactErr && (
                <div className="err">Please enter your name and email so we can send the quote.</div>
              )}

              {submitted && (
                <div
                  className="summary-block"
                  style={{
                    borderColor: submitted.emailed ? "var(--green)" : "var(--accent)",
                    marginTop: 18,
                  }}
                >
                  <h4 style={{ color: submitted.emailed ? "var(--green)" : "var(--accent-dark)" }}>
                    ✓ RFQ {rfqNumber} submitted
                  </h4>
                  <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                    {submitted.emailed ? (
                      <>
                        A PDF copy of this RFQ was emailed to <b>{state.cEmail}</b>, with{" "}
                        <b>{CONFIG.salesEmail}</b> copied. It has also been downloaded to this
                        device.
                      </>
                    ) : (
                      <>
                        A PDF copy has been downloaded to this device. Automatic email delivery
                        isn't configured yet
                        {submitted.error ? ` (${submitted.error})` : ""} — please send the PDF to{" "}
                        <b>{CONFIG.salesEmail}</b>.
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}

          {!submitted && (
            <div className="nav-row">
              <button
                className="btn-ghost"
                style={{ visibility: currentStep === 1 ? "hidden" : "visible" }}
                onClick={() => changeStep(-1)}
              >
                ← Back
              </button>
              {currentStep === TOTAL_STEPS ? (
                <button className="btn-primary" disabled={submitting} onClick={handleSubmit}>
                  {submitting ? "Submitting…" : "Submit RFQ"}
                </button>
              ) : (
                <button className="btn-primary" onClick={() => changeStep(1)}>
                  {currentStep === TOTAL_STEPS - 1 ? "Review RFQ →" : "Continue →"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BoxViz({ chosen, eff, th }: { chosen: Box; eff: number[]; th: number }) {
  const bx = 60,
    by = 40,
    bw = 280,
    bh = 160;
  const s = Math.min(bw / chosen.L, bh / chosen.H);
  const dW = chosen.L * s,
    dH = chosen.H * s;
  const ox = bx + (bw - dW) / 2,
    oy = by + (bh - dH) / 2;
  const pW2 = (eff[2] ?? 0) * s,
    pH2 = (eff[0] ?? 0) * s;
  const pox = ox + (dW - pW2) / 2,
    poy = oy + (dH - pH2) / 2;

  return (
    <div className="box-viz">
      <svg viewBox="0 0 460 260" width="100%" height="220">
        <rect
          x={ox}
          y={oy}
          width={dW}
          height={dH}
          fill="#fffdf8"
          stroke="var(--accent-dark)"
          strokeWidth="2"
          rx="3"
        />
        <rect
          x={pox}
          y={poy}
          width={pW2}
          height={pH2}
          fill="var(--blue-soft)"
          stroke="var(--blue)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          rx="2"
        />
        <text
          x={pox + pW2 / 2}
          y={poy + pH2 / 2 + 4}
          textAnchor="middle"
          className="dim-label"
          fontSize="10"
        >
          product+pad
        </text>
        <line x1={ox} y1={oy + dH + 14} x2={ox + dW} y2={oy + dH + 14} stroke="#8b7a5c" strokeWidth="1" />
        <line x1={ox} y1={oy + dH + 10} x2={ox} y2={oy + dH + 18} stroke="#8b7a5c" />
        <line x1={ox + dW} y1={oy + dH + 10} x2={ox + dW} y2={oy + dH + 18} stroke="#8b7a5c" />
        <text x={ox + dW / 2} y={oy + dH + 30} textAnchor="middle" className="dim-label">
          {Math.round(chosen.L)} mm
        </text>
        <line x1={ox - 14} y1={oy} x2={ox - 14} y2={oy + dH} stroke="#8b7a5c" />
        <text
          x={ox - 20}
          y={oy + dH / 2}
          textAnchor="end"
          className="dim-label"
          transform={`rotate(-90 ${ox - 20} ${oy + dH / 2})`}
        >
          {Math.round(chosen.H)} mm
        </text>
        <text x={ox + dW + 70} y={oy + dH / 2 - 6} className="dim-label" fontWeight="600">
          {chosen.name}
        </text>
        <text x={ox + dW + 70} y={oy + dH / 2 + 12} className="dim-label">
          {Math.round(chosen.L)}×{Math.round(chosen.W)}×{Math.round(chosen.H)} mm
        </text>
      </svg>
      <div className="fit-summary">
        <div className="fit-metric">
          <div className="v">{Math.round((chosen.boxVol ?? 0) / 1000)} cm³</div>
          <div className="l">Internal Volume</div>
        </div>
        <div className="fit-metric">
          <div className="v">{Math.round((chosen.prodVol ?? 0) / 1000)} cm³</div>
          <div className="l">Effective Volume</div>
        </div>
        <div className="fit-metric">
          <div className="v">{Math.round((chosen.remaining ?? 0) * 100)}%</div>
          <div className="l">Remaining Space</div>
        </div>
        <div className="fit-metric">
          <div className="v">{th}mm</div>
          <div className="l">Padding / Side</div>
        </div>
      </div>
    </div>
  );
}

void BOX_CATALOG;
