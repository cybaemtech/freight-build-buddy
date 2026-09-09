import { createFileRoute } from "@tanstack/react-router";

import { OfficeCollageWall } from "@/components/site/OfficeCollageWall";
import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { COMPANY } from "@/lib/site-content";

export const Route = createFileRoute("/corporate-office")({
  head: () => ({
    meta: [
      { title: "Corporate Office — VEVRA Packaging Pvt. Ltd., Pune" },
      {
        name: "description",
        content:
          "VEVRA Packaging Pvt. Ltd. corporate office at Gat No. 344, Village Kuruli, Tal. Khed, Dist. Pune 410 501, Maharashtra, India.",
      },
      { property: "og:title", content: "VEVRA Packaging Corporate Office" },
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
        title="VEVRA Packaging Pvt. Ltd."
        body="Our corporate office and manufacturing footprint support an evolving end-to-end packaging and supply-chain solutions business."
      />
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg border border-border border-t-4 border-t-brand p-7">
            <h2 className="text-lg font-bold text-brand-blue-dark">Headquarters Address</h2>
            <div className="mt-3 space-y-0.5 text-sm text-muted-foreground">
              <p>Gat No. 344, Village Kuruli,</p>
              <p>Tal. Khed, Dist. Pune – 410 501,</p>
              <p>Maharashtra, India</p>
            </div>
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
        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Inside VEVRA</p>
          <h2 className="mt-2 text-2xl font-bold text-brand-blue-dark">Our people, our office, our way of working</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            A closer look at the team and the corporate office in Kuruli, Pune, where packaging problems are studied,
            engineered and managed end to end.
          </p>
          <div className="mt-6">
            <OfficeCollageWall />
          </div>
        </div>
        <div className="mt-10">
          <RfqButton variant="secondary" />
        </div>
      </Section>
    </SiteLayout>
  );
}
