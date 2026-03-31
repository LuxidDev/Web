import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SpotlightSearch from '@/components/SpotlightSearch';
import SidebarNav from './SidebarNav';
import ChapterHeader from './ChapterHeader';
import { docsChapters } from '../content';
import { ArrowRight, ExternalLink, Copy, Check } from 'lucide-react';

interface DocsLayoutProps {
  children: React.ReactNode;
  currentDoc: any;
  currentSection: any;
}

export default function DocsLayout({ children, currentDoc, currentSection }: DocsLayoutProps) {
  const { darkMode } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouse);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  const handleCopyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const bgGridColor = darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
  const orb1Color = darkMode ? 'bg-zinc-800/20' : 'bg-zinc-200/50';
  const orb2Color = darkMode ? 'bg-zinc-700/15' : 'bg-zinc-300/40';

  const mainClass = darkMode
    ? "min-h-screen bg-black text-white"
    : "min-h-screen bg-white text-zinc-900";

  return (
    <div className={mainClass}>
      <Header onSearchClick={() => setSearchOpen(true)} />
      <SpotlightSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Hero Section */}
      <section className={`relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-32 ${darkMode ? 'bg-black' : 'bg-white'
        }`}>
        <div
          className="absolute inset-0 bg-[size:60px_60px]"
          style={{
            backgroundImage: `linear-gradient(${bgGridColor}_1px, transparent_1px), linear-gradient(90deg, ${bgGridColor}_1px, transparent_1px)`,
            transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`
          }}
        />

        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] ${orb1Color}`} style={{ transform: `translate(${mousePos.x * 30}px, ${scrollY * 0.2 + mousePos.y * 30}px)` }} />
        <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[80px] ${orb2Color}`} style={{ transform: `translate(${-mousePos.x * 20}px, ${scrollY * -0.15}px)` }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Announcement badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-8 backdrop-blur-sm hover:border-zinc-500 transition-colors cursor-pointer group ${darkMode ? 'bg-zinc-900/80 border-zinc-700' : 'bg-zinc-100/80 border-zinc-300'
            }`}>
            <span className="px-2 py-0.5 bg-black text-white text-xs font-bold rounded">New</span>
            <span className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Documentation v0.7.1 • Now available</span>
            <ArrowRight className={`w-4 h-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'} group-hover:translate-x-1 transition-transform`} />
          </div>

          {/* Main headline */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1] ${darkMode ? 'text-white' : 'text-zinc-900'
            }`}>
            Learn<br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode
              ? 'from-zinc-500 via-white to-zinc-500'
              : 'from-zinc-600 via-zinc-900 to-zinc-600'
              }`}>Luxid Framework</span>
          </h1>

          <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
            Comprehensive guide to building modern PHP applications with <span className={darkMode ? 'text-white font-medium' : 'text-zinc-900 font-medium'}>AVE architecture</span>.
            From first steps to advanced patterns.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className={`py-20 relative overflow-hidden ${darkMode ? 'bg-black' : 'bg-white'
        }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <SidebarNav
                currentDoc={currentDoc}
                darkMode={darkMode}
                copiedCommand={copiedCommand}
                onCopyCommand={handleCopyCommand}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className={`rounded-2xl ${darkMode ? 'bg-zinc-900/80 border border-zinc-800' : 'bg-zinc-100/80 border border-zinc-300'
                } p-8 backdrop-blur-xl`}>
                <ChapterHeader
                  currentDoc={currentDoc}
                  currentSection={currentSection}
                  darkMode={darkMode}
                />

                {/* Chapter Content */}
                <div className="prose prose-lg max-w-none">
                  {children}
                </div>

                {/* Navigation */}
                <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-zinc-800' : 'border-zinc-300'
                  }`}>
                  <div className="flex justify-between">
                    <a
                      href="/docs/introduction"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${darkMode
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                        : 'bg-zinc-200 hover:bg-zinc-300 text-black'
                        }`}
                    >
                      Previous
                    </a>
                    <a
                      href="/docs/installation"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${darkMode
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                    >
                      Next: Installation
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links Grid */}
              <div className="mt-8">
                <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
                  Continue Learning
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {docsChapters.slice(0, 3).map((section) => (
                    <a
                      key={section.id}
                      href={section.chapters[0].path}
                      className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 cursor-pointer ${darkMode
                        ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'
                        : 'bg-zinc-50/50 border-zinc-200 hover:border-zinc-400'
                        }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${section.color}`}>
                        <section.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                        {section.title}
                      </h4>
                      <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {section.chapters.length} chapters
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-32 bg-gradient-to-b relative overflow-hidden ${darkMode
        ? 'from-zinc-950 to-black'
        : 'from-zinc-100 to-white'
        }`}>
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] ${darkMode ? '' : 'invert'
          }`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] ${darkMode ? 'bg-zinc-800/10' : 'bg-zinc-400/10'
          }`} style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.05}px))` }} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-8">
            <img
              src={darkMode ? "/lion7.svg" : "/lion5.svg"}
              alt="Luxid"
              className="w-24 h-24 mx-auto mb-6 opacity-80"
            />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to build something<br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode
              ? 'from-zinc-500 via-white to-zinc-500'
              : 'from-zinc-600 via-black to-zinc-600'
              }`}>amazing?</span>
          </h2>
          <p className={`text-xl mb-12 max-w-2xl mx-auto ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
            Start building with Luxid today. Join thousands of developers creating modern PHP applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => handleCopyCommand('composer create-project luxid/framework myapp')}
              className={`flex items-center gap-2 px-8 py-4 border rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg ${darkMode
                ? 'bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600'
                : 'bg-white text-black border-zinc-300 hover:bg-zinc-100 hover:border-zinc-400'
                }`}
            >
              {copiedCommand === 'composer create-project luxid/framework myapp' ? (
                <>
                  <Check className="w-5 h-5 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy Install Command
                </>
              )}
            </button>
            <a
              href="https://github.com/luxid/framework"
              target="_blank"
              className="px-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-zinc-800 transition-all hover:scale-105 hover:shadow-lg hover:shadow-black/10"
            >
              Star on GitHub
            </a>
          </div>
          <div className={`inline-flex items-center gap-3 px-6 py-4 border rounded-xl font-mono text-sm backdrop-blur-sm ${darkMode
            ? 'bg-zinc-900/80 border-zinc-800'
            : 'bg-white/80 border-zinc-300'
            }`}>
            <span className={darkMode ? 'text-zinc-500' : 'text-zinc-600'}>$</span>
            <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>composer create-project luxid/framework myapp</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
