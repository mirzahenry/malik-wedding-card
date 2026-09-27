import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, fadeIn, viewportOnce } from '../animations/variants';
import GoldDivider from './GoldDivider';
import useCountdown from '../hooks/useCountdown';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// Countdown — animated wedding day timer
// ──────────────────────────────────────────────

// Single time unit box
function TimeUnit({ value, label }) {
  const prevValue = useRef(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (prevValue.current !== value) {
      setFlip(true);
      const t = setTimeout(() => setFlip(false), 400);
      prevValue.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  const display = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Number box */}
      <div
        className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center"
        style={{
          border: '1px solid rgba(212,175,106,0.4)',
          background: 'rgba(18,60,53,0.06)',
          boxShadow: '0 4px 20px rgba(18,60,53,0.08), inset 0 1px 0 rgba(212,175,106,0.1)',
        }}
      >
        {/* Gold corner dots */}
        {['top-1 left-1','top-1 right-1','bottom-1 left-1','bottom-1 right-1'].map((pos,i) => (
          <div key={i} className={`absolute ${pos} w-1 h-1 rounded-full bg-[#D4AF6A]/50`} aria-hidden="true"/>
        ))}

        <span
          className={`font-cormorant font-light text-[#24332F] leading-none select-none
            ${flip ? 'count-flip' : ''}`}
          style={{ fontSize: 'clamp(1.6rem, 5vw, 2.5rem)' }}
          aria-live="polite"
          aria-label={`${value} ${label}`}
        >
          {display}
        </span>

        {/* Subtle centre line */}
        <div
          className="absolute inset-x-0 top-1/2 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,106,0.2), transparent)' }}
          aria-hidden="true"
        />
      </div>

      {/* Label */}
      <p className="font-poppins text-[0.55rem] tracking-[0.3em] uppercase text-[#D4AF6A]">
        {label}
      </p>
    </div>
  );
}

export default function Countdown() {
  const { weddingDate } = weddingConfig;
  const { days, hours, minutes, seconds, isComplete } = useCountdown(weddingDate);

  return (
    <section
      className="section-emerald section-pad overflow-hidden relative"
      aria-label="Wedding countdown timer"
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(circle, #D4AF6A 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Gold top edge */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF6A 30%, #D4AF6A 70%, transparent)' }}
        aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF6A 30%, #D4AF6A 70%, transparent)' }}
        aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-12"
        >
          <motion.p
            className="font-poppins text-[0.6rem] tracking-[0.35em] uppercase text-[#D4AF6A] mb-4"
            variants={fadeIn}
          >
            Counting Down
          </motion.p>
          <motion.h2
            className="font-cormorant font-light text-[#E8D3A8]"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
            variants={fadeUp}
          >
            Our Big Day
          </motion.h2>
          <GoldDivider className="mt-2" />
          <motion.p
            className="font-cormorant italic text-[#E8D3A8]/50 text-lg mt-4"
            variants={fadeUp}
          >
            19 December 2026 · Bahawalpur
          </motion.p>
        </motion.div>

        {/* Countdown units or completion message */}
        {isComplete ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-cormorant text-[#E8D3A8] text-4xl md:text-5xl">
              Today is the Day! ❤️
            </p>
            <p className="font-poppins text-[#D4AF6A]/70 text-sm tracking-wider mt-4">
              Celebrating Ahmed &amp; Ayesha
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp}><TimeUnit value={days}    label="Days"    /></motion.div>

            {/* Separator */}
            <motion.div variants={fadeIn} className="flex flex-col gap-3 mb-6" aria-hidden="true">
              <div className="w-1 h-1 rounded-full bg-[#D4AF6A]/40" />
              <div className="w-1 h-1 rounded-full bg-[#D4AF6A]/40" />
            </motion.div>

            <motion.div variants={fadeUp}><TimeUnit value={hours}   label="Hours"   /></motion.div>

            <motion.div variants={fadeIn} className="flex flex-col gap-3 mb-6" aria-hidden="true">
              <div className="w-1 h-1 rounded-full bg-[#D4AF6A]/40" />
              <div className="w-1 h-1 rounded-full bg-[#D4AF6A]/40" />
            </motion.div>

            <motion.div variants={fadeUp}><TimeUnit value={minutes} label="Minutes" /></motion.div>

            <motion.div variants={fadeIn} className="flex flex-col gap-3 mb-6" aria-hidden="true">
              <div className="w-1 h-1 rounded-full bg-[#D4AF6A]/40" />
              <div className="w-1 h-1 rounded-full bg-[#D4AF6A]/40" />
            </motion.div>

            <motion.div variants={fadeUp}><TimeUnit value={seconds} label="Seconds" /></motion.div>
          </motion.div>
        )}

        {/* Urdu */}
        <motion.p
          className="font-urdu text-[#E8D3A8]/40 text-sm mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ delay: 0.5 }}
        >
          وقت قریب آ رہا ہے
        </motion.p>
      </div>
    </section>
  );
}
