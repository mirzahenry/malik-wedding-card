import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { fadeUp, fadeIn, staggerContainer, slideLeft, slideRight, viewportOnce } from '../animations/variants';
import GoldDivider from './GoldDivider';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// Story — vertical animated love story timeline
// ──────────────────────────────────────────────
export default function Story() {
  const { story } = weddingConfig;

  return (
    <section
      id="story"
      className="section-ivory section-pad overflow-hidden"
      aria-label="Our love story"
    >
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            className="font-poppins text-[0.6rem] tracking-[0.35em] uppercase text-[#D4AF6A] mb-4"
            variants={fadeIn}
          >
            Our Story
          </motion.p>
          <motion.h2
            className="font-cormorant font-light text-[#24332F]"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
            variants={fadeUp}
          >
            Written by Destiny
          </motion.h2>
          <GoldDivider className="mt-2" />
          <motion.p
            className="font-cormorant italic text-[#24332F]/55 text-lg md:text-xl mt-5 max-w-lg mx-auto leading-relaxed"
            variants={fadeUp}
          >
            "Some stories are written in books,
            <br />ours was written by destiny."
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical gold line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'linear-gradient(180deg, transparent, #D4AF6A 10%, #D4AF6A 90%, transparent)' }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12 md:gap-16">
            {story.map((item, i) => {
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  className="relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  variants={isLeft ? slideLeft : slideRight}
                >
                  {/* Content — alternates left/right on desktop */}
                  <div className={`${isLeft ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                    {/* Year badge */}
                    <div className={`inline-flex items-center gap-2 mb-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                      <span
                        className="font-cormorant font-light text-[#D4AF6A]"
                        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                      >
                        {item.year}
                      </span>
                      <div className="h-px w-8 bg-[#D4AF6A]/40" aria-hidden="true" />
                    </div>

                    <h3
                      className="font-cormorant font-medium text-[#24332F] mb-2"
                      style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)' }}
                    >
                      {item.title}
                    </h3>
                    <p className="font-poppins text-sm text-[#24332F]/55 leading-relaxed max-w-xs">
                      {item.description}
                    </p>
                  </div>

                  {/* Centre dot — only on desktop */}
                  <div
                    className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      w-10 h-10 rounded-full border border-[#D4AF6A]/50 bg-[#FFFDF7]
                      items-center justify-center z-10"
                    aria-hidden="true"
                  >
                    <Heart size={14} color="#D4AF6A" fill="#D4AF6A" />
                  </div>

                  {/* Mobile connector */}
                  <div className="md:hidden flex items-center gap-3" aria-hidden="true">
                    <div className="h-px flex-1 bg-[#D4AF6A]/20" />
                    <Heart size={12} color="#D4AF6A" fill="#D4AF6A" />
                    <div className="h-px flex-1 bg-[#D4AF6A]/20" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Closing line */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-4">
            <div className="h-px w-16 bg-[#D4AF6A]/30" />
            <Heart size={20} color="#D4AF6A" fill="rgba(212,175,106,0.3)" />
            <div className="h-px w-16 bg-[#D4AF6A]/30" />
          </div>
          <p className="font-cormorant italic text-[#24332F]/40 text-base mt-4">
            And the story continues…
          </p>
        </motion.div>

      </div>
    </section>
  );
}
