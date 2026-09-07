import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { PRODUCTS } from "@/lib/site-content";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Products — Packaging Engineered Around Your Product | VEVRA" },
      {
        name: "description",
        content:
          "Explore VEVRA's corrugated, plastic, metal, wood, protective, identification and customized packaging capabilities.",
      },
      { property: "og:title", content: "VEVRA Packaging Products" },
      {
        property: "og:description",
        content: "Packaging formats selected around your product, process, application and supply-chain requirement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Products"
        title="Packaging engineered around your product"
        body="From expendable packaging to engineered returnable systems, VEVRA offers multiple formats based on the product, process, application and supply-chain requirement."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article
              key={p.slug}
              className="flex flex-col rounded-lg border border-border border-t-4 border-t-brand p-6"
            >
              <h2 className="text-lg font-bold uppercase tracking-wide text-brand-blue-dark">
                {p.name}
              </h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.short}</p>
              <Link
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand hover:underline"
              >
                View details →
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <RfqButton variant="secondary" />
        </div>
      </Section>
    </SiteLayout>
  );
}
