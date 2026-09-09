import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState, type KeyboardEvent } from "react";

import { SERVICES } from "@/lib/site-content";
import { SERVICE_IMAGES } from "@/lib/site-images";

export function ServiceMirrorWall() {
  const [flipped, setFlipped] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setFlipped((current) => (current === index ? null : index));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard(index);
    }
  };

  return (
    <div className="service-mirror-wall">
      {SERVICES.map((service, index) => (
        <article
          key={service.slug}
          className="service-flip-card"
          data-axis={index % 2 === 0 ? "horizontal" : "vertical"}
          data-flipped={flipped === index ? "true" : "false"}
          tabIndex={0}
          role="button"
          aria-pressed={flipped === index}
          aria-label={service.name}
          onPointerDown={() => toggleCard(index)}
          onKeyDown={(event) => handleKeyDown(event, index)}
        >
          <div className="service-flip-card-inner">
            <div className="service-flip-face service-flip-front">
              <img
                src={SERVICE_IMAGES[service.slug]}
                alt={service.name}
                className="service-flip-image"
                loading="lazy"
                width={1536}
                height={1024}
              />
              <div className="service-flip-shade" />
              <div className="service-flip-reflection" />
              <span className="service-flip-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="service-flip-front-copy">
                <h3>{service.name}</h3>
                <p>{service.short}</p>
                <span className="service-flip-rule" />
              </div>
            </div>

            <div className="service-flip-face service-flip-back">
              <span className="service-flip-back-number">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{service.name}</h3>
                <p className="service-flip-description">{service.short}</p>
                <p className="service-flip-capabilities">{service.points.slice(0, 4).join(" • ")}</p>
              </div>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="service-flip-link"
                onPointerDown={(event) => event.stopPropagation()}
              >
                Explore service <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}