import React, { useState } from 'react';
import { Database, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import SimplePhpCode from './SimplePhpCode';

const ormExamples = {
  basic: `// Find by ID
$user = User::find(1);

// Find all
$user = User::findAll();

// Find one by conditions
$user = User::findOne(['email' => 'jhay@example.com']);
`,
  relations: `// Relationships
$posts = User::find(1)->posts;
$author = Post::find(1)->author;

// Eager loading
$users = User::with('posts', 'profile')->get();`,
  advanced: `// Using Query Builder
$users = User::query()
    ->where('email', 'LIKE', '%@gmail.com')
    ->orderBy('created_at', 'DESC')
    ->limit(10)
    ->all();
`
};

export default function RocketORMShowcase() {
  const [activeExample, setActiveExample] = useState<'basic' | 'relations' | 'advanced'>('basic');
  const { darkMode } = useTheme();

  // Escape the PHP code properly for display
  const escapedCode = ormExamples[activeExample];

  return (
    <section className={`py-32 relative overflow-hidden ${darkMode ? 'bg-zinc-950' : 'bg-zinc-100'
      }`}>
      <div className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr rounded-full blur-3xl ${darkMode ? 'from-zinc-800/20 to-transparent' : 'from-zinc-400/20 to-transparent'
        }`} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className={`border rounded-xl overflow-hidden ${darkMode
              ? 'bg-[#1e1e1e] border-zinc-700'
              : 'bg-[#fffffe] border-zinc-300'
              }`}>
              <div className={`flex border-b ${darkMode ? 'border-zinc-700' : 'border-zinc-300'
                }`}>
                {Object.keys(ormExamples).map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveExample(key as any)}
                    className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${activeExample === key
                      ? darkMode
                        ? 'bg-[#2d2d2d] text-white'
                        : 'bg-[#f3f3f3] text-black'
                      : darkMode
                        ? 'text-zinc-400 hover:text-zinc-200 bg-[#1e1e1e]'
                        : 'text-zinc-600 hover:text-zinc-800 bg-[#fffffe]'
                      }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div className="p-0">
                <SimplePhpCode
                  code={escapedCode}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center ${darkMode
                ? 'from-white to-zinc-400'
                : 'from-black to-zinc-600'
                }`}>
                <Database className={`w-6 h-6 ${darkMode ? 'text-black' : 'text-white'
                  }`} />
              </div>
              <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'
                }`}>Rocket-ORM</h2>
            </div>
            <p className={`text-xl mb-8 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
              An expressive ORM that makes database operations a joy. Define relationships, query data, and manage your database with beautiful, fluent syntax.
            </p>
            <ul className="space-y-4 mb-8">
              {['Fluent query builder', 'Mordern relationships', 'Automatic migrations', 'Query scopes', 'Entity events'].map((f, i) => (
                <li key={i} className={`flex items-center gap-3 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'
                  }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-white' : 'bg-black'
                    }`} />
                  {f}
                </li>
              ))}
            </ul>
            <a href="#" className={`inline-flex items-center gap-2 transition-colors ${darkMode
              ? 'text-white hover:text-zinc-300'
              : 'text-black hover:text-zinc-700'
              }`}>
              Learn more about Rocket-ORM <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
