"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Crest } from "@/components/icons";
import { navLinks } from "@/data/department";

const primaryLinks = navLinks.filter((l) =>
  ["About", "Curriculum", "Labs", "Projects", "Activities", "Events", "Faculty", "Gallery", "Contact"].includes(l.label)
);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-cyan/10 bg-void/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="#top" className="group flex items-center gap-3">
          <Crest className="size-8 text-cyan transition-transform duration-500 group-hover:rotate-[8deg]" />
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold tracking-tight text-mist">
              AI &amp; Data Science
            </span>
            <span className="block font-mono text-[10px] tracking-widest text-mist-faint uppercase">
              SKP Engineering College
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 font-display text-sm text-mist-soft transition-colors hover:text-cyan"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="#contact"
          className="hidden items-center gap-2 rounded-md border border-cyan/30 px-4 py-2 font-display text-sm text-cyan transition-all hover:bg-cyan/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.25)] lg:inline-flex"
        >
          Apply now
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-md border border-cyan/20 text-cyan lg:hidden"
          aria-label="Toggle menu"
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-cyan/10 bg-void/95 px-6 py-4 backdrop-blur-xl lg:hidden">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-4 py-3 font-display text-sm text-mist-soft hover:text-cyan"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
