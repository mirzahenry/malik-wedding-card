import { Calendar } from 'lucide-react';
import { generateICS } from '../services/calendarService';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// CalendarButton — add main Baraat event to calendar
// ──────────────────────────────────────────────
export default function CalendarButton({ className = '' }) {
  const { events } = weddingConfig;
  const mainEvent   = events.find((e) => e.title === 'Baraat') || events[0];

  return (
    <button
      className={`btn-gold flex items-center gap-2 text-[0.65rem] ${className}`}
      onClick={() => generateICS(mainEvent)}
      aria-label="Add wedding to calendar"
    >
      <Calendar size={13} />
      Add to Calendar
    </button>
  );
}
