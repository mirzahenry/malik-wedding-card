import { useEffect, useRef } from 'react';

// ──────────────────────────────────────────────
// FloatingPetals — CSS-animated falling petals
// Respects prefers-reduced-motion
// ──────────────────────────────────────────────

const PETAL_COLORS = [
  'rgba(212,175,106,0.55)',
  'rgba(232,211,168,0.45)',
  'rgba(245,239,227,0.6)',
  'rgba(212,175,106,0.35)',
  'rgba(255,220,180,0.4)',
];

const PETAL_COUNT = 18;

function createPetal() {
  const size = Math.random() * 8 + 5; // 5–13px
  const left = Math.random() * 100;
  const delay = Math.random() * 12;
  const duration = Math.random() * 8 + 8; // 8–16s
  const color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
  const swayAmount = (Math.random() - 0.5) * 80;

  return { size, left, delay, duration, color, swayAmount };
}

// SVG petal path
function PetalSVG({ color, size }) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 10 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 1 C8 3 9 7 7 10 C6 12 5 13 5 13 C5 13 4 12 3 10 C1 7 2 3 5 1Z"
        fill={color}
      />
    </svg>
  );
}

export default function FloatingPetals({ active = true }) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!active || prefersReduced) return null;

  const petals = Array.from({ length: PETAL_COUNT }, createPetal);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-40px',
            animation: `petalFall ${p.duration}s linear ${p.delay}s infinite`,
            '--sway': `${p.swayAmount}px`,
          }}
        >
          <PetalSVG color={p.color} size={p.size} />
        </div>
      ))}

      {/* Sway keyframes injected once */}
      <style>{`
        @keyframes petalFall {
          0%   { transform: translateY(0)    translateX(0)   rotate(0deg);   opacity: 0; }
          5%   { opacity: 0.9; }
          50%  { transform: translateY(50vh) translateX(var(--sway, 20px)) rotate(360deg); }
          95%  { opacity: 0.4; }
          100% { transform: translateY(110vh) translateX(calc(var(--sway, 20px) * 1.5)) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
