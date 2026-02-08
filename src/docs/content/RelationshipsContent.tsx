import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Network } from 'lucide-react';

export default function RelationshipsContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20'
          : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
      }`}>
        <div className="flex items-start gap-4">
          <Network className={`w-12 h-12 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Entity Relationships</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Define and work with relationships between entities in Luxid's L ORM.
            </p>
          </div>
        </div>
      </div>

      {/* Add your relationships content here */}
    </>
  );
}
