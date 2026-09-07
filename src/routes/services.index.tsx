import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { SERVICES } from "@/lib/site-content";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — We Manage the Packaging Ecosystem | VEVRA" },
      {
        name: "description",
        content:
          "Packaging engineering, returnables, rental, pooling, on-site operations, logistics and warehouse management from one accountable partner.",
      },
      { property: "og:title", content: "VEVRA Packaging Services" },
      {
        property: "og:description",
        content: "Beyond packaging: VEVRA manages the packaging ecosystem around your product and supply chain.",
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
        title="Beyond packaging. We manage the packaging ecosystem."
        body="From engineering and returnables to rental, pooling, on-site operations, logistics and warehouse management, VEVRA supports the full operating requirement."
      />
      <Section>
        <div className="space-y-5">
          {SERVICES.map((s, i) => (
            <article
              key={s.slug}
              className="lift arrow-move grid gap-4 rounded-2xl border border-border bg-card p-7 md:grid-cols-[80px_1fr_auto] md:items-center"
            >
              <span className="text-2xl font-extrabold text-brand/70">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-lg font-bold text-brand-blue-dark">{s.name}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.short}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-brand-blue/70">
                  {s.points.slice(0, 4).join(" • ")}
                </p>
              </div>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="text-xs font-bold uppercase tracking-[0.16em] text-brand md:text-right"
              >
                Explore service <span className="arrow">→</span>
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
