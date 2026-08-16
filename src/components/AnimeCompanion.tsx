import React, { useEffect, useState, useRef } from 'react';
import { Heart, Sparkles, X, Volume2, VolumeX, MessageSquare } from 'lucide-react';

interface AnimeCompanionProps {
  enabled?: boolean;
  onToggle?: (enabled: boolean) => void;
}

export const AnimeCompanion: React.FC<AnimeCompanionProps> = ({
  enabled = true,
  onToggle,
}) => {
  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [targetPos, setTargetPos] = useState({ x: 200, y: 200 });
  const [isMoving, setIsMoving] = useState(false);
  const [isFacingLeft, setIsFacingLeft] = useState(false);
  const [dialogue, setDialogue] = useState<string | null>("Nya! Welcome to Kushagra's Portfolio! 🐾");
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [petCount, setPetCount] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Catch mouse position
  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset position slightly so cat chases target near cursor
      setTargetPos({ x: e.clientX + 22, y: e.clientY + 22 });
      setIsSleeping(false);

      // Reset idle timer
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsSleeping(true);
        setDialogue("Zzz... 💤 (Hover near me to wake up!)");
      }, 12000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [enabled]);

  // Smooth movement animation frame (Lerp physics)
  useEffect(() => {
    if (!enabled) return;

    let animFrame: number;
    const updatePosition = () => {
      setPos((prev) => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // If distance is greater than threshold, move towards mouse
        if (dist > 15) {
          setIsMoving(true);
          setIsFacingLeft(dx < 0);
          return {
            x: prev.x + dx * 0.08,
            y: prev.y + dy * 0.08,
          };
        } else {
          setIsMoving(false);
          return prev;
        }
      });

      animFrame = requestAnimationFrame(updatePosition);
    };

    animFrame = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animFrame);
  }, [targetPos, enabled]);

  // Click to pat cat
  const handlePetCat = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newPetCount = petCount + 1;
    setPetCount(newPetCount);

    // Heart splash animation
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHearts((prev) => [
      ...prev,
      { id: Date.now(), x: rect.left + 20, y: rect.top - 10 },
    ]);

    const quotes = [
      "Purrr~ 💖 Thanks for visiting Kushagra's site!",
      "Meow! 🐾 Kushagra is a BCA Full-Stack Scholar!",
      "Nya! Check out the 3D model and cool projects!",
      "Hehe! You petted me! ✨",
      "Kushagra builds with React, Node.js & MERN! 🚀",
      "Nya~ Petting spree! Level " + newPetCount + " unlocked! 🎉",
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setDialogue(randomQuote);

    // Auto clear dialogue after 4s
    setTimeout(() => {
      setDialogue(null);
    }, 4500);
  };

  // Remove hearts after float
  useEffect(() => {
    if (hearts.length > 0) {
      const timer = setTimeout(() => {
        setHearts((prev) => prev.slice(1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hearts]);

  if (!enabled) return null;

  return (
    <>
      {/* Floating Heart Particles when patted */}
      {hearts.map((h) => (
        <div
          key={h.id}
          className="fixed z-[999] pointer-events-none text-rose-400 animate-bounce"
          style={{ left: h.x, top: h.y }}
        >
          <Heart className="w-5 h-5 fill-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
        </div>
      ))}

      {/* Anime Companion Pet Container */}
      <div
        className="fixed z-[998] pointer-events-none transition-transform duration-75 flex flex-col items-center"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Speech Bubble */}
        {dialogue && (
          <div className="absolute -top-14 min-w-[160px] max-w-[220px] px-3 py-1.5 rounded-xl bg-slate-900/90 text-cyan-200 border border-cyan-400/40 shadow-xl backdrop-blur-md text-[11px] font-mono text-center pointer-events-auto cursor-pointer animate-fade-in">
            <span>{dialogue}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-b border-r border-cyan-400/40 rotate-45" />
          </div>
        )}

        {/* Anime Cat Sprite / Canvas Vector */}
        <div
          onClick={handlePetCat}
          className={`pointer-events-auto cursor-pointer group relative w-12 h-12 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${
            isFacingLeft ? '-scale-x-100' : 'scale-x-100'
          }`}
          title="Click to pat Kushagra's Companion Pet! 🐾"
        >
          {/* Glowing Aura Ring */}
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md group-hover:bg-purple-400/40 transition-colors" />

          {/* SVG Animated Anime Chibi Cat */}
          <svg
            viewBox="0 0 100 100"
            className={`w-11 h-11 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)] ${
              isMoving ? 'animate-pulse' : ''
            }`}
          >
            {/* Tail */}
            <path
              d="M20 70 Q10 40 25 30"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="6"
              strokeLinecap="round"
              className={isMoving ? 'animate-bounce' : ''}
            />

            {/* Cat Body */}
            <ellipse cx="50" cy="65" rx="24" ry="18" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />

            {/* Paws */}
            <circle cx="36" cy="80" r="5" fill="#38bdf8" />
            <circle cx="64" cy="80" r="5" fill="#38bdf8" />

            {/* Cat Head */}
            <circle cx="50" cy="40" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />

            {/* Cat Ears */}
            <polygon points="32,25 24,5 42,20" fill="#a855f7" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="68,25 76,5 58,20" fill="#a855f7" stroke="#38bdf8" strokeWidth="2" />
            <polygon points="34,23 28,10 40,20" fill="#f472b6" />
            <polygon points="66,23 72,10 60,20" fill="#f472b6" />

            {/* Eyes */}
            {isSleeping ? (
              <>
                <path d="M40 38 Q45 42 48 38" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M52 38 Q55 42 60 38" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
              </>
            ) : (
              <>
                <ellipse cx="42" cy="38" rx="4" ry="6" fill="#38bdf8" />
                <ellipse cx="58" cy="38" rx="4" ry="6" fill="#38bdf8" />
                <circle cx="43" cy="36" r="1.5" fill="#ffffff" />
                <circle cx="59" cy="36" r="1.5" fill="#ffffff" />
              </>
            )}

            {/* Cute Nose & Whiskers */}
            <polygon points="48,45 52,45 50,47" fill="#f472b6" />
            <line x1="30" y1="44" x2="18" y2="42" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="30" y1="47" x2="16" y2="48" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="70" y1="44" x2="82" y2="42" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="70" y1="47" x2="84" y2="48" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Cute Smile */}
            <path d="M45 49 Q50 53 55 49" fill="none" stroke="#38bdf8" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </>
  );
};
