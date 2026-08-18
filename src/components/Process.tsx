import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";

const steps = [
  {
    n: "01",
    title: "Discover",
    desc: "We map your data, workflows, and constraints to identify the highest-leverage AI opportunities.",
  },
  {
    n: "02",
    title: "Architect",
    desc: "Design the neural stack — model, data mesh, and edge deployment — fit to your latency and trust requirements.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Train, fine-tune, and ship in rapid cycles. Production-grade from the first commit, not the last.",
  },
  {
    n: "04",
    title: "Scale",
    desc: "Deploy across regions and edge nodes with auto-scaling, observability, and continuous alignment.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-cyan uppercase">
            › Process
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            From idea to{" "}
            <span className="text-gradient-cyan">orbit in 90 days</span>.
          </h2>
        </Reveal>

        <RevealStagger className="mt-16 grid gap-8 md:grid-cols-4" stagger={0.15}>
          {steps.map((s, i) => (
            <RevealItem key={s.n}>
              <div className="relative">
                {/* connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-12 top-12 hidden h-px w-full bg-gradient-to-r from-cyan/40 to-transparent md:block" />
                )}
                <div className="relative grid size-12 place-items-center rounded-lg border border-cyan/30 bg-void-3/80 font-mono text-sm font-bold text-cyan glow-cyan">
                  {s.n}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-mist">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-soft">
                  {s.desc}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
