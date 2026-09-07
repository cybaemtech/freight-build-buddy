import { createFileRoute } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { BUSINESS_MODELS, COMPANY } from "@/lib/site-content";

export const Route = createFileRoute("/business-model")({
  head: () => ({
    meta: [
      { title: "Business Model — Better Business Value | VEVRA Packaging" },
      {
        name: "description",
        content:
          "Explore expendable, owned returnable, pooling, rental and end-to-end managed packaging models from VEVRA.",
      },
      { property: "og:title", content: "VEVRA Packaging Business Model" },
      {
        property: "og:description",
        content: "Different packaging models. One objective: better business value.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BusinessModelPage,
});

function BusinessModelPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Business model"
        title="Different packaging models. One objective: better business value."
        body="Choose the model that fits the commercial and operational requirement — or give VEVRA the packaging problem and let us manage the ecosystem."
      />
      <Section>
        <ol className="space-y-5">
          {BUSINESS_MODELS.map((b, i) => (
            <li key={b.step} className="flex gap-5 rounded-lg border border-border p-6">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-bold text-brand-blue-dark">{b.title}</h2>
                <p className="mt-1 text-sm font-semibold text-brand">{b.flow}</p>
                <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-lg font-bold text-brand-blue-dark">{COMPANY.promise}</p>
        <div className="mt-10">
          <RfqButton variant="secondary" />
        </div>
      </Section>
    </SiteLayout>
  );
}
