import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";

const solutions = [
  {
    icon: "◈",
    title: "Autonomous Systems",
    desc: "Self-driving fleets, delivery drones, and industrial robots powered by real-time perception and decisioning.",
    tag: "Robotics",
  },
  {
    icon: "◉",
    title: "Computer Vision",
    desc: "Industrial inspection, medical imaging, and spatial analytics with sub-pixel accuracy at production scale.",
    tag: "Vision",
  },
  {
    icon: "◇",
    title: "Predictive AI",
    desc: "Forecast demand, detect anomalies, and optimize operations before they break — across supply chains and grids.",
    tag: "Forecasting",
  },
  {
    icon: "▣",
    title: "Conversational AI",
    desc: "Voice and text agents that reason over your knowledge base, take actions, and hand off gracefully to humans.",
    tag: "Agents",
  },
  {
    icon: "◬",
    title: "Generative Design",
    desc: "Co-engineer products, molecules, and materials with models that explore million-design spaces overnight.",
    tag: "Synthesis",
  },
  {
    icon: "◎",
    title: "Security AI",
    desc: "Threat detection, behavioral analysis, and autonomous response that protects infrastructure in real time.",
    tag: "Defense",
  },
];

export function Solutions() {
  return (
    <section id="solutions" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-violet-bright uppercase">
            › Solutions
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Built for every{" "}
            <span className="text-gradient-magenta">intelligent mission</span>.
          </h2>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {solutions.map((s) => (
            <RevealItem key={s.title}>
              <article className="glass-panel group relative h-full overflow-hidden p-7">
                <div className="absolute -right-8 -top-8 size-24 rounded-full bg-cyan/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                <span className="font-display text-3xl text-cyan glow-text-cyan">
                  {s.icon}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-mist">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist-soft">
                  {s.desc}
                </p>
                <p className="mt-5 font-mono text-[11px] tracking-widest text-cyan uppercase">
                  → {s.tag}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
