# 💍 Ahmed & Ayesha — Premium Digital Wedding Invitation

A luxury interactive wedding invitation website built with React, Vite, Tailwind CSS, and Framer Motion.

---

## ✨ Features

- **Cinematic opening screen** with curtain animation and gold particle burst
- **Animated hero section** with parallax, couple names, and wedding date
- **Couple portraits** with gold frames and hover zoom
- **Live countdown timer** to the wedding day
- **Love story timeline** with scroll animations
- **Wedding events** (Mehndi, Baraat, Walima) with Google Maps & calendar links
- **Masonry photo gallery** with fullscreen lightbox
- **Wedding video trailer** with modal player
- **Physical invitation card replica** with 3D tilt effect
- **Venue section** with embedded map
- **RSVP form** with validation, WhatsApp option, and success animation
- **Floating music player** (starts only after user interaction)
- **Web Share API** with clipboard fallback
- **Add to Calendar** (.ics download)
- **Floating rose petals** animation
- **Custom gold cursor** (desktop only)
- **Fully responsive** — mobile-first design
- **Accessibility** — keyboard nav, ARIA labels, focus states, reduced-motion support
- **SEO** — Open Graph, Twitter cards, structured data

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## ☁️ Vercel Deployment

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual deployment

1. Push your project to a GitHub repository
2. Import the repository on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no extra config needed
4. Set build command: `npm run build`
5. Set output directory: `dist`
6. Deploy

### Environment variables (optional)

