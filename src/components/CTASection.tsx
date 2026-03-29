import React, { useEffect, useState } from 'react';
import { ArrowRight, Github, Book, Copy, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function CTASection() {
  const [scrollY, setScrollY] = useState(0);
  const [copied, setCopied] = useState(false);
  const command = 'composer create-project luxid/framework my_app';
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="get-started" className={`py-32 bg-gradient-to-b relative overflow-hidden ${darkMode
        ? 'from-zinc-950 to-black'
        : 'from-zinc-100 to-white'
      }`}>
      {/* Background decoration */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] ${darkMode ? '' : 'invert'
        }`} />
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] ${darkMode ? 'bg-zinc-800/10' : 'bg-zinc-400/10'
        }`} style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.05}px))` }} />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="mb-8">
          <img
            src={darkMode ? "/lion7.svg" : "/lion5.svg"}
            alt="Luxid"
            className="w-24 h-24 mx-auto mb-6 animate-pulse opacity-80"
          />
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Ready to build something<br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode
              ? 'from-zinc-500 via-white to-zinc-500'
              : 'from-zinc-600 via-black to-zinc-600'
            }`}>amazing?</span>
        </h2>
        <p className={`text-xl mb-12 max-w-2xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
          Join thousands of developers who are building modern PHP applications with Luxid. Get started in minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="#" className="flex items-center gap-2 px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-zinc-800 transition-all hover:scale-105 hover:shadow-lg hover:shadow-black/10">
            Get Started <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#" className={`flex items-center gap-2 px-8 py-4 border rounded-xl transition-all ${darkMode
              ? 'bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600'
              : 'bg-white text-black border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400'
            }`}>
            <Book className="w-5 h-5" /> Documentation
          </a>
          <a href="#" className={`flex items-center gap-2 px-8 py-4 border rounded-xl transition-all ${darkMode
              ? 'bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600'
              : 'bg-white text-black border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400'
            }`}>
            <Github className="w-5 h-5" /> Star on GitHub
          </a>
        </div>
        <div className={`inline-flex items-center gap-3 px-6 py-4 border rounded-xl font-mono text-sm backdrop-blur-sm group hover:border-zinc-400 transition-colors ${darkMode
            ? 'bg-zinc-900/80 border-zinc-800'
            : 'bg-white/80 border-zinc-300'
          }`}>
          <span className={darkMode ? 'text-zinc-500' : 'text-zinc-600'}>$</span>
          <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>{command}</span>
          <button onClick={handleCopy} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-zinc-800' : 'hover:bg-zinc-200'
            }`}>
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className={`w-4 h-4 ${darkMode ? 'text-zinc-500 group-hover:text-zinc-300' : 'text-zinc-600 group-hover:text-zinc-800'
              }`} />}
          </button>
        </div>
      </div>
    </section>
  );
}
