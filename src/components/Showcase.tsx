import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";

const showcase = [
  {
    project: "Aether Drive",
    client: "Mobility · Fleet",
    desc: "An autonomous perception stack powering 12,000+ delivery vehicles across 3 continents.",
    stat: "12K+",
    statLabel: "Vehicles live",
    gradient: "from-cyan/30 to-violet/20",
  },
  {
    project: "Helix Vision",
    client: "Healthcare · Imaging",
    desc: "Real-time medical image analysis detecting anomalies 40× faster than radiologist baseline.",
    stat: "40×",
    statLabel: "Faster detection",
    gradient: "from-violet/30 to-magenta/20",
  },
  {
    project: "Grid Mind",
    client: "Energy · Infrastructure",
    desc: "Predictive load forecasting for national grids, preventing outages before they happen.",
    stat: "99.4%",
    statLabel: "Forecast accuracy",
    gradient: "from-magenta/30 to-cyan/20",
  },
];

export function Showcase() {
  return (
    <section id="showcase" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-violet-bright uppercase">
            › Showcase
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Intelligence,{" "}
            <span className="text-gradient-cyan">in production</span>.
          </h2>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-6 lg:grid-cols-3" stagger={0.12}>
          {showcase.map((s) => (
            <RevealItem key={s.project}>
              <article className="glass-panel clip-tech group h-full overflow-hidden">
                <div
                  className={`relative h-44 overflow-hidden bg-gradient-to-br ${s.gradient}`}
                >
                  <div className="grid-holo absolute inset-0 opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin-slow size-24 rounded-full border-2 border-cyan/30" />
                    <div className="absolute size-12 rounded-full bg-cyan/20 blur-xl animate-pulse-glow" />
                  </div>
                  <span className="absolute bottom-3 left-4 font-mono text-[10px] tracking-widest text-mist uppercase">
                    {s.client}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-mist">
                    {s.project}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-soft">
                    {s.desc}
                  </p>
                  <div className="mt-5 flex items-baseline gap-2 border-t border-cyan/10 pt-4">
                    <span className="font-display text-3xl font-bold text-cyan glow-text-cyan">
                      {s.stat}
                    </span>
                    <span className="font-mono text-xs tracking-wide text-mist-faint uppercase">
                      {s.statLabel}
                    </span>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
