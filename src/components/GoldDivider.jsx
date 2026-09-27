import { motion } from 'framer-motion';
import { viewportOnce } from '../animations/variants';

// ──────────────────────────────────────────────
// GoldDivider — ornamental horizontal divider
// ──────────────────────────────────────────────
export default function GoldDivider({ className = '' }) {
  return (
    <motion.div
      className={`flex items-center justify-center gap-3 my-6 ${className}`}
      initial={{ opacity: 0, scaleX: 0.4 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Left line */}
      <div className="h-px flex-1 max-w-[80px]"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF6A)' }} />

      {/* Centre ornament */}
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true">
        <path d="M16 2 L20 8 L16 14 L12 8 Z" fill="#D4AF6A" fillOpacity="0.9" />
        <circle cx="2"  cy="8" r="1.5" fill="#D4AF6A" fillOpacity="0.6" />
        <circle cx="30" cy="8" r="1.5" fill="#D4AF6A" fillOpacity="0.6" />
        <line x1="4" y1="8" x2="11" y2="8" stroke="#D4AF6A" strokeWidth="0.8" strokeOpacity="0.7" />
        <line x1="21" y1="8" x2="28" y2="8" stroke="#D4AF6A" strokeWidth="0.8" strokeOpacity="0.7" />
      </svg>

      {/* Right line */}
      <div className="h-px flex-1 max-w-[80px]"
        style={{ background: 'linear-gradient(90deg, #D4AF6A, transparent)' }} />
    </motion.div>
  );
}
