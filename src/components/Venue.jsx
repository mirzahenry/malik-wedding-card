import { motion } from 'framer-motion';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { staggerContainer, fadeUp, fadeIn, slideLeft, slideRight, viewportOnce } from '../animations/variants';
import GoldDivider from './GoldDivider';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// Venue — map preview + directions
// ──────────────────────────────────────────────
export default function Venue() {
  const { venue } = weddingConfig;

  const openMaps = () => window.open(venue.mapsUrl, '_blank', 'noopener,noreferrer');

  return (
    <section
      className="section-ivory section-pad overflow-hidden"
      aria-label="Venue information"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            className="font-poppins text-[0.6rem] tracking-[0.35em] uppercase text-[#D4AF6A] mb-4"
            variants={fadeIn}
          >
            Location
          </motion.p>
          <motion.h2
            className="font-cormorant font-light text-[#24332F]"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
            variants={fadeUp}
          >
            Find Us Here
          </motion.h2>
          <GoldDivider className="mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — venue info */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6"
          >
            {/* Venue name card */}
            <div
              className="paper-texture border border-[#D4AF6A]/25 p-8 relative"
              style={{ boxShadow: '0 4px 30px rgba(18,60,53,0.06)' }}
            >
              {/* Corner dots */}
              {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map((pos,i) => (
                <div key={i} className={`absolute ${pos} w-1.5 h-1.5 bg-[#D4AF6A]/40`} aria-hidden="true"/>
              ))}

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-[#D4AF6A]/50 flex items-center justify-center shrink-0 mt-1">
                  <MapPin size={18} color="#D4AF6A" />
                </div>
                <div>
                  <h3
                    className="font-cormorant font-medium text-[#24332F] mb-2"
                    style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)' }}
                  >
                    {venue.name}
                  </h3>
                  <p className="font-poppins text-sm text-[#24332F]/60 leading-relaxed">
                    {venue.address}
                  </p>
                </div>
              </div>

              <div className="gold-line-long mt-6 mb-6" style={{ margin: '1.5rem 0' }} />

              {/* Info rows */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF6A]" />
                  <p className="font-poppins text-xs text-[#24332F]/60">Saturday, 19 December 2026</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF6A]" />
                  <p className="font-poppins text-xs text-[#24332F]/60">Baraat: 7:30 PM onwards</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF6A]" />
                  <p className="font-poppins text-xs text-[#24332F]/60">Bahawalpur, Punjab, Pakistan</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={openMaps}
                className="btn-gold-filled flex-1 flex items-center justify-center gap-2"
                aria-label="Open venue in Google Maps"
              >
                <Navigation size={14} />
                Open in Google Maps
              </button>
              <button
                onClick={openMaps}
                className="btn-gold flex-1 flex items-center justify-center gap-2"
                aria-label="Get directions to venue"
              >
                <ExternalLink size={14} />
                Get Directions
              </button>
            </div>
          </motion.div>

          {/* Right — map embed */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div
              className="relative overflow-hidden"
              style={{
                border: '1px solid rgba(212,175,106,0.3)',
                boxShadow: '0 8px 40px rgba(18,60,53,0.1)',
              }}
            >
              {/* Gold border frame */}
              <div className="absolute inset-2 border border-[#D4AF6A]/10 z-10 pointer-events-none" />

              <iframe
                src={venue.embedUrl}
                width="100%"
                height="380"
                style={{ border: 0, display: 'block', filter: 'sepia(20%) saturate(80%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map showing ${venue.name}`}
              />

              {/* Click overlay to open maps */}
              <button
                className="absolute bottom-4 right-4 z-20 bg-[#123C35] border border-[#D4AF6A]/50
                  px-4 py-2 font-poppins text-[0.6rem] tracking-widest uppercase text-[#D4AF6A]
                  hover:bg-[#D4AF6A] hover:text-[#123C35] transition-all duration-300"
                onClick={openMaps}
                aria-label="Open in Google Maps"
              >
                View Larger Map
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
