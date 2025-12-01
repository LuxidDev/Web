import React, { useEffect, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const bgGridColor = darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
  const orb1Color = darkMode ? 'bg-zinc-800/20' : 'bg-zinc-200/50';
  const orb2Color = darkMode ? 'bg-zinc-700/15' : 'bg-zinc-300/40';
  const lineColor = darkMode ? 'via-zinc-700' : 'via-zinc-300';

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-16 ${
      darkMode ? 'bg-black' : 'bg-white'
    }`}>
      {/* Animated grid background */}
      <div
        className="absolute inset-0 bg-[size:60px_60px]"
        style={{
          backgroundImage: `linear-gradient(${bgGridColor}_1px, transparent_1px), linear-gradient(90deg, ${bgGridColor}_1px, transparent_1px)`,
          transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`
        }}
      />

      {/* Gradient orbs with parallax */}
      <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] ${orb1Color}`} style={{ transform: `translate(${mousePos.x * 30}px, ${scrollY * 0.2 + mousePos.y * 30}px)` }} />
      <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[80px] ${orb2Color}`} style={{ transform: `translate(${-mousePos.x * 20}px, ${scrollY * -0.15}px)` }} />

      {/* Floating fox logo */}
      <div className="absolute top-40 right-20 opacity-[0.08]" style={{ transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.02}deg) scale(${1 + mousePos.x * 0.1})` }}>
        <img
          src="/images/bg-code.png"
          alt="Code Background"
          className="w-80 h-80 object-contain"
        />
      </div>
      <div className="absolute bottom-40 left-20 opacity-[0.05]" style={{ transform: `translateY(${scrollY * -0.2}px) rotate(${-scrollY * 0.01}deg)` }}>
        <img
          src="/images/bg-code.png"
          alt="Code Background"
          className="w-48 h-48 object-contain"
        />
      </div>

      {/* Decorative lines */}
      <div className={`absolute top-1/3 left-0 w-32 h-px bg-gradient-to-r from-transparent ${lineColor} to-transparent`} style={{ transform: `translateX(${scrollY * 0.5}px)` }} />
      <div className={`absolute bottom-1/3 right-0 w-32 h-px bg-gradient-to-r from-transparent ${lineColor} to-transparent`} style={{ transform: `translateX(${-scrollY * 0.5}px)` }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Announcement badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-8 backdrop-blur-sm hover:border-zinc-500 transition-colors cursor-pointer group ${
          darkMode ? 'bg-zinc-900/80 border-zinc-700' : 'bg-zinc-100/80 border-zinc-300'
        }`}>
          <span className="px-2 py-0.5 bg-black text-white text-xs font-bold rounded">New</span>
          <span className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Luxid v0.1.0-beta is now available</span>
          <ArrowRight className={`w-4 h-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'} group-hover:translate-x-1 transition-transform`} />
        </div>

        {/* Main headline */}
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1] ${
          darkMode ? 'text-white' : 'text-zinc-900'
        }`}>
          The PHP Framework<br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
            darkMode
              ? 'from-zinc-500 via-white to-zinc-500'
              : 'from-zinc-600 via-zinc-900 to-zinc-600'
          }`}>for Modern Web</span>
        </h1>

        <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
          darkMode ? 'text-zinc-400' : 'text-zinc-600'
        }`}>
          Build elegant, high-performance web applications with the <span className={darkMode ? 'text-white font-medium' : 'text-zinc-900 font-medium'}>SEA architecture</span>.
          Modern PHP made beautiful with Nova, L ORM, and Juice CLI.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="#get-started" className="px-8 py-4 bg-black text-white font-semibold rounded-lg hover:bg-zinc-800 transition-all hover:scale-105 hover:shadow-lg hover:shadow-black/10">
            Get Started
          </a>
          <a href="#docs" className={`flex items-center gap-2 px-8 py-4 border rounded-lg hover:bg-zinc-800 hover:border-zinc-600 transition-all ${
            darkMode ? 'bg-zinc-900 text-white border-zinc-700' : 'bg-white text-zinc-900 border-zinc-300 hover:text-white'
          }`}>
            <Play className="w-4 h-4" /> Learn Luxid
          </a>
        </div>

        {/* Terminal command */}
        <div className={`inline-flex items-center gap-3 px-6 py-3 border rounded-lg font-mono text-sm backdrop-blur-sm ${
          darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-zinc-100/80 border-zinc-300'
        }`}>
          <span className={darkMode ? 'text-zinc-500' : 'text-zinc-600'}>$</span>
          <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>composer create-project luxid/luxid myapp</span>
        </div>
      </div>
    </section>
  );
}
