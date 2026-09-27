// ============================================================
// WEDDING CONFIGURATION
// Edit this file to customize all wedding details.
// No need to touch any other component files.
// ============================================================

const weddingConfig = {
  // ── Couple ─────────────────────────────────────────────────
  groom: {
    firstName: 'Ahmed',
    lastName: 'Khan',
    fullName: 'Ahmed Khan',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    description: 'Son of Mr. & Mrs. Khalid Khan',
  },
  bride: {
    firstName: 'Ayesha',
    lastName: 'Fatima',
    fullName: 'Ayesha Fatima',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
    description: 'Daughter of Mr. & Mrs. Tariq Ahmed',
  },

  // ── Wedding Date ────────────────────────────────────────────
  weddingDate: '2026-12-19T19:30:00',   // Baraat date/time (ISO)

  // ── Events ─────────────────────────────────────────────────
  events: [
    {
      id: 1,
      title: 'Mehndi',
      titleUrdu: 'مہندی',
      date: '2026-12-18',
      displayDate: '18 December 2026',
      time: '07:00 PM',
      venue: 'Royal Palace Marquee',
      address: 'Model Town, Bahawalpur, Pakistan',
      dressCode: 'Traditional · Green & Yellow',
      color: '#4A7C59',
      icon: 'flower',
      mapsUrl: 'https://maps.google.com/?q=Bahawalpur+Pakistan',
    },
    {
      id: 2,
      title: 'Baraat',
      titleUrdu: 'بارات',
      date: '2026-12-19',
      displayDate: '19 December 2026',
      time: '07:30 PM',
      venue: 'Pearl Banquet Hall',
      address: 'Circular Road, Bahawalpur, Pakistan',
      dressCode: 'Formal · Traditional',
      color: '#123C35',
      icon: 'crown',
      mapsUrl: 'https://maps.google.com/?q=Bahawalpur+Pakistan',
    },
    {
      id: 3,
      title: 'Walima',
      titleUrdu: 'ولیمہ',
      date: '2026-12-20',
      displayDate: '20 December 2026',
      time: '08:00 PM',
      venue: 'Grand Regency',
      address: 'Airport Road, Bahawalpur, Pakistan',
      dressCode: 'Formal',
      color: '#8B6914',
      icon: 'star',
      mapsUrl: 'https://maps.google.com/?q=Bahawalpur+Pakistan',
    },
  ],

  // ── Venue (main / Baraat) ───────────────────────────────────
  venue: {
    name: 'Pearl Banquet Hall',
    address: 'Circular Road, Bahawalpur, Punjab, Pakistan',
    lat: 29.3956,
    lng: 71.6836,
    mapsUrl: 'https://maps.google.com/?q=Bahawalpur+Pakistan',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.8!2d71.6836!3d29.3956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDIzJzQ0LjIiTiA3McKwNDEnMC4wIkU!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
  },

  // ── Love Story ──────────────────────────────────────────────
  story: [
    { year: '2021', title: 'First Meeting', description: 'Two souls crossed paths at a family gathering — a moment neither would forget.' },
    { year: '2023', title: 'A Beautiful Friendship', description: 'What began as a chance encounter blossomed into a deep and cherished friendship.' },
    { year: '2025', title: 'We Said Yes', description: 'Hearts aligned, families blessed, and promises made under a sky full of stars.' },
    { year: '2026', title: 'Our Forever Begins', description: 'Today we write the first chapter of our lifelong story together.' },
  ],

  // ── Gallery ─────────────────────────────────────────────────
  gallery: [
    { id: 1, src: 'https://images.unsplash.com/photo-1511285560929-80b49f4c58f2?w=800&q=80', category: 'couple',     alt: 'Couple portrait' },
    { id: 2, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', category: 'wedding',    alt: 'Wedding ceremony' },
    { id: 3, src: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80', category: 'engagement', alt: 'Engagement ceremony' },
    { id: 4, src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80', category: 'couple',     alt: 'Couple together' },
    { id: 5, src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80', category: 'family',     alt: 'Family celebration' },
    { id: 6, src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80', category: 'wedding',    alt: 'Wedding decoration' },
    { id: 7, src: 'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=800&q=80', category: 'memories',    alt: 'Beautiful memories' },
    { id: 8, src: 'https://images.unsplash.com/photo-1620968879258-42218f8b4c19?w=800&q=80', category: 'engagement', alt: 'Engagement ring' },
    { id: 9, src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80', category: 'wedding',    alt: 'Wedding floral' },
  ],

  // ── Video ───────────────────────────────────────────────────
  video: {
    poster: 'https://images.unsplash.com/photo-1511285560929-80b49f4c58f2?w=1200&q=80',
    // Set to a local file path like '/videos/trailer.mp4' or a YouTube embed
    src: null,
    youtubeId: null, // e.g. 'dQw4w9WgXcQ'
  },

  // ── WhatsApp ────────────────────────────────────────────────
  whatsapp: {
    number: '+92XXXXXXXXXX', // Replace with actual number
    message: 'Assalamualaikum, I would like to confirm my attendance at Ahmed & Ayesha\'s wedding. 💍',
  },

  // ── Music ───────────────────────────────────────────────────
  music: {
    src: '/music/wedding.mp3', // Place MP3 in /public/music/
    title: 'Wedding Melody',
  },

  // ── Social Sharing ──────────────────────────────────────────
  sharing: {
    url: 'https://ahmed-ayesha-wedding.vercel.app',
    text: 'You\'re invited to celebrate Ahmed & Ayesha\'s wedding on 19 December 2026 ❤️',
    hashtags: ['AhmedAndAyesha', 'WeddingInvitation'],
  },
};

export default weddingConfig;
