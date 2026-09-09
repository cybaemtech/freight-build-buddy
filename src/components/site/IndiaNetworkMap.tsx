import { useState } from "react";
import { Building2, MapPin, Truck, Warehouse } from "lucide-react";

type Node = {
  id: string;
  name: string;
  region: string;
  type: "Hub" | "Manufacturing" | "Warehouse";
  x: number;
  y: number;
};

const HUB = { x: 143, y: 426 };

export const NETWORK_NODES: Node[] = [
  { id: "pune", name: "Pune (Kuruli)", region: "Maharashtra", type: "Hub", x: 143, y: 426 },
  { id: "chakan", name: "Chakan Industrial Area", region: "Maharashtra", type: "Manufacturing", x: 122, y: 448 },
  { id: "ranjangaon", name: "Ranjangaon", region: "Maharashtra", type: "Manufacturing", x: 172, y: 440 },
  { id: "bhosari", name: "Bhosari MIDC", region: "Maharashtra", type: "Manufacturing", x: 152, y: 462 },
  { id: "nashik", name: "Nashik", region: "Maharashtra", type: "Warehouse", x: 132, y: 388 },
  { id: "aurangabad", name: "Aurangabad", region: "Maharashtra", type: "Warehouse", x: 176, y: 392 },
  { id: "ahmedabad", name: "Ahmedabad", region: "Gujarat", type: "Warehouse", x: 101, y: 328 },
  { id: "indore", name: "Indore", region: "Madhya Pradesh", type: "Warehouse", x: 179, y: 334 },
  { id: "gurugram", name: "Gurugram", region: "NCR", type: "Warehouse", x: 200, y: 209 },
  { id: "bengaluru", name: "Bengaluru", region: "Karnataka", type: "Warehouse", x: 211, y: 548 },
  { id: "chennai", name: "Chennai", region: "Tamil Nadu", type: "Warehouse", x: 259, y: 545 },
];

const INDIA_PATH =
  "M191 55 L227 77 L255 164 L327 241 L400 251 L427 280 L473 230 L564 219 L527 306 L482 361 L418 350 L400 361 L373 394 L327 449 L260 544 L251 612 L209 653 L180 579 L136 482 L123 416 L120 361 L53 310 L73 273 L91 223 L145 120 Z";

const TYPE_ICON = { Hub: Building2, Manufacturing: Truck, Warehouse: Warehouse } as const;

function curve(node: Node) {
  const mx = (HUB.x + node.x) / 2 + (node.y - HUB.y) * 0.16;
  const my = (HUB.y + node.y) / 2 - (node.x - HUB.x) * 0.16;
  return `M ${HUB.x} ${HUB.y} Q ${mx} ${my} ${node.x} ${node.y}`;
}

export function IndiaNetworkMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="india-network">
      <div className="india-net-grid" aria-hidden="true" />
      <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="india-map-shell">
          <div className="flex items-center justify-between border-b border-primary-foreground/10 px-5 py-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/75">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-brand" />
              </span>
              Pan-India network
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/40">
              11 locations live
            </span>
          </div>

          <div className="relative aspect-[5/6] overflow-hidden sm:aspect-[4/5]">
            <svg
              viewBox="0 0 600 700"
              className="india-map-svg"
              role="img"
              aria-label="Map of India showing VEVRA manufacturing units and warehouses connected to the Pune hub"
            >
              <path className="india-land-glow" d={INDIA_PATH} />
              <path className="india-land" d={INDIA_PATH} />

              <g>
                {NETWORK_NODES.filter((n) => n.type !== "Hub").map((node, i) => (
                  <g
                    key={node.id}
                    className={`india-link-group${active === node.id ? " is-active" : ""}`}
                    style={{ "--link-delay": `${i * 0.28}s` } as React.CSSProperties}
                  >
                    <path className="india-link" d={curve(node)} pathLength="1" />
                    <path className="india-link-pulse" d={curve(node)} pathLength="1" />
                  </g>
                ))}
              </g>

              <g>
                {NETWORK_NODES.map((node, i) => (
                  <g
                    key={node.id}
                    className={`india-node${active === node.id ? " is-active" : ""}`}
                    style={{ "--node-delay": `${i * 0.16}s` } as React.CSSProperties}
                    onMouseEnter={() => setActive(node.id)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <circle className="india-node-hit" cx={node.x} cy={node.y} r="22" />
                    <circle className="india-node-ring" cx={node.x} cy={node.y} r="10" />
                    <circle
                      className={node.type === "Hub" ? "india-node-dot india-node-hub" : "india-node-dot"}
                      cx={node.x}
                      cy={node.y}
                      r={node.type === "Hub" ? 7 : 4.5}
                    />
                    <text className="india-node-label" x={node.x + 13} y={node.y + 4}>
                      {node.name}
                    </text>
                  </g>
                ))}
              </g>
            </svg>

            <div className="india-legend">
              <span><i className="india-dot-hub" /> Corporate hub</span>
              <span><i className="india-dot-mfg" /> Manufacturing</span>
              <span><i className="india-dot-wh" /> Warehouse</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-soft/80">Network coverage</p>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-primary-foreground sm:text-4xl">
            One connected packaging network across India.
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-primary-foreground/70">
            Manufacturing units, warehouses and returnable-asset pools operate as one network from the Pune hub — so the
            right packaging reaches the right plant, on time.
          </p>

          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {NETWORK_NODES.map((node, index) => {
              const Icon = TYPE_ICON[node.type];
              return (
                <li
                  key={node.id}
                  className={`india-loc${active === node.id ? " is-active" : ""}`}
                  onMouseEnter={() => setActive(node.id)}
                  onMouseLeave={() => setActive(null)}
                >
                  <Icon className="size-4 shrink-0 text-brand" strokeWidth={1.8} aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-semibold text-primary-foreground">{node.name}</span>
                    <span className="block text-[10px] uppercase tracking-[0.16em] text-primary-foreground/45">
                      {node.region} · {node.type}
                    </span>
                  </span>
                  <span className="ml-auto text-[9px] font-bold text-primary-foreground/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              );
            })}
          </ul>

          <p className="mt-6 flex items-center gap-2 text-xs text-primary-foreground/45">
            <MapPin className="size-3.5 text-brand" aria-hidden="true" />
            Hover any location to trace its supply link to the Pune hub.
          </p>
        </div>
      </div>
    </div>
  );
}
