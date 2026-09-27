import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { staggerContainer, scaleIn, fadeIn, fadeUp, viewportOnce } from '../animations/variants';
import GoldDivider from './GoldDivider';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// Gallery — masonry grid + fullscreen lightbox
// ──────────────────────────────────────────────

const CATEGORIES = ['all', 'couple', 'wedding', 'engagement', 'family', 'memories'];

// Lightbox
function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const img = images[currentIndex];

  // Keyboard navigation
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape')    onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight')onNext();
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onKeyDown={handleKey}
      tabIndex={-1}
      ref={(el) => el?.focus()}
    >
      {/* Backdrop click closes */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Close */}
      <button
        className="absolute top-5 right-5 z-10 p-2 rounded-full border border-[#D4AF6A]/40
          text-[#E8D3A8] hover:bg-[#D4AF6A]/20 transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF6A]"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      {/* Prev */}
      {currentIndex > 0 && (
        <button
          className="absolute left-4 z-10 p-3 rounded-full border border-[#D4AF6A]/40
            text-[#E8D3A8] hover:bg-[#D4AF6A]/20 transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF6A]"
          onClick={onPrev}
          aria-label="Previous image"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next */}
      {currentIndex < images.length - 1 && (
        <button
          className="absolute right-4 z-10 p-3 rounded-full border border-[#D4AF6A]/40
            text-[#E8D3A8] hover:bg-[#D4AF6A]/20 transition-colors focus-visible:ring-2 focus-visible:ring-[#D4AF6A]"
          onClick={onNext}
          aria-label="Next image"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="relative z-10 max-w-4xl max-h-[85vh] w-full mx-4"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3 }}
        >
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-full object-contain max-h-[75vh] rounded"
            style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}
          />
          {/* Caption */}
          <div className="text-center mt-4">
            <p className="font-poppins text-[#E8D3A8]/60 text-xs tracking-wider">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// Gallery card
function GalleryCard({ image, index, onClick }) {
  const tall = index % 5 === 0 || index % 5 === 3; // vary heights for masonry feel

  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer group ${tall ? 'row-span-2' : ''}`}
      variants={scaleIn}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View ${image.alt}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className={`w-full object-cover transition-transform duration-700 group-hover:scale-110
          ${tall ? 'h-72 md:h-80' : 'h-48 md:h-56'}`}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#123C35]/60 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
        <ZoomIn size={20} color="#D4AF6A" />
      </div>
      {/* Gold border on hover */}
      <div className="absolute inset-0 border border-[#D4AF6A]/0 group-hover:border-[#D4AF6A]/40 transition-all duration-300" />
    </motion.div>
  );
}

export default function Gallery() {
  const { gallery } = weddingConfig;
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activeCategory === 'all'
    ? gallery
    : gallery.filter((img) => img.category === activeCategory);

  const openLightbox  = (i)  => setLightboxIndex(i);
  const closeLightbox = ()   => setLightboxIndex(null);
  const prevImage     = ()   => setLightboxIndex((i) => Math.max(0, i - 1));
  const nextImage     = ()   => setLightboxIndex((i) => Math.min(filtered.length - 1, i + 1));

  return (
    <>
      <section
        id="gallery"
        className="section-ivory section-pad overflow-hidden"
        aria-label="Photo gallery"
      >
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <motion.div
            className="text-center mb-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.p
              className="font-poppins text-[0.6rem] tracking-[0.35em] uppercase text-[#D4AF6A] mb-4"
              variants={fadeIn}
            >
              Moments
            </motion.p>
            <motion.h2
              className="font-cormorant font-light text-[#24332F]"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
              variants={fadeUp}
            >
              Our Gallery
            </motion.h2>
            <GoldDivider className="mt-2" />
          </motion.div>

          {/* Category filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-10"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-poppins text-[0.6rem] tracking-[0.2em] uppercase px-4 py-2
                  border transition-all duration-300
                  ${activeCategory === cat
                    ? 'border-[#D4AF6A] bg-[#D4AF6A] text-[#123C35]'
                    : 'border-[#D4AF6A]/40 text-[#24332F]/60 hover:border-[#D4AF6A] hover:text-[#24332F]'}`}
                aria-pressed={activeCategory === cat}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filtered.map((img, i) => (
                <GalleryCard
                  key={img.id}
                  image={img}
                  index={i}
                  onClick={() => openLightbox(i)}
                />
              ))}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
