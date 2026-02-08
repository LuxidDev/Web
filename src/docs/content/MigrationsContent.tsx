import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Database} from 'lucide-react';

export default function MigrationsContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20'
          : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'
      }`}>
        <div className="flex items-start gap-4">
          <Database className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Database Migrations</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Version control for your database schema. Migrate up and down with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Your migration content here */}
      <h2 className="text-3xl font-bold mb-6">What Are Migrations?</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        Migrations are version-controlled database changes that allow you to evolve your database
        schema over time in a safe, consistent way.
      </p>

      {/* Add your migration content... */}
    </>
  );
}
