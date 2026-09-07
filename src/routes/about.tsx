import { createFileRoute } from "@tanstack/react-router";

import { PageHero, Section, SiteLayout } from "@/components/site/SiteLayout";
import { ABOUT_VALUES, COMPANY, EVOLUTION, STATS, WAREHOUSES } from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VEVRA — From Packaging Supplier to Problem Solver" },
      {
        name: "description",
        content:
          "VEVRA grew from making packaging to solving packaging and supply-chain problems through sustainable, efficient and customer-centred solutions.",
      },
      { property: "og:title", content: "About VEVRA Packaging" },
      {
        property: "og:description",
        content: "The VEVRA story, vision, mission, values and evolution toward end-to-end packaging management.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { title: "Performance", body: "Measured on damage rates, on-time delivery and cost per shipment." },
  { title: "Integrity", body: "Transparent pricing, honest lead times and documented compliance." },
  { title: "Professionalism", body: "Trained teams, structured account management and clear escalation." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About VEVRA"
        title="We started by making packaging. We grew by solving problems."
        body="VEVRA's story is about evolution — from packaging products and returnables to a broader end-to-end packaging and supply-chain solutions partnership."
      />

      <Section eyebrow="Our story" title="From product supplier to problem solver">
        <div className="grid gap-8 lg:grid-cols-2">
          <p className="text-muted-foreground">
            VEVRA was built around a simple question: why should packaging be purchased again and again when it can potentially be reused, circulated and managed more intelligently?
          </p>
          <p className="text-muted-foreground">
            That thinking led VEVRA toward returnable packaging, pooling and broader packaging-management solutions. Customers may forget a product, but they remember a partner who solves a difficult problem.
          </p>
        </div>
      </Section>

      <Section eyebrow="Direction" title="Vision & Mission" tint>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-card p-7 shadow-sm">
            <h3 className="text-lg font-bold text-brand">Vision</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              To create meaningful change in the supply-chain industry through innovative, sustainable and efficient packaging solutions.
            </p>
          </div>
          <div className="rounded-lg bg-card p-7 shadow-sm">
            <h3 className="text-lg font-bold text-brand">Mission</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              To strengthen our customers and partners while empowering our people through continual improvement and adoption of industry best practices.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Our values" title="How we work">
        <div className="grid gap-6 md:grid-cols-3">
          {ABOUT_VALUES.map((v) => (
            <div key={v.title} className="rounded-lg border border-border border-l-4 border-l-brand-blue p-6">
              <h3 className="font-bold text-brand-blue-dark">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Evolution" title="Built through experience. Driven by evolution." tint>
        <div className="flex flex-wrap items-center gap-2">
          {EVOLUTION.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-md bg-card px-3 py-2 text-sm font-semibold text-brand-blue-dark shadow-sm">{step}</span>
              {index < EVOLUTION.length - 1 ? <span className="text-brand">→</span> : null}
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Validated proof" title="Experience you can verify" tint>
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-5">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-lg bg-card p-6 text-center shadow-sm">
              <dt className="text-3xl font-bold text-brand">{s.value}</dt>
              <dd className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section eyebrow="Manufacturing units & warehouses" title="Pan-India presence">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WAREHOUSES.map((w) => (
            <li key={w} className="rounded-md border border-border px-4 py-3 text-sm">
              {w}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Corporate office: {COMPANY.address}
        </p>
      </Section>
    </SiteLayout>
  );
}
