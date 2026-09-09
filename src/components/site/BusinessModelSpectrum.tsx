import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { BUSINESS_MODELS } from "@/lib/site-content";

const ORDER = ["Expendable", "Rental", "Owned Returnable", "Pooling", "End-to-End Managed Packaging"] as const;

const SHORT: Record<string, string> = {
  "End-to-End Managed Packaging": "End-to-End Managed",
};

const MODELS = ORDER.map((title) => {
  const model = BUSINESS_MODELS.find((m) => m.title === title)!;
  return {
    ...model,
    label: SHORT[title] ?? title,
    chips: model.flow.split("→").map((s) => s.trim()).slice(0, 4),
  };
});

export function BusinessModelSpectrum() {
  const [active, setActive] = useState(MODELS.length - 1);
  const progress = (active / (MODELS.length - 1)) * 100;

  return (
    <div>
      {/* Ownership spectrum rail */}
      <div className="relative mt-2 hidden md:block">
        <div className="absolute left-0 right-0 top-[9px] h-px bg-border" />
        <div
          className="absolute left-0 top-[9px] h-px bg-brand-blue-dark transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div className="relative grid" style={{ gridTemplateColumns: `repeat(${MODELS.length}, minmax(0,1fr))` }}>
          {MODELS.map((m, i) => {
            const selected = i === active;
            const passed = i <= active;
            return (
              <button
                key={m.title}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={selected}
                className="group flex flex-col items-center gap-3 focus:outline-none"
              >
                <span
                  className={`h-[18px] w-[18px] rounded-full border-2 transition-all duration-300 ${
                    selected
                      ? "scale-125 border-brand bg-brand shadow-[0_0_0_6px_color-mix(in_oklab,var(--brand)_18%,transparent)]"
                      : passed
                        ? "border-brand-blue-dark bg-background"
                        : "border-border bg-background group-hover:border-brand"
                  }`}
                />
                <span
                  className={`text-sm font-bold transition-colors ${
                    selected ? "text-brand-blue-dark" : "text-muted-foreground group-hover:text-brand-blue-dark"
                  }`}
                >
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {MODELS.map((m, i) => {
          const selected = i === active;
          return (
            <button
              key={m.title}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={selected}
              className={`group flex h-full flex-col rounded-2xl border p-6 text-left transition-all duration-300 ${
                selected
                  ? "-translate-y-1 border-brand-blue-dark bg-brand-blue-dark text-white shadow-xl"
                  : "border-border bg-card hover:-translate-y-1 hover:border-brand/60 hover:shadow-lg"
              }`}
            >
              <h3 className={`text-lg font-bold ${selected ? "text-white" : "text-brand-blue-dark"}`}>{m.label}</h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {m.chips.map((chip, idx) => (
                  <span
                    key={chip}
                    style={{ transitionDelay: `${idx * 60}ms` }}
                    className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors duration-300 ${
                      selected ? "bg-white/12 text-white" : "bg-brand-blue-soft text-brand-blue-dark"
                    }`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <p className={`mt-4 text-sm leading-6 ${selected ? "text-white/75" : "text-muted-foreground"}`}>
                {m.body}
              </p>
              <span
                className={`mt-auto pt-5 text-[11px] font-bold uppercase tracking-[0.16em] transition-opacity ${
                  selected ? "text-brand opacity-100" : "text-brand opacity-0 group-hover:opacity-100"
                }`}
              >
                {selected ? "Selected" : "View model"}
              </span>
            </button>
          );
        })}
      </div>

      <Link
        to="/business-model"
        className="arrow-move group mt-8 inline-flex items-center gap-3 rounded-xl bg-brand px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg transition-transform hover:-translate-y-0.5"
      >
        Compare all models in detail
        <ArrowRight className="arrow h-4 w-4" />
      </Link>
    </div>
  );
}
