import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { careerOpportunities, placementSupport, researchAreas } from "@/data/department";
import { RocketIcon, CompassIcon } from "@/components/icons";

export function Careers() {
  return (
    <section id="careers" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left — career pathways */}
          <Reveal>
            <div className="flex items-center gap-3">
              <CompassIcon className="size-8 text-cyan" />
              <p className="font-mono text-xs tracking-widest text-cyan uppercase">
                › Career pathways
              </p>
            </div>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Where our graduates{" "}
              <span className="text-gradient-cyan">go next</span>.
            </h2>
            <p className="mt-4 text-base text-mist-soft">
              The AI &amp; Data Science degree opens doors across the fastest-growing
              fields in technology.
            </p>

            <ul className="num-marker mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {careerOpportunities.map((role) => (
                <li
                  key={role}
                  className="font-display text-sm text-mist-soft"
                >
                  {role}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="font-mono text-[10px] tracking-widest text-mist-faint uppercase">
                Research areas students explore
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {researchAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-violet/20 bg-violet/5 px-3 py-1 font-mono text-[11px] text-violet-bright"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right — placement support */}
          <Reveal delay={0.12}>
            <div className="flex items-center gap-3">
              <RocketIcon className="size-8 text-violet-bright" />
              <p className="font-mono text-xs tracking-widest text-violet-bright uppercase">
                › Placement support
              </p>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-mist">
              We get you ready, not just qualified.
            </h3>

            <RevealStagger className="mt-8 space-y-4" stagger={0.08}>
              {placementSupport.map((item) => (
                <RevealItem key={item.title}>
                  <div className="rounded-lg border border-mist-faint/12 bg-void-3/40 p-4">
                    <p className="font-display text-sm font-semibold text-cyan">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-mist-soft">
                      {item.description}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealStagger>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
