import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DecorativeCorner from './DecorativeCorner';
import weddingConfig from '../config/weddingConfig';

// ─────────────────────────────────────────────────────────────────────────────
// OpeningScreen — luxury invitation cover with full responsive layout
//
// Layout strategy:
//   • Outer wrapper:  fixed inset-0, overflow hidden  → curtain animation layer
//   • Scroll layer:   absolute inset-0, overflow-y-auto  → never clips content
//   • Inner card:     min-height 100svh (falls back to 100vh), flex column,
//                     justify-center, py safe padding  → centered on tall screens,
//                     scrollable on short screens
//   • Decorative border + corners: absolute (NOT fixed) inside scroll layer
//                     with enough inset so text never collides on 320px widths
// ─────────────────────────────────────────────────────────────────────────────

// Gold particle burst
function GoldParticles({ active }) {
  if (!active) return null;
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 260,
    y: (Math.random() - 0.5) * 260,
    size: Math.random() * 5 + 3,
    delay: Math.random() * 0.25,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-[200] flex items-center justify-center"
      aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size, height: p.size,
            background: 'radial-gradient(circle, #F0E0B0, #D4AF6A)',
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
          animate={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: p.delay, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
}

export default function OpeningScreen({ onOpen, musicRef }) {
  const { groom, bride } = weddingConfig;
  const [opening,   setOpening]   = useState(false);
  const [particles, setParticles] = useState(false);
  const [done,      setDone]      = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    setParticles(true);
    if (musicRef?.current) musicRef.current.play().catch(() => {});
    setTimeout(() => { setDone(true); onOpen?.(); }, 1400);
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          // ── Outermost: covers viewport, clips curtains only ──────────────
          className="fixed inset-0 z-[100]"
          style={{ overflow: 'hidden' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <GoldParticles active={particles} />

          {/* LEFT curtain */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 opening-bg z-10 pointer-events-none"
            animate={opening ? { x: '-100%' } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden="true"
          >
            <div className="absolute right-0 inset-y-0 w-[2px]"
              style={{ background: 'linear-gradient(180deg, transparent, #D4AF6A 20%, #D4AF6A 80%, transparent)' }} />
          </motion.div>

          {/* RIGHT curtain */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 opening-bg z-10 pointer-events-none"
            animate={opening ? { x: '100%' } : { x: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden="true"
          >
            <div className="absolute left-0 inset-y-0 w-[2px]"
              style={{ background: 'linear-gradient(180deg, transparent, #D4AF6A 20%, #D4AF6A 80%, transparent)' }} />
          </motion.div>

          {/* ── Scroll layer: sits above curtains, allows vertical scroll ── */}
          <motion.div
            className="absolute inset-0 z-20 opening-bg opening-scroll"
            animate={opening ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            {/* ── Decorative border frame — absolute so it doesn't scroll ── */}
            {/* Uses larger inset on mobile (14px) to keep clear of content   */}
            <div
              className="absolute pointer-events-none z-10"
              style={{ inset: 'clamp(10px, 2.5vw, 22px)', border: '1px solid rgba(212,175,106,0.22)' }}
              aria-hidden="true"
            />
            <div
              className="absolute pointer-events-none z-10"
              style={{ inset: 'clamp(18px, 4vw, 36px)', border: '1px solid rgba(212,175,106,0.09)' }}
              aria-hidden="true"
            />

            {/* ── Decorative corners — absolute, sized responsively ── */}
            <DecorativeCorner position="tl" size={52}
              className="absolute z-10" style={{ top: 'clamp(4px,1.2vw,12px)', left: 'clamp(4px,1.2vw,12px)' }} />
            <DecorativeCorner position="tr" size={52}
              className="absolute z-10" style={{ top: 'clamp(4px,1.2vw,12px)', right: 'clamp(4px,1.2vw,12px)' }} />
            <DecorativeCorner position="bl" size={52}
              className="absolute z-10" style={{ bottom: 'clamp(4px,1.2vw,12px)', left: 'clamp(4px,1.2vw,12px)' }} />
            <DecorativeCorner position="br" size={52}
              className="absolute z-10" style={{ bottom: 'clamp(4px,1.2vw,12px)', right: 'clamp(4px,1.2vw,12px)' }} />

            {/* ── Inner content card ──────────────────────────────────────── */}
            {/*  • opening-min-h keeps content centred on tall screens with    */}
            {/*    svh fallback to regular vh on older browsers                */}
            {/*  • padding: safe zone so content never hits the border frame    */}
            {/*  • No max-height / no overflow:hidden here                     */}
            <div
              className="opening-min-h relative flex flex-col items-center justify-center text-center"
              style={{
                padding: 'clamp(60px, 8vh, 100px) clamp(28px, 6vw, 80px)',
              }}
            >

              {/* ── Bismillah ─────────────────────────────────────────────── */}
              <motion.p
                className="font-urdu text-[#E8D3A8] opacity-90 leading-loose"
                style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.35rem)', marginBottom: 'clamp(8px, 1.5vh, 18px)' }}
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              </motion.p>

              {/* ── Top gold divider ──────────────────────────────────────── */}
              <motion.div
                className="gold-line"
                style={{ marginBottom: 'clamp(10px, 1.8vh, 22px)' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                aria-hidden="true"
              />

              {/* ── Announcement ─────────────────────────────────────────── */}
              <motion.p
                className="font-poppins text-[#B8D4BC] uppercase"
                style={{
                  fontSize: 'clamp(0.5rem, 1.6vw, 0.7rem)',
                  letterSpacing: 'clamp(0.12em, 0.5vw, 0.32em)',
                  marginBottom: 'clamp(14px, 3vh, 32px)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                Together with their beloved families
              </motion.p>

              {/* ── Groom name ───────────────────────────────────────────── */}
              <motion.h1
                className="font-cormorant text-[#E8D3A8] font-light tracking-widest leading-none"
                style={{ fontSize: 'clamp(2.4rem, 10vw, 6rem)' }}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7 }}
              >
                {groom.firstName}
              </motion.h1>

              {/* ── Ampersand ────────────────────────────────────────────── */}
              <motion.div
                style={{ margin: 'clamp(4px, 1.2vh, 16px) 0' }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                aria-label="and"
              >
                <span
                  className="font-cormorant font-light text-[#D4AF6A]"
                  style={{ fontSize: 'clamp(1.6rem, 5vw, 3.2rem)' }}
                >
                  &amp;
                </span>
              </motion.div>

              {/* ── Bride name ───────────────────────────────────────────── */}
              <motion.h1
                className="font-cormorant text-[#E8D3A8] font-light tracking-widest leading-none"
                style={{ fontSize: 'clamp(2.4rem, 10vw, 6rem)' }}
                initial={{ opacity: 0, y: -22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.8 }}
              >
                {bride.firstName}
              </motion.h1>

              {/* ── Bottom gold divider ───────────────────────────────────── */}
              <motion.div
                className="gold-line"
                style={{ margin: 'clamp(12px, 2.2vh, 28px) 0 clamp(10px, 1.8vh, 22px)' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                aria-hidden="true"
              />

              {/* ── Honour text ──────────────────────────────────────────── */}
              <motion.p
                className="font-poppins text-[#B8D4BC] uppercase"
                style={{
                  fontSize: 'clamp(0.5rem, 1.6vw, 0.7rem)',
                  letterSpacing: 'clamp(0.12em, 0.5vw, 0.32em)',
                  marginBottom: 'clamp(18px, 3.5vh, 40px)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.1 }}
              >
                Request the honour of your presence
              </motion.p>

              {/* ── Open Invitation button ───────────────────────────────── */}
              <motion.button
                onClick={handleOpen}
                className="relative overflow-hidden group flex-shrink-0"
                style={{ marginBottom: 'clamp(16px, 3vh, 36px)' }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.3 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Open the wedding invitation"
              >
                <span
                  className="relative z-10 flex items-center justify-center gap-2 border border-[#D4AF6A]/70
                    font-poppins uppercase text-[#E8D3A8] transition-colors duration-300 group-hover:text-[#123C35]"
                  style={{
                    fontSize: 'clamp(0.55rem, 1.8vw, 0.68rem)',
                    letterSpacing: 'clamp(0.14em, 0.5vw, 0.3em)',
                    padding: 'clamp(10px,1.8vh,16px) clamp(22px,4vw,40px)',
                  }}
                >
                  {/* Left flourish */}
                  <svg width="12" height="7" viewBox="0 0 16 8" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M0 4 Q4 1 8 4 Q12 7 16 4" stroke="#D4AF6A" strokeWidth="1.2" strokeOpacity="0.85" fill="none"/>
                  </svg>
                  Open Invitation
                  {/* Right flourish */}
                  <svg width="12" height="7" viewBox="0 0 16 8" fill="none" aria-hidden="true" className="shrink-0">
                    <path d="M0 4 Q4 7 8 4 Q12 1 16 4" stroke="#D4AF6A" strokeWidth="1.2" strokeOpacity="0.85" fill="none"/>
                  </svg>
                </span>
                {/* Hover fill */}
                <span
                  className="absolute inset-0 bg-[#D4AF6A] transform scale-x-0 group-hover:scale-x-100
                    transition-transform duration-300 origin-left"
                  aria-hidden="true"
                />
              </motion.button>

              {/* ── Urdu subtitle ─────────────────────────────────────────── */}
              <motion.p
                className="font-urdu text-[#B8D4BC]/60 leading-loose"
                style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.95rem)' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                آپ کی تشریف آوری ہمارے لیے باعثِ مسرت ہوگی
              </motion.p>

            </div>{/* /inner card */}
          </motion.div>{/* /scroll layer */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
