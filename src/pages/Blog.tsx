import React from 'react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Blog() {
  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? "min-h-screen bg-black text-white" : "min-h-screen bg-white text-zinc-900"}>
      <Header />
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
