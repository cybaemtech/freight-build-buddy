import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { SERVICES } from "@/lib/site-content";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Rental, Packaging & Transport | Vevra Packaging" },
      {
        name: "description",
        content:
          "Industrial rental service, industrial packaging products and industrial transport service — three integrated segments covering your full packaging supply chain.",
      },
      { property: "og:title", content: "Vevra Packaging Services" },
      {
        property: "og:description",
        content: "Rental, packaging and transport services delivered pan-India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Services"
        title="Three segments, one accountable partner"
        body="Rent returnable assets, buy engineered packaging, and move it all with our pan-India transport network."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.slug}
              className="flex flex-col rounded-lg border border-border border-t-4 border-t-brand-blue p-6"
            >
              <h2 className="text-lg font-bold text-brand-blue-dark">{s.name}</h2>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand hover:underline"
              >
                Learn more →
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
