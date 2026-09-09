import { createFileRoute } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { TESTIMONIALS } from "@/lib/site-content";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Customer Success — Proof of Packaging Outcomes | VEVRA" },
      {
        name: "description",
        content:
          "Hear from customers who reduced packaging costs, improved delivery performance and transformed operations with VEVRA Packaging.",
      },
      { property: "og:title", content: "VEVRA Customer Success" },
      { property: "og:description", content: "Customer success is our measure of success." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestimonialsPage,
});

function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TestimonialCard({
  quote,
  name,
  org,
  featured = false,
}: {
  quote: string;
  name: string;
  org: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_20px_50px_-18px_rgba(15,23,42,0.14)] sm:p-8 ${
        featured ? "md:col-span-2 md:flex-row md:items-center md:gap-10 md:p-10" : ""
      }`}
    >
      <div className={`absolute left-0 top-0 h-full w-1 bg-brand transition-all group-hover:w-1.5`} />
      <div className={`shrink-0 ${featured ? "md:w-20" : ""}`}>
        <div
          className={`flex aspect-square items-center justify-center rounded-full bg-brand-blue-soft font-bold text-brand-blue-dark transition-colors group-hover:bg-brand group-hover:text-white ${
            featured ? "h-16 w-16 text-xl sm:h-20 sm:w-20" : "h-12 w-12 text-sm"
          }`}
        >
          {initials}
        </div>
      </div>
      <div className="mt-5 flex flex-1 flex-col md:mt-0">
        <div className="flex items-start gap-3">
          <Quote
            className={`shrink-0 fill-brand/10 text-brand/80 ${featured ? "h-8 w-8 sm:h-10 sm:w-10" : "h-6 w-6"}`}
            aria-hidden="true"
          />
          <p
            className={`font-medium leading-relaxed text-brand-blue-dark ${
              featured ? "text-lg sm:text-xl md:text-2xl" : "text-base sm:text-lg"
            }`}
          >
            “{quote}”
          </p>
        </div>
        <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
          <div>
            <p className={`font-bold text-brand-blue-dark ${featured ? "text-base" : "text-sm"}`}>{name}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{org}</p>
          </div>
          <div className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-brand text-brand" />
            ))}
          </div>
        </footer>
      </div>
    </article>
  );
}

function TrustBanner() {
  return (
    <div className="mt-16 grid gap-6 rounded-3xl bg-brand-blue-dark p-8 text-white sm:grid-cols-3 sm:p-10">
      <div className="text-center">
        <p className="text-3xl font-extrabold text-brand sm:text-4xl">6,149+</p>
        <p className="mt-1 text-sm text-white/75">Customers served</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-extrabold text-brand sm:text-4xl">15+</p>
        <p className="mt-1 text-sm text-white/75">Years of experience</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-extrabold text-brand sm:text-4xl">11+</p>
        <p className="mt-1 text-sm text-white/75">Warehouses across India</p>
      </div>
    </div>
  );
}

function TestimonialsPage() {
  const featured = TESTIMONIALS[0];
  const rest = TESTIMONIALS.slice(1);

  if (!featured) return null;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Testimonials"
        title="Customer success is our measure of success."
        body="If our customer wins, we win. Read how VEVRA Packaging has helped businesses reduce costs, improve delivery performance and simplify packaging operations."
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <TestimonialCard
            quote={featured.quote}
            name={featured.name}
            org={featured.org}
            initials={INITIALS[0]}
            featured
          />
          {rest.map((t, i) => (
            <TestimonialCard
              key={t.name}
              quote={t.quote}
              name={t.name}
              org={t.org}
              initials={INITIALS[i + 1]}
            />
          ))}
        </div>
        <TrustBanner />
        <div className="mt-16 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-brand/40 bg-brand-blue-soft p-8 text-center sm:flex-row sm:p-10">
          <div className="text-left">
            <p className="text-lg font-bold text-brand-blue-dark">Ready to become our next success story?</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tell us your packaging challenge and get a tailored RFQ in minutes.
            </p>
          </div>
          <RfqButton variant="primary" className="ml-0 sm:ml-auto" />
        </div>
      </Section>
    </SiteLayout>
  );
}
