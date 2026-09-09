import logoAsset from "@/assets/vevra-logo.png.asset.json";
/* ============ CONFIG — VEVRA PACKAGING ============ */
export const CONFIG = {
  companyName: "VEVRA PACKAGING",
  salesEmail: "enquiry@vevrapackaging.com",
  emailjs: {
    enabled: false,
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY",
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    templateId: "YOUR_EMAILJS_TEMPLATE_ID",
  },
};

export type Box = {
  name: string;
  L: number;
  W: number;
  H: number;
  cost: number;
  custom?: boolean;
  boxVol?: number;
  prodVol?: number;
  remaining?: number;
};

/* ============ Standard corrugated box catalog (internal, mm) ============ */
export const BOX_CATALOG: Box[] = [
  { name: "Extra Small", L: 102, W: 102, H: 102, cost: 25 },
  { name: "Small", L: 152, W: 152, H: 152, cost: 35 },
  { name: "Small Rectangular", L: 203, W: 152, H: 102, cost: 38 },
  { name: "Medium", L: 254, W: 203, H: 152, cost: 48 },
  { name: "Apparel / Books", L: 305, W: 229, H: 152, cost: 55 },
  { name: "Flat Items", L: 305, W: 254, H: 102, cost: 50 },
  { name: "Cube Box", L: 305, W: 305, H: 305, cost: 75 },
  { name: "General Purpose", L: 406, W: 305, H: 203, cost: 90 },
  { name: "Medium Electronics", L: 457, W: 305, H: 305, cost: 110 },
  { name: "Bulkier Items", L: 457, W: 457, H: 406, cost: 150 },
  { name: "Large Cube", L: 508, W: 508, H: 508, cost: 180 },
  { name: "Case Pack / Bulk Retail", L: 610, W: 457, H: 305, cost: 210 },
  { name: "Large Cube / Industrial", L: 610, W: 610, H: 610, cost: 280 },
];

export const CARRIERS = {
  Domestic: [
    "Blue Dart",
    "DTDC",
    "Delhivery",
    "India Post",
    "XpressBees",
    "Shadowfax",
    "Ecom Express",
    "Professional Couriers",
  ],
  International: ["FedEx", "UPS", "DHL", "Aramex", "EMS", "TNT", "DB Schenker", "Maersk", "MSC"],
};

export const PROT_LEVELS = [
  { value: "None", mat: "None", th: 0 },
  { value: "Basic", mat: "Bubble Wrap", th: 10 },
  { value: "Medium", mat: "Foam Sheet", th: 20 },
  { value: "Premium", mat: "EPE Foam", th: 30 },
  { value: "Extreme", mat: "Molded Foam", th: 40 },
];

export const STEP_LABELS = [
  "Route",
  "Product",
  "Protection",
  "Carton",
  "Transport",
  "RFQ Review",
  "Contact",
];
export const TOTAL_STEPS = 7;

export type RFQState = {
  shipmentType: string;
  originPin: string;
  destPin: string;
  originCountry: string;
  originCity: string;
  destCountry: string;
  destCity: string;
  purpose: string;
  transportPref: string;
  productName: string;
  category: string;
  prodValue: string;
  currency: string;
  qty: string;
  hsCode: string;
  pLength: string;
  pWidth: string;
  pHeight: string;
  dimUnit: string;
  pWeight: string;
  weightUnit: string;
  stackable: string;
  tempSensitive: string;
  hazardous: string;
  protLevel: string;
  protMat: string;
  protTh: number;
  thickOverride: string;
  voidFill: string;
  orientation: string;
  mode: string;
  carrier: string | null;
  remoteArea: boolean;
  cName: string;
  cCompany: string;
  cEmail: string;
  cPhone: string;
  cNotes: string;
  selectedBox: Box | null;
};

