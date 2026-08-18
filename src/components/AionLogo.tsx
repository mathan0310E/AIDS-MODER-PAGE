/** AION association logo — recreated as vector art from the official emblem. */
export function AionLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 480" className={className} role="img" aria-label="AION — Artificial Intelligence and Operation Network">
      <defs>
        <linearGradient id="aionMetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8fafc" />
          <stop offset="0.5" stopColor="#cbd5e1" />
          <stop offset="1" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="aionArc" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="aionGlobe" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7dd3fc" />
          <stop offset="1" stopColor="#1e40af" />
        </linearGradient>
        <clipPath id="globeClip">
          <circle cx="240" cy="212" r="52" />
        </clipPath>
      </defs>

      {/* outer arc */}
      <path
        d="M60 200 A180 180 0 0 1 420 200"
        fill="none"
        stroke="url(#aionArc)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M60 320 A180 180 0 0 0 420 320"
        fill="none"
        stroke="url(#aionArc)"
        strokeWidth="7"
        strokeLinecap="round"
      />

      {/* network constellation above the letters */}
      <g stroke="#38bdf8" strokeWidth="1" opacity="0.75">
        <line x1="112" y1="146" x2="168" y2="102" />
        <line x1="168" y1="102" x2="240" y2="82" />
        <line x1="240" y1="82" x2="312" y2="102" />
        <line x1="312" y1="102" x2="368" y2="146" />
        <line x1="112" y1="146" x2="240" y2="82" opacity="0.4" />
        <line x1="240" y1="82" x2="368" y2="146" opacity="0.4" />
        <line x1="168" y1="102" x2="312" y2="102" opacity="0.4" />
        <line x1="112" y1="146" x2="368" y2="146" opacity="0.25" />
        <line x1="112" y1="146" x2="112" y2="176" />
        <line x1="368" y1="146" x2="368" y2="176" />
      </g>
      {[
        [112, 146], [168, 102], [240, 82], [312, 102], [368, 146],
        [112, 176], [368, 176], [240, 128],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#38bdf8" />
      ))}

      {/* A */}
      <g>
        <path
          d="M58 268 L108 168 L138 168 L188 268 L158 268 L148 244 L98 244 L88 268 Z"
          fill="url(#aionMetal)"
          stroke="#e2e8f0"
          strokeWidth="1.5"
        />
        {/* circuit brain inside A */}
        <g stroke="#38bdf8" strokeWidth="1.6" fill="none">
          <path d="M123 198 c-6 0-10 4-10 9 0 2 0.6 3.4 1.8 4.6 -1.6 1.4-2.6 3.4-2.6 5.6 0 4.4 3.6 7.8 8 7.8 1.2 0 2.3-0.3 3.3-0.8 0.9 1.9 2.8 3.2 5 3.2 3 0 5.5-2.5 5.5-5.5 v-19 c0-2.8-2.4-5-5.4-5 -1.6 0-3 0.8-3.9 2 -0.8-1.3-2.3-2-3.7-2z" />
          <path d="M123 198 v30 M117 205 v14 M129 205 v14" opacity="0.8" />
          <circle cx="123" cy="212" r="2" fill="#38bdf8" stroke="none" />
        </g>
      </g>

      {/* I */}
      <path
        d="M200 168 h24 v100 h-24 z"
        fill="url(#aionMetal)"
        stroke="#e2e8f0"
        strokeWidth="1.5"
      />

      {/* O — globe */}
      <circle cx="240" cy="212" r="52" fill="none" stroke="url(#aionMetal)" strokeWidth="10" />
      <circle cx="240" cy="212" r="46" fill="url(#aionGlobe)" opacity="0.25" />
      <g clipPath="url(#globeClip)" stroke="#7dd3fc" strokeWidth="1" opacity="0.85" fill="none">
        <ellipse cx="240" cy="212" rx="46" ry="16" />
        <ellipse cx="240" cy="212" rx="46" ry="32" />
        <ellipse cx="240" cy="212" rx="16" ry="46" />
        <ellipse cx="240" cy="212" rx="32" ry="46" />
        <line x1="240" y1="166" x2="240" y2="258" />
        {/* continents hint */}
        <path d="M218 190 c6-6 16-8 24-4 4 2 6 6 10 6 6 0 10 4 12 9 2 6-2 12-8 13 -6 1-9-2-13-1 -5 1-8 6-13 6 -6 0-11-5-11-11 0-4 2-7 5-9 -5-1-8-5-6-9z" fill="#38bdf8" opacity="0.5" stroke="none" />
        <path d="M236 232 c4-2 10-1 13 3 2 4-1 8-6 9 -5 1-9-2-10-7 -1-3 1-4 3-5z" fill="#38bdf8" opacity="0.5" stroke="none" />
      </g>

      {/* N */}
      <path
        d="M292 168 h20 l56 68 v-68 h24 v100 h-20 l-56 -68 v68 h-24 z"
        fill="url(#aionMetal)"
        stroke="#e2e8f0"
        strokeWidth="1.5"
      />

      {/* full name */}
      <text
        x="240"
        y="330"
        textAnchor="middle"
        fill="#e2e8f0"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="15"
        letterSpacing="3"
      >
        ARTIFICIAL INTELLIGENCE AND
      </text>
      <text
        x="240"
        y="356"
        textAnchor="middle"
        fill="#e2e8f0"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fontSize="15"
        letterSpacing="3"
      >
        OPERATION NETWORK
      </text>
      <text
        x="240"
        y="392"
        textAnchor="middle"
        fill="#94a3b8"
        fontFamily="system-ui, sans-serif"
        fontSize="10"
        letterSpacing="4"
      >
        CONNECTING INTELLIGENCE,
      </text>
      <text
        x="240"
        y="410"
        textAnchor="middle"
        fill="#94a3b8"
        fontFamily="system-ui, sans-serif"
        fontSize="10"
        letterSpacing="4"
      >
        EMPOWERING THE FUTURE
      </text>
    </svg>
  );
}
