import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ExternalLink,
  Github,
  FolderGit2,
  Sparkles,
  Layers,
  CheckCircle2,
  Code,
  X,
  Laptop,
  ShoppingBag,
  Gamepad2,
  CreditCard,
} from 'lucide-react';
import { Project } from '../types';
import { MagneticCard } from './MagneticCard';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Exact projects and descriptions from specification
  const projects: Project[] = [
    {
      id: 'scarp-dealer',
      title: 'Scarp Dealer — Freelance Client Project',
      category: 'Freelance Client App',
      description:
        'Built a responsive web app for a construction scrap dealer (freelance project via client referral) to simplify buying and selling scrap materials, with an intuitive UI for browsing listings and managing products, reusable components, and a smooth user experience.',
      tags: ['React', 'Vite', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'],
      link: '#',
      codeLink: '#',
      featured: true,
    },
    {
      id: 'power-ecommerce',
      title: 'POWER — Premium E-Commerce Store',
      category: 'Frontend Application',
      description:
        'A fully functional demo e-commerce frontend with a product catalogue, responsive design, and interactive shopping UI, showcasing layout design, product cards, and navigation flow.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: '#',
      codeLink: '#',
    },
    {
      id: 'noobstore-marketplace',
      title: 'NOOBstore — Game Account Marketplace',
      category: 'Marketplace Concept',
      description:
        'A niche marketplace UI concept for buying and selling gaming accounts, featuring listing cards, category filters, and a clean layout inspired by real-world marketplace platforms.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      link: '#',
      codeLink: '#',
    },
    {
      id: 'atm-system',
      title: 'ATM System',
      category: 'Python Software',
      description:
        'A Python-based ATM system featuring secure login, balance inquiry, cash deposit, withdrawal, and password authentication using core Python concepts.',
      tags: ['Python'],
      link: 'https://github.com/kush0011/kush-atm-system-python',
      codeLink: 'https://github.com/kush0011/kush-atm-system-python',
      featured: true,
    },
  ];

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'scarp-dealer':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'power-ecommerce':
        return <ShoppingBag className="w-5 h-5 text-purple-400" />;
      case 'noobstore-marketplace':
        return <Gamepad2 className="w-5 h-5 text-teal-400" />;
      case 'atm-system':
        return <CreditCard className="w-5 h-5 text-amber-400" />;
      default:
        return <FolderGit2 className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getCardAccentGradient = (id: string) => {
    switch (id) {
      case 'scarp-dealer':
        return 'from-cyan-500/20 via-blue-500/5 to-transparent hover:border-cyan-400/50';
      case 'power-ecommerce':
        return 'from-purple-500/20 via-indigo-500/5 to-transparent hover:border-purple-400/50';
      case 'noobstore-marketplace':
        return 'from-teal-500/20 via-emerald-500/5 to-transparent hover:border-teal-400/50';
      case 'atm-system':
        return 'from-amber-500/20 via-yellow-500/5 to-transparent hover:border-amber-400/50';
      default:
        return 'from-cyan-500/20 to-transparent hover:border-cyan-400/50';
    }
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3"
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Featured Work & Concepts</span>
        </motion.div>

        <motion.h2
          id="projects-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          My{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-teal-300 bg-clip-text text-transparent">
            Projects
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-slate-300 text-sm sm:text-base font-light"
        >
          A selection of client solutions, frontend applications, marketplace UIs, and backend systems.
        </motion.p>
      </div>

      {/* Responsive Grid: 2 Columns on desktop, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {projects.map((project, index) => {
          const isRealLink = project.link && project.link !== '#';
          return (
            <MagneticCard key={project.id} id={`magnetic-project-${project.id}`}>
              <motion.article
                id={`project-card-${project.id}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`gsap-project-card group relative glass-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 bg-gradient-to-b ${getCardAccentGradient(
                  project.id
                )} transition-all duration-300 shadow-xl h-full`}
              >
                {/* Top Bar: Icon + Category Badge */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        {getProjectIcon(project.id)}
                      </div>
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300/80">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-500 group-hover:text-slate-400 transition">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Section: Tech Tags & Buttons */}
                <div className="pt-4 border-t border-white/10">
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-slate-300 bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    {isRealLink ? (
                      <a
                        id={`project-link-${project.id}`}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Github className="w-4 h-4" />
                        <span>View Code on GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                      </a>
                    ) : (
                      <>
                        <button
                          id={`project-btn-view-${project.id}`}
                          onClick={() => setSelectedProject(project)}
                          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 hover:border-cyan-400/40 transition-all active:scale-[0.98]"
                        >
                          <Laptop className="w-4 h-4 text-cyan-400" />
                          <span>View Project</span>
                        </button>

                        <button
                          id={`project-btn-code-${project.id}`}
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center justify-center p-2.5 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all"
                          title="View Code Details"
                          aria-label="View Code Details"
                        >
                          <Code className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.article>
            </MagneticCard>
          );
        })}
      </div>

      {/* Project Overview Modal for Projects with # placeholders */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-card max-w-lg w-full rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl relative bg-slate-900/90 text-left"
            >
              <button
                id="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
                <span>{selectedProject.category}</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                {selectedProject.title}
              </h3>

              <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">
                {selectedProject.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">
                  Technologies Utilized
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 mb-6 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Live demo and repo link will be attached in the upcoming deployment release.</span>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition shadow-lg shadow-cyan-500/20"
              >
                Close Preview
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
