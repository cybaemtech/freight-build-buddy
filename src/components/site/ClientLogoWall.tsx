import cummins from "@/assets/clients/cummins.png.asset.json";
import danfoss from "@/assets/clients/danfoss.png.asset.json";
import eicher from "@/assets/clients/eicher.png.asset.json";
import ford from "@/assets/clients/ford.png.asset.json";
import johnDeere from "@/assets/clients/john-deere.png.asset.json";
import mahindraElectric from "@/assets/clients/mahindra-electric.png.asset.json";
import mahindra from "@/assets/clients/mahindra.png.asset.json";
import tataMotors from "@/assets/clients/tata-motors.png.asset.json";
import volvo from "@/assets/clients/volvo.png.asset.json";

export const CLIENT_LOGOS = [
  { name: "Danfoss", url: danfoss.url },
  { name: "Eicher", url: eicher.url },
  { name: "Volvo", url: volvo.url },
  { name: "Ford", url: ford.url },
  { name: "Tata Motors", url: tataMotors.url },
  { name: "Mahindra", url: mahindra.url },
  { name: "John Deere", url: johnDeere.url },
  { name: "Cummins", url: cummins.url },
  { name: "Mahindra Electric SUVs", url: mahindraElectric.url },
];

function LogoTile({ name, url }: { name: string; url: string }) {
  return (
    <div className="client-logo-tile group relative flex items-center justify-center border-b border-r border-border bg-background p-6">
      <img
        src={url}
        alt={`${name} logo`}
        loading="lazy"
        width={193}
        height={183}
        className="h-20 w-auto max-w-full rounded-md object-contain opacity-60 grayscale transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
      />
      <span className="pointer-events-none absolute bottom-2 left-0 right-0 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-blue-dark/0 transition-colors duration-300 group-hover:text-brand-blue-dark/60">
        {name}
      </span>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
    </div>
  );
}

export function ClientLogoGrid() {
  return (
    <div className="grid grid-cols-2 overflow-hidden rounded-2xl border-l border-t border-border sm:grid-cols-3 lg:grid-cols-5">
      {CLIENT_LOGOS.map((logo) => (
        <LogoTile key={logo.name} {...logo} />
      ))}
      <div className="hidden border-b border-r border-border bg-brand-blue-soft p-6 lg:block" />
    </div>
  );
}

export function ClientLogoMarquee() {
  const row = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <div className="client-marquee relative overflow-hidden py-4">
      <div className="client-marquee-track flex w-max items-center gap-14">
        {row.map((logo, i) => (
          <img
            key={`${logo.name}-${i}`}
            src={logo.url}
            alt={`${logo.name} logo`}
            loading="lazy"
            width={193}
            height={183}
            className="h-14 w-auto rounded-md opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
          />
        ))}
      </div>
    </div>
  );
}
