import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";

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

const ENQUIRY_TYPES = [
  "Product & Service Enquiry",
  "Returnable / Rental / Pooling Enquiry",
  "Packaging Engineering Support",
  "Partnership Opportunity",
  "Careers",
  "Media Enquiry",
  "General Enquiry",
];

const COUNTRIES = [
  "India",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "Singapore",
  "Germany",
  "United Kingdom",
  "United States",
  "Australia",
  "Japan",
  "Other",
];

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  city: z.string().trim().min(1, "City is required").max(80),
  country: z.string().trim().min(1, "Please select a country"),
  email: z.string().trim().email("Enter a valid email address").max(255),
  company: z.string().trim().min(1, "Company is required").max(120),
  phone: z
    .string()
    .trim()
    .max(24)
    .regex(/^[+\d][\d\s()-]*$/, "Enter a valid phone number")
    .or(z.literal("")),
  enquiryType: z.string().trim().min(1, "Please select an enquiry type"),
  message: z.string().trim().min(1, "Please tell us about your requirement").max(2000),
  contactByPhone: z.boolean(),
});

type ContactForm = z.infer<typeof contactSchema>;

const EMPTY: ContactForm = {
  firstName: "",
  lastName: "",
  city: "",
  country: "",
  email: "",
  company: "",
  phone: "",
  enquiryType: "",
  message: "",
  contactByPhone: false,
};

const inputCls =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-brand-blue-dark outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-brand focus:ring-2 focus:ring-brand/15";
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-brand-blue-dark/70";
const errCls = "mt-1 text-xs font-medium text-brand";

