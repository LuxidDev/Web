import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { LucideIcon } from 'lucide-react';

interface InlineCodeExampleProps {
  code: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  color?: 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'indigo' | 'gray';
  language?: 'php' | 'html' | 'javascript' | 'nova' | 'bash' | 'ini' | 'json' | 'sql' | 'yaml' | 'markdown' | 'xml' | 'css';
  compact?: boolean;
  showCode?: boolean;
}

export default function InlineCodeExample({
  code,
  title,
  description,
  icon: Icon,
  color = 'blue',
  compact = false,
  showCode = true,
}: InlineCodeExampleProps) {
  const { darkMode } = useTheme();

  const colorClasses = {
    blue: {
      bg: darkMode ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-blue-50 border border-blue-200',
      iconBg: darkMode ? 'bg-blue-500/20' : 'bg-blue-100',
      iconColor: darkMode ? 'text-blue-400' : 'text-blue-600',
      text: darkMode ? 'text-blue-300' : 'text-blue-700',
      codeBg: darkMode ? 'bg-blue-950/50' : 'bg-blue-100/50',
      codeText: darkMode ? 'text-blue-300' : 'text-blue-800',
    },
    green: {
      bg: darkMode ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200',
      iconBg: darkMode ? 'bg-green-500/20' : 'bg-green-100',
      iconColor: darkMode ? 'text-green-400' : 'text-green-600',
      text: darkMode ? 'text-green-300' : 'text-green-700',
      codeBg: darkMode ? 'bg-green-950/50' : 'bg-green-100/50',
      codeText: darkMode ? 'text-green-300' : 'text-green-800',
    },
    purple: {
      bg: darkMode ? 'bg-purple-500/10 border border-purple-500/20' : 'bg-purple-50 border border-purple-200',
      iconBg: darkMode ? 'bg-purple-500/20' : 'bg-purple-100',
      iconColor: darkMode ? 'text-purple-400' : 'text-purple-600',
      text: darkMode ? 'text-purple-300' : 'text-purple-700',
      codeBg: darkMode ? 'bg-purple-950/50' : 'bg-purple-100/50',
      codeText: darkMode ? 'text-purple-300' : 'text-purple-800',
    },
    red: {
      bg: darkMode ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200',
      iconBg: darkMode ? 'bg-red-500/20' : 'bg-red-100',
      iconColor: darkMode ? 'text-red-400' : 'text-red-600',
      text: darkMode ? 'text-red-300' : 'text-red-700',
      codeBg: darkMode ? 'bg-red-950/50' : 'bg-red-100/50',
      codeText: darkMode ? 'text-red-300' : 'text-red-800',
    },
    yellow: {
      bg: darkMode ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-50 border border-yellow-200',
      iconBg: darkMode ? 'bg-yellow-500/20' : 'bg-yellow-100',
      iconColor: darkMode ? 'text-yellow-400' : 'text-yellow-600',
      text: darkMode ? 'text-yellow-300' : 'text-yellow-700',
      codeBg: darkMode ? 'bg-yellow-950/50' : 'bg-yellow-100/50',
      codeText: darkMode ? 'text-yellow-300' : 'text-yellow-800',
    },
    indigo: {
      bg: darkMode ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-indigo-50 border border-indigo-200',
      iconBg: darkMode ? 'bg-indigo-500/20' : 'bg-indigo-100',
      iconColor: darkMode ? 'text-indigo-400' : 'text-indigo-600',
      text: darkMode ? 'text-indigo-300' : 'text-indigo-700',
      codeBg: darkMode ? 'bg-indigo-950/50' : 'bg-indigo-100/50',
      codeText: darkMode ? 'text-indigo-300' : 'text-indigo-800',
    },
    gray: {
      bg: darkMode ? 'bg-zinc-800/50 border border-zinc-700' : 'bg-zinc-100 border border-zinc-200',
      iconBg: darkMode ? 'bg-zinc-700' : 'bg-zinc-200',
      iconColor: darkMode ? 'text-zinc-300' : 'text-zinc-600',
      text: darkMode ? 'text-zinc-300' : 'text-zinc-600',
      codeBg: darkMode ? 'bg-zinc-900' : 'bg-zinc-200/50',
      codeText: darkMode ? 'text-zinc-300' : 'text-zinc-800',
    },
  };

  const colors = colorClasses[color];

  if (compact) {
    return (
      <div className={`rounded-lg overflow-hidden ${colors.bg}`}>
        <div className="p-3">
          <div className="flex items-start gap-2">
            {Icon && (
              <div className={`p-1 rounded ${colors.iconBg} flex-shrink-0 mt-0.5`}>
                <Icon className={`w-3.5 h-3.5 ${colors.iconColor}`} />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h4 className="font-mono text-sm font-semibold truncate">
                  {title}
                </h4>
                <p className={`text-xs ${colors.text}`}>
                  {description}
                </p>
              </div>
              {showCode && (
                <div className={`mt-2 font-mono text-xs p-2 rounded ${colors.codeBg} overflow-x-auto`}>
                  <strong className={colors.codeText}>{code}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl ${colors.bg}`}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className={`p-1.5 rounded-lg ${colors.iconBg} flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${colors.iconColor}`} />
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-bold text-base mb-1">{title}</h4>
          <p className={`text-sm mb-3 ${colors.text}`}>{description}</p>
          {showCode && (
            <div className={`font-mono text-sm p-3 rounded-lg ${colors.codeBg} overflow-x-auto`}>
              <strong className={colors.codeText}>{code}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
