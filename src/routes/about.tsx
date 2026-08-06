import { createFileRoute } from "@tanstack/react-router";

import { PageHero, Section, SiteLayout } from "@/components/site/SiteLayout";
import { COMPANY, STATS, WAREHOUSES } from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Vevra Packaging — Company Story, Vision & Mission" },
      {
        name: "description",
        content:
          "Vevra Packaging Pvt. Ltd. delivers industrial rental equipment, packaging products and transport services with 15+ years of sustainable packaging expertise.",
      },
      { property: "og:title", content: "About Vevra Packaging" },
      {
        property: "og:description",
        content: "Company story, vision, mission, performance and manufacturing footprint.",
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
        eyebrow="About us"
        title="It is all about sustainable packaging"
        body="Vevra Packaging Pvt. Ltd. carries a diverse portfolio of products, solutions and services across industrial rental equipment, packaging products and transportation."
      />

      <Section eyebrow="Company story" title="Where eco-friendliness meets innovation">
        <div className="grid gap-8 lg:grid-cols-2">
          <p className="text-muted-foreground">
            We address the customer need first and provide a way to save companies packaging
            material cost without additional investment. We care to deliver sustainable packaging
            solutions with customization, and build innovative ideas for our customers.
          </p>
          <p className="text-muted-foreground">
            Our packaging solutions are designed to keep products secure while leaving a minimal
            environmental footprint. However big or small the packing challenge, we step in first
            and act as the innovator — transforming your idea into reality.
          </p>
        </div>
      </Section>

      <Section eyebrow="Direction" title="Vision & Mission" tint>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-card p-7 shadow-sm">
            <h3 className="text-lg font-bold text-brand">Vision</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              To be India's most trusted sustainable packaging partner — where every shipment
              leaves lighter, safer and greener than before.
            </p>
          </div>
          <div className="rounded-lg bg-card p-7 shadow-sm">
            <h3 className="text-lg font-bold text-brand">Mission</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Engineer returnable, recyclable and cost-optimized packaging systems, and support
              them end to end with manufacturing, logistics and continuous improvement.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Our values" title="How we work">
        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-lg border border-border border-l-4 border-l-brand-blue p-6">
              <h3 className="font-bold text-brand-blue-dark">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Statistics" title="Performance at a glance" tint>
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
