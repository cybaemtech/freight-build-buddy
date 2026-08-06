import { createFileRoute, Link } from "@tanstack/react-router";

import { RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import {
  COMMITMENTS,
  COMPANY,
  PRODUCTS,
  SERVICES,
  STATS,
  TESTIMONIALS,
} from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vevra Packaging Pvt. Ltd. — Sustainable Industrial Packaging" },
      {
        name: "description",
        content:
          "Vevra Packaging delivers sustainable, reliable and cost optimized industrial packaging, returnable rental assets and pan-India transport. Generate a quick RFQ online.",
      },
      { property: "og:title", content: "Vevra Packaging — Adding value to your supply chain" },
      {
        property: "og:description",
        content:
          "Corrugation, blister, plastic parts, metal trollies, racking and plywood packaging, plus rental and transport services across India.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <section className="border-b-4 border-brand bg-brand-blue-dark text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Sustainable · Reliable · Cost optimized
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Adding value to your supply chain through sustainable and reliable packaging
              solutions
            </h1>
            <p className="mt-5 max-w-2xl text-white/80">
              End-to-end industrial packaging: design and engineering, four manufacturing units,
              returnable rental assets and a pan-India transport network — from one accountable
              partner.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <RfqButton />
              <Link
                to="/products"
                className="inline-flex items-center rounded-md border-2 border-white/60 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-white hover:text-brand-blue-dark"
              >
                Explore products
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
              Key highlights
            </h2>
            <dl className="mt-5 grid grid-cols-2 gap-5">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dt className="text-3xl font-bold text-white">{s.value}</dt>
                  <dd className="text-xs uppercase tracking-wide text-white/70">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Section eyebrow="Value proposition" title="Why supply chains choose Vevra">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {COMMITMENTS.map((c) => (
            <div key={c.title} className="rounded-lg border border-border border-t-4 border-t-brand p-6">
              <h3 className="text-lg font-bold text-brand-blue-dark">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Business overview" title="Our business segments" tint>
        <div className="grid gap-6 md:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.slug} className="flex flex-col rounded-lg bg-card p-6 shadow-sm">
              <h3 className="text-lg font-bold text-brand">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{s.short}</p>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="mt-4 text-sm font-semibold uppercase tracking-wide text-brand-blue hover:underline"
              >
                Learn more →
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <RfqButton variant="secondary" />
        </div>
      </Section>

      <Section eyebrow="Our packaging products" title="Products">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="rounded-lg border border-border p-6 transition-colors hover:border-brand"
            >
              <h3 className="text-base font-bold uppercase tracking-wide text-brand-blue-dark">
                {p.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.short}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section eyebrow="Testimonials" title="Real experiences. Real partnerships." tint>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote key={t.name + t.org} className="rounded-lg bg-card p-6 shadow-sm">
              <p className="text-sm text-foreground">“{t.quote}”</p>
              <footer className="mt-4 text-xs uppercase tracking-wide text-brand">
                {t.name} · {t.org}
              </footer>
            </blockquote>
          ))}
        </div>
      </Section>

      <section className="bg-brand py-14 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Need a packaging & freight quotation?</h2>
            <p className="mt-2 text-white/85">
              Size the carton, set the protection level and send us a complete RFQ in minutes.
              Or call {COMPANY.phone}.
            </p>
          </div>
          <RfqButton
            variant="secondary"
            className="border-white text-white hover:bg-white hover:text-brand"
          />
        </div>
      </section>
    </SiteLayout>
  );
}
