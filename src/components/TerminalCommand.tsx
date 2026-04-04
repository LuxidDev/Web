import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface TerminalCommandProps {
  command: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

// Custom highlighter for terminal commands
const highlightTerminalCommand = (command: string, darkMode: boolean): string => {
  // Define colors based on theme
  const colors = {
    php: darkMode ? '#d4d4d4' : '#393a34',
    luxid: darkMode ? '#d4d4d4' : '#393a34',
    juice: darkMode ? '#dcdcaa' : '#795e26',
    composer: darkMode ? '#4ec9b0' : '#267f99',
    command: darkMode ? '#4ec9b0' : '#267f99',
    subcommand: darkMode ? '#569cd6' : '#0000ff',
    argument: darkMode ? '#9cdcfe' : '#001080',
    string: darkMode ? '#ce9178' : '#a31515',
    punctuation: darkMode ? '#d4d4d4' : '#393a34',
    flag: darkMode ? '#c586c0' : '#af00db',
    env: darkMode ? '#dcdcaa' : '#795e26',
    curl: darkMode ? '#4ec9b0' : '#267f99',
    method: darkMode ? '#569cd6' : '#0000ff',
    url: darkMode ? '#ce9178' : '#a31515',
    header: darkMode ? '#c586c0' : '#af00db',
    data: darkMode ? '#9cdcfe' : '#001080',
    bracket: darkMode ? '#d4d4d4' : '#393a34',
  };

  // Split the command into parts, but preserve quoted strings
  const parts: string[] = [];
  let currentPart = '';
  let inQuote = false;
  let quoteChar = '';

  for (let i = 0; i < command.length; i++) {
    const char = command[i];

    if ((char === '"' || char === "'") && (i === 0 || command[i - 1] !== '\\')) {
      if (inQuote && quoteChar === char) {
        inQuote = false;
        currentPart += char;
        parts.push(currentPart);
        currentPart = '';
        quoteChar = '';
      } else if (!inQuote) {
        inQuote = true;
        quoteChar = char;
        currentPart += char;
      } else {
        currentPart += char;
      }
    } else if (char === ' ' && !inQuote) {
      if (currentPart) {
        parts.push(currentPart);
        currentPart = '';
      }
    } else {
      currentPart += char;
    }
  }
  if (currentPart) {
    parts.push(currentPart);
  }

  const highlightedParts = parts.map((part, index) => {
    let color = colors.argument;

    // Handle curl command
    if (part === 'curl') {
      color = colors.curl;
    }
    // Handle HTTP methods
    else if (part === '-X' && parts[index + 1]) {
      color = colors.flag;
    }
    else if (part === 'GET' || part === 'POST' || part === 'PUT' || part === 'PATCH' || part === 'DELETE') {
      color = colors.method;
    }
    // Handle headers (-H)
    else if (part === '-H') {
      color = colors.flag;
    }
    // Handle data (-d)
    else if (part === '-d') {
      color = colors.flag;
    }
    // Handle data flag with JSON
    else if (part.startsWith("'") || part.startsWith('"')) {
      // Check if it's JSON data
      if (part.includes('{') || part.includes('[')) {
        color = colors.data;
      } else {
        color = colors.string;
      }
    }
    // Handle URLs
    else if (part.startsWith('http://') || part.startsWith('https://')) {
      color = colors.url;
    }
    // Handle query parameters in URLs
    else if (part.includes('?') && part.includes('=')) {
      color = colors.url;
    }
    // PHP command
    else if (part === 'php') {
      color = colors.php;
    }
    // luxid command
    else if (part === 'luxid') {
      color = colors.luxid;
    }
    // Juice command
    else if (part === 'juice') {
      color = colors.juice;
    }
    // Composer commands
    else if (part === 'composer') {
      color = colors.composer;
    }
    else if (part === 'create-project' || part === 'require') {
      color = colors.command;
    }
    // .env files
    else if (part === '.env' || part === '.env.example') {
      color = colors.env;
    }
    // Juice subcommands (db:, make:, gen:, haven:)
    else if (part.includes(':')) {
      color = colors.command;
    }
    // Juice main commands
    else if (['start', 'fresh', 'status', 'routes', 'env:check', 'version',
      'db:create', 'db:drop', 'db:reset', 'db:status', 'db:migrate',
      'db:rollback', 'db:refresh', 'make:action', 'make:entity',
      'make:middleware', 'make:migration', 'make:todo', 'make:api', 'new',
      'haven:install', 'seed', 'help', 'cp', 'cat'].includes(part)) {
      color = colors.command;
    }
    // Flags (--something or -X, -H, -d)
    else if (part.startsWith('--') || part === '-X' || part === '-H' || part === '-d') {
      color = colors.flag;
    }
    // Snake case (migration names)
    else if (part.includes('_')) {
      color = colors.string;
    }
    // PascalCase (class names)
    else if (part === part.toUpperCase() && part.length > 1 && !part.includes(':')) {
      color = colors.subcommand;
    }
    // Curly braces in JSON
    else if (part === '{' || part === '}' || part === '[' || part === ']') {
      color = colors.bracket;
    }

    return `<span style="color: ${color}">${part}</span>`;
  });

  return highlightedParts.join(`<span style="color: ${colors.punctuation}"> </span>`);
};

export default function TerminalCommand({ command, description, className = '', compact = false }: TerminalCommandProps) {
  const { darkMode } = useTheme();
  const [copied, setCopied] = useState(false);

  const createHighlightedCommand = (cmd: string) => {
    return { __html: highlightTerminalCommand(cmd, darkMode) };
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (compact) {
    return (
      <div className={`flex items-center justify-between p-3 border rounded-lg group transition-colors ${darkMode
        ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'
        : 'bg-zinc-100/50 border-zinc-300 hover:border-zinc-400'
        } ${className}`}>
        <div className="flex-1 min-w-0">
          <pre className="m-0 p-0 overflow-x-auto">
            <code
              className="font-mono text-sm"
              dangerouslySetInnerHTML={createHighlightedCommand(command)}
            />
          </pre>
          {description && (
            <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
              {description}
            </p>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={`p-2 transition-colors flex-shrink-0 ${darkMode
            ? 'text-zinc-500 hover:text-white'
            : 'text-zinc-600 hover:text-black'
            }`}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  return (
    <div className={`mb-4 ${className}`}>
      <div className={`flex items-center justify-between p-4 border rounded-lg group transition-colors ${darkMode
        ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'
        : 'bg-zinc-100/50 border-zinc-300 hover:border-zinc-400'
        }`}>
        <div className="flex-1 min-w-0">
          <pre className="m-0 p-0 overflow-x-auto">
            <code
              className="font-mono text-sm"
              dangerouslySetInnerHTML={createHighlightedCommand(command)}
            />
          </pre>
          {description && (
            <p className={`text-sm mt-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              {description}
            </p>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={`p-2 transition-colors flex-shrink-0 ml-2 ${darkMode
            ? 'text-zinc-500 hover:text-white'
            : 'text-zinc-600 hover:text-black'
            }`}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
