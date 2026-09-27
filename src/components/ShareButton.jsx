import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Check, Copy } from 'lucide-react';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// ShareButton — Web Share API with clipboard fallback
// ──────────────────────────────────────────────
export default function ShareButton({ className = '' }) {
  const [copied, setCopied] = useState(false);
  const { sharing } = weddingConfig;

  const handleShare = async () => {
    // Try native Web Share API first
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ahmed & Ayesha | Wedding Invitation',
          text:  sharing.text,
          url:   sharing.url,
        });
        return;
      } catch {
        // User cancelled or not supported — fall through to clipboard
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(sharing.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Last resort: select input trick
      const ta = document.createElement('textarea');
      ta.value = sharing.url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={handleShare}
        className="btn-gold flex items-center gap-2 text-[0.65rem]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        aria-label="Share invitation"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span key="copied" className="flex items-center gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Check size={13} />
              Copied!
            </motion.span>
          ) : (
            <motion.span key="share" className="flex items-center gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Share2 size={13} />
              Share Invitation
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Toast notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-[#123C35] border border-[#D4AF6A]/30
              px-4 py-2 rounded whitespace-nowrap z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <p className="font-poppins text-[0.6rem] tracking-wider text-[#E8D3A8]">
              Invitation link copied! 🔗
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
