import heroPackaging from "@/assets/hero-packaging.jpg";

export const SITE_IMAGES = {
  engineering: heroPackaging,
  products: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  returnables: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
  warehouse: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
} as const;

export const PRODUCT_IMAGES: Record<string, string> = {
  corrugated: SITE_IMAGES.products,
  "plastic-pp": SITE_IMAGES.returnables,
  metal: SITE_IMAGES.products,
  "wood-plywood": SITE_IMAGES.products,
  protective: SITE_IMAGES.engineering,
  "labels-identification": SITE_IMAGES.warehouse,
  "customized-packaging": SITE_IMAGES.engineering,
};

export const SERVICE_IMAGES: Record<string, string> = {
  "packaging-engineering": SITE_IMAGES.engineering,
  "returnable-packaging": SITE_IMAGES.returnables,
  "packaging-rental": SITE_IMAGES.returnables,
  "equipment-pooling": SITE_IMAGES.returnables,
  "on-site-packaging-operations": SITE_IMAGES.engineering,
  "transport-logistics": SITE_IMAGES.warehouse,
  "warehouse-packaging-management": SITE_IMAGES.warehouse,
};
