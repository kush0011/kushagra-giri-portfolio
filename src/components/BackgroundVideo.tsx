import React, { useEffect, useRef, useState } from 'react';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Canvas code-editor / syntax particle animation as animated backdrop
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Code lines and glowing syntax tokens
    interface CodeParticle {
      x: number;
      y: number;
      text: string;
      color: string;
      speed: number;
      opacity: number;
      fontSize: number;
    }

    const syntaxSnippets = [
      { text: 'const portfolio = new Developer("Kushagra");', color: '#38bdf8' },
      { text: 'async function buildAwesomeApp() {', color: '#a855f7' },
      { text: '  await db.connect("PostgreSQL");', color: '#2dd4bf' },
      { text: '  return <React.StrictMode><App /></React.StrictMode>;', color: '#f59e0b' },
      { text: 'import { useState, useEffect } from "react";', color: '#ec4899' },
      { text: 'def atm_authenticate(pin, account):', color: '#38bdf8' },
      { text: '  if verify_credentials(pin): return True', color: '#10b981' },
      { text: 'export default function FullStackEngine() {', color: '#818cf8' },
      { text: '  const [skills, setSkills] = useState(["React", "Node"]);', color: '#a855f7' },
      { text: 'SELECT * FROM projects WHERE status = "Shipped";', color: '#2dd4bf' },
      { text: 'npm run build && vite optimize', color: '#f97316' },
      { text: 'git commit -m "feat: responsive glassmorphism UI"', color: '#38bdf8' },
    ];

    const particles: CodeParticle[] = [];
    const count = Math.min(24, Math.floor(window.innerWidth / 50));

    for (let i = 0; i < count; i++) {
      const snippet = syntaxSnippets[Math.floor(Math.random() * syntaxSnippets.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        text: snippet.text,
        color: snippet.color,
        speed: 0.3 + Math.random() * 0.5,
        opacity: 0.15 + Math.random() * 0.25,
        fontSize: Math.floor(12 + Math.random() * 4),
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint gradient grid
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw floating code tokens
      ctx.font = '13px "JetBrains Mono", monospace';
      particles.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fillText(p.text, p.x, p.y);

        p.y -= p.speed;
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
      });
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="bg-video-container" aria-hidden="true">
      {/* Dynamic Animated Syntax Canvas for code-editor backdrop */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* Video Element as requested */}
      <video
        ref={videoRef}
        className="bg-video"
        src="/Abstract_code_animation_scrollin…_202608011643.mp4"
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={() => setVideoLoaded(true)}
      />

      {/* Dark Ambient Gradient & Blur Overlay for contrast and readability */}
      {/* <div className="bg-video-overlay" /> */}

      {/* Decorative ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 right-1/4 w-[28rem] h-[28rem] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
