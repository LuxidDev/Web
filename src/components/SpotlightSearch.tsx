import React, { useState, useEffect, useRef } from 'react';
import { Brain, Search, FileText, Code, Terminal, Book, ArrowUp, ArrowDown, CornerDownLeft, Hash, Database } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { allDocs, docsChapters } from '@/docs/content';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const getIconForChapter = (chapter: any) => {
  const section = docsChapters.find(s => s.chapters.some(c => c.id === chapter.id));

  switch (section?.id) {
    case 'getting-started': return Hash;
    case 'core-concepts': return Code;
    case 'database-orm': return Database;
    case 'juice-cli': return Terminal;
    case 'advanced': return Brain;
    case 'tutorial': return Book;
    default: return FileText;
  }
};

const getCategoryForChapter = (chapter: any) => {
  const section = docsChapters.find(s => s.chapters.some(c => c.id === chapter.id));
  return section?.title || 'Documentation';
};

// Generate search items from allDocs
const searchItems = [
  // Generate from allDocs
  ...allDocs.map(chapter => ({
    type: 'doc',
    icon: getIconForChapter(chapter),
    title: chapter.title,
    desc: `Documentation for ${chapter.title.toLowerCase()}`,
    category: getCategoryForChapter(chapter),
    highlight: false,
    url: chapter.path
  }))
];

export default function SpotlightSearch({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useTheme();

  const filtered = query ? searchItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  ) : searchItems;

  // Reset selected when filtered results change
  useEffect(() => {
    setSelected(0);
  }, [filtered]);

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

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current && selected >= 0) {
      const selectedElement = listRef.current.children[selected] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selected]);

  const handleSelect = (item: typeof searchItems[0]) => {
    if (item.url) {
      window.location.href = item.url;
    } else if (item.type === 'ai') {
      // Handle AI search
      console.log('AI search:', query);
    }
    onClose();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected(s => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected(s => Math.max(s - 1, 0));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selected]) {
          handleSelect(filtered[selected]);
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [filtered, selected, onClose, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh]" onClick={onClose}>
      <div className={`absolute inset-0 backdrop-blur-md ${darkMode ? 'bg-black/90' : 'bg-white/90'
        }`} />
      <div className={`relative w-full max-w-2xl mx-4 border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ${darkMode
        ? 'bg-zinc-900/95 border-zinc-700 shadow-black/50'
        : 'bg-white/95 border-zinc-300 shadow-black/20'
        }`} onClick={e => e.stopPropagation()}>
        <div className={`flex items-center gap-3 px-5 py-4 border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'
          }`}>
          <Search className={`w-5 h-5 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'
            }`} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className={`flex-1 bg-transparent placeholder-zinc-500 outline-none text-lg ${darkMode ? 'text-white' : 'text-black'
              }`}
          />
          <kbd className={`px-2 py-1 rounded text-xs ${darkMode
            ? 'bg-zinc-800 text-zinc-500'
            : 'bg-zinc-200 text-zinc-600'
            }`}>esc</kbd>
        </div>
        <div ref={listRef} className="max-h-[400px] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className={`px-5 py-8 text-center ${darkMode ? 'text-zinc-500' : 'text-zinc-600'
              }`}>
              No results found for "{query}"
            </div>
          ) : (
            filtered.map((item, i) => (
              <div
                key={i}
                onClick={() => handleSelect(item)}
                className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors ${i === selected
                  ? darkMode
                    ? 'bg-zinc-800'
                    : 'bg-zinc-200'
                  : darkMode
                    ? 'hover:bg-zinc-800/50'
                    : 'hover:bg-zinc-100'
                  }`}
              >
                <item.icon className={`w-5 h-5 ${item.highlight
                  ? 'text-cyan-400'
                  : darkMode
                    ? 'text-zinc-500'
                    : 'text-zinc-400'
                  }`} />
                <div className="flex-1 min-w-0">
                  <div className={`font-medium truncate ${item.highlight
                    ? 'text-cyan-400'
                    : darkMode
                      ? 'text-white'
                      : 'text-black'
                    }`}>
                    {item.title} {item.highlight && <span className="text-xs bg-cyan-500/20 px-1.5 py-0.5 rounded ml-2">AI</span>}
                  </div>
                  <div className={`text-sm truncate ${darkMode ? 'text-zinc-500' : 'text-zinc-600'
                    }`}>{item.desc}</div>
                </div>
                <span className={`text-xs shrink-0 ${darkMode ? 'text-zinc-600' : 'text-zinc-500'
                  }`}>{item.category}</span>
              </div>
            ))
          )}
        </div>
        <div className={`flex items-center gap-6 px-5 py-3 border-t text-xs ${darkMode
          ? 'border-zinc-800 text-zinc-500'
          : 'border-zinc-200 text-zinc-600'
          }`}>
          <span className="flex items-center gap-1.5"><ArrowUp className="w-3 h-3" /><ArrowDown className="w-3 h-3" /> to navigate</span>
          <span className="flex items-center gap-1.5"><CornerDownLeft className="w-3 h-3" /> to select</span>
          <span className="flex items-center gap-1.5">
            <kbd className={`px-1.5 py-0.5 rounded ${darkMode ? 'bg-zinc-800' : 'bg-zinc-200'
              }`}>esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
