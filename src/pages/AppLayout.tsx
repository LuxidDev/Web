import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import SpotlightSearch from '@/components/SpotlightSearch';
import Hero from '@/components/Hero';
import Sponsors from '@/components/Sponsors';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import SEASection from '@/components/SEASection';
import NovaShowcase from '@/components/RouteShowcase';
import LORMShowcase from '@/components/LORMShowcase';
import JuiceCLI from '@/components/JuiceCLI';
import CodeShowcase from '@/components/CodeShowcase';
import Testimonials from '@/components/Testimonials';
import BlogPreview from '@/components/BlogPreview';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

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