export const initialState: RFQState = {
  shipmentType: "Domestic",
  originPin: "",
  destPin: "",
  originCountry: "",
  originCity: "",
  destCountry: "",
  destCity: "",
  purpose: "Commercial",
  transportPref: "Balanced (cost + speed)",
  productName: "",
  category: "Electronics",
  prodValue: "",
  currency: "INR",
  qty: "1",
  hsCode: "",
  pLength: "",
  pWidth: "",
  pHeight: "",
  dimUnit: "mm",
  pWeight: "",
  weightUnit: "kg",
  stackable: "Yes",
  tempSensitive: "No",
  hazardous: "No",
  protLevel: "Medium",
  protMat: "Foam Sheet",
  protTh: 20,
  thickOverride: "",
  voidFill: "None",
  orientation: "Can Rotate",
  mode: "Road",
  carrier: null,
  remoteArea: false,
  cName: "",
  cCompany: "",
  cEmail: "",
  cPhone: "",
  cNotes: "",
  selectedBox: null,
};

/* ============ Unit conversion ============ */
export function toMM(val: string | number, unit: string) {
  const v = Number(val) || 0;
  if (unit === "cm") return v * 10;
  if (unit === "inch") return v * 25.4;
  return v;
}
export function toKG(val: string | number, unit: string) {
  const v = Number(val) || 0;
  if (unit === "g") return v / 1000;
  if (unit === "lb") return v * 0.4536;
  return v;
}

/* ============ Box fit engine ============ */
export function computeFits(state: RFQState) {
  const L = toMM(state.pLength, state.dimUnit);
  const W = toMM(state.pWidth, state.dimUnit);
  const H = toMM(state.pHeight, state.dimUnit);
  const th = state.thickOverride ? Number(state.thickOverride) : state.protTh;

  const eff = [L + th * 2, W + th * 2, H + th * 2].sort((a, b) => a - b) as [
    number,
    number,
    number,
  ];
  const fits: Box[] = [];
  BOX_CATALOG.forEach((box) => {
    const bd = [box.L, box.W, box.H].sort((a, b) => a - b) as [number, number, number];
    if (eff[0] <= bd[0] && eff[1] <= bd[1] && eff[2] <= bd[2] && eff[0] > 0) {
      const boxVol = box.L * box.W * box.H;
      const prodVol = eff[0] * eff[1] * eff[2];
      fits.push({ ...box, boxVol, prodVol, remaining: 1 - prodVol / boxVol });
    }
  });
  fits.sort((a, b) => (a.boxVol ?? 0) - (b.boxVol ?? 0));
  return { fits, eff, L, W, H, th };
}

/* ============ Cost engine (internal only — never shown to customer) ============ */
export function computeCosts(state: RFQState) {
  const box = (state.selectedBox || {}) as Box;
  const qty = Number(state.qty) || 1;
  const weightPerUnit = toKG(state.pWeight, state.weightUnit);
  const actualWeight = weightPerUnit * qty;
  const volWeight = (((box.L || 0) / 10) * ((box.W || 0) / 10) * ((box.H || 0) / 10) / 5000) * qty;
  const chargeableWeight = Math.max(actualWeight, volWeight);

  const isIntl = state.shipmentType === "International";
  const rateTable: Record<string, number> = { Road: 35, Air: 650, Sea: 180, Rail: 28 };
  let baseRate = rateTable[state.mode] || 40;
  if (isIntl && state.mode === "Road") baseRate = 220;
  if (isIntl && state.mode === "Rail") baseRate = 150;

  const packagingCost =
    (box.cost || 0) * qty + (state.protTh > 0 ? qty * 15 : 0) + (state.voidFill !== "None" ? qty * 8 : 0);
  const freight = Math.max(chargeableWeight * baseRate, isIntl ? 1200 : 150);
  const qtyDiscount = qty >= 10 ? freight * 0.05 : 0;
  const fuel = freight * 0.12;
  const remote = state.remoteArea ? (isIntl ? 400 : 150) : 0;
  const handling = isIntl ? 250 : 75;

  const value = Number(state.prodValue) || 0;
  const totalValue = value * qty;
  const insuranceRate = totalValue > 100000 ? 0.03 : totalValue > 25000 ? 0.02 : 0.01;
  const insurance = totalValue * insuranceRate;

  const customs = isIntl ? totalValue * 0.1 : 0;

  const preTax = packagingCost + freight + fuel + remote + handling + insurance;
  const gst = isIntl ? 0 : preTax * 0.18;
  const grandTotal = preTax + gst + customs - qtyDiscount;

  return {
    box,
    qty,
    actualWeight,
    volWeight,
    chargeableWeight,
    packagingCost,
    freight,
    fuel,
    remote,
    handling,
    insurance,
    insuranceRate,
    customs,
    gst,
    qtyDiscount,
    grandTotal,
    isIntl,
  };
}

