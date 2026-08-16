import React from 'react';
import { Github, Linkedin, ArrowUp, Code2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative py-12 px-4 sm:px-6 border-t border-white/10 glass-nav mt-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Tagline */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-[#090d16] rounded-[7px] flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>
          <span className="text-sm font-semibold text-slate-200">Kushagra Giri</span>
        </div>

        {/* Center: Exact Copyright Text */}
        <div className="text-center">
          <p className="text-xs sm:text-sm text-slate-400 font-light">
            © 2026 Kushagra Giri. Built with React.
          </p>
        </div>

        {/* Right: Social Icon Links & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            id="footer-github-link"
            href="https://github.com/kush0011"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg glass-pill flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400/40 transition"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            id="footer-linkedin-link"
            href="https://www.linkedin.com/in/kushagra-giri-5725b0334/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-lg glass-pill flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-400/40 transition"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            id="footer-back-to-top"
            onClick={scrollToTop}
            className="w-8 h-8 rounded-lg glass-pill flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition ml-2"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
