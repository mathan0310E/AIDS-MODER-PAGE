"use client";

import { useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";
import {
  calendarCategoryColors,
  calendarEvents,
} from "@/data/department";
import { ChevronIcon } from "@/components/icons";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function Events() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const monthLabel = new Date(year, month, 1).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  const cells = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const list: ({ day: number; events: typeof calendarEvents } | null)[] = [];
    for (let i = 0; i < firstDay; i++) list.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      list.push({
        day,
        events: calendarEvents.filter((e) => e.date === dateStr),
      });
    }
    return list;
  }, [year, month]);

  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  return (
    <section id="events" className="relative py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="font-mono text-xs tracking-widest text-cyan uppercase">
            › Events calendar
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Plan the{" "}
            <span className="text-gradient-cyan">semester ahead</span>.
          </h2>
          <p className="mt-4 max-w-xl text-base text-mist-soft">
            Workshops, seminars, hackathons, exams, competitions, guest lectures
            and department events — colour-coded by category.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-panel mt-12 rounded-lg p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-xl font-semibold text-mist">
                {monthLabel}
              </h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous month"
                  className="grid size-9 place-items-center rounded-md border border-cyan/20 text-mist-soft transition-colors hover:border-cyan/40 hover:text-cyan"
                >
                  <ChevronIcon className="size-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next month"
                  className="grid size-9 place-items-center rounded-md border border-cyan/20 text-mist-soft transition-colors hover:border-cyan/40 hover:text-cyan"
                >
                  <ChevronIcon className="size-4" />
                </button>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-7 border-b border-cyan/10">
                  {WEEKDAYS.map((d) => (
                    <div
                      key={d}
                      className="px-2 py-2.5 text-center font-mono text-[10px] tracking-widest text-mist-faint uppercase"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {cells.map((cell, i) => (
                    <div
                      key={i}
                      className="min-h-24 border-b border-r border-cyan/5 p-2 last:border-r-0 [&:nth-child(7n)]:border-r-0"
                    >
                      {cell && (
                        <>
                          <span className="font-mono text-xs text-mist-faint">
                            {cell.day}
                          </span>
                          <ul className="mt-1 space-y-1">
                            {cell.events.map((e) => (
                              <li
                                key={e.id}
                                title={`${e.title} — ${e.description}`}
                                className={`truncate rounded px-1.5 py-0.5 font-mono text-[10px] text-void ${calendarCategoryColors[e.category] ?? "bg-cyan"}`}
                              >
                                {e.title}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <ul
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
              aria-label="Event category legend"
            >
              {(Object.entries(calendarCategoryColors) as [
                string,
                string,
              ][]).map(([cat, color]) => (
                <li
                  key={cat}
                  className="flex items-center gap-2 font-mono text-[11px] text-mist-soft"
                >
                  <span
                    className={`size-2.5 rounded-full ${color}`}
                    aria-hidden="true"
                  />
                  {cat}
                </li>
              ))}
            </ul>

            {calendarEvents.length === 0 && (
              <p className="mt-6 rounded-lg border border-dashed border-mist-faint/20 bg-void-3/40 px-5 py-4 text-center text-sm italic text-mist-soft">
                Department events, workshops, seminars, hackathons, exams and
                guest lectures will be published on this calendar.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
