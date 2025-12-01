import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { highlightCode } from '@/utils/code-highlighter';

const novaCode = `{{-- layouts/app.nova --}}
<!DOCTYPE html>
<html>
<head>
    <title>@yield('title') - Luxid</title>
    @styles
</head>
<body>
    @include('partials.nav')

    <main>
        @yield('content')
    </main>

    @scripts
</body>
</html>`;

const componentCode = `{{-- components/card.nova --}}
@props(['title', 'image', 'price'])

<div class="product-card">
    <img src="{{ $image }}" alt="{{ $title }}">
    <h3>{{ $title }}</h3>
    <span class="price">
        {{ format_currency($price) }}
    </span>

    @if($slot)
        <div class="actions">
            {{ $slot }}
        </div>
    @endif
</div>`;

export default function NovaShowcase() {
  const [activeTab, setActiveTab] = useState<'layout' | 'component'>('layout');
  const [scrollY, setScrollY] = useState(0);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const createHighlightedCode = (code: string) => highlightCode(code, 'nova');

  return (
    <section className={`py-32 relative overflow-hidden ${
      darkMode ? 'bg-black' : 'bg-white'
    }`}>
      <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl rounded-full blur-3xl ${
        darkMode ? 'from-zinc-800/20 to-transparent' : 'from-zinc-300/20 to-transparent'
      }`} style={{ transform: `translateY(${scrollY * 0.1}px)` }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center ${
                darkMode
                  ? 'from-white to-zinc-400'
                  : 'from-black to-zinc-600'
              }`}>
                <Sparkles className={`w-6 h-6 ${
                  darkMode ? 'text-black' : 'text-white'
                }`} />
              </div>
              <h2 className={`text-4xl font-bold ${
                darkMode ? 'text-white' : 'text-black'
              }`}>Nova Templating</h2>
            </div>
            <p className={`text-xl mb-8 ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              A powerful, expressive templating engine that compiles to pure PHP. Write beautiful templates with clean syntax and blazing fast performance.
            </p>
            <ul className="space-y-4 mb-8">
              {['Blade-inspired syntax', 'Component-based architecture', 'Automatic escaping', 'Template inheritance', 'Slots and props'].map((f, i) => (
                <li key={i} className={`flex items-center gap-3 ${
                  darkMode ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    darkMode ? 'bg-white' : 'bg-black'
                  }`} />
                  {f}
                </li>
              ))}
            </ul>
            <a href="#" className={`inline-flex items-center gap-2 transition-colors ${
              darkMode
                ? 'text-white hover:text-zinc-300'
                : 'text-black hover:text-zinc-700'
            }`}>
              Learn more about Nova <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className={`border rounded-xl overflow-hidden ${
            darkMode
              ? 'bg-[#1e1e1e] border-zinc-700'
              : 'bg-[#fffffe] border-zinc-300 shadow-sm'
          }`}>
            <div className={`flex border-b ${
              darkMode ? 'border-zinc-700' : 'border-zinc-300'
            }`}>
              <button
                onClick={() => setActiveTab('layout')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'layout'
                    ? darkMode
                      ? 'bg-[#2d2d2d] text-white'
                      : 'bg-[#f3f3f3] text-black border-b-2 border-blue-500'
                    : darkMode
                      ? 'text-zinc-400 hover:text-zinc-200 bg-[#1e1e1e]'
                      : 'text-zinc-600 hover:text-zinc-800 bg-[#fffffe]'
                }`}
              >
                Layout
              </button>
              <button
                onClick={() => setActiveTab('component')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'component'
                    ? darkMode
                      ? 'bg-[#2d2d2d] text-white'
                      : 'bg-[#f3f3f3] text-black border-b-2 border-blue-500'
                    : darkMode
                      ? 'text-zinc-400 hover:text-zinc-200 bg-[#1e1e1e]'
                      : 'text-zinc-600 hover:text-zinc-800 bg-[#fffffe]'
                }`}
              >
                Component
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className={`text-sm font-mono leading-relaxed ${
                darkMode ? 'text-code-dark' : 'text-code-light'
              }`}>
                <code
                  className="language-nova"
                  dangerouslySetInnerHTML={createHighlightedCode(
                    activeTab === 'layout' ? novaCode : componentCode
                  )}
                />
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
