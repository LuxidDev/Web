import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface CodeExampleProps {
  code: string;
  language?: string;
  title?: string;
  explanation?: string;
  highlightLines?: number[];
}

export default function CodeExample({ code, language = 'php', title, explanation, highlightLines = [] }: CodeExampleProps) {
  const { darkMode } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting for Luxid examples
  const highlightCode = (code: string): string => {
    const patterns = {
      'namespace': /(namespace\s+[^\s;]+)/g,
      'use': /(use\s+[^\s;]+)/g,
      'class': /(class\s+[^\s{]+)/g,
      'function': /(function\s+[^\s(]+)/g,
      'keyword': /\b(abstract|class|extends|implements|interface|trait|public|protected|private|static|final|function|return|if|else|foreach|for|while|do|try|catch|throw|new|instanceof|self|parent|null|true|false|array|string|int|bool|float|void|object|mixed|callable|iterable)\b/g,
      'string': /(['"`][^'"`]*['"`])/g,
      'comment': /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g,
      'variable': /\$([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/g,
      'constant': /\b([A-Z_][A-Z0-9_]*)\b/g,
      'number': /\b(\d+\.?\d*|\.\d+)\b/g,
    };

    let highlighted = code;

    // Apply highlighting in order
    highlighted = highlighted.replace(patterns.comment, '<span class="text-green-600 dark:text-green-400">$1</span>');
    highlighted = highlighted.replace(patterns.namespace, '<span class="text-purple-600 dark:text-purple-400">$1</span>');
    highlighted = highlighted.replace(patterns.use, '<span class="text-blue-600 dark:text-blue-400">$1</span>');
    highlighted = highlighted.replace(patterns.class, '<span class="text-yellow-600 dark:text-yellow-400">$1</span>');
    highlighted = highlighted.replace(patterns.function, '<span class="text-cyan-600 dark:text-cyan-400">$1</span>');
    highlighted = highlighted.replace(patterns.keyword, '<span class="text-red-600 dark:text-red-400">$1</span>');
    highlighted = highlighted.replace(patterns.string, '<span class="text-green-600 dark:text-green-400">$1</span>');
    highlighted = highlighted.replace(patterns.constant, '<span class="text-pink-600 dark:text-pink-400">$1</span>');
    highlighted = highlighted.replace(patterns.variable, '<span class="text-orange-600 dark:text-orange-400">$$1</span>');
    highlighted = highlighted.replace(patterns.number, '<span class="text-blue-600 dark:text-blue-400">$1</span>');

    return highlighted;
  };

  return (
    <div className={`my-6 rounded-xl overflow-hidden ${
      darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-zinc-100 border border-zinc-300'
    }`}>
      {title && (
        <div className={`px-4 py-3 border-b flex justify-between items-center ${
          darkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-200 border-zinc-300'
        }`}>
          <span className={`font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {title}
          </span>
          <button
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-colors ${
              darkMode
                ? 'hover:bg-zinc-700 text-zinc-400 hover:text-white'
                : 'hover:bg-zinc-300 text-zinc-600 hover:text-black'
            }`}
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      )}
      <div className="relative">
        <pre className="font-mono text-sm p-4 overflow-x-auto">
          <code
            className={darkMode ? 'text-zinc-300' : 'text-zinc-800'}
            dangerouslySetInnerHTML={{ __html: highlightCode(code) }}
          />
        </pre>
        {highlightLines.length > 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-500/50"
               style={{ top: `${(Math.min(...highlightLines) - 1) * 1.5}em`, height: `${highlightLines.length * 1.5}em` }} />
        )}
      </div>
      {explanation && (
        <div className={`px-4 py-3 border-t text-sm ${
          darkMode ? 'bg-zinc-800/50 border-zinc-700 text-zinc-400' : 'bg-zinc-200/50 border-zinc-300 text-zinc-600'
        }`}>
          {explanation}
        </div>
      )}
    </div>
  );
}
