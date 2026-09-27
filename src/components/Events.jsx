import { motion } from 'framer-motion';
import { MapPin, Clock, Shirt, Calendar, ExternalLink } from 'lucide-react';
import { staggerContainer, fadeUp, fadeIn, scaleIn, viewportOnce } from '../animations/variants';
import GoldDivider from './GoldDivider';
import weddingConfig from '../config/weddingConfig';
import { generateICS } from '../services/calendarService';

// ──────────────────────────────────────────────
// Events — wedding functions timeline cards
// ──────────────────────────────────────────────

const EVENT_ICONS = {
  flower: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      {[0,60,120,180,240,300].map((a,i) => {
        const r = (a * Math.PI) / 180;
        return <ellipse key={i} cx={14 + Math.cos(r)*7} cy={14 + Math.sin(r)*7} rx="4" ry="2.5"
          fill="#D4AF6A" fillOpacity="0.7" transform={`rotate(${a}, ${14+Math.cos(r)*7}, ${14+Math.sin(r)*7})`}/>;
      })}
      <circle cx="14" cy="14" r="3.5" fill="#D4AF6A"/>
    </svg>
  ),
  crown: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M4 20 L6 10 L10 16 L14 8 L18 16 L22 10 L24 20 Z" fill="#D4AF6A" fillOpacity="0.8"/>
      <rect x="4" y="20" width="20" height="3" rx="1" fill="#D4AF6A" fillOpacity="0.6"/>
    </svg>
  ),
  star: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M14 3 L16.5 10.5 L24 10.5 L18 15.5 L20.5 23 L14 18.5 L7.5 23 L10 15.5 L4 10.5 L11.5 10.5 Z"
        fill="#D4AF6A" fillOpacity="0.8"/>
    </svg>
  ),
};

function EventCard({ event, index }) {
  const handleMaps = () => window.open(event.mapsUrl, '_blank', 'noopener,noreferrer');
  const handleCalendar = () => generateICS(event);

  return (
    <motion.article
      className="relative group"
      variants={scaleIn}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      aria-label={`${event.title} event details`}
    >
      {/* Card */}
      <div
        className="relative overflow-hidden paper-texture border border-[#D4AF6A]/25 h-full"
        style={{ boxShadow: '0 4px 30px rgba(18,60,53,0.07)' }}
      >
        {/* Top color band */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${event.color}80, ${event.color})` }} />

        {/* Corner dots */}
        {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map((pos,i) => (
          <div key={i} className={`absolute ${pos} w-1 h-1 bg-[#D4AF6A]/35`} aria-hidden="true"/>
        ))}

        <div className="p-7 md:p-8">
          {/* Event number + icon */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <span className="font-poppins text-[0.55rem] tracking-[0.3em] text-[#D4AF6A] uppercase">
                Event {String(index + 1).padStart(2,'0')}
              </span>
            </div>
            <div className="opacity-80">{EVENT_ICONS[event.icon] || EVENT_ICONS.star}</div>
          </div>

          {/* Title */}
          <h3 className="font-cormorant font-light text-[#24332F] mb-1"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
            {event.title}
          </h3>
          <p className="font-urdu text-[#24332F]/40 text-sm mb-5">{event.titleUrdu}</p>

          <div className="gold-line mb-5" style={{ margin: '0 0 1.25rem 0', width: 40 }} />

          {/* Details */}
          <ul className="space-y-3" role="list">
            <li className="flex items-start gap-3">
              <Calendar size={14} color="#D4AF6A" className="mt-0.5 shrink-0" />
              <div>
                <p className="font-poppins text-[0.65rem] text-[#24332F]/80">{event.displayDate}</p>
                <p className="font-poppins text-[0.65rem] text-[#24332F]/50">{event.time}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} color="#D4AF6A" className="mt-0.5 shrink-0" />
              <div>
                <p className="font-poppins text-[0.65rem] text-[#24332F]/80 font-medium">{event.venue}</p>
                <p className="font-poppins text-[0.6rem] text-[#24332F]/45 mt-0.5">{event.address}</p>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <Shirt size={14} color="#D4AF6A" className="shrink-0" />
              <p className="font-poppins text-[0.65rem] text-[#24332F]/60">{event.dressCode}</p>
            </li>
          </ul>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mt-7">
            <button
              onClick={handleMaps}
              className="btn-gold flex-1 text-[0.6rem] py-2.5"
              aria-label={`View ${event.venue} on Google Maps`}
            >
              <MapPin size={12} /> View Location
            </button>
            <button
              onClick={handleCalendar}
              className="btn-gold flex-1 text-[0.6rem] py-2.5"
              aria-label={`Add ${event.title} to calendar`}
            >
              <Calendar size={12} /> Add to Calendar
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Events() {
  const { events } = weddingConfig;

  return (
    <section
      id="events"
      className="section-beige section-pad overflow-hidden"
      aria-label="Wedding events"
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
            Wedding Functions
          </motion.p>
          <motion.h2
            className="font-cormorant font-light text-[#24332F]"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
            variants={fadeUp}
          >
            Celebrations
          </motion.h2>
          <GoldDivider className="mt-2" />
          <motion.p
            className="font-cormorant italic text-[#24332F]/50 text-lg mt-4"
            variants={fadeUp}
          >
            Three magical days of joy and celebration
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
