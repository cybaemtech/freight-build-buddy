import { createFileRoute } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { COMPANY } from "@/lib/site-content";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Vevra Packaging — Enquiries & Service Requests" },
      {
        name: "description",
        content:
          "Service requests, general enquiries, sales enquiries and partnership opportunities. Call +91 8484853484 or email info@vevrapackaging.com.",
      },
      { property: "og:title", content: "Contact Vevra Packaging" },
      { property: "og:description", content: "Reach our Pune corporate office, Mon–Sat 10:00am–7:00pm." },
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
        title="Let's talk packaging"
        body="Tell us what you ship and how it moves — or send a complete RFQ in minutes using our quick RFQ builder."
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
            <h2 className="text-lg font-bold text-brand-blue-dark">We can help with</h2>
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
