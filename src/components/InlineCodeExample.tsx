import React from 'react';
import MonacoEditor from './MonacoEditor';
import { useTheme } from '@/contexts/ThemeContext';
import { LucideIcon } from 'lucide-react';

interface InlineCodeExampleProps {
  code: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'indigo';
  language?: 'php' | 'html' | 'javascript' | 'nova' | 'bash' | 'ini' | 'json' | 'sql' | 'yaml' | 'markdown' | 'xml' | 'css';
  compact?: boolean;
}

export default function InlineCodeExample({
  code,
  title,
  description,
  icon: Icon,
  color = 'blue',
  language = 'php',
  compact = false,
}: InlineCodeExampleProps) {
  const { darkMode } = useTheme();

  const colorClasses = {
    blue: {
      bg: darkMode ? 'bg-gradient-to-br from-blue-900/10 to-blue-800/5 border border-blue-800/20' : 'bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200',
      iconBg: darkMode ? 'bg-blue-500/10' : 'bg-blue-100',
      iconColor: darkMode ? 'text-blue-400' : 'text-blue-600',
      text: darkMode ? 'text-blue-200/80' : 'text-blue-700/80'
    },
    green: {
      bg: darkMode ? 'bg-gradient-to-br from-green-900/10 to-green-800/5 border border-green-800/20' : 'bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200',
      iconBg: darkMode ? 'bg-green-500/10' : 'bg-green-100',
      iconColor: darkMode ? 'text-green-400' : 'text-green-600',
      text: darkMode ? 'text-green-200/80' : 'text-green-700/80'
    },
    purple: {
      bg: darkMode ? 'bg-gradient-to-br from-purple-900/10 to-purple-800/5 border border-purple-800/20' : 'bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200',
      iconBg: darkMode ? 'bg-purple-500/10' : 'bg-purple-100',
      iconColor: darkMode ? 'text-purple-400' : 'text-purple-600',
      text: darkMode ? 'text-purple-200/80' : 'text-purple-700/80'
    },
    red: {
      bg: darkMode ? 'bg-gradient-to-br from-red-900/10 to-red-800/5 border border-red-800/20' : 'bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200',
      iconBg: darkMode ? 'bg-red-500/10' : 'bg-red-100',
      iconColor: darkMode ? 'text-red-400' : 'text-red-600',
      text: darkMode ? 'text-red-200/80' : 'text-red-700/80'
    },
    yellow: {
      bg: darkMode ? 'bg-gradient-to-br from-yellow-900/10 to-yellow-800/5 border border-yellow-800/20' : 'bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200',
      iconBg: darkMode ? 'bg-yellow-500/10' : 'bg-yellow-100',
      iconColor: darkMode ? 'text-yellow-400' : 'text-yellow-600',
      text: darkMode ? 'text-yellow-200/80' : 'text-yellow-700/80'
    },
    indigo: {
      bg: darkMode ? 'bg-gradient-to-br from-indigo-900/10 to-indigo-800/5 border border-indigo-800/20' : 'bg-gradient-to-br from-indigo-50 to-indigo-100/50 border border-indigo-200',
      iconBg: darkMode ? 'bg-indigo-500/10' : 'bg-indigo-100',
      iconColor: darkMode ? 'text-indigo-400' : 'text-indigo-600',
      text: darkMode ? 'text-indigo-200/80' : 'text-indigo-700/80'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`p-6 rounded-2xl ${colors.bg}`}>
      <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
        <div className={`p-1.5 rounded ${colors.iconBg}`}>
          <Icon className={`w-4 h-4 ${colors.iconColor}`} />
        </div>
        {title}
      </h4>
      <p className={`mb-4 text-sm ${colors.text}`}>
        {description}
      </p>
      <div className={`rounded-lg overflow-hidden border ${darkMode ? 'border-zinc-700' : 'border-zinc-300'}`}>
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
    </div>
  );
}
