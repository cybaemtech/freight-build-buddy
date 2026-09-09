export const COMPANY = {
  name: "Vevra Packaging Pvt. Ltd.",
  short: "VEVRA PACKAGING",
  tagline: "Empowering Packaging",
  promise: "You Focus on Your Core Business. We Manage Your Packaging Ecosystem.",
  philosophy: "If Our Customer Wins, We Win.",
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
  { value: "15+", label: "Years of experience" },
  { value: "153+", label: "Employees*" },
  { value: "4", label: "Manufacturing units*" },
  { value: "11+", label: "Warehouses*" },
  { value: "6,149+", label: "Customers*" },
];

export const COMMITMENTS = [
  {
    title: "Design",
    body: "Packaging engineered around your product, process and supply chain.",
  },
  {
    title: "Manage",
    body: "Packaging availability, returnables, rental, warehousing and operational requirements.",
  },
  {
    title: "Optimize",
    body: "Cost, quality, space, sustainability and supply-chain efficiency.",
  },
];

export const CUSTOMER_PROBLEMS = [
  { title: "Packaging Cost", body: "Looking to reduce the total cost of packaging and handling?", action: "Explore cost optimization" },
  { title: "Packaging Availability", body: "Need the right packaging at the right time and place?", action: "Explore managed packaging" },
  { title: "Returnable Packaging", body: "Want to move from disposable to reusable packaging?", action: "Explore returnables" },
  { title: "Packaging Design", body: "Need packaging designed or redesigned for your product?", action: "Explore packaging engineering" },
  { title: "Supply Chain", body: "Want one partner to manage your packaging ecosystem?", action: "Explore end-to-end solutions" },
];

export const VALUE_OUTCOMES = [
  { title: "Cost", items: ["Reduce packaging cost", "Optimize inventory", "Improve cubic utilization", "Standardize packaging", "Reduce supply-chain inefficiencies"] },
  { title: "Quality", items: ["Reduce product damage", "Improve packaging performance", "Validate packaging through trials", "Improve ergonomics", "Reduce handling errors"] },
  { title: "Sustainability", items: ["Reduce packaging waste", "Increase reuse", "Reduce unnecessary disposal", "Improve asset utilization", "Reduce avoidable material consumption"] },
  { title: "Efficiency", items: ["Improve packaging availability", "Improve visibility", "Reduce operational complexity", "Improve turnaround", "Enable better packaging management"] },
];

export const CUSTOMER_SUCCESS_PROCESS = [
  ["01", "Understand", "Understand the product, packaging requirement and existing process."],
  ["02", "Analyze", "Identify opportunities across cost, quality and sustainability."],
  ["03", "Design", "Engineer the packaging solution around the real-world requirement."],
  ["04", "Validate", "Test, trial and refine the packaging before implementation."],
  ["05", "Implement", "Manufacture, supply and support deployment."],
  ["06", "Manage", "Manage packaging operations, availability and associated services."],
  ["07", "Optimize", "Continuously identify opportunities for better cost, quality and efficiency."],
] as const;

