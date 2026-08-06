import { createFileRoute } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { BUSINESS_MODEL } from "@/lib/site-content";

export const Route = createFileRoute("/business-model")({
  head: () => ({
    meta: [
      { title: "Business Model — End-to-End Packaging Partnership | Vevra" },
      {
        name: "description",
        content:
          "Design and engineering, manufacturing, logistics, after sales support and continuous improvement — the Vevra Packaging end-to-end integrated model.",
      },
      { property: "og:title", content: "Vevra Packaging Business Model" },
      {
        property: "og:description",
        content: "An end-to-end integrated model from design to continuous improvement.",
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
        title="End-to-end integrated model"
        body="Five connected stages that take a packaging problem from first drawing to a measurably cheaper, safer shipment."
      />
      <Section>
        <ol className="space-y-5">
          {BUSINESS_MODEL.map((b, i) => (
            <li key={b.step} className="flex gap-5 rounded-lg border border-border p-6">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-bold text-brand-blue-dark">{b.step}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{b.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <RfqButton variant="secondary" />
        </div>
      </Section>
    </SiteLayout>
  );
}
