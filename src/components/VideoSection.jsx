import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { staggerContainer, fadeUp, fadeIn, scaleIn, viewportOnce } from '../animations/variants';
import GoldDivider from './GoldDivider';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// VideoSection — wedding story trailer
// ──────────────────────────────────────────────
export default function VideoSection() {
  const { video } = weddingConfig;
  const [isOpen, setIsOpen] = useState(false);

  const hasVideo = video.src || video.youtubeId;

  const openModal  = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <section
        className="section-emerald section-pad overflow-hidden relative"
        aria-label="Wedding story video"
      >
        {/* Decorative dots background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(circle, #D4AF6A 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

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
              Our Story in Motion
            </motion.p>
            <motion.h2
              className="font-cormorant font-light text-[#E8D3A8]"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
              variants={fadeUp}
            >
              The Wedding Trailer
            </motion.h2>
            <GoldDivider className="mt-2" />
            <motion.p
              className="font-cormorant italic text-[#E8D3A8]/50 text-lg mt-4"
              variants={fadeUp}
            >
              A cinematic glimpse into our love story
            </motion.p>
          </motion.div>

          {/* Video thumbnail */}
          <motion.div
            className="relative mx-auto max-w-3xl cursor-pointer group"
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            onClick={openModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openModal()}
            aria-label="Play wedding story video"
          >
            {/* Poster image */}
            <div
              className="relative overflow-hidden"
              style={{
                paddingBottom: '56.25%', // 16:9
                border: '1px solid rgba(212,175,106,0.25)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={video.poster}
                alt="Wedding trailer thumbnail"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-[#123C35]/50 group-hover:bg-[#123C35]/35 transition-colors duration-300" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Pulsing rings */}
                  <div className="absolute inset-0 rounded-full border border-[#D4AF6A]/30 animate-ping scale-150" aria-hidden="true" />
                  <div className="absolute inset-0 rounded-full border border-[#D4AF6A]/20 animate-ping scale-200 animation-delay-200" aria-hidden="true" />

                  {/* Play circle */}
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-[#D4AF6A]
                      flex items-center justify-center bg-[#D4AF6A]/10 backdrop-blur-sm"
                  >
                    <Play size={24} color="#D4AF6A" fill="rgba(212,175,106,0.8)" className="ml-1" />
                  </div>
                </motion.div>
              </div>

              {/* Gold corner accents */}
              {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map((pos,i) => (
                <div key={i} className={`absolute ${pos} w-5 h-5`} aria-hidden="true">
                  <div className="w-full h-px bg-[#D4AF6A]/50" />
                  <div className="h-full w-px bg-[#D4AF6A]/50" />
                </div>
              ))}
            </div>

            <p className="font-poppins text-[0.6rem] tracking-[0.25em] uppercase text-[#D4AF6A]/60 mt-4">
              Click to play
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9000] flex items-center justify-center bg-[#0a2820]/97"
            role="dialog"
            aria-modal="true"
            aria-label="Video player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <button
              className="absolute top-5 right-5 p-2 text-[#E8D3A8] hover:text-[#D4AF6A] transition-colors
                focus-visible:ring-2 focus-visible:ring-[#D4AF6A] rounded"
              onClick={closeModal}
              aria-label="Close video"
            >
              <X size={24} />
            </button>

            <motion.div
              className="relative w-full max-w-4xl mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ paddingBottom: '56.25%', position: 'relative' }}
            >
              {hasVideo ? (
                video.youtubeId ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                    title="Wedding Story Video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <video
                    className="absolute inset-0 w-full h-full"
                    src={video.src}
                    controls
                    autoPlay
                    poster={video.poster}
                  >
                    Your browser does not support the video tag.
                  </video>
                )
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#123C35]/50">
                  <p className="font-cormorant text-[#E8D3A8] text-2xl mb-2">Coming Soon</p>
                  <p className="font-poppins text-[#D4AF6A]/60 text-sm">
                    The wedding trailer will be available soon
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
