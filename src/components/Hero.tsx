"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Counter } from "@/components/Counter";

const stats = [
  { target: 240, suffix: "M+", label: "Inferences / day" },
  { target: 99, suffix: ".98%", label: "Uptime SLA" },
  { target: 42, suffix: "ms", label: "Median latency" },
  { target: 18, suffix: "", label: "Global regions" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden pt-20">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.2fr_1fr]">
        {/* Left — copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 font-mono text-xs tracking-widest text-cyan uppercase"
          >
            <span className="size-1.5 animate-pulse-glow rounded-full bg-cyan" />
            Neural Infrastructure · v4.0 Live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Engineering the
            <br />
            <span className="text-gradient-cyan glow-text-cyan">future</span> with
            <br />
            autonomous AI.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-mist-soft"
          >
            NEXARA builds the neural infrastructure powering the next decade of
            intelligence — from autonomous systems to real-time predictive
            platforms that operate at planetary scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#contact"
              className="btn-neon clip-tech inline-flex items-center gap-2 px-7 py-3.5 text-sm"
            >
              Launch your AI
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="#platform"
              className="btn-ghost-neon inline-flex items-center gap-2 rounded-lg px-7 py-3.5 font-chakra text-sm"
            >
              Explore Platform
            </Link>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-mono text-xs tracking-wide text-mist-faint uppercase">
                  {s.label}
                </dt>
                <dd className="mt-1 font-display text-2xl font-bold text-mist">
                  <Counter target={s.target} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right — floating animated UI mock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative hidden lg:block"
        >
          <FloatingUIMock />
        </motion.div>
      </div>
    </section>
  );
}

function FloatingUIMock() {
  return (
    <div className="relative h-[28rem]">
      {/* orbiting rings */}
      <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin-slow absolute inset-0 rounded-full border border-cyan/20" />
        <div
          className="animate-spin-slow absolute inset-8 rounded-full border border-violet/20"
          style={{ animationDirection: "reverse", animationDuration: "15s" }}
        />
        <div className="absolute inset-16 rounded-full border border-cyan/10" />
      </div>

      {/* central core */}
      <div className="absolute left-1/2 top-1/2 grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-cyan/30 bg-void-3/80 backdrop-blur-xl glow-cyan">
        <div className="animate-pulse-glow size-16 rounded-xl bg-gradient-to-br from-cyan to-violet" />
        <span className="absolute -bottom-7 font-mono text-xs tracking-widest text-cyan uppercase">
          CORE
        </span>
      </div>

      {/* floating cards */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-panel clip-tech absolute left-0 top-8 w-44 p-4"
      >
        <p className="font-mono text-[10px] tracking-widest text-cyan uppercase">
          Inference
        </p>
        <p className="mt-1 font-display text-xl font-bold text-mist">2.4M</p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-void-3">
          <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-cyan to-violet" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="glass-panel clip-tech absolute right-0 top-24 w-44 p-4"
      >
        <p className="font-mono text-[10px] tracking-widest text-violet-bright uppercase">
          Latency
        </p>
        <p className="mt-1 font-display text-xl font-bold text-mist">42ms</p>
        <div className="mt-2 flex gap-1">
          {[40, 70, 30, 90, 55].map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-full bg-violet"
              style={{ height: `${h * 0.3}px` }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="glass-panel clip-tech absolute bottom-8 left-12 w-48 p-4"
      >
        <p className="font-mono text-[10px] tracking-widest text-lime uppercase">
          Status
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span className="size-2 animate-pulse-glow rounded-full bg-lime" />
          <span className="font-chakra text-sm text-mist">All systems nominal</span>
        </div>
      </motion.div>
    </div>
  );
}
