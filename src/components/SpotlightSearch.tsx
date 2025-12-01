import React, { useState, useEffect, useRef } from 'react';
import { Search, FileText, Code, Terminal, Book, ArrowUp, ArrowDown, CornerDownLeft, Sparkles, Hash } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const searchItems = [
  { type: 'ai', icon: Sparkles, title: 'Ask Luxid', desc: 'AI-powered search', category: 'AI', highlight: true },
  { type: 'doc', icon: Hash, title: 'Getting Started', desc: 'Quick start guide for Luxid', category: 'Documentation' },
  { type: 'doc', icon: Hash, title: 'SEA Architecture', desc: 'Screen, Entities, Actions pattern', category: 'Concepts' },
  { type: 'code', icon: Code, title: 'Nova Templating', desc: 'Powerful templating engine', category: 'Features' },
  { type: 'code', icon: Code, title: 'L ORM', desc: 'Elegant database operations', category: 'Features' },
  { type: 'cli', icon: Terminal, title: 'Juice CLI', desc: 'Command line tools', category: 'Tools' },
  { type: 'doc', icon: FileText, title: 'Routing', desc: 'Define application routes', category: 'Documentation' },
  { type: 'doc', icon: FileText, title: 'Middleware', desc: 'Request/Response middleware', category: 'Documentation' },
  { type: 'doc', icon: Book, title: 'API Reference', desc: 'Complete API documentation', category: 'Reference' },
];

export default function SpotlightSearch({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { darkMode } = useTheme();

  const filtered = query ? searchItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  ) : searchItems;

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    setQuery('');
    setSelected(0);
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected(s => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelected(s => Math.max(s - 1, 0)); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [filtered.length, onClose, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]" onClick={onClose}>
      <div className={`absolute inset-0 backdrop-blur-md ${
        darkMode ? 'bg-black/90' : 'bg-white/90'
      }`} />
      <div className={`relative w-full max-w-2xl mx-4 border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${
        darkMode
          ? 'bg-zinc-900/95 border-zinc-700 shadow-black/50'
          : 'bg-white/95 border-zinc-300 shadow-black/20'
      }`} onClick={e => e.stopPropagation()}>
        <div className={`flex items-center gap-3 px-5 py-4 border-b ${
          darkMode ? 'border-zinc-800' : 'border-zinc-200'
        }`}>
          <Search className={`w-5 h-5 ${
            darkMode ? 'text-zinc-500' : 'text-zinc-400'
          }`} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className={`flex-1 bg-transparent placeholder-zinc-500 outline-none text-lg ${
              darkMode ? 'text-white' : 'text-black'
            }`}
          />
          <kbd className={`px-2 py-1 rounded text-xs ${
            darkMode
              ? 'bg-zinc-800 text-zinc-500'
              : 'bg-zinc-200 text-zinc-600'
          }`}>esc</kbd>
        </div>
        <div className="max-h-[400px] overflow-y-auto py-2">
          {filtered.map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors ${
                i === selected
                  ? darkMode
                    ? 'bg-zinc-800'
                    : 'bg-zinc-200'
                  : darkMode
                    ? 'hover:bg-zinc-800/50'
                    : 'hover:bg-zinc-100'
              } ${item.highlight ? 'text-cyan-400' : ''}`}
            >
              <item.icon className={`w-5 h-5 ${
                item.highlight
                  ? 'text-cyan-400'
                  : darkMode
                    ? 'text-zinc-500'
                    : 'text-zinc-400'
              }`} />
              <div className="flex-1 min-w-0">
                <div className={`font-medium truncate ${
                  item.highlight
                    ? 'text-cyan-400'
                    : darkMode
                      ? 'text-white'
                      : 'text-black'
                }`}>
                  {item.title} {item.highlight && <span className="text-xs bg-cyan-500/20 px-1.5 py-0.5 rounded ml-2">AI</span>}
                </div>
                <div className={`text-sm truncate ${
                  darkMode ? 'text-zinc-500' : 'text-zinc-600'
                }`}>{item.desc}</div>
              </div>
              <span className={`text-xs shrink-0 ${
                darkMode ? 'text-zinc-600' : 'text-zinc-500'
              }`}>{item.category}</span>
            </div>
          ))}
        </div>
        <div className={`flex items-center gap-6 px-5 py-3 border-t text-xs ${
          darkMode
            ? 'border-zinc-800 text-zinc-500'
            : 'border-zinc-200 text-zinc-600'
        }`}>
          <span className="flex items-center gap-1.5"><ArrowUp className="w-3 h-3" /><ArrowDown className="w-3 h-3" /> to navigate</span>
          <span className="flex items-center gap-1.5"><CornerDownLeft className="w-3 h-3" /> to select</span>
          <span className="flex items-center gap-1.5">
            <kbd className={`px-1.5 py-0.5 rounded ${
              darkMode ? 'bg-zinc-800' : 'bg-zinc-200'
            }`}>esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
