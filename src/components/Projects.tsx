"use client";

import { useState } from "react";
import { Reveal, RevealStagger, RevealItem } from "@/components/Reveal";
import { studentProjects } from "@/data/department";

const categories = ["All", ...Array.from(new Set(studentProjects.map((p) => p.category)))];

const statusStyle: Record<string, string> = {
  Ongoing: "text-cyan border-cyan/30",
  Completed: "text-lime border-lime/30",
  Recruiting: "text-magenta-bright border-magenta/30",
};

export function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All"
      ? studentProjects
      : studentProjects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-cyan uppercase">
            › Student projects
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Real problems,{" "}
            <span className="text-gradient-magenta">student-built solutions</span>.
          </h2>
        </Reveal>

        {/* filter chips */}
        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full border px-4 py-1.5 font-display text-sm transition-all ${
                  filter === cat
                    ? "border-cyan bg-cyan/15 text-cyan"
                    : "border-mist-faint/20 text-mist-soft hover:border-cyan/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <RevealStagger className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {filtered.map((p) => (
            <RevealItem key={p.id}>
              <article className="card-accent group h-full rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-cyan uppercase">
                    {p.category}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase ${statusStyle[p.status]}`}
                  >
                    {p.status}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-mist">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-soft">
                  {p.blurb}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-void-3/60 px-2 py-0.5 font-mono text-[10px] text-mist-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
