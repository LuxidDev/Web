import React, { useState, useEffect } from 'react';
import { Search, Github, Twitter, MessageCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
  onSearchClick?: () => void;
}

export default function Header({ onSearchClick }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
    scrolled
      ? darkMode
        ? 'bg-black/60 backdrop-blur-xl border-b border-zinc-800'
        : 'bg-white/80 backdrop-blur-xl border-b border-zinc-200'
      : 'bg-transparent'
  }`;

  const logoClass = darkMode
    ? "text-white"
    : "text-zinc-900";

  const searchButtonClass = darkMode
    ? "flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 rounded-full transition-all text-sm"
    : "flex items-center gap-2 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 backdrop-blur-xl border border-zinc-300 rounded-full transition-all text-sm";

  const navContainerClass = darkMode
    ? "flex items-center gap-1 px-2 py-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full"
    : "flex items-center gap-1 px-2 py-1.5 bg-zinc-100 backdrop-blur-xl border border-zinc-300 rounded-full";

  const navLinkClass = darkMode
    ? "px-3 py-1 text-zinc-300 hover:text-white hover:bg-white/10 transition-all text-sm rounded-full"
    : "px-3 py-1 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200 transition-all text-sm rounded-full";

  const iconButtonClass = darkMode
    ? "p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
    : "p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 rounded-full transition-all";

  return (
    <header className={headerClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left section - Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className={`text-lg font-semibold ${logoClass}`}>Luxid</span>
          <img
            src={darkMode ? "/lion7.svg" : "/lion5.svg"}
            alt="Luxid"
            className="w-7 h-7 group-hover:scale-105 transition-transform"
          />
        </a>

        {/* Right section - Search and Navigation group */}
        <div className="flex items-center gap-3">
          {/* Search button - standalone with glossy effect */}
          <button
            onClick={onSearchClick}
            className={searchButtonClass}
          >
            <Search className={`w-4 h-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
            <span className={`hidden sm:inline text-xs ${darkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>Search</span>
            <kbd className={`hidden lg:inline px-1.5 py-0.5 rounded text-xs border ${
              darkMode
                ? 'bg-black/20 text-zinc-500 border-white/10'
                : 'bg-white/50 text-zinc-600 border-zinc-300'
            }`}>
              Ctrl K
            </kbd>
          </button>

          {/* Navigation and icons group - glossy rounded container */}
          <div className={navContainerClass}>
            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-1">
              {['Docs', 'Blog', 'About', 'Sponsor'].map(item => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={navLinkClass}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Divider */}
            <div className={`hidden md:block w-px h-4 mx-1 ${
              darkMode ? 'bg-white/10' : 'bg-zinc-300'
            }`} />

            {/* Icon buttons */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={iconButtonClass}
              aria-label="GitHub"
            >
              <Github className="w-[18px] h-[18px]" />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className={iconButtonClass}
              aria-label="Twitter"
            >
              <Twitter className="w-[18px] h-[18px]" />
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className={iconButtonClass}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
