import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Globe from '@/components/Globe';
import { MapPin, Code2, Heart, ArrowRight } from 'lucide-react';

export default function Community() {
  const { darkMode } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) =>
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const bgGridColor = darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';

  return (
    <section className="relative overflow-hidden py-16">
      {/* Grid background */}
      <div
        className="absolute inset-0 bg-[size:60px_60px] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${bgGridColor} 1px, transparent 1px), linear-gradient(90deg, ${bgGridColor} 1px, transparent 1px)`,
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`,
        }}
      />

      {/* Orbs */}
      <div
        className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none ${darkMode ? 'bg-zinc-800/20' : 'bg-zinc-200/50'}`}
        style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)` }}
      />
      <div
        className={`absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-[80px] pointer-events-none ${darkMode ? 'bg-zinc-700/15' : 'bg-zinc-300/40'}`}
      />

      {/* Two-column grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Content */}
        <div>
          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-8 backdrop-blur-sm ${darkMode
            ? 'bg-zinc-900/80 border-zinc-700'
            : 'bg-zinc-100/80 border-zinc-300'}`}
          >
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${darkMode ? 'bg-white' : 'bg-black'}`}
              style={{ animation: 'communityPulse 2s ease-in-out infinite' }}
            />
            <span className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Global Community
            </span>
          </div>

          {/* Headline */}
          <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] ${darkMode ? 'text-white' : 'text-zinc-900'}`}>
            Join{' '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode
              ? 'from-zinc-500 via-white to-zinc-500'
              : 'from-zinc-600 via-zinc-900 to-zinc-600'}`}>
              thousands
            </span>
            <br />of developers
          </h1>

          <p className={`text-lg md:text-xl mb-10 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Luxid is used by developers and companies across the globe. From startups to enterprises,
            our community is building the next generation of web applications with{' '}
            <span className={`font-medium ${darkMode ? 'text-white' : 'text-zinc-900'}`}>modern PHP</span>.
          </p>

          {/* Feature list */}
          <div className="space-y-2.5 mb-10">
            {[
              { icon: MapPin, text: 'Active in over 100 countries worldwide' },
              { icon: Code2, text: 'Open source contributions from 200+ developers' },
              { icon: Heart, text: 'Active community support on Discord and GitHub' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${darkMode
                  ? 'bg-zinc-900 border-zinc-800'
                  : 'bg-zinc-100 border-zinc-200'}`}
                >
                  <item.icon className={`w-4 h-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                </div>
                <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/LuxidDev/Framework"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg ${darkMode
                ? 'bg-white text-black hover:bg-zinc-200 hover:shadow-white/10'
                : 'bg-black text-white hover:bg-zinc-800 hover:shadow-black/10'}`}
            >
              Join the Community <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/docs"
              className={`inline-flex items-center justify-center gap-2 px-8 py-4 border rounded-lg font-medium transition-all hover:scale-105 ${darkMode
                ? 'bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500'
                : 'bg-white text-zinc-900 border-zinc-300 hover:bg-zinc-50 hover:border-zinc-500'}`}
            >
              Start Building
            </a>
          </div>
        </div>

        {/* Right: Globe */}
        <div className="relative flex items-center justify-center">
          <div
            className="relative w-full pointer-events-auto"
            style={{ aspectRatio: '1 / 1', maxWidth: '480px', margin: '0 auto' }}
          >
            <Globe />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes communityPulse {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}
