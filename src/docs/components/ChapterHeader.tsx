import React from 'react';
import { Clock, Users } from 'lucide-react';

interface ChapterHeaderProps {
  currentDoc: any;
  currentSection: any;
  darkMode: boolean;
}

export default function ChapterHeader({ currentDoc, currentSection, darkMode }: ChapterHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        {currentSection && (
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentSection.color} flex items-center justify-center`}>
            <currentSection.icon className="w-6 h-6 text-white" />
          </div>
        )}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{currentDoc.title}</h2>
          <div className="flex items-center gap-4 text-sm">
            <span className={`flex items-center gap-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
              <Clock className="w-4 h-4" /> 15 min read
            </span>
            <span className={`flex items-center gap-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
              <Users className="w-4 h-4" /> Beginner
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`h-1 w-full rounded-full overflow-hidden ${darkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`}>
        <div
          className={`h-full bg-gradient-to-r ${currentSection?.color || 'from-blue-500 to-cyan-500'}`}
          style={{ width: '25%' }}
        />
      </div>
    </div>
  );
}
