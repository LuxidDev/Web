import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import Header from '@/components/Header';
import SpotlightSearch from '@/components/SpotlightSearch';
import Footer from '@/components/Footer';
import {
  Book, Code, Terminal, Database, Layers, Zap, ChevronRight, Search,
  Menu, X, Home, ArrowRight, Sparkles, Clock, Users, Star,
  BookOpen, FileText, Settings, Globe, Shield, Rocket,
  ChevronLeft, Copy, Check, ExternalLink, Brain, Cpu
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { highlightCode } from '@/utils/code-highlighter';

// Documentation chapters with real content
const docsChapters = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Rocket,
    color: 'from-blue-500 to-cyan-500',
    chapters: [
      {
        id: 'introduction',
        title: 'Introduction',
        path: '/docs/introduction',
        content: () => <IntroductionContent />,
        quickStart: true
      },
      {
        id: 'installation',
        title: 'Installation',
        path: '/docs/installation',
        content: () => <InstallationContent />
      },
      {
        id: 'first-app',
        title: 'Your First App',
        path: '/docs/first-app',
        content: () => <FirstAppContent />
      },
      {
        id: 'architecture',
        title: 'Architecture',
        path: '/docs/architecture',
        content: () => <ArchitectureContent />
      },
    ]
  },
  {
    id: 'core-concepts',
    title: 'Core Concepts',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    chapters: [
      {
        id: 'sea-architecture',
        title: 'SEA Architecture',
        path: '/docs/sea-architecture',
        content: () => <SEAArchitectureContent />
      },
      {
        id: 'actions',
        title: 'Actions',
        path: '/docs/actions',
        content: () => <ActionsContent />
      },
      {
        id: 'entities',
        title: 'Entities',
        path: '/docs/entities',
        content: () => <EntitiesContent />
      },
      {
        id: 'screens',
        title: 'Screens',
        path: '/docs/screens',
        content: () => <ScreensContent />
      },
    ]
  },
  {
    id: 'database',
    title: 'Database & ORM',
    icon: Database,
    color: 'from-green-500 to-emerald-500',
    chapters: [
      {
        id: 'l-orm',
        title: 'L ORM',
        path: '/docs/l-orm',
        content: () => <LORMContent />
      },
      {
        id: 'migrations',
        title: 'Migrations',
        path: '/docs/migrations',
        content: () => <MigrationsContent />
      },
      {
        id: 'relationships',
        title: 'Relationships',
        path: '/docs/relationships',
        content: () => <RelationshipsContent />
      },
    ]
  },
  {
    id: 'templating',
    title: 'Templating',
    icon: Code,
    color: 'from-orange-500 to-red-500',
    chapters: [
      {
        id: 'nova-templating',
        title: 'Nova Templating',
        path: '/docs/nova-templating',
        content: () => <NovaTemplatingContent />
      },
      {
        id: 'components',
        title: 'Components',
        path: '/docs/components',
        content: () => <ComponentsContent />
      },
    ]
  },
  {
    id: 'cli',
    title: 'Juice CLI',
    icon: Terminal,
    color: 'from-yellow-500 to-amber-500',
    chapters: [
      {
        id: 'juice-cli',
        title: 'Juice CLI',
        path: '/docs/juice-cli',
        content: () => <JuiceCLIContent />
      },
      {
        id: 'make-commands',
        title: 'Make Commands',
        path: '/docs/make-commands',
        content: () => <MakeCommandsContent />
      },
    ]
  },
];

const allDocs = docsChapters.flatMap(section => section.chapters);

