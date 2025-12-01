import React, { useState, useEffect } from 'react';
import { Layers, Database, Terminal, Zap, Shield, Code2, Boxes, Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const features = [
  { icon: Layers, title: 'SEA Architecture', desc: 'Screen, Entities, Actions - A modern flip on MVC that makes your code intuitive and organized.' },
  { icon: Code2, title: 'Nova Templating', desc: 'Powerful, elegant templating engine with clean syntax and blazing fast compilation.' },
  { icon: Database, title: 'L ORM', desc: 'Expressive database queries with an elegant, fluent interface. No more SQL headaches.' },
  { icon: Terminal, title: 'Juice CLI', desc: 'Generate actions, entities, migrations and serve your app with simple commands.' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Optimized for performance with smart caching and minimal overhead.' },
  { icon: Shield, title: 'Secure by Default', desc: 'Built-in protection against XSS, CSRF, SQL injection and more.' },
  { icon: Boxes, title: 'All-in-One', desc: 'Batteries included with tons of built-in essentials while keeping every piece modular.' },
  { icon: Sparkles, title: 'Modern PHP', desc: 'Leverage PHP 8.3+ features with beautiful, expressive syntax.' },
];

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="features" className={`relative py-32 overflow-hidden ${
      darkMode ? 'bg-black' : 'bg-white'
    }`}>
      {/* Background decoration */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-[150px] ${
        darkMode ? 'bg-zinc-900/30' : 'bg-zinc-300/30'
      }`} style={{ transform: `translateY(${scrollY * 0.1}px)` }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-black'
          }`}>Everything you need</h2>
          <p className={`text-xl max-w-2xl mx-auto ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>Luxid comes with all the tools to build modern web applications, beautifully integrated.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative p-6 border rounded-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                darkMode
                  ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/80'
                  : 'bg-zinc-50/50 border-zinc-200 hover:border-zinc-400 hover:bg-zinc-100/80'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${
                darkMode
                  ? 'from-white/5 to-transparent'
                  : 'from-black/5 to-transparent'
              }`} />
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 ${
                  darkMode
                    ? 'bg-gradient-to-br from-zinc-600 to-zinc-800 group-hover:from-white group-hover:to-zinc-300'
                    : 'bg-gradient-to-br from-zinc-300 to-zinc-400 group-hover:from-black group-hover:to-zinc-600'
                }`}>
                  <f.icon className={`w-6 h-6 transition-colors ${
                    darkMode
                      ? 'text-white group-hover:text-black'
                      : 'text-zinc-700 group-hover:text-white'
                  }`} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                  darkMode ? 'text-white' : 'text-black'
                }`}>{f.title}</h3>
                <p className={`text-sm leading-relaxed transition-colors ${
                  darkMode ? 'text-zinc-400 group-hover:text-zinc-300' : 'text-zinc-600 group-hover:text-zinc-700'
                }`}>{f.desc}</p>
                <div className={`mt-4 flex items-center gap-1 text-sm transition-colors ${
                  darkMode
                    ? 'text-zinc-600 group-hover:text-white'
                    : 'text-zinc-500 group-hover:text-black'
                }`}>
                  Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
