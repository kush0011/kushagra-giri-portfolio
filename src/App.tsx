import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { GSAPScrollController } from './components/GSAPScrollController';
import { AnimeCompanion } from './components/AnimeCompanion';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [companionEnabled, setCompanionEnabled] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  return (
    <div className="relative min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* GSAP Scroll Controller */}
      <GSAPScrollController />

      {/* Cute Anime Cursor-Chasing Pet Companion */}
      <AnimeCompanion enabled={companionEnabled} />

      {/* 0. Glassmorphic Initial 1-100% Loader Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Fixed Background Video Layer (z-index -1, class bg-video) */}
      <BackgroundVideo />

      {/* Main Content Flow */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* 1. Navbar */}
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          companionEnabled={companionEnabled}
          setCompanionEnabled={setCompanionEnabled}
        />

        {/* 2. Hero Section */}
        <Hero onPetCat={() => setCompanionEnabled(true)} />

        {/* 3. About Me Section (with 4-photo scroll slider) */}
        <About />

        {/* 4. Projects Section */}
        <Projects />

        {/* 5. Contact Section */}
        <Contact />

        {/* 6. Footer */}
        <Footer />
      </div>
    </div>
  );
}

