import { createFileRoute } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { WAREHOUSES } from "@/lib/site-content";

export const Route = createFileRoute("/warehouses")({
  head: () => ({
    meta: [
      { title: "Warehouses — Closer to Your Operations | VEVRA" },
      {
        name: "description",
        content:
          "Explore VEVRA's warehouse and packaging-management footprint, designed to improve reach, availability and supply-chain visibility.",
      },
      { property: "og:title", content: "VEVRA Warehouses and Locations" },
      { property: "og:description", content: "Closer to your operations. Closer to your customers." },
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
        title="Closer to your operations. Closer to your customers."
        body="VEVRA's locations support packaging inventory, returnable asset management, availability and coordinated supply-chain operations."
      />
      <Section>
        <p className="max-w-3xl text-muted-foreground">Location details, warehouse type, capacity, products available, services supported, industries served and directions will be added as each site is validated.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
