import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { PageHero, RfqButton, Section, SiteLayout } from "@/components/site/SiteLayout";
import { SERVICES } from "@/lib/site-content";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Service unavailable | Vevra Packaging" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { service } = loaderData;
    return {
      meta: [
        { title: `${service.name} | Vevra Packaging` },
        { name: "description", content: service.short },
        { property: "og:title", content: `${service.name} — Vevra Packaging` },
        { property: "og:description", content: service.short },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData();
  return (
    <SiteLayout>
      <PageHero eyebrow="Service" title={service.name} body={service.short} />
      <Section eyebrow="Overview" title="What this segment covers">
        <p className="max-w-3xl text-muted-foreground">{service.intro}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {service.points.map((pt: string) => (
            <li
              key={pt}
              className="rounded-md border border-border border-l-4 border-l-brand-blue px-4 py-3 text-sm"
            >
              {pt}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <RfqButton />
          <Link
            to="/services"
            className="inline-flex items-center rounded-md border-2 border-brand-blue px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
          >
            All services
          </Link>
        </div>
      </Section>
    </SiteLayout>
  );
}
