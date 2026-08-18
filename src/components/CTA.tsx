import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";

const techs = [
  "PyTorch",
  "CUDA",
  "TensorRT",
  "Kubernetes",
  "Ray",
  "Triton",
  "ONNX",
  "MLflow",
  "Kubeflow",
  "NVIDIA NIM",
  "vLLM",
  "Weights & Biases",
];

export function TechMarquee() {
  return (
    <section className="relative border-y border-cyan/10 bg-void-2/40 py-8">
      <p className="mb-6 text-center font-mono text-xs tracking-widest text-mist-faint uppercase">
        › Powered by the modern AI stack
      </p>
      <Marquee items={techs} />
    </section>
  );
}

export function CTA() {
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="glass-panel clip-tech relative overflow-hidden px-8 py-16 text-center sm:px-16">
            <div className="absolute -left-20 -top-20 size-64 rounded-full bg-cyan/10 blur-3xl" />
            <div className="absolute -right-20 -bottom-20 size-64 rounded-full bg-violet/10 blur-3xl" />
            <div className="relative">
              <p className="font-mono text-xs tracking-widest text-cyan uppercase">
                › Ready to deploy
              </p>
              <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Let&apos;s build your{" "}
                <span className="text-gradient-cyan glow-text-cyan">
                  intelligent future
                </span>
                .
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-mist-soft">
                Tell us your mission. We&apos;ll architect the neural stack and
                ship to production in 90 days.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="mailto:hello@nexara.ai"
                  className="btn-neon clip-tech inline-flex items-center gap-2 px-8 py-4 text-sm"
                >
                  Start a conversation
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#platform"
                  className="btn-ghost-neon inline-flex items-center gap-2 rounded-lg px-8 py-4 font-chakra text-sm"
                >
                  Read the docs
                </a>
              </div>
              <p className="mt-8 font-mono text-xs tracking-widest text-mist-faint uppercase">
                hello@nexara.ai · 18 global regions · SOC 2 Type II
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
