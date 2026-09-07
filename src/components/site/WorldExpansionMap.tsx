import { ArrowUpRight, Globe2, MapPin } from "lucide-react";

import { COMPANY, WAREHOUSES } from "@/lib/site-content";

const EXPORT_ROUTES = [
  { d: "M 691 276 Q 622 152 520 145", x: 520, y: 145, label: "Europe", delay: "0s" },
  { d: "M 691 276 Q 650 232 615 230", x: 615, y: 230, label: "Middle East", delay: "0.45s" },
  { d: "M 691 276 Q 590 298 548 315", x: 548, y: 315, label: "Africa", delay: "0.9s" },
  { d: "M 691 276 Q 790 270 858 210", x: 858, y: 210, label: "East Asia", delay: "1.35s" },
  { d: "M 691 276 Q 792 334 852 406", x: 852, y: 406, label: "Oceania", delay: "1.8s" },
  { d: "M 691 276 Q 410 55 232 180", x: 232, y: 180, label: "Americas", delay: "2.25s" },
] as const;

export function WorldExpansionMap() {
  return (
    <section className="global-expansion" aria-labelledby="global-expansion-title">
      <div className="global-grid" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px] px-6 py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="about-reveal">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-soft">
              <Globe2 className="size-4" aria-hidden="true" />
              India built. Globally bound.
            </div>
            <h2 id="global-expansion-title" className="mt-7 max-w-xl text-4xl font-extrabold leading-[1.08] text-primary-foreground sm:text-5xl lg:text-6xl">
              A Pan-India network, expanding to the world.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/70">
              Our manufacturing and warehouse network supports customers across India. Now, VEVRA is entering its next phase—taking engineered packaging expertise to export markets worldwide.
            </p>

            <div className="mt-10 grid max-w-lg grid-cols-2 gap-px overflow-hidden rounded-lg border border-primary-foreground/15 bg-primary-foreground/15">
              <div className="bg-brand-blue-dark/90 p-5">
                <strong className="block text-3xl font-extrabold text-primary-foreground">11+</strong>
                <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-primary-foreground/55">India locations*</span>
              </div>
              <div className="bg-brand-blue-dark/90 p-5">
                <strong className="flex items-center gap-2 text-2xl font-extrabold text-primary-foreground">
                  Global <ArrowUpRight className="size-5 text-brand" aria-hidden="true" />
                </strong>
                <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-primary-foreground/55">Export expansion</span>
              </div>
            </div>
          </div>

          <div className="about-reveal about-reveal-delay">
            <div className="world-map-shell">
              <div className="flex items-center justify-between border-b border-primary-foreground/10 px-5 py-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/75">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-70" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand" />
                  </span>
                  Global expansion network
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/40">Live trajectory</span>
              </div>

              <div className="relative aspect-[2/1] overflow-hidden">
                <svg className="world-map-svg" viewBox="0 0 1000 500" role="img" aria-label="Animated world map showing export routes expanding from India">
                  <g className="world-land">
                    <path d="M84 126l41-45 91-25 76 19 48 57-32 36-49-8-37 40-69-15-42-32z" />
                    <path d="M270 242l45 17 36 61-4 75-31 58-25-44 8-57-27-45z" />
                    <path d="M445 116l44-39 78 1 36 34 59 8 42 34-13 42-50 15-20 37-49-15-39-40-61-7-31-35z" />
                    <path d="M520 229l58-7 48 38 12 60-34 97-46-28-12-62-34-47z" />
                    <path d="M646 145l86-35 92 11 88 62-28 57-67 10-39 55-55-5-28-48-65-26z" />
                    <path d="M814 358l55-24 67 38-20 57-70 14-40-39z" />
                    <path d="M391 73l29-26 36 8-10 34-43 9z" />
                  </g>

                  <g className="world-route-group">
                    {EXPORT_ROUTES.map((route) => (
                      <g key={route.label} style={{ "--route-delay": route.delay } as React.CSSProperties}>
                        <path className="world-route-glow" d={route.d} pathLength="1" />
                        <path className="world-route" d={route.d} pathLength="1" />
                        <circle className="world-destination-pulse" cx={route.x} cy={route.y} r="9" />
                        <circle className="world-destination" cx={route.x} cy={route.y} r="4" />
                      </g>
                    ))}
                  </g>

                  <g className="world-hub">
                    <circle className="world-hub-wave world-hub-wave-one" cx="691" cy="276" r="20" />
                    <circle className="world-hub-wave world-hub-wave-two" cx="691" cy="276" r="20" />
                    <circle cx="691" cy="276" r="7" />
                  </g>
                  <text className="world-hub-label" x="708" y="280">INDIA HUB</text>
                </svg>
                <div className="absolute bottom-4 left-4 rounded-md border border-primary-foreground/10 bg-brand-blue-dark/75 px-3 py-2 backdrop-blur-md">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary-foreground/45">Expansion mode</p>
                  <p className="mt-1 text-xs font-semibold text-primary-foreground">Engineering packaging beyond borders</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-primary-foreground/10 pt-10">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-soft/70">Operational footprint</p>
              <h3 className="mt-2 text-2xl font-bold text-primary-foreground">Manufacturing units &amp; warehouses across India</h3>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-primary-foreground/50">Corporate office: {COMPANY.address}</p>
          </div>
          <ul className="mt-7 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {WAREHOUSES.map((warehouse, index) => (
              <li key={warehouse} className="global-location">
                <MapPin className="size-4 shrink-0 text-brand" strokeWidth={1.8} aria-hidden="true" />
                <span>{warehouse}</span>
                <span className="ml-auto text-[9px] font-bold text-primary-foreground/25">{String(index + 1).padStart(2, "0")}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}