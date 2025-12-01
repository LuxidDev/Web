import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import Header from './Header';
import SpotlightSearch from './SpotlightSearch';
import Hero from './Hero';
import Sponsors from './Sponsors';
import Stats from './Stats';
import Features from './Features';
import SEASection from './SEASection';
import NovaShowcase from './NovaShowcase';
import LORMShowcase from './LORMShowcase';
import JuiceCLI from './JuiceCLI';
import CodeShowcase from './CodeShowcase';
import Testimonials from './Testimonials';
import BlogPreview from './BlogPreview';
import CTASection from './CTASection';
import Footer from './Footer';
import { ErrorBoundary } from './ErrorBoundary';

function AppContent() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const mainClass = darkMode
    ? "min-h-screen bg-black text-white"
    : "min-h-screen bg-white text-zinc-900";

  return (
    <div className={mainClass}>
      <Header onSearchClick={() => setSearchOpen(true)} />
      <SpotlightSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <Hero />
      <Sponsors />
      <Stats />
      <Features />
      <SEASection />
      <NovaShowcase />
      <ErrorBoundary>
        <LORMShowcase />
      </ErrorBoundary>
      <JuiceCLI />
      <CodeShowcase />
      <Testimonials />
      <BlogPreview />
      <CTASection />
      <Footer />
    </div>
  );
}

export default function AppLayout() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
