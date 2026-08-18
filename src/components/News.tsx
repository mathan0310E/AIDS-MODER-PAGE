import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { news, announcements } from "@/data/department";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function News() {
  return (
    <section id="news" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-violet-bright uppercase">
            › News &amp; announcements
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            What&apos;s happening in{" "}
            <span className="text-gradient-magenta">the department</span>.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.6fr_0.4fr]">
          {/* News cards */}
          <RevealStagger className="space-y-5" stagger={0.1}>
            {news.map((item) => (
              <RevealItem key={item.id}>
                <article className="card-accent rounded-lg p-6">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-cyan/25 bg-cyan/5 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-cyan uppercase">
                      {item.category}
                    </span>
                    <time className="font-mono text-xs text-mist-faint">
                      {formatDate(item.date)}
                    </time>
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-mist">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-soft">
                    {item.summary}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealStagger>

          {/* Announcements sidebar */}
          <Reveal delay={0.15}>
            <aside className="rounded-xl border border-violet/15 bg-violet/5 p-6">
              <p className="font-mono text-xs tracking-widest text-violet-bright uppercase">
                Notices
              </p>
              <ul className="mt-5 space-y-4">
                {announcements.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-violet" />
                    <span className="text-sm leading-relaxed text-mist-soft">{a}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 font-display text-sm text-cyan hover:underline"
              >
                Contact the department →
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
