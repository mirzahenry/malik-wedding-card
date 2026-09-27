import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// MusicPlayer — floating bottom-right player
// Starts only after user interaction
// ──────────────────────────────────────────────
export default function MusicPlayer({ audioRef, started }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted,   setIsMuted]   = useState(false);
  const [showTip,   setShowTip]   = useState(false);
  const { music } = weddingConfig;

  // When music starts (after opening screen), update play state
  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const onPlay  = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('play',  onPlay);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('play',  onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, [audioRef]);

  // Show tip after 3s if music started
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => {
      setShowTip(true);
      setTimeout(() => setShowTip(false), 3000);
    }, 1000);
    return () => clearTimeout(t);
  }, [started]);

  const togglePlay = () => {
    const audio = audioRef?.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); } else { audio.play().catch(() => {}); }
  };

  const toggleMute = () => {
    const audio = audioRef?.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted((m) => !m);
  };

  if (!started) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      aria-label="Music player"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            className="bg-[#123C35] border border-[#D4AF6A]/30 px-3 py-2 rounded"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <p className="font-poppins text-[0.55rem] tracking-wider text-[#E8D3A8] whitespace-nowrap">
              🎵 {music.title}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player */}
      <div
        className="flex items-center gap-2 bg-[#123C35]/95 border border-[#D4AF6A]/30
          px-3 py-2.5 rounded-full backdrop-blur-sm"
        style={{ boxShadow: '0 4px 20px rgba(18,60,53,0.3)' }}
      >
        {/* Animated ring when playing */}
        <div className="relative">
          {isPlaying && (
            <>
              <div
                className="absolute inset-0 rounded-full border border-[#D4AF6A]/40"
                style={{ animation: 'ringPulse 2s ease-in-out infinite' }}
                aria-hidden="true"
              />
              <div
                className="absolute -inset-1 rounded-full border border-[#D4AF6A]/20"
                style={{ animation: 'ringPulse 2s ease-in-out infinite 0.5s' }}
                aria-hidden="true"
              />
            </>
          )}
          <div className="w-7 h-7 rounded-full border border-[#D4AF6A]/50 flex items-center justify-center relative z-10">
            <Music size={12} color="#D4AF6A" className={isPlaying ? 'animate-pulse-soft' : ''} />
          </div>
        </div>

        {/* Play/pause */}
        <button
          onClick={togglePlay}
          className="text-[#E8D3A8] hover:text-[#D4AF6A] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF6A] rounded-full p-0.5"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying
            ? <Pause size={14} fill="currentColor" />
            : <Play  size={14} fill="currentColor" />}
        </button>

        {/* Mute */}
        <button
          onClick={toggleMute}
          className="text-[#E8D3A8]/60 hover:text-[#D4AF6A] transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF6A] rounded-full p-0.5"
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted
            ? <VolumeX size={13} />
            : <Volume2 size={13} />}
        </button>
      </div>
    </div>
  );
}
