import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import {
  GraduationCap,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Cpu,
  Layers,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { PhotoSlide } from '../types';

export const About: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Photos list with fallback placeholders
  const photos: PhotoSlide[] = [
    {
      id: 1,
      src: '/20251003_095333.jpg',
      alt: 'Kushagra Giri - BCA at IITM College of Engineering',
      title: 'Kushagra Giri',
      caption: 'BCA Scholar @ IITM College of Engineering (2024–2027)',
    },
    {
      id: 2,
      src: '/IMG-20250219-WA0013.jpg',
      alt: 'Kushagra Giri - Full Stack Developer Journey',
      title: 'Full Stack Journey',
      caption: 'Frontend Architecture with React, Vite & Tailwind',
    },
    {
      id: 3,
      src: '/IMG-20260221-WA0377.jpg',
      alt: 'Kushagra Giri - Coding & Problem Solving',
      title: 'Backend & Systems',
      caption: 'Learning Node.js, Express, MERN & SQL databases',
    },
    {
      id: 4,
      src: '/IMG-20260624-WA0164.jpg',
      alt: 'Kushagra Giri - Exploring Web Tech & Innovation',
      title: 'Continuous Learner',
      caption: 'Passionate about building responsive, functional interfaces',
    },
  ];

  // Scroll driven animation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const photoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const photoScale = useTransform(scrollYProgress, [0, 0.25], [0.94, 1]);

  // Auto transition photos as user explores
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, photos.length]);

  const handlePrevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  };

  // Exact skills requested: HTML, CSS, JavaScript, React.js, Node.js, SQL, C++, Python, Git
  const skills = [
    { name: 'HTML', category: 'Frontend', color: 'from-orange-500/20 to-orange-500/10 text-orange-300 border-orange-500/30' },
    { name: 'CSS', category: 'Frontend', color: 'from-blue-500/20 to-blue-500/10 text-blue-300 border-blue-500/30' },
    { name: 'JavaScript', category: 'Language', color: 'from-amber-500/20 to-amber-500/10 text-amber-300 border-amber-500/30' },
    { name: 'React.js', category: 'Frontend', color: 'from-cyan-500/20 to-cyan-500/10 text-cyan-300 border-cyan-500/30' },
    { name: 'Node.js', category: 'Backend', color: 'from-emerald-500/20 to-emerald-500/10 text-emerald-300 border-emerald-500/30' },
    { name: 'SQL', category: 'Database', color: 'from-indigo-500/20 to-indigo-500/10 text-indigo-300 border-indigo-500/30' },
    { name: 'C++', category: 'Core', color: 'from-purple-500/20 to-purple-500/10 text-purple-300 border-purple-500/30' },
    { name: 'Python', category: 'Language', color: 'from-teal-500/20 to-teal-500/10 text-teal-300 border-teal-500/30' },
    { name: 'Git', category: 'Tooling', color: 'from-rose-500/20 to-rose-500/10 text-rose-300 border-rose-500/30' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Scroll-based reveal container */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
      >
        {/* Left Column: 4-Photo Scroll Slider / Carousel */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <motion.div
            style={{ opacity: photoOpacity, scale: photoScale }}
            className="w-full max-w-sm sm:max-w-md relative group"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Glowing Backdrop Frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-600 to-teal-400 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500" />

            {/* Glass Card Container */}
            <div className="relative glass-card rounded-2xl overflow-hidden p-3 border border-white/20 shadow-2xl backdrop-blur-xl bg-slate-900/80">
              {/* Photo Display Window */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-950/60 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50, scale: 0.96 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img
                      src={photos[currentSlide].src}
                      alt={photos[currentSlide].alt}
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        // Fallback if JPG is missing
                        (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500"><rect fill="%230f172a" width="400" height="500"/><text fill="%2338bdf8" font-family="sans-serif" font-size="20" font-weight="bold" x="50%25" y="45%25" text-anchor="middle">Photo ${currentSlide + 1}</text><text fill="%2394a3b8" font-family="sans-serif" font-size="14" x="50%25" y="55%25" text-anchor="middle">Kushagra Giri</text></svg>`;
                      }}
                    />
                    {/* Inner subtle gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

                    {/* Photo Caption Badge */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-left">
                      <p className="text-xs font-semibold text-cyan-300 font-mono">
                        [0{currentSlide + 1} / 0{photos.length}] {photos[currentSlide].title}
                      </p>
                      <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-1">
                        {photos[currentSlide].caption}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right Navigation Arrows */}
                <button
                  id="about-slider-prev-btn"
                  onClick={handlePrevSlide}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-white hover:bg-cyan-500/30 transition border border-white/15 z-20"
                  aria-label="Previous Photo"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  id="about-slider-next-btn"
                  onClick={handleNextSlide}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full glass-pill flex items-center justify-center text-white/80 hover:text-white hover:bg-cyan-500/30 transition border border-white/15 z-20"
                  aria-label="Next Photo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center justify-center gap-2 pt-3 pb-1">
                {photos.map((_, idx) => (
                  <button
                    key={idx}
                    id={`photo-dot-${idx}`}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentSlide(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx
                      ? 'w-6 bg-gradient-to-r from-cyan-400 to-purple-400'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: About Me Bio & Skills Grid */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* Section Eyebrow */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Developer Background</span>
          </div>

          {/* Heading */}
          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
          >
            About{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          {/* Education Milestone Box */}
          <div className="flex items-start gap-3.5 p-4 rounded-xl glass-card border border-cyan-500/20 bg-cyan-950/10">
            <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-cyan-300 font-semibold">2024 – 2027 • Undergrad</p>
              <h3 className="text-sm font-bold text-white mt-0.5">
                BCA — IITM College of Engineering
              </h3>
              <p className="text-xs text-slate-400">Affiliated to Maharishi Dayanand University</p>
            </div>
          </div>

          {/* Exact Description Paragraph */}
          <p
            id="about-description"
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-light"
          >
            I'm currently pursuing a BCA at IITM College of Engineering (affiliated to Maharishi
            Dayanand University), 2024–2027. I specialize in full stack development — I started
            with HTML, CSS and JavaScript, moved on to React for frontend and SQL for databases,
            and I'm currently learning Node.js and the MERN stack. I love building clean,
            functional interfaces and I'm always looking for opportunities to sharpen my skills.
          </p>

          {/* Skills Row/Grid of Tags */}
          <div className="pt-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Core Skills & Technologies</span>
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  id={`skill-tag-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className={`gsap-skill-tag px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium border glass-pill bg-gradient-to-r ${skill.color} transition-shadow shadow-sm hover:shadow-cyan-500/20 cursor-default`}
                >
                  {skill.name}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
