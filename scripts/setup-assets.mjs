import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create sample SVGs as fallback images if JPGs are requested
const photos = [
  { name: 'photo1.jpg', title: 'Kushagra Giri', subtitle: 'IITM College of Engineering', color1: '#3b82f6', color2: '#8b5cf6', badge: 'Tech & BCA 2024-2027' },
  { name: 'photo2.jpg', title: 'Full Stack Journey', subtitle: 'React, Node.js & MERN', color1: '#06b6d4', color2: '#3b82f6', badge: 'Frontend & UI Craft' },
  { name: 'photo3.jpg', title: 'Developer In Action', subtitle: 'Building Scalable Apps', color1: '#8b5cf6', color2: '#ec4899', badge: 'Problem Solver & C++' },
  { name: 'photo4.jpg', title: 'Exploring & Learning', subtitle: 'Web & Systems Engineering', color1: '#10b981', color2: '#06b6d4', badge: 'Always Growing' },
];

for (const p of photos) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b1120" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#030712" />
    </linearGradient>
    <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.color1}" stop-opacity="0.8" />
      <stop offset="100%" stop-color="${p.color2}" stop-opacity="0.8" />
    </linearGradient>
    <radialGradient id="circleGlow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="${p.color1}" stop-opacity="0.25" />
      <stop offset="100%" stop-color="transparent" />
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)" />
  <rect width="100%" height="100%" fill="url(#circleGlow)" />
  
  <!-- Subtle tech grid -->
  <g stroke="rgba(255,255,255,0.04)" stroke-width="1">
    <line x1="0" y1="200" x2="800" y2="200" />
    <line x1="0" y1="400" x2="800" y2="400" />
    <line x1="0" y1="600" x2="800" y2="600" />
    <line x1="0" y1="800" x2="800" y2="800" />
    <line x1="200" y1="0" x2="200" y2="1000" />
    <line x1="400" y1="0" x2="400" y2="1000" />
    <line x1="600" y1="0" x2="600" y2="1000" />
  </g>

  <!-- Avatar Silhouette or Badge -->
  <g transform="translate(400, 360)">
    <circle r="140" fill="url(#glow)" opacity="0.15" />
    <circle r="120" fill="#1e293b" stroke="url(#glow)" stroke-width="3" />
    <!-- User Avatar Icon -->
    <path d="M-40,60 C-40,0 40,0 40,60 Z" fill="url(#glow)" opacity="0.7"/>
    <circle cx="0" cy="-25" r="35" fill="url(#glow)" opacity="0.9"/>
  </g>

  <rect x="250" y="540" width="300" height="36" rx="18" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
  <text x="400" y="563" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" font-weight="600" fill="${p.color1}" text-anchor="middle">${p.badge}</text>

  <text x="400" y="640" font-family="'Plus Jakarta Sans', sans-serif" font-size="34" font-weight="800" fill="#f8fafc" text-anchor="middle">${p.title}</text>
  <text x="400" y="685" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="400" fill="#94a3b8" text-anchor="middle">${p.subtitle}</text>
  
  <text x="400" y="920" font-family="'JetBrains Mono', monospace" font-size="13" fill="#64748b" text-anchor="middle">// Kushagra Giri Portfolio Gallery</text>
</svg>`;
  fs.writeFileSync(path.join(publicDir, p.name), svg);
}

console.log('Public photos initialized');
