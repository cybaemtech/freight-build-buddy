import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { BUSINESS_MODELS, COMPANY } from "@/lib/site-content";

export const Route = createFileRoute("/business-model")({
  head: () => ({
    meta: [
      { title: "Business Model — Better Business Value | VEVRA Packaging" },
      {
        name: "description",
        content:
          "Compare expendable, owned returnable, pooling, rental and end-to-end managed packaging models from VEVRA.",
      },
      { property: "og:title", content: "VEVRA Packaging Business Model" },
      {
        property: "og:description",
        content: "Different packaging models. One objective: better business value.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BusinessModelPage,
});

const COLUMNS = ["Expendable", "Returnable", "Rental", "Pooling"] as const;

const MATRIX: { row: string; values: string[] }[] = [
  { row: "Asset ownership", values: ["Customer", "Customer", "VEVRA", "VEVRA"] },
  { row: "Reuse", values: ["—", "Yes", "Yes", "Yes"] },
  { row: "Upfront investment", values: ["Low per unit", "High", "Low", "Low"] },
  { row: "Day-to-day management", values: ["Customer", "Customer", "VEVRA", "VEVRA"] },
  { row: "Best suited for", values: ["One-way despatch", "Fixed loops", "Variable demand", "Shared networks"] },
];

const GOALS = [
  { goal: "I want to reduce packaging ownership.", model: "Rental / Pooling", why: "Access packaging capacity without building an owned asset base, while VEVRA manages circulation and availability." },
  { goal: "I want maximum control over my packaging assets.", model: "Owned Returnable", why: "Dedicated reusable packaging designed for your loop, owned and controlled by your team." },
  { goal: "I want the lowest complexity for one-way shipments.", model: "Expendable", why: "Single-use packaging engineered for protection and cost where returns are not practical." },
  { goal: "I want one partner accountable for everything.", model: "End-to-End Managed Packaging", why: "VEVRA designs, manufactures, supplies, stores, tracks, returns and optimizes the full ecosystem." },
];

function BusinessModelPage() {
  const [selected, setSelected] = useState(0);
  const choice = GOALS[selected]!;

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Business model"
        title="Choose the right packaging model."
        body="Pick the model that fits your commercial and operational requirement — or give VEVRA the packaging problem and let us manage the ecosystem."
      />

      <Section eyebrow="Compare" title="Four ways to run your packaging.">
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-brand-blue-dark text-white">
              <tr>
                <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70">Criteria</th>
                {COLUMNS.map((c) => (
                  <th key={c} className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.16em]">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((r, i) => (
                <tr key={r.row} className={i % 2 ? "bg-brand-blue-soft/60" : "bg-card"}>
                  <th className="px-5 py-4 font-semibold text-brand-blue-dark">{r.row}</th>
                  {r.values.map((v, j) => (
                    <td key={`${r.row}-${COLUMNS[j]}`} className="px-5 py-4 text-muted-foreground">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section eyebrow="Decision support" title="What are you trying to achieve?" tint>
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-3">
            {GOALS.map((g, i) => (
              <button
                key={g.goal}
                type="button"
                onClick={() => setSelected(i)}
                className={`w-full rounded-2xl border p-5 text-left text-sm font-semibold transition-colors ${
                  selected === i
                    ? "border-brand bg-card text-brand-blue-dark"
                    : "border-border bg-card/60 text-brand-blue-dark/70 hover:border-brand/50"
                }`}
              >
                {g.goal}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand">Recommended model</p>
            <h3 className="mt-3 text-2xl font-extrabold text-brand-blue-dark">{choice.model}</h3>
            <p className="mt-4 text-sm text-muted-foreground">{choice.why}</p>
            <RfqButton className="mt-7" label="Discuss this model" />
          </div>
        </div>
      </Section>

      <ModelExplorer />

      <Section>
        <p className="text-xl font-extrabold text-brand-blue-dark">{COMPANY.promise}</p>
        <div className="mt-8">
          <RfqButton variant="secondary" />
        </div>
      </Section>
    </SiteLayout>
  );
}
