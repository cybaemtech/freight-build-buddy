import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Boxes,
  Car,
  Cpu,
  Factory,
  Leaf,
  Plus,
  Settings2,
  ShoppingBag,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";

import { ClientLogoGrid } from "@/components/site/ClientLogoWall";
import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients & Industries — Trusted Where Packaging Cannot Fail | VEVRA" },
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

const INDUSTRIES: { name: string; note: string; icon: LucideIcon }[] = [
  { name: "Automotive", note: "Component protection across OEM and tier-supplier lines.", icon: Car },
  { name: "Engineering", note: "Precision parts that travel with zero tolerance for damage.", icon: Settings2 },
  { name: "Industrial Manufacturing", note: "Heavy loads, bulk handling and repeat circulation.", icon: Factory },
  { name: "FMCG", note: "High-velocity, cost-sensitive packaging runs.", icon: Boxes },
  { name: "Electronics", note: "ESD-safe, moisture-controlled protective packs.", icon: Cpu },
  { name: "Consumer Products", note: "Retail-ready formats with clean finishing.", icon: ShoppingBag },
  { name: "Agriculture", note: "Rugged storage built for field and weather exposure.", icon: Leaf },
  { name: "E-commerce / Quick Commerce", note: "Right-sized cartons for fast fulfilment.", icon: ShoppingCart },
  { name: "Other Industries", note: "Tell us what you ship — we engineer around it.", icon: Plus },
];

const PROOF = [
  { value: "15+", label: "Years in packaging" },
  { value: "6,149+", label: "Customers supported" },
  { value: "11+", label: "Warehouses across India" },
  { value: "9", label: "Industries served" },
];

function ClientsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Clients"
        title="Trusted where packaging cannot fail."
        body="VEVRA works with businesses that need packaging to protect products, support operations and keep supply chains moving."
      />

      <div className="bg-brand-blue-dark">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px border-t border-white/10 px-6 lg:grid-cols-4">
          {PROOF.map((s) => (
            <div key={s.label} className="border-white/10 px-4 py-8 text-center lg:border-r lg:last:border-r-0">
              <div className="text-3xl font-extrabold text-white">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.16em] text-white/55">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <Section
        eyebrow="Industries"
        title="Built for how your industry ships."
        lead="Every sector has its own failure points — vibration, moisture, stacking load, last-mile handling. We design around yours."
      >
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map(({ name, note, icon: Icon }, i) => (
            <div
              key={name}
              className="client-reveal group flex items-start gap-4 bg-background px-6 py-7 transition-colors hover:bg-brand-blue-soft/70"
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-blue-soft text-brand-blue-dark transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-brand-blue-dark">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tint
        eyebrow="Our clients"
        title="Teams that cannot afford packaging failure."
        lead="From global OEMs to regional manufacturers, VEVRA supports packaging programmes across demanding industrial supply chains."
      >
        <ClientLogoGrid />
      </Section>

      <Section
        eyebrow="Customer success"
        title="How we solve it, in practice."
        lead="Every story follows one format: Industry → Customer → Challenge → VEVRA solution → Outcome. Named stories and figures are published only where customer approval is available."
      >
        <div className="grid overflow-hidden rounded-2xl border border-border lg:grid-cols-[1.1fr_1fr]">
          <div className="bg-background p-8 sm:p-10">
            <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              Automotive
            </span>
            <h3 className="mt-4 text-2xl font-extrabold text-brand-blue-dark">Export component line</h3>
            <p className="mt-4 text-sm text-brand-blue-dark/80">
              Damaged edges on machined housings during multi-leg export transit were driving return rates and rework up.
            </p>
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">VEVRA solution</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Redesigned inserts with reinforced corner locks and vibration-tested channeling, validated through transit
              trials before rollout.
            </p>
            <div className="mt-8">
              <Link
                to="/testimonials"
                className="arrow-move inline-flex items-center gap-2 text-sm font-semibold text-brand"
              >
                See how we document customer success <span className="arrow">→</span>
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-8 bg-brand-blue-dark p-8 sm:p-10">
            <div>
              <div className="text-4xl font-extrabold text-white">Lower</div>
              <div className="mt-1 text-sm text-white/60">Transit damage and rework</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-white">Faster</div>
              <div className="mt-1 text-sm text-white/60">Design to validated rollout</div>
            </div>
            <div className="h-1 w-16 bg-brand" />
            <p className="text-xs text-white/50">
              Measured figures are shared once the customer approves publication.
            </p>
          </div>
        </div>
      </Section>

      <section className="bg-brand-blue-soft py-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-brand-blue-dark sm:text-3xl">
              Tell us what packaging problem you are solving.
            </h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Share your product, process and destination — we will come back with an engineered packaging response.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <RfqButton />
            <Link
              to="/contact"
              className="arrow-move inline-flex items-center gap-2 rounded-xl border border-brand-blue/30 px-5 py-2.5 text-sm font-semibold text-brand-blue-dark transition-colors hover:border-brand hover:text-brand"
            >
              Talk to us <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
