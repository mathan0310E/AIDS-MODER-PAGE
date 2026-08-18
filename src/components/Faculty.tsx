import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { faculty, PLACEHOLDER_NOTE } from "@/data/department";

export function Faculty() {
  return (
    <section id="faculty" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-cyan uppercase">
            › Faculty
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Mentors who{" "}
            <span className="text-gradient-cyan">guide every batch</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base text-mist-soft">
            Our faculty bring academic depth and industry perspective. Full
            profiles and photographs will be added by the department.
          </p>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.09}>
          {faculty.map((m) => (
            <RevealItem key={m.id}>
              <article className="card-accent group h-full rounded-lg p-6 text-center">
                {/* photo-ready placeholder — shows uploaded photo, else a stylised avatar frame */}
                <div className="relative mx-auto grid size-24 place-items-center overflow-hidden rounded-full border-2 border-cyan/25 bg-void-3">
                  {m.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="size-full rounded-full object-cover"
                    />
                  ) : (
                    <>
                      <div className="grid-holo absolute inset-0 opacity-30" />
                      <span className="relative font-display text-2xl font-bold text-cyan/40">
                        {m.id === "hod" ? "HoD" : "👤"}
                      </span>
                    </>
                  )}
                  {/* photo upload hint */}
                  <span className="absolute bottom-0 inset-x-0 bg-void/80 py-0.5 font-mono text-[8px] text-mist-faint opacity-0 transition-opacity group-hover:opacity-100">
                    photo
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-mist">
                  {m.name}
                </h3>
                <p className="mt-1 font-mono text-[10px] tracking-wide text-cyan uppercase">
                  {m.designation}
                </p>
                <p
                  className={`mt-3 text-xs leading-relaxed ${
                    m.qualification === PLACEHOLDER_NOTE ? "text-mist-faint italic" : "text-mist-soft"
                  }`}
                >
                  {m.qualification}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {m.specialization.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-violet/20 bg-violet/5 px-2 py-0.5 font-mono text-[10px] text-violet-bright"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                {m.email && m.email !== "—" && (
                  <a
                    href={`mailto:${m.email}`}
                    className="mt-4 inline-block font-mono text-[11px] text-mist-soft hover:text-cyan"
                  >
                    {m.email}
                  </a>
                )}
              </article>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center font-mono text-xs text-mist-faint">
            Faculty photographs and detailed profiles will be published here.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
