import React from 'react';
import MonacoEditor from './MonacoEditor';
import { useTheme } from '@/contexts/ThemeContext';

interface CodeExampleProps {
  code: string;
  title?: string;
  explanation?: string;
  language?: 'php' | 'html' | 'javascript' | 'nova' | 'bash';
  compact?: boolean;
  className?: string;
}

export default function CodeExample({
  code,
  title = '',
  explanation = '',
  language = 'php',
  compact = false,
  className = '',
}: CodeExampleProps) {
  const { darkMode } = useTheme();

  return (
    <div className={`mb-8 ${className}`}>
      {title && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-t-lg ${
          darkMode ? 'bg-zinc-800 border border-zinc-700 border-b-0' : 'bg-zinc-100 border border-zinc-300 border-b-0'
        }`}>
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className={`ml-2 text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            {title}
          </span>
        </div>
      )}
      <div className={`rounded-b-lg overflow-hidden border ${
        darkMode ? 'border-zinc-700' : 'border-zinc-300'
      } ${!title ? 'rounded-t-lg' : ''}`}>
        <div className={`${darkMode ? 'bg-[#1e1e1e]' : 'bg-[#fffffe]'} px-6 py-2`}>
          <MonacoEditor
            code={code}
            language={language}
            darkMode={darkMode}
            height={compact ? '250px' : 'auto'}
            readOnly={true}
            className="rounded-none"
          />
        </div>
      </div>
      {explanation && (
        <p className={`mt-3 text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          {explanation}
        </p>
      )}
    </div>
  );
}
