import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles } from 'lucide-react';

interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'system';
  text: React.ReactNode;
}

interface InteractiveTerminalProps {
  onPetCat?: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ onPetCat }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 1,
      type: 'system',
      text: (
        <span>
          Welcome to <span className="text-cyan-300 font-bold">Kushagra Giri's Interactive Terminal</span>. Type <span className="text-amber-300 font-bold">'help'</span> for commands!
        </span>
      ),
    },
    {
      id: 2,
      type: 'system',
      text: (
        <span>
          Current status: <span className="text-emerald-400">Ready for Full-Stack Developer Roles 🚀</span>
        </span>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory: TerminalLine[] = [
      ...history,
      {
        id: Date.now(),
        type: 'input',
        text: cmd,
      },
    ];

    switch (cmd) {
      case 'help':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: (
            <div className="space-y-1 text-slate-300">
              <p className="text-cyan-300 font-bold">Available Commands:</p>
              <p><span className="text-amber-300 w-24 inline-block font-bold">skills</span> - View technical skills & stack</p>
              <p><span className="text-amber-300 w-24 inline-block font-bold">projects</span> - View featured project portfolio</p>
              <p><span className="text-amber-300 w-24 inline-block font-bold">about</span> - View bio & education info</p>
              <p><span className="text-amber-300 w-24 inline-block font-bold">contact</span> - Get contact email & socials</p>
              <p><span className="text-amber-300 w-24 inline-block font-bold">cat / pet</span> - Interact with anime pet 🐾</p>
              <p><span className="text-amber-300 w-24 inline-block font-bold">clear</span> - Clear terminal history</p>
            </div>
          ),
        });
        break;

      case 'skills':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: (
            <div className="space-y-1">
              <p className="text-emerald-400 font-bold">⚡ Technical Stack:</p>
              <p className="text-slate-300">• Frontend: React.js, HTML, CSS, JavaScript, Tailwind CSS, Vite</p>
              <p className="text-slate-300">• Backend & Database: Node.js, Express, MERN, SQL</p>
              <p className="text-slate-300">• Languages & Tools: C++, Python, Git, GSAP, Three.js</p>
            </div>
          ),
        });
        break;

      case 'projects':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: (
            <div className="space-y-1 text-slate-300">
              <p className="text-purple-300 font-bold">📁 Featured Projects:</p>
              <p>1. <span className="text-cyan-300">Scrap Dealer</span> — Construction Scrap Marketplace Client App</p>
              <p>2. <span className="text-purple-300">POWER</span> — Premium E-Commerce Store UI</p>
              <p>3. <span className="text-teal-300">NOOBstore</span> — Game Account Marketplace UI</p>
              <p>4. <span className="text-amber-300">ATM System</span> — Python Software System</p>
            </div>
          ),
        });
        break;

      case 'about':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: (
            <p className="text-slate-300">
              🎓 <span className="text-cyan-300 font-bold">Kushagra Giri</span> — BCA Student @ IITM College of Engineering (MDU) 2024-2027. Full-Stack Web Developer.
            </p>
          ),
        });
        break;

      case 'contact':
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: (
            <div className="space-y-1 text-slate-300">
              <p className="text-cyan-300 font-bold">📬 Get In Touch:</p>
              <p>• Email: <a href="mailto:giri.kushagra1107@gmail.com" className="text-teal-300 underline">giri.kushagra1107@gmail.com</a></p>
              <p>• Location: New Delhi, India</p>
            </div>
          ),
        });
        break;

      case 'cat':
      case 'pet':
        if (onPetCat) onPetCat();
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: (
            <p className="text-pink-300 font-bold">
              🐾 Nya~! Companion pet petted! (Check the chasing cat on your screen!) ✨
            </p>
          ),
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          id: Date.now() + 1,
          type: 'output',
          text: (
            <p className="text-rose-400">
              Command not found: '{cmd}'. Type <span className="text-amber-300 font-bold">'help'</span> for a list of available commands.
            </p>
          ),
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="w-full glass-card rounded-xl p-4 text-left font-mono text-xs border border-white/10 shadow-2xl backdrop-blur-xl cursor-text"
    >
      {/* Terminal Header Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3 text-slate-400">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>kushagra@dev: ~/portfolio (interactive)</span>
        </div>
      </div>

      {/* Terminal Content Lines */}
      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
        {history.map((line) => (
          <div key={line.id} className="leading-relaxed">
            {line.type === 'input' ? (
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="text-emerald-400 font-bold">kushagra@dev:~$</span>
                <span className="text-cyan-300 font-semibold">{line.text}</span>
              </div>
            ) : (
              <div>{line.text}</div>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive Input Form */}
      <form onSubmit={handleCommand} className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1.5">
        <span className="text-emerald-400 font-bold shrink-0">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="type 'help'..."
          className="w-full bg-transparent outline-none text-cyan-200 placeholder:text-slate-500 font-mono text-xs"
        />
        <button type="submit" className="text-slate-500 hover:text-cyan-400 transition" title="Run command">
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
