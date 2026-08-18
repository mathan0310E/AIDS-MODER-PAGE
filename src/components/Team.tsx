import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";

const team = [
  {
    name: "Dr. Aravind Raman",
    role: "Founder · Chief Scientist",
    bio: "Former lead of Google DeepMind's autonomous systems group. 60+ patents in neural architectures.",
    initials: "AR",
    accent: "cyan",
  },
  {
    name: "Lena Volkov",
    role: "Co-Founder · CTO",
    bio: "Built distributed inference at scale at Stripe and Snowflake. Expert in planetary-scale systems.",
    initials: "LV",
    accent: "violet",
  },
  {
    name: "Kenji Tanaka",
    role: "VP · Edge Intelligence",
    bio: "Pioneered on-device AI at Apple. Led the deployment of 2B+ edge inference nodes worldwide.",
    initials: "KT",
    accent: "magenta",
  },
  {
    name: "Sofia Mendes",
    role: "VP · Trust & Alignment",
    bio: "AI safety researcher, ex-Anthropic. Author of the NEXARA Responsible AI framework.",
    initials: "SM",
    accent: "lime",
  },
];

const accentBg: Record<string, string> = {
  cyan: "border-cyan/40 text-cyan glow-cyan",
  violet: "border-violet/40 text-violet-bright glow-violet",
  magenta: "border-magenta/40 text-magenta-bright",
  lime: "border-lime/40 text-lime",
};

export function Team() {
  return (
    <section id="team" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-cyan uppercase">
            › The Architects
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Built by the people who{" "}
            <span className="text-gradient-cyan">built the field</span>.
          </h2>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {team.map((m) => (
            <RevealItem key={m.name}>
              <article className="glass-panel group h-full p-6 text-center">
                <div
                  className={`mx-auto grid size-20 place-items-center rounded-full border-2 font-display text-xl font-bold ${accentBg[m.accent]}`}
                >
                  {m.initials}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-mist">
                  {m.name}
                </h3>
                <p className="mt-1 font-mono text-[11px] tracking-wide text-cyan uppercase">
                  {m.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-mist-soft">
                  {m.bio}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
