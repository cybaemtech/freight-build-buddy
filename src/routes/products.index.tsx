import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { PRODUCTS } from "@/lib/site-content";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Industrial Packaging Products — Corrugation, Blister, Plywood | Vevra" },
      {
        name: "description",
        content:
          "Corrugation, blister, plastic parts, metal trollies, racking systems and plywood packaging engineered for industrial storage, handling and export.",
      },
      { property: "og:title", content: "Vevra Packaging Products" },
      {
        property: "og:description",
        content: "Six product families engineered for industrial storage, handling and export.",
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
        body="Six product families, designed in-house and manufactured across four units — built to the exact load, stack height and transit profile of your shipment."
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
