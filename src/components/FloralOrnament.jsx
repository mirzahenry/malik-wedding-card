import { motion } from 'framer-motion';
import { viewportOnce } from '../animations/variants';

// ──────────────────────────────────────────────
// FloralOrnament — animated SVG floral divider
// variant: 'center' | 'left' | 'right'
// ──────────────────────────────────────────────
export default function FloralOrnament({ variant = 'center', className = '' }) {
  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.8 }}
    >
      <svg
        width="220"
        height="40"
        viewBox="0 0 220 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Centre flower */}
        <g transform="translate(110,20)">
          <circle cx="0" cy="0" r="3" fill="#D4AF6A" fillOpacity="0.9" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 8;
            const y = Math.sin(rad) * 8;
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="3"
                ry="1.8"
                fill="#D4AF6A"
                fillOpacity="0.5"
                transform={`rotate(${angle}, ${x}, ${y})`}
              />
            );
          })}
        </g>

        {/* Left branch */}
        <path d="M20 20 Q50 10 90 20" stroke="#D4AF6A" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
        <path d="M20 20 Q50 30 90 20" stroke="#D4AF6A" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />

        {/* Right branch */}
        <path d="M200 20 Q170 10 130 20" stroke="#D4AF6A" strokeWidth="0.8" strokeOpacity="0.6" fill="none" />
        <path d="M200 20 Q170 30 130 20" stroke="#D4AF6A" strokeWidth="0.8" strokeOpacity="0.3" fill="none" />

        {/* Left leaf clusters */}
        <path d="M40 18 Q45 12 52 16" stroke="#D4AF6A" strokeWidth="0.7" strokeOpacity="0.5" fill="none" />
        <path d="M60 16 Q65 10 72 14" stroke="#D4AF6A" strokeWidth="0.7" strokeOpacity="0.5" fill="none" />
        <circle cx="20" cy="20" r="2"   fill="#D4AF6A" fillOpacity="0.6" />
        <circle cx="50" cy="16" r="1.5" fill="#D4AF6A" fillOpacity="0.4" />
        <circle cx="70" cy="14" r="1.5" fill="#D4AF6A" fillOpacity="0.4" />

        {/* Right leaf clusters */}
        <path d="M180 18 Q175 12 168 16" stroke="#D4AF6A" strokeWidth="0.7" strokeOpacity="0.5" fill="none" />
        <path d="M160 16 Q155 10 148 14" stroke="#D4AF6A" strokeWidth="0.7" strokeOpacity="0.5" fill="none" />
        <circle cx="200" cy="20" r="2"   fill="#D4AF6A" fillOpacity="0.6" />
        <circle cx="170" cy="16" r="1.5" fill="#D4AF6A" fillOpacity="0.4" />
        <circle cx="150" cy="14" r="1.5" fill="#D4AF6A" fillOpacity="0.4" />
      </svg>
    </motion.div>
  );
}