export const FUTURE_DIRECTIONS = [
  { title: "Innovation", body: "Building better packaging solutions for changing supply-chain requirements." },
  { title: "Automation", body: "Moving operational processes toward greater automation." },
  { title: "Technology", body: "Using digital systems to improve visibility, tracking and decision-making." },
  { title: "Sustainability", body: "Creating more reusable, efficient and resource-conscious packaging models." },
  { title: "Expansion", body: "Taking successful capabilities into new markets and applications." },
  { title: "People", body: "Building a strong organization, industry ecosystem and future-ready workforce." },
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
    slug: "packaging-engineering",
    name: "Packaging Design & Engineering",
    short: "Design the right packaging before investing in the wrong one.",
    intro: "VEVRA engineers packaging around the product, process and supply-chain requirement — not around a one-size-fits-all catalogue.",
    points: ["Packaging design", "Engineering and prototyping", "Pack-out studies", "Transit trials and testing", "Standardization", "VA/VE and space optimization"],
  },
  {
    slug: "returnable-packaging",
    name: "Returnable Packaging",
    short: "Packaging designed to come back.",
    intro: "Build reusable packaging systems that reduce dependency on single-use packaging and improve asset utilization.",
    points: ["Reusable packaging systems", "Asset circulation", "Product protection", "Return planning", "Asset visibility", "Continuous improvement"],
  },
  {
    slug: "packaging-rental",
    name: "Packaging Rental",
    short: "Use packaging when you need it without unnecessary asset investment.",
    intro: "VEVRA supports packaging availability, management and circulation through rental models that help customers avoid unnecessary capex.",
    points: ["Zero or reduced capex model", "Availability management", "Asset management", "Reverse logistics", "Reusable packaging", "Flexible capacity"],
  },
  {
    slug: "equipment-pooling",
    name: "Equipment Pooling",
    short: "Shared assets. Better utilization.",
    intro: "A managed pooling model allows packaging assets to circulate between users while VEVRA manages the ecosystem.",
    points: ["Service centre", "Customer deployment", "Use and return cycle", "Inspection and service", "Shared asset utilization", "Managed circulation"],
  },
  {
    slug: "on-site-packaging-operations",
    name: "On-Site Packaging Operations",
    short: "Packaging where your production happens.",
    intro: "Potential on-site support includes manpower, material handling, packing operations and dispatch support around your production requirements.",
    points: ["Packaging manpower", "Material handling", "On-site packing", "Packaging operations", "Dispatch support", "Process discipline"],
  },
  {
    slug: "transport-logistics",
    name: "Transport & Logistics",
    short: "Move the product. Manage the packaging.",
    intro: "Coordinate transportation and packaging movement with visibility across domestic and international supply-chain requirements.",
    points: ["Transportation", "Tracking and coordination", "Air freight", "Ocean freight", "International forwarding", "Customs support"],
  },
  {
    slug: "warehouse-packaging-management",
    name: "Warehouse & Packaging Management",
    short: "Visibility from inventory to availability.",
    intro: "Manage packaging inventory, returnable assets and availability so the right packaging is available at the right time and place.",
    points: ["Packaging inventory", "Returnable asset management", "Warehouse operations", "Availability management", "Order management", "Supply-chain visibility"],
  },
];

export const PRODUCTS: Segment[] = [
  { slug: "corrugated", name: "Corrugated Packaging", short: "Corrugated boxes, CFB, die-cut, heavy-duty and export packaging.", intro: "Corrugated packaging engineered around the product, stacking requirement and transit profile.", points: ["Corrugated boxes", "CFB solutions", "Die-cut packaging", "Heavy-duty packaging", "Export packaging", "Customized solutions"] },
  { slug: "plastic-pp", name: "Plastic / PP Packaging", short: "Reusable plastic and PP formats for protection, handling and circulation.", intro: "Plastic and PP packaging systems designed for repeat use, fit, protection and operational efficiency.", points: ["Plastic crates", "Foldable crates and containers", "PP boxes and bins", "PP corrugated boxes", "PP trays, inserts and separators", "Customized solutions"] },
  { slug: "metal", name: "Metal Returnable Packaging", short: "Metal pallets, bins, racks, trolleys and customized returnable containers.", intro: "Durable metal returnable packaging engineered for demanding industrial environments and repeated circulation.", points: ["Metal pallets", "Metal bins", "Returnable containers", "Racks", "Trolleys", "Customized metal packaging"] },
  { slug: "wood-plywood", name: "Wood / Plywood Packaging", short: "Wooden pallets, boxes, plywood cases and export-ready heavy-duty packaging.", intro: "Wood and plywood solutions for heavy, sensitive and export-bound consignments.", points: ["Wooden pallets", "Wooden boxes", "Plywood boxes", "Heavy-duty packaging", "Export packaging", "Nail-less solutions"] },
  { slug: "protective", name: "Pulp & Honeycomb Packaging", short: "Pulp trays, honeycomb, dunnage, partitions and component fitments.", intro: "Protective packaging that holds components securely, reduces damage and supports more resource-conscious supply chains.", points: ["Pulp trays", "Honeycomb solutions", "Dunnage", "Partitions", "Component fitments", "Customized protection"] },
  { slug: "labels-identification", name: "Labels & Identification", short: "Industrial labels and identification solutions for clearer packaging visibility.", intro: "Identification formats that support product, shipment and packaging traceability across operations.", points: ["Industrial labels", "Printed labels", "Wrap-around labels", "Shrink sleeves", "Customized identification", "Packaging visibility"] },
  { slug: "customized-packaging", name: "Customized Packaging", short: "Packaging solutions built around a specific product, process or supply-chain challenge.", intro: "When standard formats are not enough, VEVRA combines materials, engineering and managed services around the requirement.", points: ["Requirement study", "Material selection", "Prototype and trial", "Manufacturing", "Deployment support", "Ongoing optimization"] },
];

