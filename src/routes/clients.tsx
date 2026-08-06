import { createFileRoute } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { CLIENTS } from "@/lib/site-content";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Industries We Serve | Vevra Packaging" },
      {
        name: "description",
        content:
          "Trusted by automotive OEMs, tier-1 suppliers, engineering, FMCG, electronics, pharma and export houses across India.",
      },
      { property: "og:title", content: "Vevra Packaging Clients" },
      { property: "og:description", content: "Long term relationships built on trust across industries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Clients"
        title="Trusted by leaders across industries"
        body="Long term relationships built on trust — from single-plant manufacturers to multi-site global groups."
      />
      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CLIENTS.map((c) => (
            <li
              key={c}
              className="rounded-lg border border-border border-l-4 border-l-brand-blue px-5 py-4 text-sm font-semibold text-brand-blue-dark"
            >
              {c}
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
