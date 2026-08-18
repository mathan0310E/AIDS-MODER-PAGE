import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { laboratories } from "@/data/department";

export function Labs() {
  return (
    <section id="labs" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-violet-bright uppercase">
            › Laboratories
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Six labs built for{" "}
            <span className="text-gradient-cyan">hands-on building</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base text-mist-soft">
            From your first Python script to training deep networks on GPU
            workstations — each lab maps to a stage of the curriculum.
          </p>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {laboratories.map((lab) => (
            <RevealItem key={lab.id}>
              <article className="glass-panel h-full rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-mist-faint">
                    {lab.id}
                  </span>
                  <span className="size-2 rounded-full bg-lime animate-pulse-glow" />
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold text-mist">
                  {lab.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-soft">
                  {lab.focus}
                </p>

                <div className="mt-5">
                  <p className="font-mono text-[10px] tracking-widest text-mist-faint uppercase">
                    Software stack
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {lab.software.map((sw) => (
                      <span
                        key={sw}
                        className="rounded border border-cyan/15 bg-void-3/60 px-2 py-0.5 font-mono text-[11px] text-mist-soft"
                      >
                        {sw}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 border-t border-mist-faint/10 pt-4">
                  <p className="font-mono text-[10px] tracking-widest text-mist-faint uppercase">
                    Equipment
                  </p>
                  <ul className="mt-2 space-y-1">
                    {lab.equipment.map((eq) => (
                      <li
                        key={eq}
                        className="text-xs text-mist-soft"
                      >
                        <span className="text-cyan">›</span> {eq}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
