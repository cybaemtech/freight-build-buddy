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

function buildSections(state: RFQState): { title: string; rows: Row[] }[] {
  const c = computeCosts(state);
  const box = state.selectedBox || ({} as Box);
  return [
    {
      title: "Shipment",
      rows: [
        ["Type", state.shipmentType],
        ["Route", routeLabel(state)],
        ["Purpose", state.purpose],
        ["Priority", state.transportPref],
      ],
    },
    {
      title: "Product",
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
      title: "Packaging",
      rows: [
        ["Recommended carton", box.name || "—"],
        ["Protection level", state.protLevel],
        ["Protection", `${state.protMat} (${state.thickOverride || state.protTh}mm)`],
        ["Void fill", state.voidFill],
        ["Orientation requirement", state.orientation],
        ["Chargeable weight", `${c.chargeableWeight.toFixed(2)} kg`],
      ],
    },
    {
      title: "Transport",
      rows: [
        ["Mode", state.mode],
        ["Preferred carrier", state.carrier || "No preference"],
        ["Remote / rural destination", state.remoteArea ? "Yes" : "No"],
      ],
    },
    {
      title: "Contact",
      rows: [
        ["Name", state.cName],
        ["Company", state.cCompany],
        ["Email", state.cEmail],
        ["Phone", state.cPhone],
        ["Notes", state.cNotes || "—"],
      ],
    },
  ];
}

export async function buildRFQPDF(state: RFQState, rfqNumber: string) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const PW = doc.internal.pageSize.getWidth();
  const PH = doc.internal.pageSize.getHeight();
  const M = 46;
  const RED: [number, number, number] = [166, 32, 36];
  const BLUE: [number, number, number] = [30, 71, 130];
  const INK: [number, number, number] = [34, 30, 28];
  const SOFT: [number, number, number] = [110, 104, 100];
  const FOOTER_H = 62;

  const logo = await loadLogo();

  const drawHeader = () => {
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, PW, 96, "F");
    doc.setFillColor(...RED);
    doc.rect(0, 96, PW, 3, "F");
    if (logo) doc.addImage(logo, "PNG", M, 26, 132, 51);
    else {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.setTextColor(...RED);
      doc.text("VEVRA", M, 52);
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(...INK);
    doc.text("Packaging & Freight RFQ", PW - M, 46, { align: "right" });
    doc.setFont("courier", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...RED);
    doc.text(rfqNumber, PW - M, 63, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...SOFT);
    doc.text(
      new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
      PW - M,
      77,
      { align: "right" },
    );
  };

  const drawFooter = () => {
    const y = PH - FOOTER_H;
    doc.setFillColor(...RED);
    doc.rect(0, y, PW, FOOTER_H, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("VEVRA PACKAGING PVT. LTD.", M, y + 24);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.text("Empowering Packaging", M, y + 39);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Contact: +91 8484853484", PW - M, y + 19, { align: "right" });
    doc.text("info@vevrapackaging.com", PW - M, y + 33, { align: "right" });
    doc.text("Mon - Sat: 10:00am - 7:00pm", PW - M, y + 47, { align: "right" });
  };

  drawHeader();
  drawFooter();

  let y = 128;
  const bottom = PH - FOOTER_H - 24;
  const labelX = M;
  const valueX = M + 168;
  const valueW = PW - M - valueX;

  const newPage = () => {
    doc.addPage();
    drawHeader();
    drawFooter();
    y = 128;
  };

  buildSections(state).forEach((section) => {
    const estH = 26 + section.rows.length * 17 + 13;
    if (y + Math.min(estH, 46) > bottom || (y + estH > bottom && estH <= bottom - 128)) newPage();
    doc.setFillColor(...BLUE);
    doc.rect(M, y - 11, 3, 14, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...BLUE);
    doc.text(section.title.toUpperCase(), M + 10, y);
    y += 10;
    doc.setDrawColor(225, 218, 208);
    doc.setLineWidth(0.7);
    doc.line(M, y, PW - M, y);
    y += 16;

    section.rows.forEach(([label, value]) => {
      const lines = doc.splitTextToSize(pdfSafe(value), valueW) as string[];
      const h = Math.max(14, lines.length * 13);
      if (y + h > bottom) newPage();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...SOFT);
      doc.text(label.toUpperCase(), labelX, y);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...INK);
      doc.text(lines, valueX, y);
      y += h + 3;
    });
    y += 13;
  });

  return doc;
}

