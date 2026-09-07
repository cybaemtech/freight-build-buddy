import { createFileRoute } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { TESTIMONIALS } from "@/lib/site-content";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Customer Success — Proof of Packaging Outcomes | VEVRA" },
      {
        name: "description",
        content:
          "A customer-success format for validated challenges, VEVRA interventions, solutions, outcomes and approved customer voices.",
      },
      { property: "og:title", content: "VEVRA Customer Success" },
      { property: "og:description", content: "Customer success is our measure of success." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Testimonials"
        title="Customer success is our measure of success."
        body="If our customer wins, we win. We will show the problem, intervention, solution and business impact through approved customer evidence."
      />
      <Section>
        <div className="mb-8 rounded-lg border border-brand-blue bg-brand-blue-soft p-6">
          <h2 className="text-lg font-bold text-brand-blue-dark">The case-study format</h2>
          <p className="mt-2 text-sm text-muted-foreground">Customer Challenge → VEVRA Intervention → Solution → Business Impact → Customer Testimonial. Real person, company and photograph will be added wherever permission is available.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name + t.org}
              className="rounded-lg border border-border border-t-4 border-t-brand p-6"
            >
              <p className="text-sm">“{t.quote}”</p>
              <footer className="mt-4 text-xs uppercase tracking-wide text-brand-blue">
                {t.name} · {t.org}
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="mt-10">
          <RfqButton variant="secondary" />
        </div>
      </Section>
    </SiteLayout>
  );
}
