import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ContactFormData } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handlePhoneCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('+919582035294');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in all fields before submitting.');
      return;
    }
    setErrorMsg('');
    setIsSubmitting(true);

    // Simulate sending
    setTimeout(() => {
      // Log the values as requested
      console.log('Contact form submitted with values:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#38bdf8', '#a855f7', '#2dd4bf'],
        });
      } catch (err) {
        // Safe fallback if confetti canvas fails in some sandbox contexts
      }
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Connect & Collaborate</span>
        </motion.div>

        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          Get In{' '}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Touch
          </span>
        </motion.h2>

        <motion.p
          id="contact-subtitle"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-slate-300 text-base sm:text-lg font-light max-w-2xl mx-auto"
        >
          I'm currently looking for internship and job opportunities — feel free to reach out!
        </motion.p>
      </div>

      {/* Two-Column Grid: Direct Contact Links & Contact Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Contact Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-4"
        >
          <div className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 text-left">
            <h3 className="text-xl font-bold text-white mb-2">Direct Contact Channels</h3>
            <p className="text-sm text-slate-300 mb-6 font-light leading-relaxed">
              Available for full stack web development roles, freelance web builds, and software internships.
            </p>

            <div className="space-y-3.5">
              {/* Phone Card */}
              <div
                id="contact-card-phone"
                className="group relative flex items-center justify-between p-4 rounded-xl glass-pill bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 transition duration-200"
              >
                <a
                  href="tel:+919582035294"
                  className="flex items-center gap-3.5 flex-1 min-w-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Phone</p>
                    <p className="text-sm font-semibold text-white truncate group-hover:text-cyan-300 transition">
                      +91 9582035294
                    </p>
                  </div>
                </a>

                <button
                  id="copy-phone-btn"
                  onClick={handlePhoneCopy}
                  className="p-2 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition"
                  title="Copy Phone Number"
                  aria-label="Copy Phone Number"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* GitHub Card */}
              <a
                id="contact-card-github"
                href="https://github.com/kush0011"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl glass-pill bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-purple-400/40 transition duration-200"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition">
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">GitHub</p>
                    <p className="text-sm font-semibold text-white truncate group-hover:text-purple-300 transition">
                      github.com/kush0011
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-300 transition transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* LinkedIn Card */}
              <a
                id="contact-card-linkedin"
                href="https://www.linkedin.com/in/kushagra-giri-5725b0334/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl glass-pill bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-teal-400/40 transition duration-200"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">LinkedIn</p>
                    <p className="text-sm font-semibold text-white truncate group-hover:text-teal-300 transition">
                      linkedin.com/in/kushagra-giri...
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-teal-300 transition transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Controlled Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 text-left bg-slate-900/70">
            <h3 className="text-xl font-bold text-white mb-1">Send a Message</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 font-light">
              Fill out the form below and I'll get back to you promptly.
            </p>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-10 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2">Message sent!</h4>
                  <p className="text-sm text-slate-300 max-w-sm mb-6 font-light">
                    Thank you for reaching out! Your message details have been logged and recorded.
                  </p>
                  <button
                    id="send-another-btn"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-cyan-300 glass-pill hover:bg-white/10 transition border border-cyan-500/30"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                      {errorMsg}
                    </div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Let's discuss internship opportunities, a project collaboration, or any inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-lg shadow-cyan-500/25 active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
