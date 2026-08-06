import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { PRODUCTS } from "@/lib/site-content";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Product unavailable | Vevra Packaging" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} Packaging | Vevra Packaging` },
        { name: "description", content: product.short },
        { property: "og:title", content: `${product.name} — Vevra Packaging` },
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
      <PageHero eyebrow="Product" title={product.name} body={product.short} />
      <Section eyebrow="Overview" title={`${product.name} solutions`}>
        <p className="max-w-3xl text-muted-foreground">{product.intro}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {product.points.map((pt) => (
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
