import { createFileRoute } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { COMPANY } from "@/lib/site-content";

export const Route = createFileRoute("/corporate-office")({
  head: () => ({
    meta: [
      { title: "Corporate Office — Vevra Packaging Pvt. Ltd., Pune" },
      {
        name: "description",
        content:
          "Vevra Packaging corporate office at Gat No. 344, Village Kuruli, Tal. Khed, Dist. Pune 410 501, Maharashtra, India.",
      },
      { property: "og:title", content: "Vevra Packaging Corporate Office" },
      { property: "og:description", content: "Our registered corporate office in Pune, India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CorporateOfficePage,
});

function CorporateOfficePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Corporate office"
        title="Vevra Packaging Pvt. Ltd."
        body="Our corporate office and primary manufacturing campus sit in the Pune industrial belt, close to Chakan and Ranjangaon."
      />
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-border border-t-4 border-t-brand p-7">
            <h2 className="text-lg font-bold text-brand-blue-dark">Registered address</h2>
            <p className="mt-3 text-sm text-muted-foreground">{COMPANY.address}</p>
          </div>
          <div className="rounded-lg border border-border border-t-4 border-t-brand-blue p-7">
            <h2 className="text-lg font-bold text-brand-blue-dark">Reach us</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>{COMPANY.phone}</li>
              <li>{COMPANY.altPhone}</li>
              <li>{COMPANY.email}</li>
              <li>{COMPANY.marketingEmail}</li>
              <li>{COMPANY.timings}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10">
          <RfqButton variant="secondary" />
        </div>
      </Section>
    </SiteLayout>
  );
}
