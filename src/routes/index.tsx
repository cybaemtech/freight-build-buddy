import { createFileRoute, Link } from "@tanstack/react-router";

import { RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import {
  COMMITMENTS,
  COMPANY,
  CUSTOMER_PROBLEMS,
  CUSTOMER_SUCCESS_PROCESS,
  FUTURE_DIRECTIONS,
  PRODUCTS,
  SERVICES,
  STATS,
  TESTIMONIALS,
  VALUE_OUTCOMES,
} from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vevra Packaging — End-to-End Packaging Solutions" },
      { name: "description", content: "VEVRA designs, manufactures, manages and optimizes packaging ecosystems so businesses can focus on their core products." },
      { property: "og:title", content: "Vevra Packaging — We Manage Your Packaging Ecosystem" },
      { property: "og:description", content: "End-to-end packaging and supply-chain solutions across design, manufacturing, returnables, warehousing and logistics." },
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
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Sustainable · Reliable · Cost optimized</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">End-to-End Packaging Solutions That Keep Your Supply Chain Moving</h1>
            <p className="mt-5 max-w-2xl text-white/80">From packaging design and engineering to manufacturing, returnable packaging, rental, warehousing and logistics support — VEVRA helps businesses simplify packaging, improve operational efficiency and optimize the total cost of their packaging ecosystem.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <RfqButton />
              <Link to="/products" className="inline-flex items-center rounded-md border-2 border-white/60 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-white hover:text-brand-blue-dark">Explore solutions</Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/20 bg-white/5 p-6">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">Proof panel</h2>
            <dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-2">
              {STATS.map((s) => <div key={s.label}><dt className="text-3xl font-bold text-white">{s.value}</dt><dd className="text-xs uppercase tracking-wide text-white/70">{s.label}</dd></div>)}
            </dl>
            <p className="mt-5 text-xs text-white/50">* Numerical claims to be validated by VEVRA before publication.</p>
          </div>
        </div>
      </section>

      <Section eyebrow="The customer promise" title="Packaging is our business. Your product is yours.">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          <p className="text-lg text-muted-foreground">Your business should not have to spend valuable time managing packaging complexity. VEVRA takes ownership of the packaging ecosystem around your product — from understanding the requirement and designing the right solution to manufacturing, supplying, managing and optimizing it.</p>
          <div className="grid gap-5 md:grid-cols-3">{COMMITMENTS.map((item) => <div key={item.title} className="rounded-lg border border-border border-t-4 border-t-brand p-5"><h3 className="font-bold text-brand-blue-dark">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">{item.body}</p></div>)}</div>
        </div>
        <p className="mt-8 text-xl font-bold text-brand-blue-dark">You focus on what you manufacture. We take care of how it moves.</p>
      </Section>

      <Section eyebrow="Capabilities" title="One partner. Multiple packaging capabilities." tint>
        <div className="grid gap-8 md:grid-cols-2">
          <div><h3 className="text-sm font-bold uppercase tracking-wide text-brand">Product capabilities</h3><div className="mt-4 flex flex-wrap gap-2">{PRODUCTS.map((p) => <Link key={p.slug} to="/products/$slug" params={{ slug: p.slug }} className="rounded-md border border-border bg-card px-3 py-2 text-sm text-brand-blue-dark hover:border-brand">{p.name}</Link>)}</div></div>
          <div><h3 className="text-sm font-bold uppercase tracking-wide text-brand">Service capabilities</h3><div className="mt-4 flex flex-wrap gap-2">{SERVICES.map((s) => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="rounded-md border border-border bg-card px-3 py-2 text-sm text-brand-blue-dark hover:border-brand">{s.name}</Link>)}</div></div>
        </div>
      </Section>

      <Section eyebrow="Start with the problem" title="What packaging problem are you trying to solve?">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">{CUSTOMER_PROBLEMS.map((problem) => <div key={problem.title} className="flex flex-col rounded-lg border border-border p-5"><h3 className="font-bold text-brand-blue-dark">{problem.title}</h3><p className="mt-2 flex-1 text-sm text-muted-foreground">{problem.body}</p><span className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand">{problem.action} →</span></div>)}</div>
      </Section>

      <Section eyebrow="Business value" title="From packaging cost to business value" tint>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{VALUE_OUTCOMES.map((outcome) => <div key={outcome.title} className="rounded-lg bg-card p-6 shadow-sm"><h3 className="text-lg font-bold text-brand-blue-dark">{outcome.title}</h3><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{outcome.items.map((item) => <li key={item}>• {item}</li>)}</ul></div>)}</div>
      </Section>

      <Section eyebrow="Our method" title="How VEVRA creates customer success">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{CUSTOMER_SUCCESS_PROCESS.map(([number, title, body]) => <div key={number} className="rounded-lg border border-border p-5"><span className="text-sm font-bold text-brand">{number}</span><h3 className="mt-3 font-bold text-brand-blue-dark">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{body}</p></div>)}</div>
      </Section>

      <Section eyebrow="Customer proof" title="Customer success is our measure of success." tint>
        <p className="max-w-3xl text-muted-foreground">If our customer wins, we win. We will publish customer challenge, VEVRA intervention, solution, business impact and an approved customer voice as real evidence becomes available.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">{TESTIMONIALS.map((t) => <blockquote key={t.name + t.org} className="rounded-lg bg-card p-6 shadow-sm"><p className="text-sm text-foreground">“{t.quote}”</p><footer className="mt-4 text-xs uppercase tracking-wide text-brand">{t.name} · {t.org}</footer></blockquote>)}</div>
      </Section>

      <Section eyebrow="Evolution" title="Built through experience. Driven by evolution.">
        <p className="max-w-3xl text-muted-foreground">VEVRA did not arrive at today&apos;s business model overnight. It evolved by listening to customers and solving increasingly complex problems.</p>
        <div className="mt-8 flex flex-wrap items-center gap-2">{["Packaging Products", "Returnable Packaging", "Packaging Rental", "PP / Plastic Solutions", "Packaging Engineering", "On-Site Operations", "Warehouse & Logistics", "End-to-End Management"].map((step, index) => <div key={step} className="flex items-center gap-2"><span className="rounded-md border border-brand-blue px-3 py-2 text-sm font-semibold text-brand-blue-dark">{step}</span>{index < 7 ? <span className="text-brand">→</span> : null}</div>)}</div>
      </Section>

      <Section eyebrow="The next chapter" title="Ready for the next chapter of supply chains?" tint>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{FUTURE_DIRECTIONS.map((item) => <div key={item.title} className="rounded-lg bg-card p-6 shadow-sm"><h3 className="font-bold text-brand-blue-dark">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">{item.body}</p></div>)}</div>
      </Section>

      <section className="bg-brand py-14 text-white"><div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 md:flex-row md:items-center md:justify-between"><div><h2 className="text-2xl font-bold">Have a packaging challenge? Let&apos;s solve it.</h2><p className="mt-2 text-white/85">Tell us what you manufacture, move or store. Our team will help identify the right packaging, service or end-to-end solution. Or call {COMPANY.phone}.</p></div><RfqButton variant="secondary" label="Generate My RFQ" className="border-white text-white hover:bg-white hover:text-brand" /></div></section>
    </SiteLayout>
  );
}