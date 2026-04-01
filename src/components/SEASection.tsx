import React, { useState, useEffect } from 'react';
import { Monitor, Database, Zap, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const seaItems = [
  { letter: 'A', title: 'Actions', subtitle: 'Controllers', icon: Zap, desc: 'Handle requests with Actions. Clean, focused classes that do one thing well and keep your code organized.', features: ['Request handling', 'Middleware', 'Dependency injection'] },
  { letter: 'V', title: 'Views', subtitle: 'Views', icon: Monitor, desc: 'Beautiful templates powered by Nova. Create stunning UIs with clean, expressive syntax that compiles to pure PHP.', features: ['Template inheritance', 'Components & slots', 'Auto-escaping'] },
  { letter: 'E', title: 'Entities', subtitle: 'Models', icon: Database, desc: 'Elegant data models with L ORM. Define relationships and queries with fluent methods that feel natural.', features: ['Fluent queries', 'Relationships', 'Model events'] },
];

export default function SEASection() {
  const [scrollY, setScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`py-32 relative overflow-hidden ${darkMode ? 'bg-zinc-950' : 'bg-zinc-50'
      }`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`text-4xl md:text-6xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'
            }`}>The AVE Architecture</h2>
          <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>A fresh take on MVC. <br></br> Actions, Views, Entities - designed for how you actually think about your code.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {seaItems.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveIndex(i)}
              className={`group relative p-8 rounded-2xl border transition-all duration-500 cursor-pointer ${activeIndex === i
                ? darkMode
                  ? 'bg-zinc-900 border-zinc-700 scale-105'
                  : 'bg-white border-zinc-300 scale-105 shadow-lg'
                : darkMode
                  ? 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900/80'
                  : 'bg-white/50 border-zinc-200 hover:bg-white/80 hover:shadow-md'
                }`}
            >
              <div className={`absolute -top-6 -left-2 text-7xl font-black transition-colors ${darkMode
                ? 'text-zinc-700 group-hover:text-zinc-600'
                : 'text-zinc-300 group-hover:text-zinc-400'
                }`}>{item.letter}</div>
              <div className="relative pt-8">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${activeIndex === i
                  ? 'bg-black text-white'
                  : darkMode
                    ? 'bg-gradient-to-br from-zinc-700 to-zinc-800 group-hover:from-zinc-600 group-hover:to-zinc-700'
                    : 'bg-gradient-to-br from-zinc-200 to-zinc-300 group-hover:from-zinc-300 group-hover:to-zinc-400'
                  }`}>
                  <item.icon className={`w-7 h-7 transition-colors ${activeIndex === i
                    ? darkMode
                      ? 'text-black'
                      : 'text-white'
                    : darkMode
                      ? 'text-white'
                      : 'text-zinc-700'
                    }`} />
                </div>
                <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-black'
                  }`}>{item.title}</h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-zinc-500' : 'text-zinc-600'
                  }`}>{item.subtitle}</p>
                <p className={`leading-relaxed mb-6 ${darkMode ? 'text-zinc-400' : 'text-zinc-700'
                  }`}>{item.desc}</p>
                <ul className="space-y-2">
                  {item.features.map((f, fi) => (
                    <li key={fi} className={`flex items-center gap-2 text-sm ${darkMode ? 'text-zinc-500' : 'text-zinc-600'
                      }`}>
                      <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-zinc-600' : 'bg-zinc-400'
                        }`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
