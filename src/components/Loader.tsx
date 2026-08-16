import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Sparkles, Code2, Cpu } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Portfolio System...');

  useEffect(() => {
    const statuses = [
      'Initializing Portfolio Core...',
      'Compiling React & Motion Components...',
      'Loading Glassmorphism UI & Assets...',
      'Connecting Full Stack Environment...',
      'Welcome to Kushagra Giri Portfolio!',
    ];

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 4) + 1;
        const current = next > 100 ? 100 : next;

        // Update status text based on progress milestone
        if (current < 25) {
          setStatusText(statuses[0]);
        } else if (current < 55) {
          setStatusText(statuses[1]);
        } else if (current < 80) {
          setStatusText(statuses[2]);
        } else if (current < 98) {
          setStatusText(statuses[3]);
        } else {
          setStatusText(statuses[4]);
        }

        return current;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/65 backdrop-blur-xl selection:bg-cyan-500/30 text-white overflow-hidden"
    >
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse-subtle" />

      {/* Code grid background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Main Glassmorphic Loader Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-6 text-center">
        {/* Top Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill bg-white/[0.04] border border-white/10 text-xs font-mono text-cyan-300 tracking-wider uppercase mb-8 shadow-lg shadow-cyan-500/10"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Kushagra Giri • Portfolio</span>
        </motion.div>

        {/* Large Glass Effect Number Box (See-through Glass effect revealing website underneath) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative group p-8 sm:p-12 rounded-3xl glass-card border border-white/20 bg-slate-900/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] mb-8 overflow-hidden"
        >
          {/* Inner glass light reflection strip */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-white/15 to-transparent blur-xl pointer-events-none" />

          {/* Glowing number typography with glass text fill */}
          <div className="relative flex items-baseline justify-center gap-1 font-mono font-black text-6xl sm:text-8xl tracking-tight select-none">
            <span className="bg-gradient-to-br from-white via-cyan-200/90 to-purple-300/80 bg-clip-text text-transparent filter drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
              {progress}
            </span>
            <span className="text-3xl sm:text-5xl font-extrabold text-cyan-400/80 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              %
            </span>
          </div>

          {/* Sleek Progress Bar */}
          <div className="w-full bg-slate-950/80 rounded-full h-2.5 p-0.5 border border-white/10 mt-8 relative overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-teal-300 shadow-[0_0_15px_rgba(56,189,248,0.7)]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>
        </motion.div>

        {/* Live Tech Terminal Status Log */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2.5 text-xs font-mono text-slate-300 glass-pill py-2.5 px-5 rounded-xl border border-white/10 bg-black/40"
        >
          <Terminal className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="truncate">{statusText}</span>
        </motion.div>
      </div>

      {/* Footer minimal tag */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] font-mono text-slate-400 tracking-widest uppercase">
        Full Stack Web Architecture
      </div>
    </motion.div>
  );
};
