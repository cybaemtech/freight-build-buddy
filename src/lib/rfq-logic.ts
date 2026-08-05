/* ============ CONFIG — Cybaem Tech ============ */
export const CONFIG = {
  companyName: "Cybaem Tech Pvt. Ltd.",
  salesEmail: "enquiry@cybaemtech.com",
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

  const eff = [L + th * 2, W + th * 2, H + th * 2].sort((a, b) => a - b);
  const fits: Box[] = [];
  BOX_CATALOG.forEach((box) => {
    const bd = [box.L, box.W, box.H].sort((a, b) => a - b);
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
Dimensions: ${state.pLength}x${state.pWidth}x${state.pHeight} ${state.dimUnit}
Weight: ${state.pWeight} ${state.weightUnit} / unit

PACKAGING
Recommended carton: ${box.name}
Protection: ${state.protMat} (${state.protTh}mm)
Void fill: ${state.voidFill}
Chargeable weight: ${c.chargeableWeight.toFixed(2)} kg

TRANSPORT
Mode: ${state.mode}
Preferred carrier: ${state.carrier || "No preference"}

CONTACT
Name: ${state.cName}
Company: ${state.cCompany}
Email: ${state.cEmail}
Phone: ${state.cPhone}
Notes: ${state.cNotes}
`;
}

/* ============ PDF (client-side, no cost figures included) ============ */
export async function buildRFQPDF(state: RFQState, rfqNumber: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const marginX = 48,
    maxWidth = 500;
  let y = 56;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("CRATED — Packaging & Freight RFQ", marginX, y);
  y += 22;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(110, 95, 70);
  doc.text(`${rfqNumber}  ·  ${CONFIG.companyName}`, marginX, y);
  y += 24;
  doc.setTextColor(20, 20, 20);

  const lines = doc.splitTextToSize(buildRFQText(state, rfqNumber), maxWidth);
  lines.forEach((line: string) => {
    if (y > 780) {
      doc.addPage();
      y = 56;
    }
    doc.text(line, marginX, y);
    y += 14;
  });
  return doc;
}
