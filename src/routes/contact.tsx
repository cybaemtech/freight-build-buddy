import { createFileRoute } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { COMPANY } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact VEVRA — Solve Your Packaging Challenge" },
      {
        name: "description",
        content:
          "Tell VEVRA what you manufacture, move or store. Start a meaningful packaging requirement or generate a complete RFQ.",
      },
      { property: "og:title", content: "Contact VEVRA Packaging" },
      { property: "og:description", content: "Let's solve your packaging challenge." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const REASONS = [
  "Service request",
  "General enquiries",
  "Sales enquiries",
  "Partnership opportunities",
];

function ContactPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Let's solve your packaging challenge."
        body="Tell us what you manufacture, move or store. Capture the requirement with the quick RFQ builder and help our team understand the opportunity from the beginning."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-lg border border-border border-t-4 border-t-brand p-7">
            <h2 className="text-lg font-bold text-brand-blue-dark">Reach us</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a className="hover:text-brand" href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a className="hover:text-brand" href={`mailto:${COMPANY.email}`}>
                  {COMPANY.email}
                </a>
              </li>
              <li>{COMPANY.timings}</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border border-t-4 border-t-brand-blue p-7">
            <h2 className="text-lg font-bold text-brand-blue-dark">Corporate office</h2>
            <p className="mt-3 text-sm text-muted-foreground">{COMPANY.address}</p>
          </div>
          <div className="rounded-lg border border-border border-t-4 border-t-brand-blue p-7">
            <h2 className="text-lg font-bold text-brand-blue-dark">Start with your requirement</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {REASONS.map((r) => (
                <li key={r}>· {r}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 rounded-lg bg-brand-blue-soft p-8">
          <h2 className="text-xl font-bold text-brand-blue-dark">Fastest route to a quotation</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Our RFQ builder sizes the right carton, sets the protection level, picks a transport
            mode and produces a professional RFQ PDF you can send straight to our team.
          </p>
          <div className="mt-5">
            <RfqButton />
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
