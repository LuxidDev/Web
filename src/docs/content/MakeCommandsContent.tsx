import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Wand2 } from 'lucide-react';

export default function MakeCommandsContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20'
          : 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200'
      }`}>
        <div className="flex items-start gap-4">
          <Wand2 className={`w-12 h-12 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Make Commands</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Generate Entities, Actions, Migrations, and more with single commands.
            </p>
          </div>
        </div>
      </div>

      {/* make commands content here */}
    </>
  );
}
