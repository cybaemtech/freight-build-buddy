import { createFileRoute } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { WAREHOUSES } from "@/lib/site-content";

export const Route = createFileRoute("/warehouses")({
  head: () => ({
    meta: [
      { title: "Warehouses — 11+ Locations, Pan India | Vevra Packaging" },
      {
        name: "description",
        content:
          "Strategically located warehouses across India for better reach, faster delivery and efficient inventory management.",
      },
      { property: "og:title", content: "Vevra Packaging Warehouses" },
      { property: "og:description", content: "11+ warehouses with pan-India presence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WarehousesPage,
});

function WarehousesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Warehouses"
        title="11+ warehouses, pan-India presence"
        body="Strategically located storage close to industrial clusters for better reach, faster delivery and efficient inventory management."
      />
      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WAREHOUSES.map((w) => (
            <li key={w} className="rounded-lg border border-border border-t-4 border-t-brand p-5 text-sm">
              {w}
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <RfqButton variant="secondary" />
        </div>
      </Section>
    </SiteLayout>
  );
}
