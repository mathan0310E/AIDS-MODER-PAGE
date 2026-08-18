import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { alumni, site } from "@/data/department";
import { UsersIcon } from "@/components/icons";

export function Alumni() {
  return (
    <section id="alumni" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-cyan uppercase">
            › Alumni network
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Where our graduates{" "}
            <span className="text-gradient-cyan">build next</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base text-mist-soft">
            The first AI&amp;DS batch joined in {site.programEstablished} — our
            alumni network begins with the graduating class of 2027.
          </p>
        </Reveal>

        {alumni.length > 0 ? (
          <RevealStagger
            className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            stagger={0.08}
          >
            {alumni.map((person) => (
              <RevealItem key={person.id}>
                <article className="card-accent h-full rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    {person.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={person.photo}
                        alt={`Portrait of ${person.name}`}
                        className="size-14 rounded-full object-cover"
                      />
                    ) : (
                      <span className="grid size-14 place-items-center rounded-full border border-cyan/20 bg-cyan/5 text-cyan">
                        <UsersIcon className="size-6" />
                      </span>
                    )}
                    <div>
                      <h3 className="font-display text-lg font-semibold text-mist">
                        {person.name}
                      </h3>
                      <p className="font-mono text-[11px] text-mist-faint">
                        Class of {person.graduationYear}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 font-display text-sm font-medium text-cyan">
                    {person.role} · {person.company}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-mist-soft">
                    {person.journey}
                  </p>
                  <blockquote className="mt-3 border-l-2 border-violet/40 pl-3 font-serif text-sm italic text-mist-soft">
                    {person.testimonial}
                  </blockquote>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>
        ) : (
          <Reveal delay={0.1}>
            <p className="rounded-lg border border-dashed border-mist-faint/20 bg-void-3/40 px-5 py-4 text-sm italic text-mist-soft">
              Alumni profiles, career journeys and testimonials will appear here
              as our first batches graduate. Graduates can reach out to the
              department to join the alumni network.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
