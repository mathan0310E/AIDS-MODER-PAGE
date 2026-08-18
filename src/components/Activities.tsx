import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { activityCategories, activities, club } from "@/data/department";
import { SparkIcon } from "@/components/icons";
import { AionLogo } from "@/components/AionLogo";

export function Activities() {
  return (
    <section id="activities" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-magenta-bright uppercase">
            › Student activities
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Life beyond the{" "}
            <span className="text-gradient-magenta">classroom</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base text-mist-soft">
            Hackathons, workshops, coding contests, industrial visits and the
            AION association — where students put theory into practice.
          </p>
        </Reveal>

        {/* Activity categories */}
        <RevealStagger
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          stagger={0.05}
        >
          {activityCategories.map((category) => (
            <RevealItem key={category}>
              <div className="card-accent flex h-full items-center gap-2.5 rounded-lg p-3.5">
                <span className="text-magenta-bright">
                  <SparkIcon className="size-4" />
                </span>
                <span className="font-display text-xs font-medium text-mist-soft">
                  {category}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Activities list or placeholder */}
        <div className="mt-10">
          {activities.length > 0 ? (
            <RevealStagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
              {activities.map((a) => (
                <RevealItem key={a.id}>
                  <article className="card-accent h-full rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-widest text-magenta-bright uppercase">
                        {a.category}
                      </span>
                      <time className="font-mono text-[10px] text-mist-faint">
                        {a.date}
                      </time>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-semibold text-mist">
                      {a.name}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] text-mist-faint">
                      {a.location}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-mist-soft">
                      {a.description}
                    </p>
                  </article>
                </RevealItem>
              ))}
            </RevealStagger>
          ) : (
            <Reveal>
              <p className="rounded-lg border border-dashed border-mist-faint/20 bg-void-3/40 px-5 py-4 text-sm italic text-mist-soft">
                Upcoming and past department activities — technical events,
                hackathons, workshops, seminars, coding contests, project
                expos, industrial visits, guest lectures and AI competitions —
                will be listed here with dates, photos and registration links.
              </p>
            </Reveal>
          )}
        </div>

        {/* AION association showcase */}
        {club && (
          <Reveal delay={0.1}>
            <div className="glass-panel clip-tech mt-12 grid items-center gap-8 rounded-lg p-8 lg:grid-cols-[0.35fr_0.65fr] lg:p-10">
              <div className="flex flex-col items-center gap-4 lg:items-start">
                <AionLogo className="w-full max-w-[240px]" />
                {club.tagline && (
                  <p className="text-center font-mono text-[11px] tracking-widest text-cyan uppercase lg:text-left">
                    {club.tagline}
                  </p>
                )}
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest text-cyan uppercase">
                  The association
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-mist">
                  {club.name}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-mist-soft">
                  {club.purpose}
                </p>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {club.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-mist-soft">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
