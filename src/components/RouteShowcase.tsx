import React, { useState } from 'react';
import { Route, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import CodeExample from '@/components/CodeExample';

const routeCode = `<?php
// Application Routes

use App\\Actions\\WelcomeAction;
use Luxid\\Foundation\\Application;

route('welcome')
    ->get('/')
    ->uses(WelcomeAction::class, 'index')
    ->open();`;

const componentCode = `<?php
use App\\Actions\\TodoAction;

route('todos.index')
    ->get('/api/todos')
    ->uses(TodoAction::class, 'index')
    ->open();

route('todos.show')
    ->get('/api/todos/{id}')
    ->uses(TodoAction::class, 'show')
    ->open();`;

export default function RouteShowcase() {
  const [activeTab, setActiveTab] = useState<'SSR' | 'API'>('SSR');
  const { darkMode } = useTheme();

  return (
    <section className={`py-32 relative overflow-hidden ${darkMode ? 'bg-black' : 'bg-white'
      }`}>
      <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl rounded-full blur-3xl ${darkMode ? 'from-zinc-800/20 to-transparent' : 'from-zinc-300/20 to-transparent'
        }`} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side explanation */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center ${darkMode
                ? 'from-white to-zinc-400'
                : 'from-black to-zinc-600'
                }`}>
                <Route className={`w-6 h-6 ${darkMode ? 'text-black' : 'text-white'
                  }`} />
              </div>
              <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'
                }`}>Routes in Luxid</h2>
            </div>
            <p className={`text-xl mb-8 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
              Define your application's HTTP routes using Luxid's expressive routing DSL. Routes can point to Actions and support full CRUD operations.
            </p>
            <ul className="space-y-4 mb-8">
              {['Chainable route methods', 'Supports CRUD', 'Action-based routing', 'Flexible parameters'].map((f, i) => (
                <li key={i} className={`flex items-center gap-3 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'
                  }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-white' : 'bg-black'
                    }`} />
                  {f}
                </li>
              ))}
            </ul>
            <a href="docs/routes" className={`inline-flex items-center gap-2 transition-colors ${darkMode
              ? 'text-white hover:text-zinc-300'
              : 'text-black hover:text-zinc-700'
              }`}>
              Learn more about Routes <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right side code example with tabs */}
          <div className={`border rounded-xl overflow-hidden ${darkMode
            ? 'bg-[#1e1e1e] border-zinc-700'
            : 'bg-[#fffffe] border-zinc-300 shadow-sm'
            }`}>
            <div className={`flex border-b ${darkMode ? 'border-zinc-700' : 'border-zinc-300'
              }`}>
              <button
                onClick={() => setActiveTab('SSR')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'SSR'
                  ? darkMode
                    ? 'bg-[#2d2d2d] text-white'
                    : 'bg-[#f3f3f3] text-black'
                  : darkMode
                    ? 'text-zinc-400 hover:text-zinc-200 bg-[#1e1e1e]'
                    : 'text-zinc-600 hover:text-zinc-800 bg-[#fffffe]'
                  }`}
              >
                SSR
              </button>
              <button
                onClick={() => setActiveTab('API')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'API'
                  ? darkMode
                    ? 'bg-[#2d2d2d] text-white'
                    : 'bg-[#f3f3f3] text-black'
                  : darkMode
                    ? 'text-zinc-400 hover:text-zinc-200 bg-[#1e1e1e]'
                    : 'text-zinc-600 hover:text-zinc-800 bg-[#fffffe]'
                  }`}
              >
                API
              </button>
            </div>

            <div className="p-6">
              <CodeExample
                code={activeTab === 'SSR' ? routeCode : componentCode}
                title={activeTab === 'SSR' ? 'routes/web.php - Welcome Route' : 'routes/api.php - Todo Routes'}
                explanation={activeTab === 'SSR'
                  ? 'A minimal route example pointing to the WelcomeAction, perfoming SSR (Server-Side Rendering).'
                  : 'Todo routes using Action classes for index and show endpoints, using API Endpointing.'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
