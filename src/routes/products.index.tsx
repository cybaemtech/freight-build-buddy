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
              className="lift arrow-move flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex h-32 items-end bg-brand-blue-dark p-6">
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-soft/90">Capability</span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h2 className="text-lg font-bold text-brand-blue-dark">{p.name}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.short}</p>
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-brand"
                >
                  Explore <span className="arrow">→</span>
                </Link>
              </div>
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
