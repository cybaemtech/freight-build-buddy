import { Quote } from "lucide-react";

import ceoPortraitAsset from "@/assets/vevra-ceo-portrait.png.asset.json";

const CEO_QUOTES = [
  "We only win when you do.",
  "You'll work with people who have actually been in the trenches and care about getting it right.",
  "Juggling multiple vendors is a headache. We handle everything from start to finish so you can just breathe.",
  "The right box, in the right place. No excuses.",
  "Stop throwing money away on single-use materials. Pay only for what you need, and reuse the rest.",
  "Things change at the last minute. We get it. If you need to make a tweak right before the truck leaves, we’ve got your back.",
] as const;

export function CeoStatement() {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-28" aria-labelledby="ceo-statement-title">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border" />
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 md:grid-cols-[minmax(0,1.12fr)_minmax(300px,0.88fr)] md:items-start lg:gap-20">
        <div className="md:py-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-brand" />
            <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-brand">A message from our CEO</p>
          </div>
          <div className="mt-5 flex items-start gap-4 sm:gap-6">
            <Quote className="mt-1 h-8 w-8 shrink-0 fill-brand text-brand sm:h-10 sm:w-10" aria-hidden="true" />
            <h2 id="ceo-statement-title" className="max-w-2xl text-3xl font-extrabold leading-tight text-brand-blue-dark sm:text-4xl lg:text-[2.7rem]">
              Built around your operation, not ours.
            </h2>
          </div>

          <div className="mt-8 border-t border-border sm:mt-10">
            {CEO_QUOTES.map((statement, index) => (
              <blockquote
                key={statement}
                className="group grid grid-cols-[2.25rem_1fr] gap-3 border-b border-border py-5 sm:grid-cols-[3rem_1fr] sm:gap-4 sm:py-6"
              >
                <span className="pt-1 text-xs font-extrabold text-brand/65" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-lg font-semibold leading-relaxed text-brand-blue-dark transition-colors group-hover:text-brand sm:text-xl lg:text-[1.35rem]">
                  “{statement}”
                </p>
              </blockquote>
            ))}
          </div>
        </div>

        <figure className="order-first md:order-none md:sticky md:top-28">
          <div className="relative overflow-hidden rounded-lg bg-brand-blue-soft">
            <img
              src={ceoPortraitAsset.url}
              alt="CEO of VEVRA Packaging"
              className="aspect-[4/4.25] w-full object-cover object-top sm:aspect-[16/11] md:aspect-[4/5]"
              width={1104}
              height={1108}
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,color-mix(in_oklab,var(--brand-blue-dark)_85%,transparent),transparent)]" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.18em]">Chief Executive Officer</p>
                <p className="mt-1 text-xs text-white/75">VEVRA Packaging Pvt. Ltd.</p>
              </div>
              <span className="h-1 w-12 shrink-0 bg-brand" />
            </figcaption>
          </div>
          <div className="ml-auto h-1 w-2/3 bg-brand" />
        </figure>
      </div>
    </section>
  );
}