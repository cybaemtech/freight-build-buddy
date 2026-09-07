import engineering from "@/assets/editorial/packaging-engineering.jpg.asset.json";
import products from "@/assets/editorial/packaging-product-system.jpg.asset.json";
import returnables from "@/assets/editorial/returnable-pooling.jpg.asset.json";
import warehouse from "@/assets/editorial/warehouse-logistics.jpg.asset.json";

export const SITE_IMAGES = {
  engineering: engineering.url,
  products: products.url,
  returnables: returnables.url,
  warehouse: warehouse.url,
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