If you add a backend for RSVP, create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=your_api_endpoint
```

> Never commit `.env` to git. Add it to `.gitignore`.

---

## 🎨 Customizing Wedding Information

All wedding data lives in one file:

```
src/config/weddingConfig.js
```

### Change couple names

```js
groom: {
  firstName: 'Ahmed',
  lastName:  'Khan',
  fullName:  'Ahmed Khan',
  description: 'Son of Mr. & Mrs. Khalid Khan',
},
bride: {
  firstName: 'Ayesha',
  lastName:  'Fatima',
  fullName:  'Ayesha Fatima',
  description: 'Daughter of Mr. & Mrs. Tariq Ahmed',
},
```

### Change wedding date

```js
weddingDate: '2026-12-19T19:30:00',  // ISO format
```

### Change events

```js
events: [
  {
    title:       'Mehndi',
    titleUrdu:   'مہندی',
    date:        '2026-12-18',
    displayDate: '18 December 2026',
    time:        '07:00 PM',
    venue:       'Royal Palace Marquee',
    address:     'Model Town, Bahawalpur',
    dressCode:   'Traditional · Green & Yellow',
    mapsUrl:     'https://maps.google.com/?q=...',
  },
  // Add Dholki, Mayoun, Nikah, etc. as needed
]
```

### Change love story milestones

```js
story: [
  { year: '2021', title: 'First Meeting', description: '...' },
  // Add or remove milestones
]
```

---

## 🖼️ Adding Images

### Couple portraits

1. Place photos in `public/images/`
2. Update config:

```js
groom: { image: '/images/groom.jpg' },
bride: { image: '/images/bride.jpg' },
```

Recommended size: **600×600px**, square crop.

### Gallery photos

```js
gallery: [
  { id: 1, src: '/images/gallery/photo1.jpg', category: 'couple', alt: 'Description' },
  { id: 2, src: '/images/gallery/photo2.jpg', category: 'wedding', alt: 'Description' },
  // categories: couple | wedding | engagement | family | memories
]
```

Recommended sizes: **800×600px** landscape or **600×800px** portrait.

### Video poster / thumbnail

```js
video: {
  poster: '/images/video-poster.jpg',
}
```

---

## 🎵 Adding Music

1. Place your MP3 file at:

```
public/music/wedding.mp3
```

2. Update config if you want a different path or title:

```js
music: {
  src:   '/music/wedding.mp3',
  title: 'Our Wedding Song',
},
```

> Music only starts after the user clicks **"Open Invitation"** — browsers block autoplay before user interaction.

---

## 📋 Configuring RSVP

### Current behaviour (frontend only)

RSVP submissions are saved to `localStorage` and logged to the browser console.

### Adding a backend

Open `src/services/rsvpService.js` and replace the placeholder comment with your backend call:

#### Supabase example

```js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Inside submitRSVP():
const { error } = await supabase.from('rsvps').insert([payload]);
if (error) throw error;
```

#### REST API example

```js
const res = await fetch(import.meta.env.VITE_API_URL + '/rsvp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
if (!res.ok) throw new Error('Server error');
```

---

## 💬 Configuring WhatsApp

Update the number and pre-filled message in config:

```js
whatsapp: {
  number:  '+923001234567',   // Include country code, digits only
  message: 'Assalamualaikum, I would like to confirm my attendance at Ahmed & Ayesha\'s wedding.',
},
```

---

## 🗺️ Configuring Google Maps

Update the venue section in config:

```js
venue: {
  name:     'Pearl Banquet Hall',
  address:  'Circular Road, Bahawalpur, Pakistan',
  lat:      29.3956,
  lng:      71.6836,
  mapsUrl:  'https://maps.google.com/?q=29.3956,71.6836',
  embedUrl: 'https://www.google.com/maps/embed?pb=...',
},
```

To get your embed URL:
1. Open [maps.google.com](https://maps.google.com)
2. Search your venue
3. Click **Share** → **Embed a map**
4. Copy the `src="..."` URL from the iframe code

---

## 📁 Project Structure

```
src/
├── animations/
│   └── variants.js          # Reusable Framer Motion variants
├── components/
│   ├── InvitationLoader.jsx  # Initial loading screen
│   ├── OpeningScreen.jsx     # Curtain open animation
│   ├── Navbar.jsx            # Sticky transparent navbar
│   ├── Hero.jsx              # Full-viewport hero
│   ├── CoupleSection.jsx     # Portrait frames
│   ├── Countdown.jsx         # Live countdown timer
│   ├── Story.jsx             # Love story timeline
│   ├── Events.jsx            # Wedding function cards
│   ├── Gallery.jsx           # Masonry gallery + lightbox
│   ├── VideoSection.jsx      # Video trailer
│   ├── InvitationCard.jsx    # Physical card replica
│   ├── Venue.jsx             # Map + directions
│   ├── RSVP.jsx              # RSVP form
│   ├── MusicPlayer.jsx       # Floating music player
│   ├── ShareButton.jsx       # Web Share API
│   ├── CalendarButton.jsx    # ICS download
│   ├── Footer.jsx            # Closing section
│   ├── FloatingPetals.jsx    # Animated petals
│   ├── GoldDivider.jsx       # SVG ornamental divider
│   ├── DecorativeCorner.jsx  # SVG corner ornament
│   └── FloralOrnament.jsx    # SVG floral branch
├── config/
│   └── weddingConfig.js      # ← Edit all wedding data here
├── hooks/
│   ├── useCountdown.js       # Countdown timer hook
│   └── useScrollAnimation.js # IntersectionObserver hook
├── services/
│   ├── rsvpService.js        # RSVP data layer
│   └── calendarService.js    # ICS calendar generator
├── App.jsx                   # Root component
├── main.jsx                  # React entry point
└── index.css                 # Global styles + Tailwind
```

---

## 🎨 Color Palette

| Name           | Hex       | Usage                        |
|----------------|-----------|------------------------------|
| Ivory          | `#FFFDF7` | Background                   |
| Champagne Gold | `#D4AF6A` | Borders, icons, highlights   |
| Soft Gold      | `#E8D3A8` | Text on dark, subtle accents |
| Deep Emerald   | `#123C35` | Dark sections, navbar drawer |
| Dark Text      | `#24332F` | Body text                    |
| Soft Beige     | `#F5EFE3` | Alternate section background |

---

## 📝 License

This project is for personal use. Please customize responsibly and credit the original design work when sharing publicly.

---

*Made with ❤️ for Ahmed & Ayesha*
