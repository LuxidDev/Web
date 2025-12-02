import React from 'react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import SpotlightSearch from '@/components/SpotlightSearch';
import About from '@/components/About';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "min-h-screen bg-black text-white" : "min-h-screen bg-white text-zinc-900"}>
      <Header onSearchClick={() => setSearchOpen(true)} />
      <SpotlightSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <About />
      <Footer />
    </div>
  );
}
