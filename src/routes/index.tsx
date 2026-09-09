import { createFileRoute, Link } from "@tanstack/react-router";

import { CeoStatement } from "@/components/site/CeoStatement";
import { ImmersiveHero } from "@/components/site/ImmersiveHero";
import { RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import {
  BUSINESS_MODELS,
  CLIENTS,
  COMMITMENTS,
  COMPANY,
  CUSTOMER_PROBLEMS,
  CUSTOMER_SUCCESS_PROCESS,
  EVOLUTION,
  FUTURE_DIRECTIONS,
  PRODUCTS,
  SERVICES,
  STATS,
  VALUE_OUTCOMES,
} from "@/lib/site-content";
import { PRODUCT_IMAGES, SERVICE_IMAGES } from "@/lib/site-images";

const ECOSYSTEM = [
  "Design",
  "Engineer",
  "Manufacture",
  "Supply",
  "Store",
  "Track",
  "Return",
  "Reuse",
  "Optimize",
];

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
      <ImmersiveHero />

      <CeoStatement />

      {/* ECOSYSTEM */}
      <Section
        eyebrow="One partner"
        title="One partner. One packaging ecosystem."
        lead="Your business should not have to manage packaging complexity across multiple vendors. VEVRA connects every stage of the packaging lifecycle into a single managed system."
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
          {ECOSYSTEM.map((node, i) => (
            <div key={node} className="flex items-center gap-2">
              <span className="lift inline-flex items-center rounded-full border border-brand-blue/15 bg-card px-5 py-3 text-sm font-semibold text-brand-blue-dark">
                <span className="mr-2 text-xs font-bold text-brand">{String(i + 1).padStart(2, "0")}</span>
                {node}
              </span>
              {i < ECOSYSTEM.length - 1 ? <span className="text-brand/50">—</span> : null}
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {COMMITMENTS.map((item) => (
            <div key={item.title} className="lift rounded-2xl border border-border bg-card p-7">
              <span className="inline-block h-1 w-10 rounded bg-brand" />
              <h3 className="mt-5 text-lg font-bold text-brand-blue-dark">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PROBLEMS */}
      <Section
        eyebrow="Start with the problem"
        title="What packaging challenge are you trying to solve?"
        lead="We don't ask which product you want. We ask what problem needs solving — then take ownership of it."
        tint
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CUSTOMER_PROBLEMS.map((problem) => (
            <Link
              key={problem.title}
              to="/services"
              className="lift arrow-move group flex flex-col rounded-2xl border border-border bg-card p-7"
            >
              <h3 className="text-lg font-bold text-brand-blue-dark">{problem.title}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{problem.body}</p>
              <p className="mt-4 max-h-0 overflow-hidden text-sm text-muted-foreground opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100">
                <span className="font-semibold text-brand-blue-dark">VEVRA solution: </span>
                packaging engineering, standardization, returnable and rental models, and managed
                optimization across the ecosystem.
              </p>
              <span className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-brand">
                {problem.action} <span className="arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* PRODUCTS */}
      <Section
        eyebrow="Packaging capabilities"
        title="Explore our packaging"
        lead="Engineered formats across corrugated, plastic, metal, wood, protective packaging and identification."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="lift arrow-move flex flex-col overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img src={PRODUCT_IMAGES[p.slug]} alt={p.name} className="h-44 w-full object-cover" loading="lazy" width={1536} height={1024} />
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-lg font-bold text-brand-blue-dark">{p.name}</h3>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.short}</p>
                <span className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-brand">
                  Explore <span className="arrow">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <Section
        eyebrow="Services"
        title="Packaging managed as a system, not a purchase order."
        tint
      >
        <div className="space-y-5">
          {SERVICES.map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="lift arrow-move grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-[160px_80px_1fr_auto] md:items-center"
            >
              <img src={SERVICE_IMAGES[s.slug]} alt={s.name} className="h-40 w-full object-cover md:h-full" loading="lazy" width={1536} height={1024} />
              <span className="px-7 text-2xl font-extrabold text-brand/70 md:px-0">{String(i + 1).padStart(2, "0")}</span>
              <div className="px-7 pb-2 md:px-0 md:py-7">
                <h3 className="text-lg font-bold text-brand-blue-dark">{s.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.short}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.14em] text-brand-blue/70">
                  {s.points.slice(0, 4).join(" • ")}
                </p>
              </div>
              <span className="px-7 pb-7 text-xs font-bold uppercase tracking-[0.16em] text-brand md:px-7 md:py-7 md:text-right">
                Explore service <span className="arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* BUSINESS MODELS */}
      <Section
        eyebrow="Business models"
        title="Choose the right packaging model."
        lead="Own it, rent it, pool it — or let VEVRA manage the entire ecosystem end to end."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BUSINESS_MODELS.map((m) => (
            <div key={m.title} className="lift rounded-2xl border border-border bg-card p-7">
              <h3 className="text-lg font-bold text-brand-blue-dark">{m.title}</h3>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand">{m.flow}</p>
              <p className="mt-3 text-sm text-muted-foreground">{m.body}</p>
            </div>
          ))}
        </div>
        <Link
          to="/business-model"
          className="arrow-move mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-brand"
        >
          Compare all models <span className="arrow">→</span>
        </Link>
      </Section>

      {/* VALUE OUTCOMES */}
      <Section eyebrow="Business value" title="From packaging cost to business value" dark>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {VALUE_OUTCOMES.map((outcome) => (
            <div key={outcome.title} className="rounded-2xl border border-white/10 bg-white/5 p-7">
              <h3 className="text-lg font-bold text-white">{outcome.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {outcome.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-brand-soft">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* CUSTOMER SUCCESS */}
      <Section
        eyebrow="Customer success"
        title="If our customer wins, we win."
        lead="Every engagement follows the same disciplined path — challenge, solution, business impact. Percentages and named customer stories are published only after VEVRA and the customer validate them."
        tint
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CUSTOMER_SUCCESS_PROCESS.map(([number, title, body]) => (
            <div key={number} className="rounded-2xl border border-border bg-card p-6">
              <span className="text-xs font-bold text-brand">{number}</span>
              <h3 className="mt-3 font-bold text-brand-blue-dark">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section eyebrow="Industries" title="Trusted where packaging can't fail.">
        <div className="flex flex-wrap gap-3">
          {CLIENTS.map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-brand-blue/15 px-5 py-2.5 text-sm font-semibold text-brand-blue-dark"
            >
              {industry}
            </span>
          ))}
        </div>
      </Section>

      {/* EVOLUTION */}
      <Section eyebrow="Evolution" title="From packaging products to packaging partnership." tint>
        <ol className="relative space-y-6 border-l-2 border-brand/25 pl-8">
          {EVOLUTION.map((step) => (
            <li key={step} className="relative">
              <span className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full bg-brand" />
              <p className="text-base font-bold text-brand-blue-dark">{step}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-xs text-muted-foreground">* Dates and milestones to be confirmed by VEVRA before publication.</p>
      </Section>

      {/* FUTURE */}
      <Section eyebrow="The next chapter" title="Ready for the next chapter of supply chains?">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURE_DIRECTIONS.map((item) => (
            <div key={item.title} className="lift rounded-2xl border border-border bg-card p-7">
              <h3 className="font-bold text-brand-blue-dark">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="bg-brand-blue-dark py-16 text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Have a packaging challenge? Let&apos;s solve it.</h2>
            <p className="mt-3 max-w-2xl text-white/70">
              Tell us what you manufacture, move or store. Our team will identify the right packaging,
              service or end-to-end model. Or call {COMPANY.phone}.
            </p>
          </div>
          <RfqButton label="Generate My RFQ" />
        </div>
      </section>
    </SiteLayout>
  );
}
