import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { studentResources } from "@/data/department";
import { Marquee } from "@/components/Marquee";

export function Resources() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-cyan uppercase">
            › Student resources
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            The toolkit we{" "}
            <span className="text-gradient-cyan">point every student to</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base text-mist-soft">
            Curated, free platforms to practice, build and certify — alongside
            your coursework.
          </p>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {studentResources.map((r) => (
            <RevealItem key={r.name}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-accent group flex h-full flex-col rounded-lg p-5"
              >
                <span className="font-display text-base font-semibold text-mist transition-colors group-hover:text-cyan">
                  {r.name}
                  <span className="ml-1 text-cyan opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                </span>
                <p className="mt-2 text-xs leading-relaxed text-mist-soft">
                  {r.description}
                </p>
                <span className="mt-auto pt-4 font-mono text-[10px] tracking-wide text-mist-faint">
                  {r.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

export function TechMarquee() {
  const tools = [
    "Python", "TensorFlow", "PyTorch", "scikit-learn", "OpenCV", "Pandas",
    "NumPy", "Hugging Face", "Jupyter", "Kaggle", "Colab", "Git", "FastAPI",
  ];
  return (
    <section className="relative border-y border-cyan/10 bg-void-2/40 py-7">
      <p className="mb-5 text-center font-mono text-xs tracking-widest text-mist-faint uppercase">
        › The stack you will master
      </p>
      <Marquee items={tools} />
    </section>
  );
}