export const BUSINESS_MODELS = [
  { title: "Expendable", flow: "Use → Ship → Dispose", body: "Suitable where single-use packaging is commercially or operationally appropriate." },
  { title: "Owned Returnable", flow: "Use → Return → Reuse", body: "Dedicated reusable packaging assets managed by the customer." },
  { title: "Pooling", flow: "Shared Asset → Multiple Users → Managed Return", body: "Packaging assets circulate through a managed ecosystem." },
  { title: "Rental", flow: "Access → Use → Return", body: "Access packaging without necessarily owning the entire asset base." },
  { title: "End-to-End Managed Packaging", flow: "Understand → Design → Manufacture → Supply → Store → Track → Pack → Transport → Return → Reuse → Optimize", body: "Give us the packaging problem. We will manage the ecosystem." },
];

export const BUSINESS_MODEL = BUSINESS_MODELS.map((model) => ({ step: model.title, body: model.body }));

export const TESTIMONIALS = [
  {
    quote: "Choosing Vevra Packaging was a game-changer for our bottom line. They tailored solutions that slashed our packaging costs, delivering results without the need for extra investment. Exceptional service!",
    name: "Mahesh Kamble",
    org: "Customer",
  },
  {
    quote: "Vevra Packaging's cost-saving strategies transformed our packaging operations. Their expertise and dedication to efficiency are unmatched.",
    name: "Nikita Sawant",
    org: "Customer",
  },
  {
    quote: "Thanks to Vevra Packaging, we've significantly cut down on our packaging expenses. Their innovative approach saved us money without requiring additional investments. Highly recommended!",
    name: "Hasib Rahman",
    org: "Customer",
  },
  {
    quote: "Their solutions are ingenious and practical, making them an invaluable partner.",
    name: "Ashish Jadhav",
    org: "Customer",
  },
  {
    quote: "We are happy to say that we are seeing very good delivery performance and service both from returnable packaging & logistic stand as we have not heard a single complaint from our customer till date.",
    name: "Sanjay Powar",
    org: "Customer",
  },
];

export const CASE_STUDIES = [
  {
    step: "Customer challenge",
    body: "VEVRA intervention, solution and measurable business impact to be added after customer approval.",
  },
  {
    step: "Customer testimonial",
    body: "Real customer voice, photograph and company attribution will be published only where permission is available.",
  },
  {
    step: "Business impact",
    body: "The case-study format will show what changed across cost, quality, efficiency, sustainability and availability.",
  },
];

export const CLIENTS = [
  "Automotive", "Engineering", "Industrial Manufacturing", "FMCG", "Electronics", "Consumer Products", "Agriculture", "E-commerce / Quick Commerce", "Other Industries",
];

export const WAREHOUSES = [
  "Pune (Kuruli) — Corporate & manufacturing", "Chakan Industrial Area", "Ranjangaon", "Bhosari MIDC", "Chennai", "Bengaluru", "Gurugram", "Ahmedabad", "Nashik", "Aurangabad", "Indore",
];

export const ABOUT_VALUES = [
  { title: "Customer First", body: "We put the customer's requirement and business outcome at the centre." },
  { title: "Integrity", body: "We build relationships through transparency, trust and doing the right thing." },
  { title: "Ownership", body: "We take responsibility for the problem, not merely the product." },
  { title: "Teamwork", body: "We work together with customers, partners and our people." },
  { title: "Excellence", body: "We continuously improve how we design, deliver and manage solutions." },
];

export const EVOLUTION = [
  "Packaging Products", "Returnable Packaging", "Packaging Rental", "PP / Plastic Solutions", "Packaging Engineering", "On-Site Packaging Operations", "Warehouse & Logistics Support", "End-to-End Packaging Management",
];

export const INSIGHTS = [
  "Returnable vs Expendable Packaging", "How to Reduce Packaging Cost", "Packaging Cost Optimization", "Packaging Space Optimization", "Sustainable Packaging", "Packaging Rental", "Packaging Pooling", "Automotive Packaging", "Export Packaging", "Packaging Engineering", "Packaging Automation", "Packaging Asset Management", "Supply-Chain Packaging", "Packaging Testing", "Packaging Standardization",
];