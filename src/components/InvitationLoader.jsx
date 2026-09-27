import { motion } from 'framer-motion';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// InvitationLoader — luxury initial loading screen
// Shows briefly before OpeningScreen appears
// ──────────────────────────────────────────────
export default function InvitationLoader({ onComplete }) {
  const { groom, bride } = weddingConfig;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center opening-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Names */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="font-cormorant text-4xl md:text-5xl text-[#E8D3A8] tracking-widest mb-1">
          {groom.firstName}
        </p>
        <p className="font-cormorant text-xl text-[#D4AF6A] tracking-[0.3em] my-1">&amp;</p>
        <p className="font-cormorant text-4xl md:text-5xl text-[#E8D3A8] tracking-widest">
          {bride.firstName}
        </p>
      </motion.div>

      {/* Loading bar */}
      <motion.div
        className="mt-10 w-48 h-[1px] bg-[#123C35] overflow-hidden rounded"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full"
          style={{ background: 'linear-gradient(90deg, #B8922A, #D4AF6A, #F0E0B0, #D4AF6A)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.6 }}
          onAnimationComplete={onComplete}
        />
      </motion.div>
    </motion.div>
  );
}
