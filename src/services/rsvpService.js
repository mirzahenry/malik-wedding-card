// ──────────────────────────────────────────────
// rsvpService — RSVP data layer
// Currently uses local state (console/localStorage).
// Replace submitRSVP with a Supabase/API call when ready.
// ──────────────────────────────────────────────

const STORAGE_KEY = 'wedding_rsvp_submissions';

/**
 * Submit an RSVP entry.
 * @param {Object} data - { name, phone, guests, attendance, message }
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitRSVP(data) {
  try {
    // ── Validation ────────────────────────────────
    if (!data.name?.trim())   throw new Error('Name is required.');
    if (!data.phone?.trim())  throw new Error('Phone number is required.');
    if (!data.attendance)     throw new Error('Please select your attendance.');

    const payload = {
      ...data,
      submittedAt: new Date().toISOString(),
      id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
    };

    // ── Local persistence (dev/demo) ───────────────
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.push(payload);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    // ── Console log for visibility ─────────────────
    console.info('[RSVP Submitted]', payload);

    // ── TODO: Replace below with your backend call ─
    // Example Supabase:
    // const { error } = await supabase.from('rsvps').insert([payload]);
    // if (error) throw error;

    // Example REST API:
    // const res = await fetch('/api/rsvp', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload),
    // });
    // if (!res.ok) throw new Error('Server error');

    return { success: true, message: 'RSVP submitted successfully.' };
  } catch (err) {
    return { success: false, message: err.message || 'Something went wrong.' };
  }
}

/**
 * Get all stored RSVPs (local demo only).
 */
export function getStoredRSVPs() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}
