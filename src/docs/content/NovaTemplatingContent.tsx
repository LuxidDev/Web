import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { FileText } from 'lucide-react';

export default function NovaTemplatingContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20'
          : 'bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200'
      }`}>
        <div className="flex items-start gap-4">
          <FileText className={`w-12 h-12 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Nova Templating Engine</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Blade-inspired templating with layouts, components, and powerful directives.
            </p>
          </div>
        </div>
      </div>

      {/* Add your Nova templating content here */}
    </>
  );
}
