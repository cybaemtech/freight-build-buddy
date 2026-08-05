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

  /* ---------- Header ---------- */
  let y = M;
  if (logo) {
    doc.addImage(logo, "PNG", M, y - 2, 96, 37);
  }
  const nameX = M + (logo ? 108 : 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...RED);
  doc.text("VEVRA", nameX, y + 14);
  const w1 = doc.getTextWidth("VEVRA ");
  doc.setTextColor(...BLUE);
  doc.text("PACKAGING PVT. LTD.", nameX + w1, y + 14);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(...LABEL);
  doc.text("Empowering Packaging", nameX, y + 28);

  y += 58;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...INK);
  doc.text("Packaging & Freight RFQ", M, y);
  doc.setFont("courier", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...RED);
  doc.text(pdfSafe(rfqNumber), PW - M, y - 5, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(...LABEL);
  doc.text(
    new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
    PW - M,
    y + 7,
    { align: "right" },
  );

  y += 14;
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.8);
  doc.line(M, y, PW - M, y);

  y += 13;
  doc.setFontSize(8);
  doc.setTextColor(...LABEL);
  doc.text(
    "Contact: +91 8484853484  |  info@vevrapackaging.com  |  Mon - Sat: 10:00am - 7:00pm",
    PW / 2,
    y,
    { align: "center" },
  );

  /* ---------- Cards ---------- */
  const GAP = 16;
  const colW = (PW - M * 2 - GAP) / 2;
  const HDR_H = 19;
  const ROW_H = 18;
  const PAD = 11;

  const drawCard = (card: Card, x: number, top: number) => {
    const valW = colW - PAD * 2 - 96;
    const wrapped = card.rows.map(([l, v]) => ({
      l,
      lines: doc.splitTextToSize(pdfSafe(v), valW) as string[],
    }));
    const bodyH = wrapped.reduce((s, r) => s + Math.max(ROW_H, r.lines.length * 11 + 7), 0) + 6;
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
      const rh = Math.max(ROW_H, r.lines.length * 11 + 7);
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

  /* ---------- Footer ---------- */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...RED);
  const mark = "VEVRA";
  const mw = doc.getTextWidth(mark);
  doc.text(mark, PW / 2 - mw / 2, PH - 22);
  doc.setFillColor(...RED);
  doc.rect(0, PH - 4, PW / 2, 4, "F");
  doc.setFillColor(...BLUE);
  doc.rect(PW / 2, PH - 4, PW / 2, 4, "F");

  return doc;
}

