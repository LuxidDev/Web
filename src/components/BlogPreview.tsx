import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const posts = [
  { title: 'Introducing Luxid 1.0', excerpt: 'The biggest update yet with improved performance, new features, and a refined developer experience.', date: 'Nov 28, 2025', tag: 'Release' },
  { title: 'Understanding SEA Architecture', excerpt: 'A deep dive into the Screen, Entities, Actions pattern and why it makes your code better.', date: 'Nov 25, 2025', tag: 'Tutorial' },
  { title: 'Building APIs with Luxid', excerpt: 'Learn how to create robust, scalable APIs using Luxid built-in tools and best practices.', date: 'Nov 20, 2025', tag: 'Guide' },
];

export default function BlogPreview() {
  const { darkMode } = useTheme();

  return (
    <section id="blog" className={`py-32 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'} mb-2`}>Latest from the Blog</h2>
            <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>News, tutorials, and updates from the Luxid team</p>
          </div>
          <a href="#" className={`hidden md:flex items-center gap-2 ${darkMode ? 'text-white hover:text-zinc-300' : 'text-black hover:text-zinc-700'} transition-colors`}>
            View all posts <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article key={i} className={`group p-6 border rounded-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
              darkMode
                ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'
                : 'bg-zinc-50 border-zinc-200 hover:border-zinc-400'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2 py-1 text-xs rounded ${
                  darkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-200 text-zinc-700'
                }`}>{post.tag}</span>
                <span className={`flex items-center gap-1 text-sm ${
                  darkMode ? 'text-zinc-500' : 'text-zinc-600'
                }`}>
                  <Calendar className="w-3 h-3" /> {post.date}
                </span>
              </div>
              <h3 className={`text-xl font-semibold mb-3 group-hover:opacity-80 transition-colors ${
                darkMode ? 'text-white' : 'text-black'
              }`}>{post.title}</h3>
              <p className={`text-sm leading-relaxed mb-4 ${
                darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>{post.excerpt}</p>
              <span className={`inline-flex items-center gap-1 text-sm transition-colors ${
                darkMode
                  ? 'text-zinc-500 group-hover:text-white'
                  : 'text-zinc-600 group-hover:text-black'
              }`}>
                Read more <ArrowRight className="w-3 h-3" />
              </span>
            </article>
          ))}
        </div>
        <a href="#" className={`md:hidden flex items-center justify-center gap-2 mt-8 transition-colors ${
          darkMode ? 'text-white hover:text-zinc-300' : 'text-black hover:text-zinc-700'
        }`}>
          View all posts <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
