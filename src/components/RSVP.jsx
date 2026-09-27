import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Heart, MessageSquare, Users, Phone, User } from 'lucide-react';
import { staggerContainer, fadeUp, fadeIn, scaleIn, viewportOnce } from '../animations/variants';
import GoldDivider from './GoldDivider';
import { submitRSVP } from '../services/rsvpService';
import weddingConfig from '../config/weddingConfig';

// ──────────────────────────────────────────────
// RSVP — elegant form + WhatsApp option
// ──────────────────────────────────────────────

const INITIAL = { name: '', phone: '', guests: '1', attendance: '', message: '' };

// Floating label input
function FormField({ label, icon: Icon, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-poppins text-[0.6rem] tracking-[0.2em] uppercase text-[#24332F]/50 flex items-center gap-1.5">
        <Icon size={11} color="#D4AF6A" />
        {label}
      </label>
      {children}
      {error && (
        <p className="font-poppins text-[0.6rem] text-red-500 mt-0.5" role="alert">{error}</p>
      )}
    </div>
  );
}

function inputCls(hasError) {
  return `w-full bg-transparent border-b py-2.5 font-poppins text-sm text-[#24332F]
    placeholder-[#24332F]/30 outline-none transition-colors duration-300
    focus:border-[#D4AF6A] focus:placeholder-[#24332F]/50
    ${hasError ? 'border-red-400' : 'border-[#D4AF6A]/30'}`;
}

export default function RSVP() {
  const { whatsapp } = weddingConfig;
  const [form,       setForm]       = useState(INITIAL);
  const [errors,     setErrors]     = useState({});
  const [status,     setStatus]     = useState('idle'); // idle | loading | success | error
  const [serverMsg,  setServerMsg]  = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim())   errs.name   = 'Please enter your name.';
    if (!form.phone.trim())  errs.phone  = 'Please enter your phone number.';
    if (!form.attendance)    errs.attendance = 'Please select your attendance.';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');

    const result = await submitRSVP(form);
    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      setServerMsg(result.message);
    }
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${whatsapp.number.replace(/\D/g,'')}?text=${encodeURIComponent(whatsapp.message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="rsvp"
      className="section-beige section-pad overflow-hidden"
      aria-label="RSVP form"
    >
      <div className="max-w-2xl mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p
            className="font-poppins text-[0.6rem] tracking-[0.35em] uppercase text-[#D4AF6A] mb-4"
            variants={fadeIn}
          >
            Kindly Reply
          </motion.p>
          <motion.h2
            className="font-cormorant font-light text-[#24332F]"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3.2rem)' }}
            variants={fadeUp}
          >
            Will You Join Us?
          </motion.h2>
          <GoldDivider className="mt-2" />
          <motion.p
            className="font-cormorant italic text-[#24332F]/50 text-lg mt-4"
            variants={fadeUp}
          >
            Your presence would make our day complete
          </motion.p>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            /* Success state */
            <motion.div
              key="success"
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="w-20 h-20 rounded-full border-2 border-[#D4AF6A] flex items-center justify-center mx-auto mb-6"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={32} color="#D4AF6A" fill="rgba(212,175,106,0.4)" />
              </motion.div>
              <h3 className="font-cormorant text-[#24332F] mb-3"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)' }}>
                Thank You!
              </h3>
              <p className="font-poppins text-sm text-[#24332F]/60 max-w-sm mx-auto leading-relaxed">
                Thank you for celebrating this beautiful moment with us ❤️
              </p>
              <p className="font-urdu text-[#24332F]/40 text-base mt-4">
                جزاکم اللہ خیراً
              </p>
              <button
                className="btn-gold mt-8 text-xs"
                onClick={() => { setStatus('idle'); setForm(INITIAL); }}
              >
                Submit Another RSVP
              </button>
            </motion.div>
          ) : (
            /* Form */
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              className="relative paper-texture border border-[#D4AF6A]/20 p-8 md:p-10"
              style={{ boxShadow: '0 8px 40px rgba(18,60,53,0.06)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6 }}
            >
              {/* Corner dots */}
              {['top-3 left-3','top-3 right-3','bottom-3 left-3','bottom-3 right-3'].map((pos,i) => (
                <div key={i} className={`absolute ${pos} w-1.5 h-1.5 bg-[#D4AF6A]/40`} aria-hidden="true"/>
              ))}

              <div className="space-y-7">

                {/* Name */}
                <FormField label="Full Name" icon={User} error={errors.name}>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={update('name')}
                    className={inputCls(errors.name)}
                    autoComplete="name"
                  />
                </FormField>

                {/* Phone */}
                <FormField label="Phone Number" icon={Phone} error={errors.phone}>
                  <input
                    type="tel"
                    placeholder="+92 300 0000000"
                    value={form.phone}
                    onChange={update('phone')}
                    className={inputCls(errors.phone)}
                    autoComplete="tel"
                  />
                </FormField>

                {/* Guests */}
                <FormField label="Number of Guests" icon={Users} error={errors.guests}>
                  <select
                    value={form.guests}
                    onChange={update('guests')}
                    className={`${inputCls(false)} bg-transparent cursor-pointer`}
                  >
                    {['1','2','3','4','5','6+'].map((n) => (
                      <option key={n} value={n}>{n} {n === '1' ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </FormField>

                {/* Attendance */}
                <FormField label="Attendance" icon={Heart} error={errors.attendance}>
                  <div className="flex flex-col sm:flex-row gap-4 pt-1">
                    {[
                      { value: 'accept',  label: 'Joyfully Accept' },
                      { value: 'decline', label: 'Regretfully Decline' },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 cursor-pointer group px-4 py-3 border transition-all duration-200 flex-1
                          ${form.attendance === opt.value
                            ? 'border-[#D4AF6A] bg-[#D4AF6A]/8'
                            : 'border-[#D4AF6A]/20 hover:border-[#D4AF6A]/50'}`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all
                          ${form.attendance === opt.value ? 'border-[#D4AF6A]' : 'border-[#D4AF6A]/40'}`}>
                          {form.attendance === opt.value && (
                            <div className="w-2 h-2 rounded-full bg-[#D4AF6A]" />
                          )}
                        </div>
                        <input
                          type="radio"
                          name="attendance"
                          value={opt.value}
                          checked={form.attendance === opt.value}
                          onChange={update('attendance')}
                          className="sr-only"
                        />
                        <span className="font-poppins text-xs text-[#24332F]/70">
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </FormField>

                {/* Message */}
                <FormField label="Message (Optional)" icon={MessageSquare}>
                  <textarea
                    placeholder="Share a warm message for the couple..."
                    value={form.message}
                    onChange={update('message')}
                    rows={3}
                    className={`${inputCls(false)} resize-none`}
                  />
                </FormField>

              </div>

              {/* Server error */}
              {status === 'error' && (
                <p className="font-poppins text-xs text-red-500 mt-4 text-center" role="alert">
                  {serverMsg}
                </p>
              )}

              {/* Submit */}
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-gold-filled flex-1 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {status === 'loading' ? (
                    <span className="font-poppins text-xs tracking-widest">Sending…</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Send RSVP</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="btn-gold flex items-center justify-center gap-2 sm:flex-none"
                  aria-label="RSVP via WhatsApp"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  </svg>
                  WhatsApp
                </button>
              </div>

            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
