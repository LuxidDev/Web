import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useSearch } from '@/contexts/SearchContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpotlightSearch from '@/components/SpotlightSearch';

const testimonials = [
  {
    name: "Sarah Chen",
    handle: "@sarahdev",
    avatar: "SC",
    text: "Luxid has completely changed how I write PHP. The SEA architecture just makes sense.",
    col: 1,
  },
  {
    name: "Marcus Johnson",
    handle: "@marcusj",
    avatar: "MJ",
    text: "The L ORM is incredible. Database queries have never been this elegant. Switched from Eloquent and never looked back.",
    col: 2,
  },
  {
    name: "Elena Rodriguez",
    handle: "@elenarod",
    avatar: "ER",
    text: "Nova templating is a game changer. Clean, fast, and intuitive.",
    col: 3,
  },
  {
    name: "David Kim",
    handle: "@davidkim",
    avatar: "DK",
    text: "Juice CLI saves me hours every week. Scaffolding has never been easier. The DX is unmatched.",
    col: 1,
  },
  {
    name: "Lisa Thompson",
    handle: "@lisadev",
    avatar: "LT",
    text: "Finally a PHP framework that feels modern. Luxid is the future of PHP development.",
    col: 2,
  },
  {
    name: "Alex Rivera",
    handle: "@alexr",
    avatar: "AR",
    text: "Switched from Laravel to Luxid. The performance gains are real. Our API response times dropped by 40%.",
    col: 3,
  },
  {
    name: "James Wilson",
    handle: "@jameswil",
    avatar: "JW",
    text: "The documentation is excellent. Got up and running in minutes.",
    col: 1,
  },
  {
    name: "Nina Patel",
    handle: "@ninapatel",
    avatar: "NP",
    text: "Love how modular everything is. Pick what you need, nothing more. Perfect for microservices.",
    col: 2,
  },
  {
    name: "Chris Anderson",
    handle: "@chrisand",
    avatar: "CA",
    text: "Security features out of the box. One less thing to worry about.",
    col: 3,
  },
  {
    name: "Maya Foster",
    handle: "@mayacode",
    avatar: "MF",
    text: "The best PHP DX I have ever experienced. Highly recommend to any PHP developer.",
    col: 1,
  },
  {
    name: "Ryan Cooper",
    handle: "@ryanc",
    avatar: "RC",
    text: "Luxid single-handedly made me enjoy PHP again. The syntax is beautiful.",
    col: 2,
  },
  {
    name: "Sophie Martin",
    handle: "@sophiem",
    avatar: "SM",
    text: "Building APIs with Luxid is a breeze. Clean, fast, and well-documented.",
    col: 3,
  },
];


export default function Community() {
  const [scrollY, setScrollY] = useState(0);
  const { searchOpen, setSearchOpen } = useSearch();
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const col1 = testimonials.filter((t) => t.col === 1);
  const col2 = testimonials.filter((t) => t.col === 2);
  const col3 = testimonials.filter((t) => t.col === 3);

  return (
    <div className={darkMode ? "min-h-screen bg-black text-white" : "min-h-screen bg-white text-zinc-900"}>
      <Header onSearchClick={() => setSearchOpen(true)} />
      <SpotlightSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <section
        id="community"
        className={`py-32 overflow-hidden ${darkMode ? "bg-black" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2
              className={`text-4xl md:text-5xl font-bold mb-4 flex flex-wrap items-center justify-center gap-4 ${darkMode ? "text-white" : "text-black"
                }`}
            >
              What people say about
              <span
                className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? "from-zinc-400 to-white" : "from-zinc-600 to-black"
                  }`}
              >
                Luxid
              </span>
              <img
                src={darkMode ? "/lion7.svg" : "/lion5.svg"}
                alt="Luxid"
                className="w-12 h-12 inline"
              />
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[col1, col2, col3].map((col, colIdx) => (
              <div
                key={colIdx}
                className="space-y-4"
                style={{
                  transform: `translateY(${colIdx === 1 ? scrollY * 0.02 : 0}px)`,
                }}
              >
                {col.map((t, i) => (
                  <div
                    key={i}
                    className={`p-5 border rounded-xl transition-all duration-300 hover:-translate-y-1 ${darkMode
                      ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-600"
                      : "bg-zinc-50/50 border-zinc-200 hover:border-zinc-400"
                      }`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm ${darkMode
                          ? "from-zinc-500 to-zinc-700"
                          : "from-zinc-400 to-zinc-600"
                          }`}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <div
                          className={`font-medium ${darkMode ? "text-white" : "text-black"
                            }`}
                        >
                          {t.name}
                        </div>
                        <div
                          className={`text-sm ${darkMode ? "text-zinc-500" : "text-zinc-600"
                            }`}
                        >
                          {t.handle}
                        </div>
                      </div>
                    </div>
                    <p
                      className={`leading-relaxed ${darkMode ? "text-zinc-300" : "text-zinc-700"
                        }`}
                    >
                      {t.text}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
