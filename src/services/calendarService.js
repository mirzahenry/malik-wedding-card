// ──────────────────────────────────────────────
// calendarService — ICS calendar event generator
// ──────────────────────────────────────────────

function formatICSDate(dateStr, timeStr) {
  // dateStr: "2026-12-18", timeStr: "07:00 PM"
  const [year, month, day] = dateStr.split('-');
  const [time, period]     = timeStr.split(' ');
  let [hours, mins]        = time.split(':').map(Number);
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;
  return `${year}${month}${day}T${String(hours).padStart(2,'0')}${String(mins).padStart(2,'0')}00`;
}

export function generateICS(event) {
  const dtStart = formatICSDate(event.date, event.time);

  // Default 3h duration
  const startDate = new Date(`${event.date}T${dtStart.slice(9,11)}:${dtStart.slice(11,13)}:00`);
  startDate.setHours(startDate.getHours() + 3);
  const endYear   = startDate.getFullYear();
  const endMonth  = String(startDate.getMonth()+1).padStart(2,'0');
  const endDay    = String(startDate.getDate()).padStart(2,'0');
  const endHour   = String(startDate.getHours()).padStart(2,'0');
  const endMin    = String(startDate.getMinutes()).padStart(2,'0');
  const dtEnd     = `${endYear}${endMonth}${endDay}T${endHour}${endMin}00`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ahmed & Ayesha Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:${event.title} - Ahmed & Ayesha Wedding`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `LOCATION:${event.venue}, ${event.address}`,
    `DESCRIPTION:Ahmed & Ayesha's ${event.title}\\nVenue: ${event.venue}\\nDress Code: ${event.dressCode}`,
    `URL:${event.mapsUrl}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href     = url;
  link.download = `${event.title.toLowerCase()}-ahmed-ayesha.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateAllEventsICS(events) {
  events.forEach((e) => generateICS(e));
}
