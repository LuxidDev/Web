import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useSearch } from '@/contexts/SearchContext';
import Header from '@/components/Header';
import SpotlightSearch from '@/components/SpotlightSearch';
import Hero from '@/components/Hero';
import Sponsors from '@/components/Sponsors';
import Stats from '@/components/Stats';
import Features from '@/components/Features';
import AVESection from '@/components/AVESection';
import NovaShowcase from '@/components/RouteShowcase';
import RocketORMShowcase from '@/components/RocketORMShowcase';
import JuiceCLI from '@/components/JuiceCLI';
import CodeShowcase from '@/components/CodeShowcase';
import Testimonials from '@/components/Testimonials';
import Community from '@/components/Community';
import BlogPreview from '@/components/BlogPreview';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';

function AppContent() {
  const { searchOpen, setSearchOpen } = useSearch();
  const { darkMode } = useTheme();

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
      <AVESection />
      <NovaShowcase />
      <ErrorBoundary>
        <RocketORMShowcase />
      </ErrorBoundary>
      <JuiceCLI />
      <CodeShowcase />
      <Testimonials />
      <BlogPreview />
      <Community />
      <CTASection />
      <Footer />
    </div>
  );
}

export default function AppLayout() {
  return <AppContent />;
}