export default function Docs() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const currentDoc = allDocs.find(doc => doc.path === location.pathname) || allDocs[0];
  const currentSection = docsChapters.find(section =>
    section.chapters.some(chapter => chapter.id === currentDoc.id)
  );

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
  const lineColor = darkMode ? 'via-zinc-700' : 'via-zinc-300';

  const mainClass = darkMode
    ? "min-h-screen bg-black text-white"
    : "min-h-screen bg-white text-zinc-900";

  return (
    <div className={mainClass}>
      <Header onSearchClick={() => setSearchOpen(true)} />
      <SpotlightSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Hero Section - Similar to main page */}
      <section className={`relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-32 ${
        darkMode ? 'bg-black' : 'bg-white'
      }`}>
        {/* Animated grid background */}
        <div
          className="absolute inset-0 bg-[size:60px_60px]"
          style={{
            backgroundImage: `linear-gradient(${bgGridColor}_1px, transparent_1px), linear-gradient(90deg, ${bgGridColor}_1px, transparent_1px)`,
            transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`
          }}
        />

        {/* Gradient orbs with parallax */}
        <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] ${orb1Color}`} style={{ transform: `translate(${mousePos.x * 30}px, ${scrollY * 0.2 + mousePos.y * 30}px)` }} />
        <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[80px] ${orb2Color}`} style={{ transform: `translate(${-mousePos.x * 20}px, ${scrollY * -0.15}px)` }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Announcement badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-8 backdrop-blur-sm hover:border-zinc-500 transition-colors cursor-pointer group ${
            darkMode ? 'bg-zinc-900/80 border-zinc-700' : 'bg-zinc-100/80 border-zinc-300'
          }`}>
            <span className="px-2 py-0.5 bg-black text-white text-xs font-bold rounded">New</span>
            <span className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>Documentation v0.1.7 • Updated today</span>
            <ArrowRight className={`w-4 h-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-500'} group-hover:translate-x-1 transition-transform`} />
          </div>

          {/* Main headline */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight leading-[1.1] ${
            darkMode ? 'text-white' : 'text-zinc-900'
          }`}>
            Learn<br />
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
              darkMode
                ? 'from-zinc-500 via-white to-zinc-500'
                : 'from-zinc-600 via-zinc-900 to-zinc-600'
            }`}>Luxid Framework</span>
          </h1>

          <p className={`text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            Comprehensive guide to building modern PHP applications with <span className={darkMode ? 'text-white font-medium' : 'text-zinc-900 font-medium'}>SEA architecture</span>.
            From first steps to advanced patterns.
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className={`py-20 relative overflow-hidden ${
        darkMode ? 'bg-black' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation - Desktop */}
            <div className="lg:col-span-1">
              <div className={`sticky top-32 rounded-2xl p-6 ${
                darkMode ? 'bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl' : 'bg-zinc-100/80 border border-zinc-300 backdrop-blur-xl'
              }`}>
                <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${
                  darkMode ? 'text-white' : 'text-black'
                }`}>
                  <BookOpen className="w-5 h-5" />
                  Chapters
                </h3>

                <div className="space-y-6">
                  {docsChapters.map((section) => (
                    <div key={section.id}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.color}`} />
                        <h4 className={`text-sm font-semibold ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          {section.title}
                        </h4>
                      </div>
                      <div className="space-y-1 pl-4">
                        {section.chapters.map((chapter) => {
                          const isActive = location.pathname === chapter.path;
                          return (
                            <a
                              key={chapter.id}
                              href={chapter.path}
                              className={`block py-2 px-3 rounded-lg text-sm transition-all ${
                                isActive
                                  ? darkMode
                                    ? 'bg-white/10 text-white'
                                    : 'bg-zinc-200 text-black'
                                  : darkMode
                                    ? 'text-zinc-500 hover:text-white hover:bg-white/5'
                                    : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                              }`}
                            >
                              {chapter.title}
                              {chapter.quickStart && (
                                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                  darkMode
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'bg-blue-100 text-blue-600'
                                }`}>
                                  Start
                                </span>
                              )}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className={`mt-8 pt-6 border-t ${
                  darkMode ? 'border-zinc-800' : 'border-zinc-300'
                }`}>
                  <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Quick Actions
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCopyCommand('composer create-project luxid/framework myapp')}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
                        darkMode
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white'
                          : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-700 hover:text-black'
                      }`}
                    >
                      <span className="font-mono">composer create-project...</span>
                      {copiedCommand === 'composer create-project luxid/framework myapp' ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <a
                      href="https://github.com/luxid/framework"
                      target="_blank"
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
                        darkMode
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white'
                          : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-700 hover:text-black'
                      }`}
                    >
                      <span>Star on GitHub</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className={`rounded-2xl ${
                darkMode ? 'bg-zinc-900/80 border border-zinc-800' : 'bg-zinc-100/80 border border-zinc-300'
              } p-8 backdrop-blur-xl`}>
                {/* Current Chapter Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    {currentSection && (
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentSection.color} flex items-center justify-center`}>
                        <currentSection.icon className="w-6 h-6 text-white" />
                      </div>
                    )}
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentDoc.title}</h2>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`flex items-center gap-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
                          <Clock className="w-4 h-4" /> 15 min read
                        </span>
                        <span className={`flex items-center gap-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
                          <Users className="w-4 h-4" /> Beginner
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className={`h-1 w-full rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`}>
                    <div
                      className={`h-full bg-gradient-to-r ${currentSection?.color || 'from-blue-500 to-cyan-500'}`}
                      style={{ width: '25%' }}
                    />
                  </div>
                </div>

                {/* Chapter Content */}
                <div className="prose prose-lg max-w-none">
                  <currentDoc.content />
                </div>

                {/* Navigation */}
                <div className={`mt-12 pt-8 border-t ${
                  darkMode ? 'border-zinc-800' : 'border-zinc-300'
                }`}>
                  <div className="flex justify-between">
                    <a
                      href="/docs/introduction"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                        darkMode
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                          : 'bg-zinc-200 hover:bg-zinc-300 text-black'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </a>
                    <a
                      href="/docs/installation"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                        darkMode
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
                      className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                        darkMode
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
      <section className={`py-32 bg-gradient-to-b relative overflow-hidden ${
        darkMode
          ? 'from-zinc-950 to-black'
          : 'from-zinc-100 to-white'
      }`}>
        {/* Background decoration */}
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:80px_80px] ${
          darkMode ? '' : 'invert'
        }`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] ${
          darkMode ? 'bg-zinc-800/10' : 'bg-zinc-400/10'
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
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${
              darkMode
                ? 'from-zinc-500 via-white to-zinc-500'
                : 'from-zinc-600 via-black to-zinc-600'
            }`}>amazing?</span>
          </h2>
          <p className={`text-xl mb-12 max-w-2xl mx-auto ${
            darkMode ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            Start building with Luxid today. Join thousands of developers creating modern PHP applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => handleCopyCommand('composer create-project luxid/framework myapp')}
              className={`flex items-center gap-2 px-8 py-4 border rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg ${
                darkMode
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
          <div className={`inline-flex items-center gap-3 px-6 py-4 border rounded-xl font-mono text-sm backdrop-blur-sm ${
            darkMode
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

// Content Components
function IntroductionContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20'
          : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'
      }`}>
        <div className="flex items-start gap-4">
          <Sparkles className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Welcome to Luxid Framework</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              The modern PHP framework built for developers who value elegance, performance, and simplicity.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">What is Luxid?</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        Luxid is a full-stack PHP framework that combines the best practices of modern web development with an elegant,
        intuitive architecture. Built from the ground up for PHP 8+, Luxid provides everything you need to build
        fast, secure, and maintainable web applications.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
            darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <Layers className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
          </div>
          <h3 className="text-xl font-bold mb-2">SEA Architecture</h3>
          <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
            Screen, Entities, Actions - A modern approach that makes your code intuitive and organized.
          </p>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
            darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            <Zap className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
          </div>
          <h3 className="text-xl font-bold mb-2">Batteries Included</h3>
          <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
            Everything you need out of the box: ORM, templating, CLI tools, authentication, and more.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Key Features</h3>
      <ul className={`space-y-3 mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        <li className="flex items-start gap-3">
          <div className={`w-2 h-2 mt-2 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`} />
          <span><strong>Modern PHP 8+</strong> - Type safety, attributes, match expressions, and more</span>
        </li>
        <li className="flex items-start gap-3">
          <div className={`w-2 h-2 mt-2 rounded-full ${darkMode ? 'bg-purple-500' : 'bg-purple-600'}`} />
          <span><strong>SEA Architecture</strong> - Screen, Entities, Actions for clean separation of concerns</span>
        </li>
        <li className="flex items-start gap-3">
          <div className={`w-2 h-2 mt-2 rounded-full ${darkMode ? 'bg-green-500' : 'bg-green-600'}`} />
          <span><strong>Nova Templating</strong> - Powerful, expressive templating engine</span>
        </li>
        <li className="flex items-start gap-3">
          <div className={`w-2 h-2 mt-2 rounded-full ${darkMode ? 'bg-yellow-500' : 'bg-yellow-600'}`} />
          <span><strong>L ORM</strong> - Elegant database operations with fluent syntax</span>
        </li>
        <li className="flex items-start gap-3">
          <div className={`w-2 h-2 mt-2 rounded-full ${darkMode ? 'bg-red-500' : 'bg-red-600'}`} />
          <span><strong>Juice CLI</strong> - Powerful command-line tools for development</span>
        </li>
      </ul>

      <div className={`p-6 rounded-xl my-8 ${
        darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-zinc-100 border border-zinc-300'
      }`}>
        <h3 className="text-xl font-bold mb-4">Quick Start</h3>
        <pre className="font-mono text-sm overflow-x-auto mb-4">
          <code className={darkMode ? 'text-zinc-300' : 'text-zinc-800'}>
{`# Create a new Luxid project
composer create-project luxid/framework myapp

# Navigate to your project
cd myapp

# Start the development server
php juice start

# Visit http://localhost:8000`}
          </code>
        </pre>
        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          That's it! You now have a running Luxid application. Continue to the next chapter to learn more.
        </p>
      </div>
    </>
  );
}

function InstallationContent() {
  const { darkMode } = useTheme();
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Installation Guide</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        Follow this step-by-step guide to install Luxid Framework on your system.
      </p>

      <h3 className="text-2xl font-bold mb-4">Prerequisites</h3>
      <div className={`mb-8 p-6 rounded-xl ${
        darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
      }`}>
        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-green-500/20' : 'bg-green-100'
            }`}>
              <Check className="w-3 h-3 text-green-500" />
            </div>
            <div>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>PHP 8.0 or higher</span>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Check with <code className="font-mono bg-zinc-800/50 px-2 py-1 rounded">php -v</code>
              </p>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-green-500/20' : 'bg-green-100'
            }`}>
              <Check className="w-3 h-3 text-green-500" />
            </div>
            <div>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>Composer</span>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                PHP dependency manager
              </p>
            </div>
          </li>
        </ul>
      </div>

      <h3 className="text-2xl font-bold mb-4">Installation Steps</h3>

      <div className="space-y-8">
        {/* Step 1 */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
            }`}>
              1
            </div>
            <h4 className="text-xl font-bold">Create New Project</h4>
          </div>
          <div className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-black border border-zinc-800' : 'bg-zinc-100 border border-zinc-300'}`}>
            <div className="flex items-center justify-between">
              <pre className="font-mono text-sm overflow-x-auto">
                <code className={darkMode ? 'text-zinc-300' : 'text-zinc-800'}>
                  composer create-project luxid/framework myapp
                </code>
              </pre>
              <button
                onClick={() => handleCopy('composer create-project luxid/framework myapp')}
                className="ml-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                {copiedCommand === 'composer create-project luxid/framework myapp' ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            This creates a new Luxid project in the <code className="font-mono">myapp</code> directory.
          </p>
        </div>

        {/* Step 2 */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600'
            }`}>
              2
            </div>
            <h4 className="text-xl font-bold">Configure Environment</h4>
          </div>
          <div className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-black border border-zinc-800' : 'bg-zinc-100 border border-zinc-300'}`}>
            <pre className="font-mono text-sm overflow-x-auto">
              <code className={darkMode ? 'text-zinc-300' : 'text-zinc-800'}>
{`# Navigate to your project
cd myapp

# Copy environment file
cp .env.example .env

# Edit .env with your settings
nano .env`}
              </code>
            </pre>
          </div>
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Update database credentials and other settings in the <code className="font-mono">.env</code> file.
          </p>
        </div>

        {/* Step 3 */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600'
            }`}>
              3
            </div>
            <h4 className="text-xl font-bold">Start Development Server</h4>
          </div>
          <div className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-black border border-zinc-800' : 'bg-zinc-100 border border-zinc-300'}`}>
            <div className="flex items-center justify-between">
              <pre className="font-mono text-sm overflow-x-auto">
                <code className={darkMode ? 'text-zinc-300' : 'text-zinc-800'}>
                  php juice start
                </code>
              </pre>
              <button
                onClick={() => handleCopy('php juice start')}
                className="ml-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                {copiedCommand === 'php juice start' ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            The server will start at <code className="font-mono">http://localhost:8000</code>
          </p>
        </div>
      </div>
    </>
  );
}

function FirstAppContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Your First Luxid Application</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        Let's build a simple blog application to understand the core concepts of Luxid.
      </p>

      <div className="space-y-8">
        {/* Step 1 */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <h3 className="text-2xl font-bold mb-4">1. Create Post Entity</h3>
          <div className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-black border border-zinc-800' : 'bg-zinc-100 border border-zinc-300'}`}>
            <pre className="font-mono text-sm overflow-x-auto">
              <code className={darkMode ? 'text-zinc-300' : 'text-zinc-800'}>
{`<?php
// app/Entities/Post.php

namespace App\\Entities;

use Luxid\\Database\\DbEntity;

class Post extends DbEntity
{
    public int $id = 0;
    public string $title = '';
    public string $content = '';
    public string $author = '';
    public string $created_at = '';

    public static function tableName(): string
    {
        return 'posts';
    }

    public static function primaryKey(): string
    {
        return 'id';
    }

    public function attributes(): array
    {
        return ['title', 'content', 'author', 'created_at'];
    }
}`}
              </code>
            </pre>
          </div>
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            This entity represents a blog post in your database.
          </p>
        </div>

        {/* Step 2 */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <h3 className="text-2xl font-bold mb-4">2. Create Post Action</h3>
          <div className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-black border border-zinc-800' : 'bg-zinc-100 border border-zinc-300'}`}>
            <pre className="font-mono text-sm overflow-x-auto">
              <code className={darkMode ? 'text-zinc-300' : 'text-zinc-800'}>
{`<?php
// app/Actions/PostAction.php

namespace App\\Actions;

use App\\Actions\\LuxidAction;
use App\\Entities\\Post;

class PostAction extends LuxidAction
{
    public function index()
    {
        $posts = Post::findAll([], 'created_at DESC');

        return $this->nova('posts.index', [
            'posts' => $posts
        ]);
    }

    public function show($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return $this->response()->error('Post not found', null, 404);
        }

        return $this->nova('posts.show', [
            'post' => $post
        ]);
    }
}`}
              </code>
            </pre>
          </div>
        </div>

        {/* Step 3 */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <h3 className="text-2xl font-bold mb-4">3. Create Post Screen</h3>
          <div className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-black border border-zinc-800' : 'bg-zinc-100 border border-zinc-300'}`}>
            <pre className="font-mono text-sm overflow-x-auto">
              <code className={darkMode ? 'text-zinc-300' : 'text-zinc-800'}>
{`{{-- screens/posts/index.nova.php --}}

@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Blog Posts</h1>

    @foreach($posts as $post)
        <div class="post-card">
            <h2>{{ $post->title }}</h2>
            <p>{{ $post->content }}</p>
            <small>By {{ $post->author }} • {{ $post->created_at }}</small>
            <a href="/posts/{{ $post->id }}">Read more</a>
        </div>
    @endforeach
</div>
@endsection`}
              </code>
            </pre>
          </div>
        </div>

        {/* Step 4 */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <h3 className="text-2xl font-bold mb-4">4. Add Routes</h3>
          <div className={`mb-4 p-4 rounded-lg ${darkMode ? 'bg-black border border-zinc-800' : 'bg-zinc-100 border border-zinc-300'}`}>
            <pre className="font-mono text-sm overflow-x-auto">
              <code className={darkMode ? 'text-zinc-300' : 'text-zinc-800'}>
{`<?php
// routes/api.php

use App\\Actions\\PostAction;

$router->get('/posts', [PostAction::class, 'index']);
$router->get('/posts/{id}', [PostAction::class, 'show']);`}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <div className={`mt-8 p-6 rounded-xl ${
        darkMode
          ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'
          : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
      }`}>
        <h3 className="text-xl font-bold mb-2">🎉 Congratulations!</h3>
        <p className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>
          You've built your first Luxid application! You now have a working blog with entities, actions, and screens.
        </p>
      </div>
    </>
  );
}

function ArchitectureContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Architecture Overview</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        Luxid follows the <strong>SEA (Screen, Entities, Actions)</strong> architecture, a modern take on MVC that
        provides clear separation of concerns while remaining intuitive to work with.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
            darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <Code className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
          </div>
          <h3 className="text-xl font-bold mb-2">Screens</h3>
          <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
            Views and templates powered by Nova. This is where your HTML and presentation logic lives.
          </p>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
            darkMode ? 'bg-green-500/20' : 'bg-green-100'
          }`}>
            <Database className={darkMode ? 'text-green-400' : 'text-green-600'} />
          </div>
          <h3 className="text-xl font-bold mb-2">Entities</h3>
          <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
            Your data models that interact with the database through L ORM.
          </p>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
            darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            <Zap className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
          </div>
          <h3 className="text-xl font-bold mb-2">Actions</h3>
          <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
            Handle HTTP requests, process data, and return responses.
          </p>
        </div>
      </div>

      <div className={`my-8 p-6 rounded-xl ${
        darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-zinc-100 border border-zinc-300'
      }`}>
        <h3 className="text-2xl font-bold mb-4">Flow of a Request</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
            }`}>
              1
            </div>
            <div>
              <h4 className="font-bold">Route Matching</h4>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Router matches URL to an action method
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600'
            }`}>
              2
            </div>
            <div>
              <h4 className="font-bold">Entity Interaction</h4>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Action uses entities to fetch/update data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600'
            }`}>
              3
            </div>
            <div>
              <h4 className="font-bold">Screen Rendering</h4>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Action returns data to screen for display
              </p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Directory Structure</h3>
      <div className={`p-6 rounded-xl ${
        darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
      }`}>
        <pre className="font-mono text-sm overflow-x-auto">
          <code className={darkMode ? 'text-zinc-300' : 'text-zinc-800'}>
{`project/
├── app/
│   ├── Actions/          # Action classes (Controllers)
│   │   ├── UserAction.php
│   │   └── PostAction.php
│   ├── Entities/         # Entity classes (Models)
│   │   ├── User.php
│   │   └── Post.php
│   └── Middleware/       # Middleware classes
│
├── screens/              # Nova templates (Views)
│   ├── frames/           # Layouts
│   ├── users/            # User screens
│   └── posts/            # Post screens
│
├── routes/               # Route definitions
│   └── api.php
│
├── migrations/           # Database migrations
├── config/              # Configuration files
└── web/                 # Public assets`}
          </code>
        </pre>
      </div>
    </>
  );
}

// Other content components (simplified for now)
function SEAArchitectureContent() {
  return <div className="text-center py-12">SEA Architecture Content</div>;
}

function ActionsContent() {
  return <div className="text-center py-12">Actions Content</div>;
}

function EntitiesContent() {
  return <div className="text-center py-12">Entities Content</div>;
}

function ScreensContent() {
  return <div className="text-center py-12">Screens Content</div>;
}

function LORMContent() {
  return <div className="text-center py-12">L ORM Content</div>;
}

function MigrationsContent() {
  return <div className="text-center py-12">Migrations Content</div>;
}

function RelationshipsContent() {
  return <div className="text-center py-12">Relationships Content</div>;
}

function NovaTemplatingContent() {
  return <div className="text-center py-12">Nova Templating Content</div>;
}

function ComponentsContent() {
  return <div className="text-center py-12">Components Content</div>;
}

function JuiceCLIContent() {
  return <div className="text-center py-12">Juice CLI Content</div>;
}

function MakeCommandsContent() {
  return <div className="text-center py-12">Make Commands Content</div>;
}
