import Link from "next/link";

const cols = [
  {
    title: "Platform",
    links: [
      { label: "Neural Engine", href: "#platform" },
      { label: "Edge Runtime", href: "#platform" },
      { label: "Data Mesh", href: "#platform" },
      { label: "Security", href: "#platform" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Autonomous Systems", href: "#solutions" },
      { label: "Computer Vision", href: "#solutions" },
      { label: "Predictive AI", href: "#solutions" },
      { label: "Conversational AI", href: "#solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#team" },
      { label: "Showcase", href: "#showcase" },
      { label: "Process", href: "#process" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyan/10 bg-void-2/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-md border border-cyan/40 bg-cyan/10">
                <span className="font-mono text-sm font-bold text-cyan">N</span>
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-mist">
                NEX<span className="text-cyan">ARA</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist-soft">
              Engineering the future with autonomous systems, neural
              infrastructure, and intelligent platforms.
            </p>
            <p className="mt-6 font-mono text-xs tracking-widest text-mist-faint uppercase">
              EST. 2030 · BUILT FOR THE NEXT DECADE
            </p>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="font-chakra text-sm font-semibold tracking-wide text-cyan">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-mist-soft transition-colors hover:text-cyan"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cyan/10 pt-8 sm:flex-row">
          <p className="font-mono text-xs text-mist-faint">
            © 2030 NEXARA Technologies · All systems operational
          </p>
          <div className="flex items-center gap-2">
            <span className="size-2 animate-pulse-glow rounded-full bg-lime" />
            <span className="font-mono text-xs text-mist-soft">
              STATUS: ONLINE
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
