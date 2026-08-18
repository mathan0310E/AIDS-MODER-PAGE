"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { site } from "@/data/department";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-32">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left — editorial copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/5 px-3.5 py-1.5 font-mono text-[11px] tracking-widest text-cyan uppercase"
          >
            <span className="size-1.5 animate-pulse-glow rounded-full bg-cyan" />
            B.Tech · est. {site.programEstablished} · intake {site.initialIntake}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Build the{" "}
            <span className="relative">
              <span className="text-gradient-cyan">intelligent</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 6c40-4 80-4 120-2s60 2 76 0"
                  stroke="var(--color-cyan)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>{" "}
            systems of tomorrow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-mist-soft"
          >
            {site.heroTagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#curriculum"
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-cyan to-violet px-6 py-3 font-display text-sm font-semibold text-void transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(0,229,255,0.45)]"
            >
              Explore the curriculum
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center gap-2 rounded-md border border-mist-faint/30 px-6 py-3 font-display text-sm text-mist-soft transition-colors hover:border-cyan/40 hover:text-cyan"
            >
              Why AI &amp; DS?
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 font-mono text-xs tracking-wide text-mist-faint"
          >
            {site.affiliatedTo} · Approved by {site.approvedBy}
          </motion.p>
        </div>

        {/* Right — custom data-flow illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative hidden lg:block"
        >
          <DataFlowArt />
        </motion.div>
      </div>
    </section>
  );
}

/** A hand-composed SVG: data flowing from raw inputs through a neural layer
 *  into insight. Custom, not a stock orbiting-rings graphic. */
function DataFlowArt() {
  return (
    <div className="relative">
      <svg viewBox="0 0 420 380" className="w-full" fill="none" aria-hidden="true">
        {/* input nodes */}
        <g stroke="var(--color-mist-faint)" strokeWidth="1" opacity="0.4">
          <circle cx="30" cy="80" r="5" />
          <circle cx="30" cy="140" r="5" />
          <circle cx="30" cy="200" r="5" />
          <circle cx="30" cy="260" r="5" />
          <circle cx="30" cy="320" r="5" />
        </g>
        <text x="30" y="55" fill="var(--color-mist-faint)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">
          DATA IN
        </text>

        {/* hidden layer 1 */}
        <g stroke="var(--color-cyan-dim)" strokeWidth="0.8" opacity="0.5">
          <circle cx="150" cy="110" r="6" />
          <circle cx="150" cy="190" r="6" />
          <circle cx="150" cy="270" r="6" />
        </g>

        {/* hidden layer 2 */}
        <g stroke="var(--color-violet-dim)" strokeWidth="0.8" opacity="0.5">
          <circle cx="260" cy="140" r="6" />
          <circle cx="260" cy="240" r="6" />
        </g>

        {/* output */}
        <g>
          <circle cx="380" cy="190" r="10" fill="var(--color-cyan)" opacity="0.15" />
          <circle cx="380" cy="190" r="5" fill="var(--color-cyan)" />
        </g>
        <text x="380" y="220" fill="var(--color-cyan)" fontSize="9" fontFamily="var(--font-mono)" textAnchor="middle">
          INSIGHT
        </text>

        {/* connections */}
        <g stroke="var(--color-cyan)" strokeWidth="0.6" opacity="0.3">
          {[80, 140, 200, 260, 320].map((y) =>
            [110, 190, 270].map((y2) => (
              <line key={`${y}-${y2}`} x1="35" y1={y} x2="144" y2={y2} />
            )),
          )}
          {[110, 190, 270].map((y) =>
            [140, 240].map((y2) => (
              <line key={`l2-${y}-${y2}`} x1="156" y1={y} x2="254" y2={y2} />
            )),
          )}
          {[140, 240].map((y) => (
            <line key={`out-${y}`} x1="266" y1={y} x2="370" y2="190" />
          ))}
        </g>

        {/* animated pulse along the main path */}
        <motion.circle
          r="3"
          fill="var(--color-cyan)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.5, 1] }}
        >
          <animateMotion dur="3s" repeatCount="indefinite" path="M35,200 L150,190 L260,140 L380,190" />
        </motion.circle>
      </svg>

      {/* floating annotation */}
      <div className="glass-panel absolute right-2 top-2 w-40 p-3">
        <p className="font-mono text-[10px] tracking-widest text-cyan uppercase">
          Neural net
        </p>
        <p className="mt-1 font-display text-sm text-mist">Input → Insight</p>
      </div>
      <div className="glass-panel absolute bottom-4 left-2 w-44 p-3">
        <p className="font-mono text-[10px] tracking-widest text-violet-bright uppercase">
          Real-time
        </p>
        <div className="mt-2 flex gap-1">
          {[30, 60, 45, 80, 50, 70].map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-full bg-violet"
              style={{ height: `${h * 0.3}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
