import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Terminal, Command, Zap } from 'lucide-react';

export default function JuiceCLIContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/20'
          : 'bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200'
      }`}>
        <div className="flex items-start gap-4">
          <Terminal className={`w-12 h-12 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Juice CLI Tool</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Powerful command-line interface for scaffolding and managing Luxid applications.
            </p>
          </div>
        </div>
      </div>

      {/* Juice CLI content */}
    </>
  );
}
