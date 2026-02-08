import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Layers, Code, Database, Zap } from 'lucide-react';

export default function ArchitectureContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20'
          : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'
      }`}>
        <div className="flex items-start gap-4">
          <Layers className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Architecture: SEA Pattern</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Luxid follows the SEA (Screen, Entities, Actions) architecture - a modern, intuitive approach to MVC.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">The SEA Architecture</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        SEA stands for <strong>Screens</strong>, <strong>Entities</strong>, and <strong>Actions</strong>.
        It's a clean separation of concerns that makes your codebase intuitive and maintainable.
      </p>

      {/* Add more architecture content here */}
    </>
  );
}
