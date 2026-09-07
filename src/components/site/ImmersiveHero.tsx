import { ClientOnly, Link } from "@tanstack/react-router";
import { ArrowRight, Box, ChevronLeft, ChevronRight, Layers3, PackageCheck, Truck } from "lucide-react";
import { lazy, Suspense, useState } from "react";

import heroImage from "@/assets/hero-packaging.jpg";
import { Button } from "@/components/ui/button";
import { RfqButton } from "@/components/site/SiteLayout";
import { STATS } from "@/lib/site-content";

const VevraHeroScene = lazy(() => import("./VevraHeroScene"));

const SHOWCASE = [
  {
    short: "Corrugated",
    name: "Corrugated Packaging",
    type: "Product · Transit protection",
    description: "Engineered board systems for stacking, export and high-performance transit.",
    to: "/products/$slug" as const,
    params: { slug: "corrugated" },
    icon: Box,
  },
  {
    short: "Plastic / PP",
    name: "Reusable Plastic Systems",
    type: "Product · Circular movement",
    description: "Foldable crates, containers and fitments built for repeat circulation.",
    to: "/products/$slug" as const,
    params: { slug: "plastic-pp" },
    icon: Layers3,
  },
  {
    short: "Metal",
    name: "Metal Returnables",
    type: "Product · Industrial durability",
    description: "Racks, trolleys and containers engineered for demanding operations.",
    to: "/products/$slug" as const,
    params: { slug: "metal" },
    icon: PackageCheck,
  },
  {
    short: "Wood / Export",
    name: "Wood & Plywood Packaging",
    type: "Product · Heavy-duty export",
    description: "Pallets, cases and export-ready packaging for complex consignments.",
    to: "/products/$slug" as const,
    params: { slug: "wood-plywood" },
    icon: Truck,
  },
] as const;

function HeroFallback() {
  return (
    <img
      src={heroImage}
      alt="Engineered returnable packaging systems in a VEVRA manufacturing environment"
      className="h-full w-full object-cover opacity-55"
      width={1280}
      height={1024}
    />
  );
}

export function ImmersiveHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = SHOWCASE[activeIndex];

  if (!active) return null;

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + SHOWCASE.length) % SHOWCASE.length);
  };

  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-brand-blue-dark text-white lg:min-h-[720px]">
      <div className="absolute inset-0 lg:left-[39%]">
        <ClientOnly fallback={<HeroFallback />}>
          <Suspense fallback={<HeroFallback />}>
            <VevraHeroScene activeIndex={activeIndex} />
          </Suspense>
        </ClientOnly>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--brand-blue-dark)_0%,color-mix(in_oklab,var(--brand-blue-dark)_88%,transparent)_22%,transparent_58%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(0deg,var(--brand-blue-dark),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-[1280px] flex-col px-6 pb-7 pt-12 lg:min-h-[720px] lg:pb-8 lg:pt-16">
        <div className="pointer-events-none max-w-[660px]">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-soft">
            <span className="h-px w-9 bg-brand" />
            Sustainable · Reliable · Cost optimized
          </div>
          <h1 className="mt-5 text-[clamp(2.65rem,5.2vw,5rem)] font-extrabold leading-[0.96]">
            Packaging systems.
            <span className="block text-brand">Engineered to move.</span>
          </h1>
          <p className="mt-6 max-w-[570px] text-sm leading-7 text-white/72 sm:text-base">
            VEVRA designs, manufactures and manages the packaging ecosystem around your product—from first concept to return, reuse and optimization.
          </p>
          <div className="pointer-events-auto mt-7 flex flex-wrap gap-3">
            <RfqButton />
            <Link
              to="/services"
              className="arrow-move inline-flex items-center gap-2 rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold transition-colors hover:border-white hover:bg-white hover:text-brand-blue-dark"
            >
              Explore solutions <ArrowRight className="arrow h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-auto pt-32 lg:pt-16">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-end">
            <div className="pointer-events-auto">
              <div className="mb-3 flex items-center justify-between lg:max-w-[720px]">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/50">Explore the ecosystem</p>
                <div className="flex gap-1.5">
                  <Button variant="ghost" size="icon" onClick={() => move(-1)} aria-label="Previous packaging system" className="h-9 w-9 border border-white/20 text-white hover:bg-white/10 hover:text-white">
                    <ChevronLeft />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => move(1)} aria-label="Next packaging system" className="h-9 w-9 border border-white/20 text-white hover:bg-white/10 hover:text-white">
                    <ChevronRight />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 sm:grid-cols-4 lg:max-w-[720px]">
                {SHOWCASE.map((item, index) => {
                  const Icon = item.icon;
                  const selected = index === activeIndex;
                  return (
                    <Button
                      key={item.short}
                      type="button"
                      variant="ghost"
                      aria-pressed={selected}
                      onClick={() => setActiveIndex(index)}
                      className={`h-[76px] justify-start rounded-none px-4 text-left text-xs transition-colors ${
                        selected ? "bg-background text-brand-blue-dark hover:bg-background" : "bg-brand-blue-dark/75 text-white/65 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span className="flex min-w-0 flex-col items-start gap-2">
                        <Icon className={`h-4 w-4 ${selected ? "text-brand" : "text-white/55"}`} />
                        <span className="truncate">{item.short}</span>
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>

            <div className="border-l-2 border-brand bg-brand-blue-dark/80 pl-5 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-soft">{active.type}</p>
              <div className="mt-2 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{active.name}</h2>
                  <p className="mt-1 max-w-sm text-xs leading-5 text-white/60">{active.description}</p>
                </div>
                <Link
                  to={active.to}
                  params={active.params}
                  aria-label={`Explore ${active.name}`}
                  className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-brand hover:bg-brand"
                >
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-3 gap-5 border-t border-white/15 pt-5 sm:grid-cols-5">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xl font-extrabold sm:text-2xl">{stat.value}</dt>
                <dd className="mt-1 text-[9px] uppercase tracking-[0.12em] text-white/45">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}