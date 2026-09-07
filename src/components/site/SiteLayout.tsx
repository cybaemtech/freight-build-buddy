import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

import vevraLogo from "@/assets/vevra-logo.png.asset.json";
import { COMPANY, PRODUCTS, SERVICES } from "@/lib/site-content";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/services", label: "Services" },
  { to: "/business-model", label: "Business Model" },
  { to: "/warehouses", label: "Warehouses" },
  { to: "/clients", label: "Clients" },
  { to: "/contact", label: "Contact" },
] as const;

export function RfqButton({
  variant = "primary",
  className = "",
  label = "Generate Quick RFQ",
}: {
  variant?: "primary" | "secondary";
  className?: string;
  label?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold tracking-wide uppercase transition-colors";
  const styles =
    variant === "primary"
      ? "bg-brand text-white hover:bg-brand-dark"
      : "border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white";
  return (
    <Link to="/calculator" className={`${base} ${styles} ${className}`}>
      {label}
    </Link>
  );
}

export function Section({
  eyebrow,
  title,
  children,
  tint = false,
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  tint?: boolean;
}) {
  return (
    <section className={tint ? "bg-brand-blue-soft py-16" : "py-16"}>
      <div className="mx-auto max-w-6xl px-5">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand">{eyebrow}</p>
        ) : null}
        {title ? (
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-brand-blue-dark sm:text-4xl">
            {title}
          </h2>
        ) : null}
        <div className={eyebrow || title ? "mt-8" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <header className="border-b-4 border-brand bg-brand-blue-dark py-14 text-white">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/70">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-white/80">{body}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <RfqButton />
          <Link
            to="/contact"
            className="inline-flex items-center rounded-md border-2 border-white/60 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white hover:text-brand-blue-dark"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </header>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="bg-brand-blue-dark text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-5 py-2 text-xs">
          <span>
            {COMPANY.phone} &nbsp;|&nbsp; {COMPANY.email}
          </span>
          <span className="text-white/70">{COMPANY.timings}</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b-2 border-brand bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={vevraLogo.url}
              alt="Vevra Packaging Pvt. Ltd. logo"
              className="h-11 w-auto"
              width={160}
              height={44}
            />
          </Link>
          <nav className="ml-auto hidden items-center gap-5 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "text-brand" }}
                className="text-sm font-semibold text-brand-blue-dark transition-colors hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto lg:ml-0">
            <RfqButton className="hidden sm:inline-flex" />
          </div>
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="rounded border-2 border-brand-blue px-3 py-2 text-brand-blue lg:hidden"
          >
            ☰
          </button>
        </div>
        {open ? (
          <nav className="border-t border-border bg-background lg:hidden">
            <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-2 text-sm font-semibold text-brand-blue-dark"
                >
                  {item.label}
                </Link>
              ))}
              <RfqButton className="mt-3 sm:hidden" />
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-auto border-t-4 border-brand-blue bg-brand text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:grid-cols-4">
        <div>
          <div className="rounded-md bg-white p-3">
            <img src={vevraLogo.url} alt="Vevra Packaging logo" className="h-10 w-auto" />
          </div>
           <p className="mt-4 text-sm text-white/85">End-to-End Packaging &amp; Supply-Chain Solutions</p>
          <p className="text-sm italic text-white/70">{COMPANY.tagline}</p>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Our products</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
           <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Solutions</h3>
          <ul className="mt-3 space-y-1.5 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
             <li><Link to="/business-model" className="hover:underline">Pooling &amp; Rental</Link></li>
             <li><Link to="/about" className="hover:underline">About VEVRA</Link></li>
            <li>
              <Link to="/testimonials" className="hover:underline">
                Testimonials
              </Link>
            </li>
            <li>
              <Link to="/corporate-office" className="hover:underline">
                Corporate Office
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Contact</h3>
          <ul className="mt-3 space-y-1.5 text-sm text-white/90">
            <li>{COMPANY.phone}</li>
            <li>{COMPANY.email}</li>
            <li>{COMPANY.timings}</li>
            <li className="pt-2 text-white/80">{COMPANY.address}</li>
          </ul>
          <RfqButton
            variant="secondary"
            className="mt-4 border-white text-white hover:bg-white hover:text-brand"
          />
        </div>
      </div>
      <div className="border-t border-white/25 py-4 text-center text-xs text-white/85">
        © 2026 Vevra Packaging Pvt. Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