function ContactPage() {
  const [form, setForm] = useState<ContactForm>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof ContactForm>(key: K, value: ContactForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setSubmitted(true);
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Let's solve your packaging challenge."
        body="Tell us what you manufacture, move or store. Our team will connect you with the right specialist for your requirement — anywhere in India or across our global export network."
      />

      <Section
        eyebrow="Get in touch"
        title="Want to know more?"
        lead="Tell us more so we can connect you with the right person for your request. VEVRA respects your privacy and will only use your details to respond to your enquiry."
      >
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.6fr]">
          {/* Left rail — company information */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-border border-t-4 border-t-brand p-7">
              <h2 className="text-lg font-bold text-brand-blue-dark">Reach us</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-brand-blue-dark/60">
                    Phone
                  </span>
                  <a className="hover:text-brand" href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>
                    {COMPANY.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-brand-blue-dark/60">
                    Email
                  </span>
                  <a className="hover:text-brand" href={`mailto:${COMPANY.email}`}>
                    {COMPANY.email}
                  </a>
                </li>
                <li>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-brand-blue-dark/60">
                    Working hours
                  </span>
                  {COMPANY.timings} (IST)
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border border-t-4 border-t-brand-blue p-7">
              <h2 className="text-lg font-bold text-brand-blue-dark">Corporate office</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{COMPANY.address}</p>
            </div>

            <div className="rounded-2xl bg-brand-blue-dark p-7 text-white">
              <h2 className="text-lg font-bold">Fastest route to a quotation</h2>
              <p className="mt-2 text-sm text-white/70">
                Our RFQ builder sizes the right carton, sets protection, picks a transport mode and
                produces a professional RFQ PDF in minutes.
              </p>
              <RfqButton className="mt-5" />
            </div>
          </aside>

          {/* Form panel */}
          <div className="rounded-2xl border border-border bg-background p-7 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.35)] sm:p-10">
            {submitted ? (
              <div className="flex h-full min-h-96 flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 text-3xl text-brand">
                  ✓
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-brand-blue-dark">
                  Thank you, {form.firstName}.
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Your {form.enquiryType.toLowerCase()} has been noted. A VEVRA specialist will reach
                  out to you at <span className="font-semibold text-brand-blue-dark">{form.email}</span>
                  {form.contactByPhone && form.phone ? (
                    <>
                      {" "}
                      or on <span className="font-semibold text-brand-blue-dark">{form.phone}</span>
                    </>
                  ) : null}{" "}
                  within one working day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(EMPTY);
                    setSubmitted(false);
                  }}
                  className="mt-8 rounded-xl border border-brand-blue/30 px-5 py-2.5 text-sm font-semibold text-brand-blue-dark transition-colors hover:border-brand hover:text-brand"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <p className="mb-8 text-sm text-muted-foreground">
                  All fields marked with <span className="font-semibold text-brand">*</span> are
                  required.
                </p>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label htmlFor="firstName" className={labelCls}>
                      First name <span className="text-brand">*</span>
                    </label>
                    <input
                      id="firstName"
                      className={inputCls}
                      value={form.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      placeholder="First name"
                      autoComplete="given-name"
                    />
                    {errors.firstName ? <p className={errCls}>{errors.firstName}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelCls}>
                      Last name <span className="text-brand">*</span>
                    </label>
                    <input
                      id="lastName"
                      className={inputCls}
                      value={form.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      placeholder="Last name"
                      autoComplete="family-name"
                    />
                    {errors.lastName ? <p className={errCls}>{errors.lastName}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="city" className={labelCls}>
                      City <span className="text-brand">*</span>
                    </label>
                    <input
                      id="city"
                      className={inputCls}
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      placeholder="City"
                      autoComplete="address-level2"
                    />
                    {errors.city ? <p className={errCls}>{errors.city}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="country" className={labelCls}>
                      Country <span className="text-brand">*</span>
                    </label>
                    <select
                      id="country"
                      className={inputCls}
                      value={form.country}
                      onChange={(e) => set("country", e.target.value)}
                    >
                      <option value="">Select country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    {errors.country ? <p className={errCls}>{errors.country}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>
                      Email <span className="text-brand">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className={inputCls}
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                    {errors.email ? <p className={errCls}>{errors.email}</p> : null}
                  </div>
                  <div>
                    <label htmlFor="company" className={labelCls}>
                      Company <span className="text-brand">*</span>
                    </label>
                    <input
                      id="company"
                      className={inputCls}
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                      placeholder="Company name"
                      autoComplete="organization"
                    />
                    {errors.company ? <p className={errCls}>{errors.company}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="phone" className={labelCls}>
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className={inputCls}
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="+91 …"
                      autoComplete="tel"
                    />
                    {errors.phone ? <p className={errCls}>{errors.phone}</p> : null}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="enquiryType" className={labelCls}>
                      Enquiry type <span className="text-brand">*</span>
                    </label>
                    <select
                      id="enquiryType"
                      className={inputCls}
                      value={form.enquiryType}
                      onChange={(e) => set("enquiryType", e.target.value)}
                    >
                      <option value="">Select enquiry type</option>
                      {ENQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.enquiryType ? <p className={errCls}>{errors.enquiryType}</p> : null}
                  </div>
                </div>

                <div className="mt-5">
                  <label htmlFor="message" className={labelCls}>
                    Message <span className="text-brand">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`${inputCls} resize-y`}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    placeholder="Please provide as many details as you can — product, dimensions, volumes, lanes — so we can make our best recommendation."
                  />
                  {errors.message ? <p className={errCls}>{errors.message}</p> : null}
                </div>

                <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm text-brand-blue-dark/85">
                  <input
                    type="checkbox"
                    checked={form.contactByPhone}
                    onChange={(e) => set("contactByPhone", e.target.checked)}
                    className="h-4 w-4 rounded border-border accent-[var(--brand)]"
                  />
                  Please contact me by phone
                </label>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="arrow-move inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-brand-dark"
                  >
                    Submit enquiry <span className="arrow">→</span>
                  </button>
                  <p className="text-xs text-muted-foreground">
                    Your details are used only to respond to this enquiry.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </Section>
    </SiteLayout>
  );
}
