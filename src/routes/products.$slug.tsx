import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { PRODUCTS } from "@/lib/site-content";
import { PRODUCT_IMAGES } from "@/lib/site-images";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable | VEVRA Packaging" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} | VEVRA Packaging` },
        { name: "description", content: product.short },
        { property: "og:title", content: `${product.name} — VEVRA Packaging` },
        { property: "og:description", content: product.short },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  return (
    <SiteLayout>
      <PageHero eyebrow="Product capability" title={product.name} body={product.short} />
      <Section eyebrow="Overview" title={`${product.name} solutions`}>
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.85fr]">
          <p className="max-w-3xl text-muted-foreground">{product.intro}</p>
          <img src={PRODUCT_IMAGES[product.slug]} alt={`${product.name} solutions`} className="aspect-[3/2] w-full rounded-lg object-cover" loading="lazy" width={1536} height={1024} />
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="font-bold text-brand-blue-dark">What problem does it solve?</h2>
            <p className="mt-2 text-sm text-muted-foreground">A packaging format selected around product protection, handling, storage, transit and the total cost of the packaging ecosystem.</p>
          </div>
          <div>
            <h2 className="font-bold text-brand-blue-dark">Where is it used?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Across manufacturing, industrial, automotive, consumer and export supply chains, with customization available for the application.</p>
          </div>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {product.points.map((pt: string) => (
            <li key={pt} className="rounded-md border border-border border-l-4 border-l-brand px-4 py-3 text-sm">
              {pt}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <RfqButton />
          <Link
            to="/products"
            className="inline-flex items-center rounded-md border-2 border-brand-blue px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
          >
            All products
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
