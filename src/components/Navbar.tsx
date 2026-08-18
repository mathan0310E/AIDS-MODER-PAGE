"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Process", href: "#process" },
  { label: "Showcase", href: "#showcase" },
  { label: "Team", href: "#team" },
];

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
          ? "border-b border-cyan/10 bg-void/70 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative grid size-9 place-items-center">
            <span className="absolute inset-0 rounded-md border border-cyan/40 transition-transform duration-500 group-hover:rotate-45" />
            <span className="absolute inset-1.5 rounded-sm bg-cyan/10" />
            <span className="relative font-mono text-sm font-bold text-cyan">N</span>
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-mist">
            NEX<span className="text-cyan glow-text-cyan">ARA</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-4 py-2 font-chakra text-sm text-mist-soft transition-colors hover:text-cyan"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="#contact"
            className="btn-neon clip-tech inline-flex items-center gap-2 px-5 py-2.5 text-sm"
          >
            Get Started
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-md border border-cyan/20 text-cyan md:hidden"
          aria-label="Toggle menu"
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-cyan/10 bg-void/95 px-6 py-4 backdrop-blur-xl md:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-4 py-3 font-chakra text-sm text-mist-soft hover:text-cyan"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-neon mt-3 block rounded-md px-4 py-3 text-center text-sm"
          >
            Get Started →
          </Link>
        </div>
      )}
    </header>
  );
}
