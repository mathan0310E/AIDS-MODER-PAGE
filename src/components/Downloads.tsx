"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { downloadCategories, downloads } from "@/data/department";
import { DownloadIcon, SearchIcon } from "@/components/icons";

export function Downloads() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return downloads.filter((d) => {
      const matchesQuery =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q);
      const matchesCategory = category === "All" || d.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <section id="downloads" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-violet-bright uppercase">
            › Downloads
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Official documents &amp;{" "}
            <span className="text-gradient-magenta">resources</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base text-mist-soft">
            Syllabi, regulations, timetables, academic calendars, circulars,
            forms and student resources — all in one place.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative w-full max-w-md">
              <span className="sr-only">Search downloads</span>
              <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-mist-faint" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documents…"
                className="w-full rounded-lg border border-cyan/15 bg-void-3/60 py-2.5 pr-4 pl-10 font-display text-sm text-mist placeholder:text-mist-faint focus:border-cyan/40 focus:outline-none"
              />
            </label>
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter downloads by category"
            >
              {["All", ...downloadCategories].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`rounded-full border px-3 py-1 font-display text-[11px] transition-all ${
                    category === c
                      ? "border-cyan bg-cyan/15 text-cyan"
                      : "border-mist-faint/20 text-mist-soft hover:border-cyan/30"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {filtered.length > 0 ? (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => (
              <li
                key={d.id}
                className="card-accent flex items-center gap-4 rounded-lg p-5"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-cyan/15 bg-cyan/5 text-cyan">
                  <DownloadIcon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-sm font-semibold text-mist">
                    {d.title}
                  </p>
                  <p className="font-mono text-[11px] text-mist-faint">
                    {d.category}
                  </p>
                </div>
                {d.available && d.url ? (
                  <a
                    href={d.url}
                    className="rounded-md border border-cyan/40 bg-cyan/10 px-3 py-1.5 font-display text-[11px] font-semibold text-cyan transition-colors hover:bg-cyan/20"
                  >
                    Download
                  </a>
                ) : (
                  <span className="rounded-md border border-dashed border-mist-faint/20 px-3 py-1.5 font-mono text-[10px] italic text-mist-faint">
                    Pending
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 rounded-lg border border-dashed border-mist-faint/20 bg-void-3/40 px-5 py-6 text-center text-sm italic text-mist-soft">
            No documents match your search.
          </p>
        )}
      </div>
    </section>
  );
}
