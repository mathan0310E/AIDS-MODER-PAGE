import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";

const platform = [
  {
    id: "01",
    title: "Neural Engine",
    desc: "A distributed inference runtime that runs trillion-parameter models across GPU clusters with sub-50ms latency.",
    accent: "cyan",
    metrics: ["240M+ inferences/day", "42ms median", "Auto-scaling"],
  },
  {
    id: "02",
    title: "Edge Runtime",
    desc: "Deploy compressed models to edge devices, drones, and robots with on-device intelligence and zero round-trips.",
    accent: "violet",
    metrics: ["On-device inference", "Offline-first", "8× compression"],
  },
  {
    id: "03",
    title: "Data Mesh",
    desc: "A planetary-scale data fabric that ingests, labels, and streams training data with end-to-end lineage.",
    accent: "magenta",
    metrics: ["Real-time streams", "Auto-labeling", "Full lineage"],
  },
  {
    id: "04",
    title: "Trust Layer",
    desc: "Built-in safety, alignment, and auditability — every inference is explainable, signed, and reproducible.",
    accent: "lime",
    metrics: ["Explainable AI", "Signed outputs", "SOC 2 Type II"],
  },
];

const accentMap: Record<string, string> = {
  cyan: "text-cyan border-cyan/30",
  violet: "text-violet-bright border-violet/30",
  magenta: "text-magenta-bright border-magenta/30",
  lime: "text-lime border-lime/30",
};

export function Platform() {
  return (
    <section id="platform" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-cyan uppercase">
            › The Platform
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            One neural stack, from{" "}
            <span className="text-gradient-cyan">edge to orbit</span>.
          </h2>
          <p className="mt-4 max-w-xl text-lg text-mist-soft">
            Four layers that compose into any intelligent system — train, deploy,
            observe, and trust your AI at any scale.
          </p>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-6 md:grid-cols-2" stagger={0.12}>
          {platform.map((p) => (
            <RevealItem key={p.id}>
              <article className="glass-panel clip-tech group h-full p-7">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-sm text-mist-faint">
                    {p.id}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] tracking-widest uppercase ${accentMap[p.accent]}`}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    Active
                  </span>
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold text-mist">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-soft">
                  {p.desc}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.metrics.map((m) => (
                    <li
                      key={m}
                      className="rounded-md border border-cyan/15 bg-void-3/60 px-3 py-1 font-mono text-[11px] text-mist-soft"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
