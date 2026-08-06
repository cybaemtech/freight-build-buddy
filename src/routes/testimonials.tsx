import { createFileRoute } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { TESTIMONIALS } from "@/lib/site-content";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — What Our Customers Say | Vevra Packaging" },
      {
        name: "description",
        content:
          "Real experiences from manufacturers and export houses who cut packaging cost and transit damage with Vevra Packaging.",
      },
      { property: "og:title", content: "Vevra Packaging Testimonials" },
      { property: "og:description", content: "Real experiences. Real partnerships. Real results." },
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
        title="Real experiences. Real partnerships."
        body="What customers across automotive, engineering and FMCG say about working with Vevra."
      />
      <Section>
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
