"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { Crest } from "@/components/icons";

const links = [
  { label: "Dashboard", href: "/admin" },
  { label: "Settings", href: "/admin/settings" },
  { label: "Vision", href: "/admin/vision" },
  { label: "Faculty", href: "/admin/faculty" },
  { label: "News", href: "/admin/news" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Announcements", href: "/admin/announcements" },
  { label: "Stats", href: "/admin/stats" },
  { label: "Why Cards", href: "/admin/why-cards" },
  { label: "Curriculum", href: "/admin/curriculum" },
  { label: "Labs", href: "/admin/labs" },
  { label: "Research", href: "/admin/research-areas" },
  { label: "Careers", href: "/admin/careers" },
  { label: "Placement", href: "/admin/placement" },
  { label: "Resources", href: "/admin/resources" },
  { label: "FAQs", href: "/admin/faqs" },
  { label: "Academic Docs", href: "/admin/academic-docs" },
  { label: "Association", href: "/admin/club" },
  { label: "Activities", href: "/admin/activities" },
  { label: "Achievements", href: "/admin/achievements" },
  { label: "Events", href: "/admin/events" },
  { label: "Alumni", href: "/admin/alumni" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Downloads", href: "/admin/downloads" },
];

export function AdminNav({ email }: { email: string }) {
  return (
    <header className="border-b border-cyan/10 bg-void-2/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <Crest className="size-7 text-cyan" />
            <span className="font-display text-sm font-bold text-mist">
              Admin · AI&amp;DS
            </span>
          </Link>
          <div className="hidden items-center gap-1 overflow-x-auto sm:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="whitespace-nowrap rounded-md px-3 py-1.5 font-display text-sm text-mist-soft transition-colors hover:text-cyan"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-mono text-xs text-mist-faint hover:text-cyan"
          >
            view site ↗
          </Link>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-mist-faint">{email}</span>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="rounded-md border border-cyan/30 px-3 py-1.5 font-display text-xs text-cyan transition-colors hover:bg-cyan/10"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
