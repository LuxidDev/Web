import React, { useState, useEffect } from 'react';
import { Database, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { highlightCode } from '@/utils/code-highlighter';

const ormExamples = {
  basic: `// Basic queries
$users = User::all();
$user = User::find(1);
$admins = User::where('role', 'admin')->get();`,
  relations: `// Relationships
$posts = User::find(1)->posts;
$author = Post::find(1)->author;

// Eager loading
$users = User::with('posts', 'profile')->get();`,
  advanced: `// Advanced queries
$users = User::query()
    ->where('active', true)
    ->whereHas('posts', fn($q) =>
        $q->where('published', true)
    )
    ->orderBy('created_at', 'desc')
    ->paginate(20);`
};

export default function LORMShowcase() {
  const [activeExample, setActiveExample] = useState<'basic' | 'relations' | 'advanced'>('basic');
  const [scrollY, setScrollY] = useState(0);
  const { darkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const createHighlightedCode = (code: string) => highlightCode(code, 'php');

  return (
    <section className={`py-32 relative overflow-hidden ${
      darkMode ? 'bg-zinc-950' : 'bg-zinc-100'
    }`}>
      <div className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr rounded-full blur-3xl ${
        darkMode ? 'from-zinc-800/20 to-transparent' : 'from-zinc-400/20 to-transparent'
      }`} style={{ transform: `translateY(${scrollY * -0.1}px)` }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className={`border rounded-xl overflow-hidden ${
              darkMode
                ? 'bg-[#1e1e1e] border-zinc-700'
                : 'bg-[#fffffe] border-zinc-300'
            }`}>
              <div className={`flex border-b ${
                darkMode ? 'border-zinc-700' : 'border-zinc-300'
              }`}>
                {Object.keys(ormExamples).map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveExample(key as any)}
                    className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                      activeExample === key
                        ? darkMode
                          ? 'bg-[#2d2d2d] text-white'
                          : 'bg-[#f3f3f3] text-black border-b-2 border-blue-500'
                        : darkMode
                          ? 'text-zinc-400 hover:text-zinc-200 bg-[#1e1e1e]'
                          : 'text-zinc-600 hover:text-zinc-800 bg-[#fffffe]'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className={`text-sm font-mono leading-relaxed ${
                  darkMode ? 'text-code-dark' : 'text-code-light'
                }`}>
                  <code
                    className="language-php"
                    dangerouslySetInnerHTML={createHighlightedCode(
                      ormExamples[activeExample]
                    )}
                  />
                </pre>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center ${
                darkMode
                  ? 'from-white to-zinc-400'
                  : 'from-black to-zinc-600'
              }`}>
                <Database className={`w-6 h-6 ${
                  darkMode ? 'text-black' : 'text-white'
                }`} />
              </div>
              <h2 className={`text-4xl font-bold ${
                darkMode ? 'text-white' : 'text-black'
              }`}>L ORM</h2>
            </div>
            <p className={`text-xl mb-8 ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              An elegant, expressive ORM that makes database operations a joy. Define relationships, query data, and manage your database with beautiful, fluent syntax.
            </p>
            <ul className="space-y-4 mb-8">
              {['Fluent query builder', 'Eloquent relationships', 'Automatic migrations', 'Query scopes', 'Model events'].map((f, i) => (
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
              Learn more about L ORM <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
