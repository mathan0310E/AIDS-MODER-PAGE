import type { SVGProps } from "react";

/**
 * Hand-drawn-feel line icons — custom strokes give a human-designed character
 * that off-the-shelf icon sets and unicode glyphs lack. Each uses currentColor.
 */

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BrainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M24 12c-3-3-8-3-10 0-3-1-7 1-7 5 0 2 1 4 3 5-1 2-1 5 1 7 2 2 5 2 6 0 1 3 5 4 7 2 2 2 6 1 7-2" />
      <path d="M24 12c3-3 8-3 10 0 3-1 7 1 7 5 0 2-1 4-3 5 1 2 1 5-1 7-2 2-5 2-6 0-1 3-5 4-7 2" />
      <path d="M24 12v26M19 20h4M25 26h4M19 32h4" />
    </svg>
  );
}

export function NetworkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <circle cx="24" cy="24" r="4" />
      <circle cx="10" cy="12" r="3" />
      <circle cx="38" cy="12" r="3" />
      <circle cx="10" cy="36" r="3" />
      <circle cx="38" cy="36" r="3" />
      <path d="M21 22 13 15M27 22l8-7M21 26l-8 7M27 26l8 7" />
    </svg>
  );
}

export function ChartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M8 40V10M8 40h34" />
      <path d="M14 34l6-8 6 5 8-12" />
      <circle cx="14" cy="34" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="20" cy="26" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="26" cy="31" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="34" cy="19" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function LayersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M24 8 6 18l18 10 18-10z" />
      <path d="M6 28l18 10 18-10" />
      <path d="M6 38l18 10 18-10" opacity="0.5" />
    </svg>
  );
}

export function AnalyticsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <rect x="8" y="24" width="6" height="16" rx="1" />
      <rect x="18" y="16" width="6" height="24" rx="1" />
      <rect x="28" y="28" width="6" height="12" rx="1" />
      <rect x="38" y="12" width="2" height="28" opacity="0.4" />
      <path d="M6 10h36" opacity="0.5" />
    </svg>
  );
}

export function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M24 6c0 8 4 12 12 12-8 0-12 4-12 12 0-8-4-12-12-12 8 0 12-4 12-12z" />
      <path d="M38 30c0 3 2 5 5 5-3 0-5 2-5 5 0-3-2-5-5-5 3 0 5-2 5-5z" opacity="0.6" />
    </svg>
  );
}

export function BookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M24 12c-4-3-10-3-14-1v26c4-2 10-2 14 1 4-3 10-3 14-1V11c-4-2-10-2-14 1z" />
      <path d="M24 12v26" />
    </svg>
  );
}

export function FlaskIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M18 8h12M20 8v12l-9 16a3 3 0 0 0 3 5h20a3 3 0 0 0 3-5l-9-16V8" />
      <path d="M15 30h18" opacity="0.5" />
      <circle cx="22" cy="34" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="28" cy="36" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function RocketIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M24 6c6 4 10 12 10 20 0 4-2 8-4 10H18c-2-2-4-6-4-10 0-8 4-16 10-20z" />
      <circle cx="24" cy="18" r="3" />
      <path d="M14 28c-4 2-6 6-6 10 4 0 8-2 10-6M34 28c4 2 6 6 6 10-4 0-8-2-10-6" />
      <path d="M24 36v6" opacity="0.5" />
    </svg>
  );
}

export function CapIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M4 18 24 8l20 10-20 10z" />
      <path d="M12 22v10c0 2 5 4 12 4s12-2 12-4V22" />
      <path d="M44 18v8" />
    </svg>
  );
}

export function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <circle cx="24" cy="24" r="18" />
      <path d="M30 18l-4 8-8 4 4-8z" />
      <circle cx="24" cy="24" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ChatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M8 10h32a3 3 0 0 1 3 3v18a3 3 0 0 1-3 3H22l-8 6v-6H8a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3z" />
      <path d="M14 20h20M14 26h14" opacity="0.6" />
    </svg>
  );
}

