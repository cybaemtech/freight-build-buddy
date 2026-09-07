import { createFileRoute } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { CLIENTS } from "@/lib/site-content";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Trusted Where Packaging Cannot Fail | VEVRA" },
      {
        name: "description",
        content:
          "VEVRA supports packaging challenges across automotive, engineering, industrial manufacturing, FMCG, electronics, agriculture and emerging industries.",
      },
      { property: "og:title", content: "VEVRA Clients and Industries" },
      { property: "og:description", content: "Trusted where packaging cannot fail." },
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
        title="Trusted where packaging cannot fail."
        body="VEVRA works with businesses that need packaging to protect products, support operations and keep supply chains moving."
      />
      <Section>
        <p className="max-w-3xl text-muted-foreground">Customer stories will be presented as Industry → Customer → Challenge → VEVRA Solution → Outcome, with real testimonials and implementation proof wherever publication approval is available.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
