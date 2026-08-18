"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { semesters } from "@/data/department";
import { BookIcon, FlaskIcon } from "@/components/icons";

const typeStyle: Record<string, string> = {
  Theory: "text-cyan border-cyan/30 bg-cyan/5",
  Laboratory: "text-violet-bright border-violet/30 bg-violet/5",
  Project: "text-lime border-lime/30 bg-lime/5",
};

export function Curriculum() {
  const [active, setActive] = useState(0);
  const sem = semesters[active];

  return (
    <section id="curriculum" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-cyan uppercase">
            › Curriculum
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Eight semesters, from{" "}
            <span className="text-gradient-cyan">first principles to capstone</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base text-mist-soft">
            Tap a semester to explore the subjects. The full Anna University
            syllabus is published by the department each academic year.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-8 lg:grid-cols-[0.35fr_0.65fr]">
            {/* Semester rail */}
            <ol className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {semesters.map((s, i) => (
                <li key={s.number} className="lg:w-full">
                  <button
                    onClick={() => setActive(i)}
                    className={`flex w-full items-center gap-3 whitespace-nowrap rounded-lg border px-4 py-3 text-left transition-all ${
                      active === i
                        ? "border-cyan/50 bg-cyan/10 glow-cyan"
                        : "border-mist-faint/15 bg-void-3/40 hover:border-cyan/25"
                    }`}
                  >
                    <span
                      className={`font-mono text-sm font-bold ${active === i ? "text-cyan" : "text-mist-faint"}`}
                    >
                      {String(s.number).padStart(2, "0")}
                    </span>
                    <span className="hidden font-display text-sm text-mist sm:inline">
                      {s.theme}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            {/* Subject panel */}
            <div className="min-h-[20rem] rounded-xl border border-cyan/10 bg-void-2/50 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-xl font-bold text-mist">
                      Semester {sem.number}
                    </h3>
                    <span className="font-mono text-xs tracking-wide text-cyan uppercase">
                      {sem.theme}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {sem.subjects.map((sub) => (
                      <li
                        key={sub.code}
                        className="flex items-start gap-3 rounded-lg border border-mist-faint/10 bg-void-3/40 p-3.5"
                      >
                        <span className="mt-0.5 shrink-0 text-mist-faint">
                          {sub.type === "Laboratory" ? (
                            <FlaskIcon className="size-5 text-violet-bright" />
                          ) : sub.type === "Project" ? (
                            <span className="font-mono text-sm font-bold text-lime">
                              ✦
                            </span>
                          ) : (
                            <BookIcon className="size-5 text-cyan" />
                          )}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-sm font-medium text-mist">
                            {sub.title}
                          </p>
                          <p className="mt-0.5 font-mono text-[11px] text-mist-faint">
                            {sub.code}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] tracking-wide uppercase ${typeStyle[sub.type]}`}
                        >
                          {sub.type}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 font-mono text-[11px] text-mist-faint">
                    {sem.subjects.length} subjects ·{" "}
                    {sem.subjects.filter((s) => s.type === "Theory").length} theory,{" "}
                    {sem.subjects.filter((s) => s.type === "Laboratory").length} lab,{" "}
                    {sem.subjects.filter((s) => s.type === "Project").length} project
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
