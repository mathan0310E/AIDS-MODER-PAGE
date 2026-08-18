import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { site, stats } from "@/data/department";

export function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.4fr] lg:gap-16">
          {/* Main editorial column */}
          <Reveal>
            <p className="font-mono text-xs tracking-widest text-cyan uppercase">
              › About the department
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              A new programme for a{" "}
              <span className="text-gradient-cyan">new kind of engineer</span>.
            </h2>

            <p className="drop-cap mt-8 text-lg leading-relaxed text-mist-soft">
              The Department of Artificial Intelligence &amp; Data Science at{" "}
              {site.collegeName} was launched in {site.programEstablished} to
              prepare students for the defining technology of our generation. We
              combine rigorous foundations in mathematics and computing with
              hands-on building — so our graduates don&apos;t just understand
              AI, they can ship it.
            </p>

            <p className="mt-6 text-base leading-relaxed text-mist-soft">
              Over four years and eight semesters, you move from first
              principles to advanced systems: from your first Python script to
              training neural networks, deploying models, and completing a
              capstone that solves a real problem. The programme is affiliated
              to {site.affiliatedTo} and approved by {site.approvedBy}.
            </p>

            {/* pull-quote */}
            <blockquote className="mt-10 border-l-2 border-cyan/50 pl-6">
              <p className="font-serif text-2xl italic leading-snug text-mist">
                &ldquo;{site.tagline}&rdquo;
              </p>
              <footer className="mt-3 font-mono text-xs tracking-wide text-mist-faint uppercase">
                — Department motto
              </footer>
            </blockquote>
          </Reveal>

          {/* Stats sidebar — marginalia style */}
          <Reveal delay={0.15}>
            <aside className="lg:sticky lg:top-24">
              <p className="font-mono text-xs tracking-widest text-mist-faint uppercase">
                By the numbers
              </p>
              <dl className="mt-6 space-y-7">
                {stats.map((s) => (
                  <div key={s.label} className="border-l border-cyan/20 pl-4">
                    <dt className="font-mono text-[11px] tracking-wide text-mist-faint uppercase">
                      {s.label}
                    </dt>
                    <dd className="mt-1 font-display text-3xl font-bold text-mist">
                      {s.numericValue != null ? (
                        <Counter target={s.numericValue} suffix={s.suffix ?? ""} />
                      ) : (
                        <span>
                          {s.value}
                          {s.suffix ?? ""}
                        </span>
                      )}
                    </dd>
                    {s.provenance && (
                      <p className="mt-1 font-mono text-[10px] text-cyan-dim">
                        {s.provenance}
                      </p>
                    )}
                  </div>
                ))}
              </dl>
              <div className="mt-8 rounded-lg border border-mist-faint/15 bg-void-3/40 p-4">
                <p className="font-mono text-[10px] tracking-widest text-mist-faint uppercase">
                  Established by
                </p>
                <p className="mt-1.5 font-display text-sm text-mist-soft">
                  {site.trust}
                </p>
                <p className="mt-3 font-mono text-[10px] tracking-widest text-mist-faint uppercase">
                  Since {site.collegeEstablished}
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
