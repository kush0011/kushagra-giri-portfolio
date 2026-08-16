import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Briefcase, Mail } from 'lucide-react';
import { ThreeCanvas } from './ThreeCanvas';
import { InteractiveTerminal } from './InteractiveTerminal';

interface HeroProps {
  onPetCat?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onPetCat }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 text-center lg:text-left flex flex-col justify-center">
          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill mb-6 text-xs sm:text-sm font-medium text-cyan-300 border border-cyan-500/20 shadow-sm shadow-cyan-500/10 self-center lg:self-start"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>BCA Student & Aspiring Full Stack Developer</span>
          </motion.div>

          {/* Large Heading */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight select-none flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1"
          >
            <motion.span
              whileHover={{ scale: 1.06, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="inline-block cursor-pointer hover:text-cyan-200 transition-colors duration-200"
            >
              Hi, I'm
            </motion.span>{' '}
            <motion.span
              whileHover={{ scale: 1.1, rotate: 1.5, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 12 }}
              className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-teal-300 bg-clip-text text-transparent drop-shadow-sm hover:drop-shadow-[0_0_35px_rgba(56,189,248,0.85)] hover:from-cyan-300 hover:via-purple-300 hover:to-teal-200 transition-all duration-300 cursor-pointer"
            >
              Kushagra Giri
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mb-5"
          >
            <motion.span
              id="hero-subtitle"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: 'spring', stiffness: 350, damping: 14 }}
              className="inline-block text-xl sm:text-2xl md:text-3xl font-medium text-cyan-300/90 font-mono hover:text-cyan-200 hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.75)] cursor-pointer tracking-normal hover:tracking-wide transition-all duration-300 px-3 py-1 rounded-xl hover:bg-white/[0.05] hover:border hover:border-cyan-400/30"
            >
              Aspiring Full Stack Developer
            </motion.span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            id="hero-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-light"
          >
            I build responsive web apps with React, Node.js and modern JavaScript.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            id="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5 mb-8"
          >
            {/* Primary CTA */}
            <button
              id="hero-cta-projects"
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto group relative px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 overflow-hidden"
            >
              <Briefcase className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform duration-200" />
              <span>View My Work</span>
            </button>

            {/* Secondary CTA */}
            <button
              id="hero-cta-contact"
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 glass-card hover:bg-white/10 hover:text-white border border-white/15 hover:border-cyan-400/40 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5"
            >
              <Mail className="w-4 h-4 text-purple-400" />
              <span>Contact Me</span>
            </button>
          </motion.div>

          {/* Interactive Working CLI Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="max-w-md mx-auto lg:mx-0 hidden sm:block"
          >
            <InteractiveTerminal onPetCat={onPetCat} />
          </motion.div>
        </div>

        {/* Right Column: Interactive 3D Canvas Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 relative flex flex-col items-center justify-center"
        >
          {/* Glass Showcase Frame */}
          <div className="relative w-full rounded-2xl glass-card border border-white/15 p-2 sm:p-4 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl overflow-hidden group">
            {/* Glowing Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-purple-500/20 rounded-full blur-xl pointer-events-none" />

            {/* 3D WebGL Canvas */}
            <ThreeCanvas />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer group z-20"
        onClick={() => scrollToSection('about')}
      >
        <span className="text-xs font-mono text-slate-400 group-hover:text-cyan-300 transition mb-1">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full glass-pill flex items-center justify-center border border-white/10 group-hover:border-cyan-400/40"
        >
          <ArrowDown className="w-4 h-4 text-cyan-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

