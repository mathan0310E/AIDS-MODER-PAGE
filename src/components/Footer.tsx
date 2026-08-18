import Link from "next/link";
import { Crest } from "@/components/icons";
import { navLinks, site } from "@/data/department";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyan/10 bg-void-2/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Crest className="size-8 text-cyan" />
              <span className="leading-tight">
                <span className="block font-display text-sm font-bold tracking-tight text-mist">
                  AI &amp; Data Science
                </span>
                <span className="block font-mono text-[10px] tracking-widest text-mist-faint uppercase">
                  {site.collegeNameUpper}
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs font-serif text-base italic leading-relaxed text-mist-soft">
              {site.tagline}
            </p>
            <p className="mt-5 font-mono text-xs text-mist-faint">
              {site.affiliatedTo} · {site.approvedBy}
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[10px] tracking-widest text-cyan uppercase">
              Explore
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-sm text-mist-soft transition-colors hover:text-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[10px] tracking-widest text-cyan uppercase">
              Contact
            </h3>
            <p className="mt-4 font-display text-sm leading-relaxed text-mist-soft">
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.line3}
            </p>
            <a
              href={`mailto:${site.departmentEmail}`}
              className="mt-3 inline-block font-display text-sm text-cyan hover:underline"
            >
              {site.departmentEmail}
            </a>
            <p className="mt-4">
              <Link
                href="/admin"
                className="font-mono text-[10px] tracking-widest text-mist-faint uppercase hover:text-cyan"
              >
                Admin sign-in →
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cyan/10 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-mist-faint">
            © {new Date().getFullYear()} {site.collegeName} · Department of AI &amp;
            Data Science
          </p>
          <p className="font-mono text-[10px] tracking-widest text-mist-faint uppercase">
            {site.trust}
          </p>
        </div>
      </div>
    </footer>
  );
}
