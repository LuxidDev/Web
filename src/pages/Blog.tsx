import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useSearch } from '@/contexts/SearchContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpotlightSearch from '@/components/SpotlightSearch';

export default function Blog() {
  const { darkMode } = useTheme();
  const { searchOpen, setSearchOpen } = useSearch();

  return (
    <div className={darkMode ? "min-h-screen bg-black text-white" : "min-h-screen bg-white text-zinc-900"}>
      <Header onSearchClick={() => setSearchOpen(true)} />
      <SpotlightSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <div className="max-w-7xl mx-auto px-6 py-32">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Blog</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Coming soon...
        </p>
      </div>
      <Footer />
    </div>
  );
}
