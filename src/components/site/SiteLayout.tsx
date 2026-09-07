import { Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

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
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  label?: string;
}) {
  const base =
    "arrow-move inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors";
  const styles =
    variant === "primary"
      ? "bg-brand text-white hover:bg-brand-dark"
      : variant === "ghost"
        ? "border border-white/40 text-white hover:bg-white hover:text-brand-blue-dark"
        : "border border-brand-blue/30 text-brand-blue-dark hover:border-brand hover:text-brand";
  return (
    <Link to="/calculator" className={`${base} ${styles} ${className}`}>
      {label}
      <span className="arrow">→</span>
    </Link>
  );
}

export function Section({
  eyebrow,
  title,
  lead,
  children,
  tint = false,
  dark = false,
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: ReactNode;
  tint?: boolean;
  dark?: boolean;
}) {
  const bg = dark ? "bg-brand-blue-dark text-white" : tint ? "bg-brand-blue-soft" : "bg-background";
  return (
    <section className={`${bg} py-20`}>
      <div className="mx-auto max-w-[1280px] px-6">
        {eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand">{eyebrow}</p>
        ) : null}
        {title ? (
          <h2
            className={`mt-3 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-[2.6rem] sm:leading-[1.1] ${
              dark ? "text-white" : "text-brand-blue-dark"
            }`}
          >
            {title}
          </h2>
        ) : null}
        {lead ? (
          <p className={`mt-4 max-w-3xl text-base ${dark ? "text-white/75" : "text-muted-foreground"}`}>{lead}</p>
        ) : null}
        <div className={eyebrow || title || lead ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <header className="bg-brand-blue-dark py-20 text-white">
      <div className="mx-auto max-w-[1280px] px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-soft/90">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-white/75">{body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <RfqButton />
          <Link
            to="/contact"
            className="arrow-move inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand-blue-dark"
          >
            Talk to us <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-background transition-shadow ${
        scrolled ? "shadow-[0_10px_30px_-22px_rgba(15,23,42,0.7)]" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-6 py-4">
        <Link to="/" className="flex items-center">
          <img
            src={vevraLogo.url}
            alt="Vevra Packaging Pvt. Ltd. logo"
            className="h-11 w-auto"
            width={160}
            height={44}
          />
        </Link>
        <nav className="ml-auto hidden items-center gap-6 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-brand" }}
              className="text-[13px] font-semibold text-brand-blue-dark/80 transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3 xl:ml-0">
          <RfqButton className="hidden sm:inline-flex" />
          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border border-brand-blue/25 px-3 py-2 text-brand-blue-dark xl:hidden"
          >
            ☰
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-border bg-background xl:hidden">
          <div className="mx-auto flex max-w-[1280px] flex-col px-6 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-semibold text-brand-blue-dark"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-auto bg-brand-blue-dark text-white">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-16 md:grid-cols-4">
        <div>
          <div className="inline-flex rounded-xl bg-white p-3">
            <img src={vevraLogo.url} alt="Vevra Packaging logo" className="h-10 w-auto" />
          </div>
          <p className="mt-5 text-sm font-semibold text-white">End-to-End Packaging &amp; Supply-Chain Solutions</p>
          <p className="mt-1 text-sm text-white/60">{COMPANY.tagline}</p>
        </div>
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-soft/80">Solutions</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {PRODUCTS.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-white">
                  {p.name}
                </Link>
              </li>
            ))}
            {SERVICES.slice(0, 3).map((s) => (
              <li key={s.slug}>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-soft/80">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/business-model" className="hover:text-white">Business Models</Link></li>
            <li><Link to="/clients" className="hover:text-white">Clients</Link></li>
            <li><Link to="/warehouses" className="hover:text-white">Warehouses</Link></li>
            <li><Link to="/testimonials" className="hover:text-white">Customer Success</Link></li>
            <li><Link to="/corporate-office" className="hover:text-white">Corporate Office</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-soft/80">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>{COMPANY.phone}</li>
            <li>{COMPANY.email}</li>
            <li>{COMPANY.timings}</li>
            <li className="pt-2 text-white/60">{COMPANY.address}</li>
          </ul>
          <RfqButton className="mt-5" />
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">
        © 2026 {COMPANY.name} All Rights Reserved.
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
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur sm:hidden">
        <RfqButton className="w-full" />
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}
