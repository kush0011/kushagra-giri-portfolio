import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Code2, Moon, Sun, Sparkles, Send } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  companionEnabled?: boolean;
  setCompanionEnabled?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  companionEnabled = true,
  setCompanionEnabled,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Background blur opacity on scroll
      setIsScrolled(window.scrollY > 20);

      // Scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Active section detection
      const sections = ['about', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav py-3.5 shadow-lg shadow-black/20'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 via-purple-500 to-teal-400 transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Name */}
        <a
          id="nav-brand-link"
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-white transition-transform hover:scale-105"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center group-hover:bg-opacity-80 transition">
              <Code2 className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:to-purple-300 transition-all">
            Kushagra Giri
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                  isActive
                    ? 'text-cyan-300 bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          <div className="h-5 w-[1px] bg-white/10 mx-2" />

          {/* Pet Companion Toggle Button */}
          {setCompanionEnabled && (
            <button
              onClick={() => setCompanionEnabled(!companionEnabled)}
              title={companionEnabled ? 'Disable Anime Companion Pet' : 'Enable Anime Companion Pet'}
              className={`px-2.5 py-1 rounded-full text-xs font-mono flex items-center gap-1 transition border ${
                companionEnabled
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-sm shadow-cyan-500/20'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              <span>🐾 Pet</span>
              <span className={`w-2 h-2 rounded-full ${companionEnabled ? 'bg-cyan-400 animate-pulse' : 'bg-slate-500'}`} />
            </button>
          )}

          {/* Dark / Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition"
            aria-label="Toggle Theme"
            title={darkMode ? 'Switch to Midnight Slate theme' : 'Switch to Dark Matrix theme'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Quick Contact CTA */}
          <a
            id="nav-cta-contact"
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="ml-2 flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg transition shadow-sm hover:shadow-cyan-500/20"
          >
            <Send className="w-3.5 h-3.5" />
            Hire Me
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-slate-300 hover:text-white rounded-lg bg-white/5"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-200 hover:text-white rounded-lg bg-white/5 border border-white/10 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-card mx-4 mt-3 p-5 rounded-2xl border border-white/15 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  id={`mobile-link-${link.name.toLowerCase()}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:text-cyan-300 hover:bg-white/10 transition flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono text-cyan-400/60">0{navLinks.indexOf(link) + 1}</span>
                </a>
              ))}
              
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <a
                  id="mobile-cta-btn"
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="w-full text-center py-3 px-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
