import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Package, Grid, Layers } from 'lucide-react';

export default function ComponentsContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20'
          : 'bg-gradient-to-br from-red-50 to-pink-50 border border-red-200'
      }`}>
        <div className="flex items-start gap-4">
          <Package className={`w-12 h-12 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Nova Components</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Build reusable UI components for your Nova templates.
            </p>
          </div>
        </div>
      </div>

      {/* Add your components content here */}
    </>
  );
}
