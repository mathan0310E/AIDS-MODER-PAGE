import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { WhyIcon } from "@/components/icons";
import { whyCards } from "@/data/department";

export function WhyAI() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-violet-bright uppercase">
            › What you will learn
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Six pillars of modern{" "}
            <span className="text-gradient-magenta">intelligence engineering</span>.
          </h2>
        </Reveal>

        <RevealStagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.09}>
          {whyCards.map((card) => (
            <RevealItem key={card.title}>
              <article className="card-accent group h-full rounded-lg p-6">
                <WhyIcon
                  name={card.icon}
                  className="size-10 text-cyan transition-transform duration-300 group-hover:scale-110"
                />
                <h3 className="mt-5 font-display text-lg font-semibold text-mist">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-mist-soft">
                  {card.description}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
