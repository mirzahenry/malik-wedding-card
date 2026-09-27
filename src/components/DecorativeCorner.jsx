// ──────────────────────────────────────────────
// DecorativeCorner — gold SVG corner ornament
// position: 'tl' | 'tr' | 'bl' | 'br'
// Accepts className and style so callers can
// control positioning (absolute / fixed / inset).
// ──────────────────────────────────────────────
export default function DecorativeCorner({ position = 'tl', size = 60, className = '', style = {} }) {
  const rotations = { tl: 0, tr: 90, br: 180, bl: 270 };
  const rotate = rotations[position] ?? 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden="true"
    >
      {/* Main corner lines */}
      <path d="M4 4 L4 28" stroke="#D4AF6A" strokeWidth="1" strokeOpacity="0.7" />
      <path d="M4 4 L28 4" stroke="#D4AF6A" strokeWidth="1" strokeOpacity="0.7" />

      {/* Inner corner lines */}
      <path d="M10 10 L10 22" stroke="#D4AF6A" strokeWidth="0.6" strokeOpacity="0.4" />
      <path d="M10 10 L22 10" stroke="#D4AF6A" strokeWidth="0.6" strokeOpacity="0.4" />

      {/* Corner diamond */}
      <path d="M4 4 L7 7 L4 10 L1 7 Z" fill="#D4AF6A" fillOpacity="0.8" />

      {/* Leaf flourishes */}
      <path d="M4 28 Q8 22 14 18" stroke="#D4AF6A" strokeWidth="0.7" strokeOpacity="0.5" fill="none" />
      <path d="M28 4 Q22 8 18 14" stroke="#D4AF6A" strokeWidth="0.7" strokeOpacity="0.5" fill="none" />

      {/* Small decorative dots */}
      <circle cx="4"  cy="34" r="1" fill="#D4AF6A" fillOpacity="0.4" />
      <circle cx="34" cy="4"  r="1" fill="#D4AF6A" fillOpacity="0.4" />
    </svg>
  );
}
