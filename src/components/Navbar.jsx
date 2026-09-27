import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import weddingConfig from '../config/weddingConfig';

const NAV_LINKS = [
  { label: 'Home',      href: '#home' },
  { label: 'Our Story', href: '#story' },
  { label: 'Events',    href: '#events' },
  { label: 'Gallery',   href: '#gallery' },
  { label: 'RSVP',      href: '#rsvp' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { groom, bride }          = weddingConfig;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled ? 'navbar-scrolled py-3' : 'py-5 bg-transparent'}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between">

          {/* Logo / monogram */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2 group"
            aria-label="Go to top"
          >
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center
              transition-colors duration-300
              ${scrolled ? 'border-[#D4AF6A]' : 'border-[#D4AF6A]/60'}`}>
              <span className="font-cormorant text-[#D4AF6A] text-sm font-semibold leading-none">
                {groom.firstName[0]}{bride.firstName[0]}
              </span>
            </div>
            <span className={`font-cormorant text-sm tracking-[0.2em] hidden sm:inline transition-colors duration-300
              ${scrolled ? 'text-[#24332F]' : 'text-[#E8D3A8]'}`}>
              {groom.firstName} &amp; {bride.firstName}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-poppins text-[0.65rem] tracking-[0.2em] uppercase relative group
                    transition-colors duration-300
                    ${scrolled ? 'text-[#24332F] hover:text-[#D4AF6A]' : 'text-[#E8D3A8]/90 hover:text-[#D4AF6A]'}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#D4AF6A] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF6A]"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen
              ? <X size={22} color={scrolled ? '#24332F' : '#E8D3A8'} />
              : <Menu size={22} color={scrolled ? '#24332F' : '#E8D3A8'} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#0a2820]/95 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              className="relative z-10 ml-auto w-72 h-full bg-[#123C35] flex flex-col pt-24 pb-10 px-8
                border-l border-[#D4AF6A]/20"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close */}
              <button
                className="absolute top-5 right-5 p-2 text-[#E8D3A8] focus-visible:ring-2 focus-visible:ring-[#D4AF6A] rounded"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>

              {/* Monogram */}
              <div className="mb-8 text-center">
                <p className="font-cormorant text-[#D4AF6A] text-3xl tracking-widest">
                  {groom.firstName[0]} &amp; {bride.firstName[0]}
                </p>
                <div className="gold-line mt-3" />
              </div>

              {/* Links */}
              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col gap-1" role="list">
                  {NAV_LINKS.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.1 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="block py-3 font-cormorant text-xl text-[#E8D3A8] tracking-widest
                          hover:text-[#D4AF6A] transition-colors duration-200 border-b border-[#D4AF6A]/10"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Urdu */}
              <p className="font-urdu text-[#B8D4BC]/50 text-xs mt-auto text-center">
                احمد و عائشہ
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
