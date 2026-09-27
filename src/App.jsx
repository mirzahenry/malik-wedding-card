import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// ── Screens ────────────────────────────────────
import InvitationLoader from './components/InvitationLoader';
import OpeningScreen    from './components/OpeningScreen';

// ── Layout ─────────────────────────────────────
import Navbar from './components/Navbar';

// ── Sections ───────────────────────────────────
import Hero            from './components/Hero';
import CoupleSection   from './components/CoupleSection';
import Countdown       from './components/Countdown';
import Story           from './components/Story';
import Events          from './components/Events';
import Gallery         from './components/Gallery';
import VideoSection    from './components/VideoSection';
import InvitationCard  from './components/InvitationCard';
import Venue           from './components/Venue';
import RSVP            from './components/RSVP';
import Footer          from './components/Footer';

// ── Floating UI ────────────────────────────────
import FloatingPetals from './components/FloatingPetals';
import MusicPlayer    from './components/MusicPlayer';

// ── Config ─────────────────────────────────────
import weddingConfig from './config/weddingConfig';

// ──────────────────────────────────────────────
// Custom cursor (desktop only)
// ──────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Only activate on pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 9 + 'px';
        cursorRef.current.style.top  = e.clientY - 9 + 'px';
      }
    };

    const over = (e) => {
      const el = e.target.closest('a, button, [role="button"], input, select, textarea, label[for]');
      setHovered(!!el);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor hidden md:block ${hovered ? 'hovered' : ''}`}
      aria-hidden="true"
    />
  );
}

// ──────────────────────────────────────────────
// App root
// ──────────────────────────────────────────────
export default function App() {
  const [loading,       setLoading]       = useState(true);   // loader bar
  const [opened,        setOpened]        = useState(false);  // invitation opened
  const [musicStarted,  setMusicStarted]  = useState(false);  // after user click
  const audioRef = useRef(null);

  // Hide custom cursor CSS on mobile
  useEffect(() => {
    if (!window.matchMedia('(pointer: coarse)').matches) {
      document.body.style.cursor = 'none';
    }
    return () => { document.body.style.cursor = ''; };
  }, []);

  const handleLoaderDone = () => setLoading(false);

  const handleOpen = () => {
    setOpened(true);
    setMusicStarted(true);
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={weddingConfig.music.src}
        loop
        preload="none"
        aria-hidden="true"
      />

      {/* Floating petals — after invitation opened */}
      <FloatingPetals active={opened} />

      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* ── Loading & Opening overlays ── */}
      <AnimatePresence>
        {loading && (
          <InvitationLoader key="loader" onComplete={handleLoaderDone} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && !opened && (
          <OpeningScreen key="opening" onOpen={handleOpen} musicRef={audioRef} />
        )}
      </AnimatePresence>

      {/* ── Main invitation content ── */}
      {opened && (
        <div className="relative overflow-x-hidden">
          <Navbar />

          <main id="main-content">
            {/* 1. Hero */}
            <Hero />

            {/* 2. Couple */}
            <CoupleSection />

            {/* 3. Countdown */}
            <Countdown />

            {/* 4. Love Story */}
            <Story />

            {/* 5. Wedding Events */}
            <Events />

            {/* 6. Gallery */}
            <Gallery />

            {/* 7. Video Trailer */}
            <VideoSection />

            {/* 8. Invitation Card keepsake */}
            <InvitationCard />

            {/* 9. Venue */}
            <Venue />

            {/* 10. RSVP */}
            <RSVP />
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating music player */}
          <MusicPlayer audioRef={audioRef} started={musicStarted} />
        </div>
      )}
    </>
  );
}
