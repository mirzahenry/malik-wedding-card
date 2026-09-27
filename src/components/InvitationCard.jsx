import { motion } from 'framer-motion';
import { scaleIn, viewportOnce } from '../animations/variants';
import DecorativeCorner from './DecorativeCorner';
import GoldDivider from './GoldDivider';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// InvitationCard — physical invitation replica
// 3D perspective tilt on desktop hover
// ──────────────────────────────────────────────

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return {
    day:    d.getDate(),
    month:  d.toLocaleString('en-US', { month: 'long' }),
    year:   d.getFullYear(),
    weekday:d.toLocaleString('en-US', { weekday: 'long' }),
  };
}

export default function InvitationCard() {
  const { groom, bride, weddingDate, venue } = weddingConfig;
  const { day, month, year, weekday } = formatDate(weddingDate);

  return (
    <section
      className="section-beige section-pad overflow-hidden"
      aria-label="Wedding invitation card"
    >
      <div className="max-w-3xl mx-auto px-6">

        {/* Section label */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          <p className="font-poppins text-[0.6rem] tracking-[0.35em] uppercase text-[#D4AF6A] mb-3">
            The Invitation
          </p>
          <h2
            className="font-cormorant font-light text-[#24332F]"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)' }}
          >
            A Keepsake to Cherish
          </h2>
          <GoldDivider className="mt-2" />
        </motion.div>

        {/* Card */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          whileHover={{
            rotateX: 2,
            rotateY: -3,
            scale: 1.01,
            boxShadow: '0 30px 70px rgba(18,60,53,0.18)',
          }}
          transition={{ duration: 0.4 }}
          style={{
            perspective: 1000,
            transformStyle: 'preserve-3d',
            boxShadow: '0 15px 50px rgba(18,60,53,0.12)',
          }}
          className="paper-texture relative overflow-hidden"
          role="article"
          aria-label="Wedding invitation card"
        >
          {/* Outer gold border */}
          <div className="absolute inset-3 border border-[#D4AF6A]/40 pointer-events-none" />
          <div className="absolute inset-5 border border-[#D4AF6A]/15 pointer-events-none" />

          {/* Decorative corners */}
          <DecorativeCorner position="tl" size={60} className="top-2 left-2" />
          <DecorativeCorner position="tr" size={60} className="top-2 right-2" />
          <DecorativeCorner position="bl" size={60} className="bottom-2 left-2" />
          <DecorativeCorner position="br" size={60} className="bottom-2 right-2" />

          {/* Card content */}
          <div className="px-10 py-14 md:px-16 md:py-16 text-center">

            {/* Bismillah */}
            <p className="font-urdu text-[#24332F]/50 text-xl mb-6">
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>

            {/* Divider */}
            <div className="gold-line mb-6" />

            {/* Announcement */}
            <p className="font-cormorant italic text-[#24332F]/50 text-base mb-6">
              Together with their beloved families
            </p>

            {/* Groom name */}
            <h1
              className="font-cormorant font-light text-[#24332F] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
            >
              {groom.firstName}
            </h1>
            <p className="font-poppins text-[0.55rem] tracking-[0.3em] uppercase text-[#D4AF6A] mt-1 mb-3">
              {groom.lastName}
            </p>

            {/* Ampersand */}
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-px w-12 bg-[#D4AF6A]/30" />
              <span
                className="font-cormorant text-[#D4AF6A] font-light"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
              >
                &amp;
              </span>
              <div className="h-px w-12 bg-[#D4AF6A]/30" />
            </div>

            {/* Bride name */}
            <h1
              className="font-cormorant font-light text-[#24332F] leading-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
            >
              {bride.firstName}
            </h1>
            <p className="font-poppins text-[0.55rem] tracking-[0.3em] uppercase text-[#D4AF6A] mt-1 mb-8">
              {bride.lastName}
            </p>

            {/* Floral divider */}
            <svg width="160" height="20" viewBox="0 0 160 20" fill="none" className="mx-auto mb-8" aria-hidden="true">
              <path d="M0 10 Q40 2 80 10 Q120 18 160 10" stroke="#D4AF6A" strokeWidth="0.6" strokeOpacity="0.5" fill="none"/>
              <path d="M0 10 Q40 18 80 10 Q120 2 160 10" stroke="#D4AF6A" strokeWidth="0.6" strokeOpacity="0.3" fill="none"/>
              <circle cx="80" cy="10" r="3" fill="#D4AF6A" fillOpacity="0.7"/>
              <circle cx="40" cy="6"  r="1.5" fill="#D4AF6A" fillOpacity="0.4"/>
              <circle cx="120" cy="14" r="1.5" fill="#D4AF6A" fillOpacity="0.4"/>
            </svg>

            {/* Invite line */}
            <p className="font-cormorant italic text-[#24332F]/55 text-base mb-2">
              request the honour of your presence
            </p>
            <p className="font-cormorant italic text-[#24332F]/55 text-base mb-10">
              at the celebration of their marriage
            </p>

            {/* Date */}
            <div className="flex items-baseline justify-center gap-4 mb-3">
              <span
                className="font-cormorant font-light text-[#24332F]"
                style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
              >
                {day}
              </span>
              <div className="text-center">
                <p className="font-poppins text-[0.6rem] tracking-[0.25em] text-[#D4AF6A] uppercase">{month}</p>
                <p className="font-poppins text-[0.55rem] tracking-[0.2em] text-[#24332F]/40">{year}</p>
              </div>
            </div>
            <p className="font-poppins text-[0.55rem] tracking-[0.3em] uppercase text-[#24332F]/40 mb-8">
              {weekday}
            </p>

            {/* Venue */}
            <div className="gold-line mb-5" />
            <p className="font-cormorant text-lg text-[#24332F]/70 mb-1">{venue.name}</p>
            <p className="font-poppins text-[0.6rem] tracking-[0.15em] text-[#24332F]/40">{venue.address}</p>
            <div className="gold-line mt-5" />

            {/* Urdu */}
            <p className="font-urdu text-[#24332F]/35 text-sm mt-8">
              آپ کی تشریف آوری ہمارے لیے باعثِ مسرت ہوگی
            </p>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
