import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { achievementCategories, achievements } from "@/data/department";
import { TrophyIcon } from "@/components/icons";

export function Achievements() {
  return (
    <section id="achievements" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-lime uppercase">
            › Achievements
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Where our students{" "}
            <span className="text-gradient-cyan">shine</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base text-mist-soft">
            Celebrating the accomplishments of AI&amp;DS students and faculty —
            only verified achievements are listed.
          </p>
        </Reveal>

        <RevealStagger
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3"
          stagger={0.05}
        >
          {achievementCategories.map((category) => (
            <RevealItem key={category}>
              <div className="card-accent flex h-full items-center gap-2.5 rounded-lg p-3.5">
                <span className="text-amber-400">
                  <TrophyIcon className="size-4" />
                </span>
                <span className="font-display text-xs font-medium text-mist-soft">
                  {category}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <div className="mt-10">
          {achievements.length > 0 ? (
            <RevealStagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {achievements.map((item) => (
                <RevealItem key={item.id}>
                  <article className="card-accent h-full rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-400">
                        <TrophyIcon className="size-5" />
                      </span>
                      <span className="rounded-full border border-lime/30 bg-lime/5 px-2 py-0.5 font-mono text-[10px] uppercase text-lime">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-mist">
                      {item.studentName}
                    </h3>
                    <p className="font-mono text-[11px] text-mist-faint">
                      {item.year}
                    </p>
                    <dl className="mt-4 space-y-2 text-sm">
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-mist-faint">
                          Event
                        </dt>
                        <dd className="text-mist-soft">{item.event}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[10px] uppercase tracking-widest text-mist-faint">
                          Achievement
                        </dt>
                        <dd className="text-mist-soft">{item.achievement}</dd>
                      </div>
                    </dl>
                  </article>
                </RevealItem>
              ))}
            </RevealStagger>
          ) : (
            <Reveal>
              <p className="rounded-lg border border-dashed border-mist-faint/20 bg-void-3/40 px-5 py-4 text-sm italic text-mist-soft">
                Student and faculty achievements — with names, events, results
                and certificates — will be published here once officially
                verified. No accomplishment is listed without confirmation.
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