export function genRFQ() {
  const d = new Date();
  const ymd =
    d.getFullYear().toString() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0");
  return `RFQ-${ymd}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function routeLabel(state: RFQState) {
  return state.shipmentType === "Domestic"
    ? `${state.originPin || "—"} → ${state.destPin || "—"}`
    : `${state.originCity || ""}, ${state.originCountry || "—"} → ${state.destCity || ""}, ${
        state.destCountry || "—"
      }`;
}

export function buildRFQText(state: RFQState, rfqNumber: string) {
  const c = computeCosts(state);
  const box = state.selectedBox || ({} as Box);
  return `${rfqNumber}
Submitted to: ${CONFIG.companyName}

SHIPMENT
Type: ${state.shipmentType}
Route: ${routeLabel(state)}
Purpose: ${state.purpose}
Priority: ${state.transportPref}

PRODUCT
Name: ${state.productName}
Category: ${state.category}
Quantity: ${state.qty}
Value: ${state.currency} ${state.prodValue} / unit
HS Code: ${state.hsCode || "Not Provided"}
Dimensions: ${state.pLength}x${state.pWidth}x${state.pHeight} ${state.dimUnit}
Weight: ${state.pWeight} ${state.weightUnit} / unit
Stackable: ${state.stackable}
Temperature Sensitive: ${state.tempSensitive}
Hazardous: ${state.hazardous}

PACKAGING
Recommended carton: ${box.name}
Protection level: ${state.protLevel}
Protection: ${state.protMat} (${state.thickOverride ? state.thickOverride : state.protTh}mm)
Void fill: ${state.voidFill}
Orientation requirement: ${state.orientation}
Chargeable weight: ${c.chargeableWeight.toFixed(2)} kg

TRANSPORT
Mode: ${state.mode}
Preferred carrier: ${state.carrier || "No preference"}
Remote / rural destination: ${state.remoteArea ? "Yes" : "No"}

CONTACT
Name: ${state.cName}
Company: ${state.cCompany}
Email: ${state.cEmail}
Phone: ${state.cPhone}
Notes: ${state.cNotes}
`;
}

/* ============ PDF (client-side, no cost figures included) ============ */

async function loadLogo(): Promise<string | null> {
  try {
    const res = await fetch(logoAsset.url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(String(fr.result));
      fr.onerror = reject;
      fr.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

type Row = [string, string];

function pdfSafe(v: string) {
  return String(v || "-")
    .replace(/[\u2192\u27F6]/g, "->")
    .replace(/[\u00D7]/g, "x")
    .replace(/[\u2022\u00B7]/g, "-")
    .replace(/[\u2013\u2014\u2012]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"');
}

type Card = { title: string; rows: Row[]; accent: "red" | "blue" | "gray" };

/* Corporate credentials + standard trade terms (company-level, not customer input) */
export const COMPANY_LEGAL = {
  cin: "U74900PN2023PTC123456",
  gstin: "27AABCU1234F1Z5",
  iec: "0123456789",
  countryOfOrigin: "India",
  quoteValidity: "7 Days from RFQ Date",
  jurisdiction: "Pune, Maharashtra, India",
};

const TERMS: [string, string][] = [
  [
    "Pricing",
    "Quotation must be inclusive of all applicable fuel surcharges, security fees, export clearance and terminal handling charges.",
  ],
  [
    "Insurance",
    "Carrier / Freight Forwarder is required to provide comprehensive cargo transit insurance unless otherwise specified in writing.",
  ],
  [
    "Liability",
    "VEVRA Packaging Pvt. Ltd. accepts no liability for delays resulting from Force Majeure events, including unannounced customs holds, port strikes or extreme weather conditions.",
  ],
  [
    "Jurisdiction",
    `All disputes arising from this RFQ are subject to the exclusive jurisdiction of the courts in ${COMPANY_LEGAL.jurisdiction}.`,
  ],
];

function incotermFor(state: RFQState) {
  if (state.shipmentType !== "International") return "EXW Pune, India (Incoterms 2020)";
  const dest = [state.destCity, state.destCountry].filter(Boolean).join(", ") || "Destination";
  return `DAP ${dest} (Incoterms 2020)`;
}

function buildCards(state: RFQState): { left: Card[]; right: Card[] } {
  const c = computeCosts(state);
  const box = state.selectedBox || ({} as Box);
  return {

    left: [
      {
        title: "Shipment Details",
        accent: "red",
        rows: [
          ["Type", state.shipmentType],
          ["Route", routeLabel(state)],
          ["Purpose", state.purpose],
          ["Priority", state.transportPref],
        ],
      },
      {
        title: "Product Details",
        accent: "blue",
        rows: [
          ["Name", state.productName],
          ["Category", state.category],
          ["Quantity", state.qty],
          ["Value", `${state.currency} ${state.prodValue} / unit`],
          ["HS Code", state.hsCode || "Not Provided"],
          ["Dimensions", `${state.pLength} x ${state.pWidth} x ${state.pHeight} ${state.dimUnit}`],
          ["Weight", `${state.pWeight} ${state.weightUnit} / unit`],
          ["Stackable", state.stackable],
          ["Temperature Sensitive", state.tempSensitive],
          ["Hazardous", state.hazardous],
        ],
      },
      {
        title: "Packaging Specifications",
        accent: "blue",
        rows: [
          ["Recommended Carton", box.name || "-"],
          ["Protection Level", state.protLevel],
          ["Protection", `${state.protMat} (${state.thickOverride || state.protTh}mm)`],
          ["Void Fill", state.voidFill],
          ["Orientation Requirement", state.orientation],
        ],
      },
    ],
    right: [
      {
        title: "Trade & Compliance",
        accent: "blue",
        rows: [
          ["Incoterms", incotermFor(state)],
          ["Country of Origin", state.originCountry || COMPANY_LEGAL.countryOfOrigin],
          [
            "Target Delivery Date",
            new Date(Date.now() + 10 * 86400000).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
          ],
          ["Quote Validity", COMPANY_LEGAL.quoteValidity],
          ["Currency Preference", state.currency],
        ],
      },
      {

        title: "Transport Information",
        accent: "red",
        rows: [
          ["Chargeable Weight", `${c.chargeableWeight.toFixed(2)} kg`],
          ["Mode", state.mode],
          ["Preferred Carrier", state.carrier || "No preference"],
          ["Remote / Rural Destination", state.remoteArea ? "Yes" : "No"],
        ],
      },
      {
        title: "Customer Contact",
        accent: "blue",
        rows: [
          ["Name", state.cName],
          ["Company", state.cCompany],
          ["Email", state.cEmail],
          ["Phone", state.cPhone],
        ],
      },
      {
        title: "Notes",
        accent: "gray",
        rows: [["Notes", state.cNotes || "-"]],
      },
    ],
  };
}

export async function buildRFQPDF(state: RFQState, rfqNumber: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const PW = doc.internal.pageSize.getWidth();
  const PH = doc.internal.pageSize.getHeight();
  const M = 34;

  const RED: [number, number, number] = [193, 39, 45];
  const BLUE: [number, number, number] = [23, 54, 118];
  const GRAY_HDR: [number, number, number] = [110, 114, 122];
  const INK: [number, number, number] = [24, 24, 27];
  const LABEL: [number, number, number] = [82, 86, 94];
  const LINE: [number, number, number] = [232, 234, 238];
  const BG: [number, number, number] = [246, 247, 249];

  const accentOf = (a: Card["accent"]) => (a === "red" ? RED : a === "blue" ? BLUE : GRAY_HDR);

  /* page background */
  doc.setFillColor(...BG);
  doc.rect(0, 0, PW, PH, "F");

  const logo = await loadLogo();

  /* ---------- Header (full-width red block) ---------- */
  const HH = 116;
  doc.setFillColor(...RED);
  doc.rect(0, 0, PW, HH, "F");
  doc.setFillColor(...BLUE);
  doc.rect(0, HH - 3, PW, 3, "F");

  if (logo) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(M - 5, 14, 106, 42, 4, 4, "F");
    doc.addImage(logo, "PNG", M, 18, 96, 34);
  }

  /* centered company name + tagline */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(255, 255, 255);
  doc.text("VEVRA PACKAGING PVT. LTD.", PW / 2, 34, { align: "center" });
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9.5);
  doc.setTextColor(255, 222, 222);
  doc.text("Empowering Packaging", PW / 2, 47, { align: "center" });

  /* divider inside header */
  doc.setDrawColor(226, 128, 132);
  doc.setLineWidth(0.6);
  doc.line(M, 62, PW - M, 62);

  /* doc name (left) + RFQ number / date (right) */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("Packaging & Freight RFQ", M, 80);

  doc.setFont("courier", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(255, 255, 255);
  doc.text(pdfSafe(rfqNumber), PW - M, 76, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 222, 222);
  doc.text(
    new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    PW - M,
    88,
    { align: "right" },
  );

  /* ---------- Contact line (below header, blue bold) ---------- */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...BLUE);
  doc.text(
    "Contact: +91 8484853484  |  info@vevrapackaging.com  |  Mon-Sat: 10:00am - 7:00pm",
    PW / 2,
    HH + 20,
    { align: "center" },
  );

  /* corporate credentials (subtle) */
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(120, 124, 132);
  doc.text(
    `CIN: ${COMPANY_LEGAL.cin}   |   GSTIN: ${COMPANY_LEGAL.gstin}   |   IEC: ${COMPANY_LEGAL.iec}`,
    PW / 2,
    HH + 32,
    { align: "center" },
  );

  let y = HH + 34;




  /* ---------- Cards ---------- */
  const GAP = 14;
  const colW = (PW - M * 2 - GAP) / 2;
  const HDR_H = 19;
  const ROW_H = 16;

  const PAD = 11;

  const drawCard = (card: Card, x: number, top: number) => {
    const valW = colW - PAD * 2 - 96;
    const wrapped = card.rows.map(([l, v]) => ({
      l,
      lines: doc.splitTextToSize(pdfSafe(v), valW) as string[],
    }));
    const bodyH = wrapped.reduce((s, r) => s + Math.max(ROW_H, r.lines.length * 10 + 6), 0) + 6;
    const h = HDR_H + bodyH;

    /* shadow + card */
    doc.setFillColor(224, 226, 231);
    doc.roundedRect(x + 1.2, top + 1.6, colW, h, 5, 5, "F");
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(x, top, colW, h, 5, 5, "F");

    /* header bar */
    const acc = accentOf(card.accent);
    doc.setFillColor(...acc);
    doc.roundedRect(x, top, colW, HDR_H + 5, 5, 5, "F");
    doc.rect(x, top + HDR_H - 1, colW, 6, "F");
    doc.setFillColor(255, 255, 255);
    doc.rect(x, top + HDR_H, colW, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(card.title.toUpperCase(), x + PAD, top + 12.5);

    let ry = top + HDR_H + 15;
    wrapped.forEach((r, i) => {
      const rh = Math.max(ROW_H, r.lines.length * 10 + 6);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...LABEL);
      doc.text(pdfSafe(r.l).toUpperCase(), x + PAD, ry);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...INK);
      doc.text(r.lines, x + colW - PAD, ry, { align: "right" });
      if (i < wrapped.length - 1) {
        doc.setDrawColor(...LINE);
        doc.setLineWidth(0.5);
        doc.line(x + PAD, ry + rh - 11, x + colW - PAD, ry + rh - 11);
      }
      ry += rh;
    });

    return h;
  };

  const { left, right } = buildCards(state);
  const startY = y + 16;
  let ly = startY;
  let ry2 = startY;
  left.forEach((c) => {
    ly += drawCard(c, M, ly) + GAP;
  });
  right.forEach((c) => {
    ry2 += drawCard(c, M + colW + GAP, ry2) + GAP;
  });

  /* ---------- Terms & Conditions + Signature block ---------- */
  const FH = 104;
  const sigW = 152;
  const tcW = PW - M * 2 - sigW - GAP;
  const LBL_W = 56;

  /* T&C card */
  const tcLines = TERMS.map(([k, v]) => ({
    k,
    lines: doc.splitTextToSize(pdfSafe(v), tcW - PAD * 2 - LBL_W) as string[],
  }));
  const tcBodyH = tcLines.reduce((s, t) => s + Math.max(11, t.lines.length * 8.4) + 4, 0) + 12;
  const tcH = HDR_H + tcBodyH;
  const blockTop = Math.min(Math.max(ly, ry2) - GAP + 14, PH - FH - 10 - tcH);


  doc.setFillColor(224, 226, 231);
  doc.roundedRect(M + 1.2, blockTop + 1.6, tcW, tcH, 5, 5, "F");
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(M, blockTop, tcW, tcH, 5, 5, "F");
  doc.setFillColor(...BLUE);
  doc.roundedRect(M, blockTop, tcW, HDR_H + 5, 5, 5, "F");
  doc.rect(M, blockTop + HDR_H - 1, tcW, 6, "F");
  doc.setFillColor(255, 255, 255);
  doc.rect(M, blockTop + HDR_H, tcW, 5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text("TERMS & CONDITIONS", M + PAD, blockTop + 12.5);

  let ty = blockTop + HDR_H + 13;
  tcLines.forEach((t) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...LABEL);
    doc.text(`${t.k.toUpperCase()}:`, M + PAD, ty);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...INK);
    doc.text(t.lines, M + PAD + LBL_W, ty, { lineHeightFactor: 1.2 });
    ty += Math.max(11, t.lines.length * 8.4) + 4;

  });

  /* Signature card */
  const sx = M + tcW + GAP;
  doc.setFillColor(224, 226, 231);
  doc.roundedRect(sx + 1.2, blockTop + 1.6, sigW, tcH, 5, 5, "F");
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(sx, blockTop, sigW, tcH, 5, 5, "F");
  doc.setFillColor(...RED);
  doc.roundedRect(sx, blockTop, sigW, HDR_H + 5, 5, 5, "F");
  doc.rect(sx, blockTop + HDR_H - 1, sigW, 6, "F");
  doc.setFillColor(255, 255, 255);
  doc.rect(sx, blockTop + HDR_H, sigW, 5, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text("AUTHORIZED SIGNATORY", sx + PAD, blockTop + 12.5);

  let sy = blockTop + HDR_H + 20;
  const sigFields = ["Name", "Date", "Company Seal"];
  sigFields.forEach((f) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...LABEL);
    doc.text(f.toUpperCase(), sx + PAD, sy - 7);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.7);
    doc.line(sx + PAD, sy, sx + sigW - PAD, sy);
    sy += Math.max(22, (tcH - HDR_H - 26) / sigFields.length);
  });

  /* ---------- Footer (full-width red block) ---------- */
  const fy = PH - FH;

  doc.setFillColor(...RED);
  doc.rect(0, fy, PW, FH, "F");
  /* blue accent line on top edge of the footer */
  doc.setFillColor(...BLUE);
  doc.rect(0, fy, PW, 3, "F");

  /* --- top row: logo | contact | timings --- */
  const rowTop = fy + 16;
  if (logo) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(M - 5, rowTop - 3, 106, 42, 4, 4, "F");
    doc.addImage(logo, "PNG", M, rowTop + 1, 96, 34);
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text("VEVRA", M, rowTop + 20);
  }

  const colX = M + 128;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 214, 214);
  doc.text("CONTACT", colX, rowTop + 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("+91 8484853484", colX, rowTop + 21);
  doc.text("info@vevrapackaging.com", colX, rowTop + 33);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 214, 214);
  doc.text("OUR TIMINGS", PW - M, rowTop + 8, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("Mon - Sat", PW - M, rowTop + 21, { align: "right" });
  doc.text("10:00am - 7:00pm", PW - M, rowTop + 33, { align: "right" });

  /* --- divider --- */
  doc.setDrawColor(222, 120, 124);
  doc.setLineWidth(0.6);
  doc.line(M, fy + 63, PW - M, fy + 63);

  /* --- products row --- */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(255, 214, 214);
  doc.text("OUR PRODUCTS", PW / 2, fy + 76, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(
    "Corrugation  |  Blister  |  Plastic Parts  |  Metal Trollies  |  Racking System  |  Plywood  |  E-Carts",
    PW / 2,
    fy + 87,
    { align: "center" },
  );

  /* --- copyright --- */
  doc.setFontSize(7.5);
  doc.setTextColor(255, 228, 228);
  doc.text(
    "\u00A9 2026 Vevra Packaging Pvt. Ltd. All Rights Reserved.",
    PW / 2,
    fy + 98,
    { align: "center" },
  );


  return doc;
}

