import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Eye,
  Handshake,
  Medal,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";

import { PageHero, Section, SiteLayout } from "@/components/site/SiteLayout";
import { WorldExpansionMap } from "@/components/site/WorldExpansionMap";
import visionTeamImage from "@/assets/editorial/about-vision-team.jpg";
import { ABOUT_VALUES, EVOLUTION, STATS } from "@/lib/site-content";

const VALUE_ICONS = [Handshake, ShieldCheck, Target, UsersRound, Medal];

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

      <section className="about-signature overflow-hidden py-24 lg:py-32" aria-labelledby="purpose-heading">
        <div className="about-blueprint" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px] px-6">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="about-reveal lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/15 bg-card px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand">
                <Sparkles className="size-3.5" aria-hidden="true" />
                Our purpose
              </div>
              <h2 id="purpose-heading" className="mt-7 text-5xl font-extrabold leading-[1.04] text-brand-blue-dark sm:text-6xl lg:text-7xl">
                Vision <span className="text-brand">&amp;</span><br /> Mission
              </h2>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
                The direction behind every solution we engineer, every partnership we build and every supply chain we strengthen.
              </p>
              <div className="mt-10 flex items-center gap-4" aria-hidden="true">
                <span className="h-px w-16 bg-brand" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-blue">Built for meaningful change</span>
              </div>
            </div>

            <div className="about-reveal about-reveal-delay grid gap-5 md:grid-cols-2 lg:col-span-7">
              <article className="about-purpose-card about-purpose-card-dark group">
                <div className="about-purpose-image">
                  <img
                    src={visionTeamImage}
                    alt="VEVRA engineers collaborating around a reusable packaging system"
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="lazy"
                    width={1600}
                    height={1008}
                  />
                  <div className="about-image-shade" />
                  <div className="about-scan-line" aria-hidden="true" />
                </div>
                <div className="relative z-10 flex min-h-[410px] flex-col justify-between p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="about-purpose-icon"><Eye className="size-5" aria-hidden="true" /></span>
                    <span className="text-xs font-bold tracking-[0.24em] text-primary-foreground/60">01 / VISION</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-primary-foreground">Vision</h3>
                    <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
                      To create meaningful change in the supply-chain industry through innovative, sustainable and efficient packaging solutions.
                    </p>
                  </div>
                </div>
              </article>

              <article className="about-purpose-card about-purpose-card-light group md:translate-y-10">
                <div className="about-card-lines" aria-hidden="true" />
                <div className="relative z-10 flex min-h-[410px] flex-col justify-between p-7 sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="about-purpose-icon-light"><Target className="size-5" aria-hidden="true" /></span>
                    <span className="text-xs font-bold tracking-[0.24em] text-brand/70">02 / MISSION</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-brand-blue-dark">Mission</h3>
                    <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                      To strengthen our customers and partners while empowering our people through continual improvement and adoption of industry best practices.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="about-reveal mt-28 border-t border-brand-blue/15 pt-12 lg:mt-36">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand">Our values</p>
                <h2 className="mt-3 text-4xl font-extrabold text-brand-blue-dark sm:text-5xl">How we work.</h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                Five principles that keep every decision grounded, every relationship trusted and every outcome accountable.
              </p>
            </div>

            <div className="about-values-grid mt-12">
              {ABOUT_VALUES.map((value, index) => {
                const Icon = VALUE_ICONS[index];
                return (
                  <article key={value.title} className="about-value-card group" style={{ "--value-index": index } as React.CSSProperties}>
                    <div className="flex items-start justify-between">
                      <span className="about-value-number">{String(index + 1).padStart(2, "0")}</span>
                      {Icon ? <Icon className="size-5 text-brand transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" strokeWidth={1.7} aria-hidden="true" /> : null}
                    </div>
                    <div className="mt-16">
                      <h3 className="text-xl font-bold text-brand-blue-dark">{value.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
                    </div>
                    <span className="about-value-rule" aria-hidden="true" />
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="evolution-stage" aria-labelledby="evolution-heading">
        <div className="evolution-watermark" aria-hidden="true">EVOLUTION</div>
        <div className="evolution-scan" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1280px] px-6 py-24 lg:py-32">
          <div className="evolution-intro">
            <div>
              <p className="evolution-eyebrow">Our evolution</p>
              <h2 id="evolution-heading" className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
                Built through experience.<br /><span>Driven by evolution.</span>
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-primary-foreground/70">
              From making packaging products to managing complete packaging ecosystems—each capability builds on the one before it.
            </p>
          </div>

          <div className="evolution-journey mt-20">
            <div className="evolution-rail" aria-hidden="true">
              <span className="evolution-rail-progress" />
            </div>
            <ol className="evolution-grid">
              {EVOLUTION.map((step, index) => (
                <li
                  key={step}
                  className="evolution-step"
                  style={{ "--evolution-index": index } as React.CSSProperties}
                >
                  <div className="evolution-node" aria-hidden="true">
                    <span />
                  </div>
                  <div className="evolution-card">
                    <span className="evolution-number">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step}</h3>
                    {index < EVOLUTION.length - 1 ? <ArrowRight className="evolution-arrow" aria-hidden="true" /> : <span className="evolution-current">Now</span>}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="evolution-outcome">
            <span>Products</span>
            <ArrowRight aria-hidden="true" />
            <span>Solutions</span>
            <ArrowRight aria-hidden="true" />
            <strong>Managed ecosystems</strong>
          </div>
        </div>
      </section>

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

      <WorldExpansionMap />
    </SiteLayout>
  );
}
