"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/data/department";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-violet-bright uppercase">
            › Frequently asked
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Questions,{" "}
            <span className="text-gradient-cyan">answered straight</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-10 divide-y divide-mist-faint/10 border-y border-mist-faint/10">
            {faqs.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-base font-medium text-mist">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 font-mono text-xl text-cyan transition-transform duration-300 ${
                      open === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm leading-relaxed text-mist-soft">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
