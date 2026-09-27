import { useInView } from 'framer-motion';
import { useRef } from 'react';

// ──────────────────────────────────────────────
// useScrollAnimation — returns { ref, isInView }
// Convenience wrapper around Framer Motion useInView
// ──────────────────────────────────────────────
export default function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-80px',
    ...options,
  });
  return { ref, isInView };
}
