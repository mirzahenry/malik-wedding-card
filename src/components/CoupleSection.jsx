import { motion } from 'framer-motion';
import { fadeUp, fadeIn, slideLeft, slideRight, staggerContainer, viewportOnce } from '../animations/variants';
import GoldDivider from './GoldDivider';
import FloralOrnament from './FloralOrnament';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// CoupleSection — portrait frames + intro text
// ──────────────────────────────────────────────

function PortraitCard({ person, role, direction }) {
  const variant = direction === 'left' ? slideLeft : slideRight;

  return (
    <motion.div
      className="flex flex-col items-center gap-5 text-center"
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {/* Role label */}
      <p className="font-poppins text-[0.6rem] tracking-[0.35em] uppercase text-[#D4AF6A]">
        {role}
      </p>

      {/* Portrait frame */}
      <motion.div
        className="relative"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4 }}
      >
        {/* Outer decorative ring */}
        <div
          className="absolute -inset-3 rounded-full border border-[#D4AF6A]/25 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -inset-[22px] rounded-full border border-[#D4AF6A]/10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Gold border ring */}
        <div
          className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-[#D4AF6A]/60 relative"
          style={{ boxShadow: '0 8px 40px rgba(212,175,106,0.15), 0 2px 10px rgba(18,60,53,0.1)' }}
        >
          <motion.img
            src={person.image}
            alt={`Portrait of ${person.fullName}`}
            className="w-full h-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#123C35]/20 to-transparent pointer-events-none" />
        </div>

        {/* Corner leaf ornaments */}
        <svg
          className="absolute -top-1 -right-1 pointer-events-none"
          width="28" height="28" viewBox="0 0 28 28" fill="none"
          aria-hidden="true"
        >
          <path d="M2 2 Q14 2 14 14" stroke="#D4AF6A" strokeWidth="1" strokeOpacity="0.6" fill="none"/>
          <circle cx="2" cy="2" r="2" fill="#D4AF6A" fillOpacity="0.7"/>
        </svg>
        <svg
          className="absolute -bottom-1 -left-1 pointer-events-none"
          width="28" height="28" viewBox="0 0 28 28" fill="none"
          aria-hidden="true"
        >
          <path d="M26 26 Q14 26 14 14" stroke="#D4AF6A" strokeWidth="1" strokeOpacity="0.6" fill="none"/>
          <circle cx="26" cy="26" r="2" fill="#D4AF6A" fillOpacity="0.7"/>
        </svg>
      </motion.div>

      {/* Name */}
      <div>
        <h3
          className="font-cormorant font-light text-[#24332F] leading-tight tracking-wide"
          style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}
        >
          {person.fullName}
        </h3>
        <div className="gold-line mt-3 mb-3" style={{ width: 50 }} />
        <p className="font-poppins text-[0.65rem] text-[#24332F]/50 tracking-wider">
          {person.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function CoupleSection() {
  const { groom, bride } = weddingConfig;

  return (
    <section
      id="couple"
      className="section-beige section-pad overflow-hidden"
      aria-label="Couple introduction"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
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
            The Couple
          </motion.p>
          <motion.h2
            className="font-cormorant font-light text-[#24332F]"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
            variants={fadeUp}
          >
            Two Hearts, One Beautiful Beginning
          </motion.h2>
          <GoldDivider className="mt-2" />
          <motion.p
            className="font-cormorant italic text-[#24332F]/55 text-lg md:text-xl mt-4 max-w-md mx-auto"
            variants={fadeUp}
          >
            "Some love stories are simply meant to be."
          </motion.p>
        </motion.div>

        {/* Portraits grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 items-center">

          {/* Groom */}
          <PortraitCard person={groom} role="The Groom" direction="left" />

          {/* Centre ampersand */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <FloralOrnament className="rotate-90 md:rotate-0 mb-2" />
            <span
              className="font-cormorant text-[#D4AF6A] font-light"
              style={{ fontSize: 'clamp(3rem, 7vw, 5rem)' }}
              aria-label="and"
            >
              &amp;
            </span>
            {/* Gold diamond */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2 L22 12 L12 22 L2 12 Z" fill="#D4AF6A" fillOpacity="0.3" stroke="#D4AF6A" strokeWidth="1"/>
              <path d="M12 6 L18 12 L12 18 L6 12 Z" fill="#D4AF6A" fillOpacity="0.5"/>
            </svg>
          </motion.div>

          {/* Bride */}
          <PortraitCard person={bride} role="The Bride" direction="right" />
        </div>

        {/* Urdu blessing */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-8 py-5 border border-[#D4AF6A]/25 relative">
            <p className="font-urdu text-[#24332F]/60 text-lg md:text-xl leading-loose">
              اللہ تعالیٰ اس جوڑے کو ہمیشہ خوش رکھے
            </p>
            {/* Corner dots */}
            {['top-1 left-1','top-1 right-1','bottom-1 left-1','bottom-1 right-1'].map((pos,i) => (
              <div key={i} className={`absolute ${pos} w-1.5 h-1.5 bg-[#D4AF6A]/60`} aria-hidden="true"/>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
