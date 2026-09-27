import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, fadeIn, textReveal } from '../animations/variants';
import DecorativeCorner from './DecorativeCorner';
import FloralOrnament from './FloralOrnament';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// Hero — full-viewport romantic landing section
// ──────────────────────────────────────────────

function formatWeddingDate(dateStr) {
  const d = new Date(dateStr);
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: d.toLocaleString('en-US', { month: 'long' }).toUpperCase(),
    year: d.getFullYear(),
  };
}

// Subtle animated background bokeh circles
function BokehCircles() {
  const circles = [
    { w: 300, h: 300, top: '10%',  left: '5%',  delay: 0 },
    { w: 200, h: 200, top: '60%',  right: '8%', delay: 2 },
    { w: 150, h: 150, top: '30%',  right: '20%',delay: 4 },
    { w: 250, h: 250, bottom: '15%',left: '15%', delay: 1 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {circles.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: c.w,
            height: c.h,
            top: c.top,
            left: c.left,
            right: c.right,
            bottom: c.bottom,
            background: 'radial-gradient(circle, rgba(212,175,106,0.06) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, delay: c.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const { groom, bride, weddingDate } = weddingConfig;
  const { day, month, year } = formatWeddingDate(weddingDate);
  const heroRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);

  // Subtle parallax
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) setOffsetY(window.scrollY * 0.25);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-ivory"
      aria-label="Wedding hero section"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(18,60,53,0.08) 0%, transparent 60%)',
          transform: `translateY(${offsetY}px)`,
        }}
        aria-hidden="true"
      />

      <BokehCircles />

      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #D4AF6A 30%, #D4AF6A 70%, transparent)' }}
        aria-hidden="true" />

      {/* Decorative corners */}
      <DecorativeCorner position="tl" size={80} className="top-14 left-5 md:top-16 md:left-10" />
      <DecorativeCorner position="tr" size={80} className="top-14 right-5 md:top-16 md:right-10" />
      <DecorativeCorner position="bl" size={80} className="bottom-8 left-5 md:bottom-10 md:left-10" />
      <DecorativeCorner position="br" size={80} className="bottom-8 right-5 md:bottom-10 md:right-10" />

      {/* Border frame */}
      <div className="absolute inset-x-4 inset-y-[60px] md:inset-x-8 md:inset-y-[70px] border border-[#D4AF6A]/15 pointer-events-none" aria-hidden="true" />

      {/* ── Main Content ── */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Bismillah */}
        <motion.p
          className="font-urdu text-[#123C35]/70 text-lg md:text-xl mb-6"
          variants={fadeIn}
        >
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </motion.p>

        {/* Eyebrow */}
        <motion.p
          className="font-poppins text-[0.65rem] tracking-[0.35em] uppercase text-[#D4AF6A] mb-6"
          variants={fadeUp}
        >
          Together with their families
        </motion.p>

        {/* Groom name */}
        <motion.h1
          className="font-cormorant font-light text-[#24332F] leading-none tracking-wide"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)' }}
          variants={textReveal}
        >
          {groom.firstName}
        </motion.h1>

        {/* Ampersand with floral */}
        <motion.div
          className="flex items-center justify-center gap-4 my-4 md:my-6"
          variants={fadeIn}
        >
          <div className="h-px flex-1 max-w-[100px]"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF6A)' }} aria-hidden="true" />
          <span
            className="font-cormorant text-[#D4AF6A] font-light"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            aria-label="and"
          >
            &amp;
          </span>
          <div className="h-px flex-1 max-w-[100px]"
            style={{ background: 'linear-gradient(90deg, #D4AF6A, transparent)' }} aria-hidden="true" />
        </motion.div>

        {/* Bride name */}
        <motion.h1
          className="font-cormorant font-light text-[#24332F] leading-none tracking-wide"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 8rem)' }}
          variants={textReveal}
        >
          {bride.firstName}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-cormorant italic text-[#123C35]/60 text-lg md:text-2xl mt-6 mb-8"
          variants={fadeUp}
        >
          Invite you to celebrate their wedding
        </motion.p>

        {/* Floral ornament */}
        <motion.div variants={fadeIn}>
          <FloralOrnament className="mb-8" />
        </motion.div>

        {/* Wedding date */}
        <motion.div
          className="flex items-end justify-center gap-3 md:gap-5"
          variants={staggerContainer}
        >
          <motion.div className="text-center" variants={fadeUp}>
            <p
              className="font-cormorant font-light text-[#24332F] leading-none"
              style={{ fontSize: 'clamp(3rem, 8vw, 5rem)' }}
            >
              {day}
            </p>
          </motion.div>

          <motion.div className="text-center pb-2 md:pb-3" variants={fadeUp}>
            <p className="font-poppins text-[0.6rem] tracking-[0.3em] text-[#D4AF6A] uppercase mb-1">{month}</p>
            <p className="font-poppins text-[0.6rem] tracking-[0.2em] text-[#24332F]/50">{year}</p>
          </motion.div>
        </motion.div>

        {/* Location */}
        <motion.p
          className="font-poppins text-[0.65rem] tracking-[0.25em] uppercase text-[#24332F]/50 mt-5"
          variants={fadeUp}
        >
          Bahawalpur, Pakistan
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2"
          variants={fadeIn}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <span className="font-poppins text-[0.55rem] tracking-[0.25em] uppercase text-[#24332F]/30">
            Scroll
          </span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
            <rect x="6" y="1" width="4" height="8" rx="2" stroke="#D4AF6A" strokeWidth="1" strokeOpacity="0.5"/>
            <circle cx="8" cy="5" r="1.5" fill="#D4AF6A" fillOpacity="0.6"/>
            <path d="M8 14 L8 22 M5 19 L8 22 L11 19" stroke="#D4AF6A" strokeWidth="0.8" strokeOpacity="0.5"/>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
