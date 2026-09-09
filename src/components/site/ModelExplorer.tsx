import { useState } from "react";

type Model = {
  name: string;
  tag: string;
  desc: string;
  steps: string[];
};

const MODELS: Model[] = [
  {
    name: "Expendable",
    tag: "Least involvement — you own nothing after use",
    desc: "Suitable where single-use packaging is commercially or operationally appropriate.",
    steps: ["Use", "Ship", "Dispose"],
  },
  {
    name: "Rental",
    tag: "Access without ownership",
    desc: "Access packaging without owning the entire asset base — pay for use, hand it back.",
    steps: ["Access", "Use", "Return"],
  },
  {
    name: "Owned Returnable",
    tag: "You own it, we help you reuse it",
    desc: "Dedicated reusable packaging assets, owned and managed by the customer across cycles.",
    steps: ["Use", "Return", "Reuse"],
  },
  {
    name: "Pooling",
    tag: "Shared assets across a managed network",
    desc: "Packaging assets circulate through a managed ecosystem shared across multiple users.",
    steps: ["Shared asset", "Multiple users", "Managed return"],
  },
  {
    name: "End-to-End Managed",
    tag: "Full involvement — VEVRA runs the ecosystem",
    desc: "Give us the packaging problem. We understand, design, manufacture, supply and optimize the entire loop.",
    steps: [
      "Understand",
      "Design",
      "Manufacture",
      "Supply",
      "Store",
      "Track",
      "Pack",
      "Transport",
      "Return",
      "Reuse",
      "Optimize",
    ],
  },
];

export function ModelExplorer() {
  const [active, setActive] = useState(0);
  const [play, setPlay] = useState(0);
  const model = MODELS[active]!;

  return (
    <section className="mx-section">
      <div className="mx-inner">
        <p className="mx-kicker">
          <span className="mx-dot" aria-hidden="true" />
          All models
        </p>
        <h2 className="mx-heading">How each model works</h2>
        <p className="mx-subhead">
          Drag across the spectrum to see how ownership, and the process behind it, changes at each
          stage.
        </p>

        <div className="mx-dial" role="tablist" aria-label="Packaging business models">
          <span className="mx-dial-line" aria-hidden="true" />
          {MODELS.map((m, i) => (
            <button
              key={m.name}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-pressed={active === i}
              className={`mx-stop${active === i ? " is-active" : ""}`}
              onClick={() => {
                setActive(i);
                setPlay((p) => p + 1);
              }}
            >
              <span className="mx-stop-circle">{String(i + 1).padStart(2, "0")}</span>
              <span className="mx-stop-label">{m.name}</span>
            </button>
          ))}
        </div>

        <div className="mx-panel" aria-live="polite">
          <p className="mx-tag">{model.tag}</p>
          <h3 className="mx-title">{model.name}</h3>
          <p className="mx-desc">{model.desc}</p>

          <div className="mx-rail-scroll">
            <ol className="mx-rail" key={`${active}-${play}`}>
              {model.steps.map((step, i) => (
                <li className="mx-rail-item" key={step + String(i)}>
                  {i > 0 ? (
                    <span
                      className="mx-rail-line"
                      style={{ animationDelay: `${i * 60 - 30}ms` }}
                      aria-hidden="true"
                    />
                  ) : null}
                  <span className="mx-rail-node" style={{ animationDelay: `${i * 60}ms` }}>
                    <span className="mx-rail-num">{i + 1}</span>
                    <span className="mx-rail-label">{step}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ModelExplorer;
