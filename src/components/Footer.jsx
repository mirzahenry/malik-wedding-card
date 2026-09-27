import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { staggerContainer, fadeUp, fadeIn, viewportOnce } from '../animations/variants';
import GoldDivider from './GoldDivider';
import ShareButton from './ShareButton';
import CalendarButton from './CalendarButton';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// Footer — elegant closing section
// ──────────────────────────────────────────────
export default function Footer() {
  const { groom, bride } = weddingConfig;

  return (
    <footer
      className="section-emerald overflow-hidden relative"
      aria-label="Wedding invitation footer"
    >
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF6A 30%, #D4AF6A 70%, transparent)' }}
        aria-hidden="true" />

      {/* Background dots */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, #D4AF6A 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-20 pb-12 text-center">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {/* With Love */}
          <motion.p
            className="font-cormorant italic text-[#D4AF6A] text-xl mb-4"
            variants={fadeIn}
          >
            With Love
          </motion.p>

          {/* Names */}
          <motion.h2
            className="font-cormorant font-light text-[#E8D3A8]"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
            variants={fadeUp}
          >
            {groom.firstName} &amp; {bride.firstName}
          </motion.h2>

          <GoldDivider className="mt-3 mb-6" />

          {/* Thank you message */}
          <motion.p
            className="font-poppins text-[#E8D3A8]/60 text-sm leading-relaxed max-w-md mx-auto mb-8"
            variants={fadeUp}
          >
            Thank you for being part of our special day.
            <br />Your love and blessings mean the world to us.
          </motion.p>

          {/* Heart */}
          <motion.div
            className="flex justify-center mb-8"
            variants={fadeIn}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            <Heart size={36} color="#D4AF6A" fill="rgba(212,175,106,0.35)" aria-hidden="true" />
          </motion.div>

          {/* Urdu blessing */}
          <motion.p
            className="font-urdu text-[#E8D3A8]/40 text-lg mb-10"
            variants={fadeIn}
          >
            اللہ تعالیٰ ہمارے نکاح کو مبارک فرمائے
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
            variants={fadeUp}
          >
            <ShareButton />
            <CalendarButton />
          </motion.div>

          {/* Date reminder */}
          <motion.div
            className="inline-block border border-[#D4AF6A]/20 px-8 py-4 mb-10"
            variants={scaleIn_}
          >
            <p className="font-poppins text-[0.55rem] tracking-[0.35em] uppercase text-[#D4AF6A]/60 mb-1">
              Save the Date
            </p>
            <p className="font-cormorant text-[#E8D3A8]/70 text-xl">
              19 December 2026
            </p>
            <p className="font-poppins text-[0.55rem] tracking-[0.2em] text-[#E8D3A8]/30 mt-1">
              Bahawalpur, Pakistan
            </p>
          </motion.div>

          {/* Bottom line */}
          <motion.div
            className="border-t border-[#D4AF6A]/10 pt-6"
            variants={fadeIn}
          >
            <p className="font-poppins text-[0.55rem] tracking-[0.2em] text-[#E8D3A8]/20">
              Made with ❤️ for {groom.firstName} &amp; {bride.firstName}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}

// Local scale variant for footer card
const scaleIn_ = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};
