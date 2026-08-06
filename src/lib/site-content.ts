export const COMPANY = {
  name: "Vevra Packaging Pvt. Ltd.",
  short: "VEVRA PACKAGING",
  tagline: "Empowering Packaging",
  promise: "Adding value to your supply chain",
  phone: "+91 8484853484",
  altPhone: "+91 2135 622 700",
  email: "info@vevrapackaging.com",
  marketingEmail: "marketing@vevrapackaging.com",
  website: "www.vevrapackaging.com",
  timings: "Mon – Sat: 10:00am – 7:00pm",
  address:
    "Gat No. 344, Village Kuruli, Tal. Khed, Dist. Pune – 410 501, Maharashtra, India",
};

export const STATS = [
  { value: "15+", label: "Years of excellence" },
  { value: "153+", label: "Employees" },
  { value: "6,149+", label: "Happy customers" },
  { value: "4", label: "Manufacturing units" },
  { value: "11+", label: "Warehouses" },
];

export const COMMITMENTS = [
  {
    title: "Sustainable",
    body: "Environment friendly solutions for a better tomorrow, built on recyclable and reusable materials.",
  },
  {
    title: "Reliable",
    body: "Quality you can trust, every time — industry compliant materials and repeatable process control.",
  },
  {
    title: "Cost optimized",
    body: "Smart engineering that removes material waste and delivers maximum value per shipment.",
  },
  {
    title: "Partnering for success",
    body: "We grow when you grow — long term partnerships across automotive, FMCG and engineering.",
  },
];

export type Segment = {
  slug: string;
  name: string;
  short: string;
  intro: string;
  points: string[];
};

export const SERVICES: Segment[] = [
  {
    slug: "industrial-rental-service",
    name: "Industrial Rental Service",
    short: "Returnable packaging on a rental model — zero capex, full asset control.",
    intro:
      "Based on customer requirement and industry need, our rental packaging model is classified into segments that let you use returnable packaging without locking capital into assets.",
    points: [
      "Returnable packaging solutions",
      "Cost optimization",
      "Asset management",
      "Reverse logistics",
      "Sustainable & reusable",
      "Custom engineered solutions",
    ],
  },
  {
    slug: "industrial-packaging-products",
    name: "Industrial Packaging Products",
    short: "Custom built packaging engineered for storage, handling and export.",
    intro:
      "Products meant for sale as per industrial storage requirement — designed, prototyped and manufactured in-house to protect your product through every handover.",
    points: [
      "Custom built packaging",
      "High quality materials",
      "Durable & reliable",
      "Industry compliant",
      "Sustainable packaging",
      "End-to-end solutions",
    ],
  },
  {
    slug: "industrial-transport-service",
    name: "Industrial Transport Service",
    short: "Pan-India domestic transport, milk runs and inbound/outbound logistics.",
    intro:
      "Our transport segment facilitates the movement requirement of our customers with a pan-India network, planned routing and on-time delivery discipline.",
    points: [
      "Domestic transport",
      "Inbound / outbound logistics",
      "Milk run solutions",
      "On-time delivery",
      "Pan India network",
      "Safe & secure transportation",
    ],
  },
];

export const PRODUCTS: Segment[] = [
  {
    slug: "corrugation",
    name: "Corrugation",
    short: "High strength corrugated packaging solutions for diverse industries.",
    intro:
      "3-ply to 7-ply corrugated boxes, sleeves, partitions and heavy duty cases engineered to the exact load, stack height and transit profile of your product.",
    points: [
      "3, 5 and 7 ply constructions",
      "Die-cut inserts and partitions",
      "Export worthy heavy duty cases",
      "Printed retail and industrial cartons",
    ],
  },
  {
    slug: "blister",
    name: "Blister",
    short: "Thermoformed blister packaging for safe product protection.",
    intro:
      "Vacuum formed trays and blisters that nest components precisely, protect surfaces and speed up line-side picking.",
    points: [
      "Vacuum formed trays",
      "Component nesting and surface protection",
      "ESD-safe options",
      "Line-side friendly stacking",
    ],
  },
  {
    slug: "plastic-parts",
    name: "Plastic Parts",
    short: "Precision engineered plastic components and parts.",
    intro:
      "Injection moulded and fabricated plastic parts, bins and crates for repeat-use packaging systems.",
    points: [
      "Injection moulded bins and crates",
      "Foldable large containers",
      "Custom fabricated components",
      "Reusable and washable",
    ],
  },
  {
    slug: "metal-trollies",
    name: "Metal Trollies",
    short: "Heavy duty metal trollies for material handling.",
    intro:
      "Fabricated trollies and stillages designed around your part geometry, plant layout and ergonomics.",
    points: [
      "Part-specific stillages",
      "Ergonomic handling",
      "Powder coated finish",
      "Stackable and nestable designs",
    ],
  },
  {
    slug: "racking-system",
    name: "Racking System",
    short: "Industrial racking solutions for efficient storage.",
    intro:
      "Selective pallet racking, cantilever and multi-tier systems that maximise cubic utilisation of your warehouse.",
    points: [
      "Selective pallet racking",
      "Cantilever and multi-tier systems",
      "Load tested structures",
      "Installation and layout planning",
    ],
  },
  {
    slug: "plywood",
    name: "Plywood",
    short: "Strong & durable plywood packaging solutions.",
    intro:
      "ISPM-15 compliant plywood boxes, crates and pallets for heavy and export-bound consignments.",
    points: [
      "ISPM-15 compliant export crates",
      "Collapsible plywood boxes",
      "Heavy machinery packing",
      "Moisture resistant grades",
    ],
  },
];

export const BUSINESS_MODEL = [
  { step: "Design & Engineering", body: "CAD-led packaging design validated against transit and stacking loads." },
  { step: "Manufacturing", body: "Four manufacturing units producing corrugation, plastics, metal and plywood." },
  { step: "Logistics & Transportation", body: "Pan-India movement, milk runs and returnable asset circulation." },
  { step: "After Sales Support", body: "Dedicated account teams, replenishment planning and issue resolution." },
  { step: "Continuous Improvement", body: "Cost-out workshops that keep reducing material and freight spend." },
];

export const TESTIMONIALS = [
  {
    quote:
      "Vevra re-engineered our export packaging and cut damages to near zero while reducing carton spend by 18%.",
    name: "Sourcing Head",
    org: "Automotive Tier-1, Pune",
  },
  {
    quote:
      "The returnable rental model freed up capital we would have sunk into bins. Their reverse logistics just works.",
    name: "Plant Manager",
    org: "Engineering OEM, Chakan",
  },
  {
    quote:
      "Fast quotations, honest timelines and consistent quality across four sites. A genuine supply chain partner.",
    name: "Procurement Lead",
    org: "FMCG Manufacturer, Mumbai",
  },
];

export const CLIENTS = [
  "Automotive OEMs",
  "Tier-1 & Tier-2 suppliers",
  "Engineering & machinery",
  "FMCG & consumer goods",
  "Electronics & appliances",
  "Pharma & healthcare",
  "Agriculture equipment",
  "Export houses",
];

export const WAREHOUSES = [
  "Pune (Kuruli) — Corporate & manufacturing",
  "Chakan Industrial Area",
  "Ranjangaon",
  "Bhosari MIDC",
  "Chennai",
  "Bengaluru",
  "Gurugram",
  "Ahmedabad",
  "Nashik",
  "Aurangabad",
  "Indore",
];