export function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M24 6c-7 0-12 5-12 12 0 9 12 22 12 22s12-13 12-22c0-7-5-12-12-12z" />
      <circle cx="24" cy="18" r="4" />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <rect x="6" y="12" width="36" height="24" rx="3" />
      <path d="m8 16 16 12 16-12" />
    </svg>
  );
}

/** Department crest — a custom badge SVG (hexagon + circuit + node). */
export function Crest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path
        d="M32 4 56 18v28L32 60 8 46V18z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M32 14 48 23v18L32 50 16 41V23z"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* circuit traces */}
      <path
        d="M32 22v8M26 30h6M38 26v6M32 34v6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="32" cy="30" r="2.5" fill="currentColor" />
      <circle cx="26" cy="30" r="1.5" fill="currentColor" />
      <circle cx="38" cy="26" r="1.5" fill="currentColor" />
      <circle cx="38" cy="32" r="1.5" fill="currentColor" />
      <circle cx="32" cy="40" r="1.5" fill="currentColor" />
    </svg>
  );
}

const iconMap = {
  brain: BrainIcon,
  network: NetworkIcon,
  chart: ChartIcon,
  layers: LayersIcon,
  analytics: AnalyticsIcon,
  spark: SparkIcon,
};

export function TrophyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M14 10h20v8a10 10 0 0 1-20 0z" />
      <path d="M14 12H8v4a6 6 0 0 0 6 6M34 12h6v4a6 6 0 0 1-6 6" />
      <path d="M24 28v6M18 40h12M20 34h8l1 6h-10z" />
    </svg>
  );
}

export function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <rect x="6" y="10" width="36" height="32" rx="3" />
      <path d="M6 18h36M16 6v8M32 6v8" />
      <path d="M14 26h4M22 26h4M30 26h4M14 33h4M22 33h4" opacity="0.6" />
    </svg>
  );
}

export function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <circle cx="18" cy="16" r="6" />
      <path d="M6 38c0-6 5-10 12-10s12 4 12 10" />
      <circle cx="33" cy="18" r="5" opacity="0.7" />
      <path d="M30 29c6 0 12 3 12 9" opacity="0.7" />
    </svg>
  );
}

export function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M24 6v24M16 22l8 8 8-8" />
      <path d="M8 38h32" />
    </svg>
  );
}

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M18 16l8 8-8 8" />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <circle cx="21" cy="21" r="14" />
      <path d="M31 31l10 10" />
    </svg>
  );
}

export function ExternalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M20 8H8v32h32V28" />
      <path d="M28 8h12v12M40 8L24 24" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M12 12l24 24M36 12L12 36" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M8 14h32M8 24h32M8 34h32" />
    </svg>
  );
}

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M10 24h26M26 14l10 10-10 10" />
    </svg>
  );
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M24 4C13 4 4 13 4 24c0 9 6 16 14 19 1 0 1-0.5 1-1v-3c-6 1-7-3-7-3-1-2-2-3-2-3-2-1 0-1 0-1 2 0 3 2 3 2 2 3 5 2 7 1 0-1 1-2 1-3-3 0-6-2-6-6 0-1 1-3 2-4-1-0.5-2-3 0-4 0 0 2 0 4 2 1 0 4 0 5-2 1-2 3-2 4-1 2 0 4-1 4-1 1 0 1 1 0 4 2 1 3 3 3 4 1 1 2 3 2 4 0 4-3 6-6 6 1 1 2 2 2 4v3c0 0.5 1 1 1 1 8-3 14-10 14-19 0-11-9-20-20-20z" />
    </svg>
  );
}

export function Pin2Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" {...base} {...props}>
      <path d="M24 6c-7 0-12 5-12 12 0 9 12 22 12 22s12-13 12-22c0-7-5-12-12-12z" />
      <circle cx="24" cy="18" r="4" />
    </svg>
  );
}

export function WhyIcon({
  name,
  className,
}: {
  name: keyof typeof iconMap;
  className?: string;
}) {
  const Icon = iconMap[name];
  return <Icon className={className} />;
}
