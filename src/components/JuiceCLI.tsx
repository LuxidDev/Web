import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const commands = [
  { cmd: 'juice create:app myproject', desc: 'Create a new Luxid application' },
  { cmd: 'juice make:action UserAction', desc: 'Generate a new Action (Controller)' },
  { cmd: 'juice make:entity User', desc: 'Generate a new Entity (Model)' },
  { cmd: 'juice make:migration create_users', desc: 'Create a database migration' },
  { cmd: 'juice migrate', desc: 'Run all pending migrations' },
  { cmd: 'juice serve', desc: 'Start the development server' },
];

// Custom highlighter for Juice commands
const highlightJuiceCommand = (command: string, darkMode: boolean) => {
  // Define colors based on theme
  const colors = {
    juice: darkMode ? '#dcdcaa' : '#795e26', // Yellow in dark, brown in light
    command: darkMode ? '#4ec9b0' : '#267f99', // Teal in dark, blue in light
    subcommand: darkMode ? '#569cd6' : '#0000ff', // Blue in dark, blue in light
    argument: darkMode ? '#9cdcfe' : '#001080', // Light blue in dark, dark blue in light
    string: darkMode ? '#ce9178' : '#a31515', // Orange in dark, red in light
    punctuation: darkMode ? '#d4d4d4' : '#393a34', // Gray in dark, dark gray in light
  };

  // Split the command into parts
  const parts = command.split(' ');

  return parts.map((part, index) => {
    let color = colors.argument; // default color

    if (index === 0 && part === 'juice') {
      color = colors.juice; // "juice" command
    } else if (index === 1) {
      if (part.startsWith('make:')) {
        color = colors.command; // "make:" commands
      } else if (part === 'create:app' || part === 'migrate' || part === 'serve') {
        color = colors.command; // other main commands
      }
    } else if (index === 2) {
      if (part.includes('_')) {
        color = colors.string; // snake_case names (migrations)
      } else if (part === part.toUpperCase()) {
        color = colors.subcommand; // PascalCase (class names)
      } else {
        color = colors.argument; // regular arguments
      }
    }

    return `<span style="color: ${color}">${part}</span>`;
  }).join('<span style="color: ' + colors.punctuation + '"> </span>');
};

export default function JuiceCLI() {
  const [copied, setCopied] = useState<number | null>(null);
  const [typedIndex, setTypedIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const { darkMode } = useTheme();

  useEffect(() => {
    const cmd = commands[0].cmd;
    if (typedIndex < cmd.length) {
      const timer = setTimeout(() => {
        setTypedText(cmd.slice(0, typedIndex + 1));
        setTypedIndex(typedIndex + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [typedIndex]);

  // Function to create highlighted HTML for Juice commands
  const createHighlightedJuiceCommand = (command: string) => {
    return { __html: highlightJuiceCommand(command, darkMode) };
  };

  const handleCopy = (index: number, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className={`py-32 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center ${
                darkMode
                  ? 'from-white to-zinc-400'
                  : 'from-black to-zinc-600'
              }`}>
                <Terminal className={`w-6 h-6 ${
                  darkMode ? 'text-black' : 'text-white'
                }`} />
              </div>
              <h2 className={`text-4xl font-bold ${
                darkMode ? 'text-white' : 'text-black'
              }`}>Juice CLI</h2>
            </div>
            <p className={`text-xl mb-8 ${
              darkMode ? 'text-zinc-400' : 'text-zinc-600'
            }`}>Powerful command-line tools that make development a breeze. Generate, migrate, and serve with simple commands.</p>
            <div className="space-y-3">
              {commands.slice(1).map((c, i) => (
                <div key={i} className={`flex items-center justify-between p-3 border rounded-lg group transition-colors ${
                  darkMode
                    ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'
                    : 'bg-zinc-100/50 border-zinc-300 hover:border-zinc-400'
                }`}>
                  <div className="flex-1 min-w-0">
                    <pre className="m-0 p-0 overflow-x-auto">
                      <code
                        className={`font-mono text-sm ${darkMode ? '' : ''}`}
                        dangerouslySetInnerHTML={createHighlightedJuiceCommand(c.cmd)}
                      />
                    </pre>
                    <p className={`text-xs mt-1 ${
                      darkMode ? 'text-zinc-500' : 'text-zinc-600'
                    }`}>{c.desc}</p>
                  </div>
                  <button onClick={() => handleCopy(i, c.cmd)} className={`p-2 transition-colors flex-shrink-0 ${
                    darkMode
                      ? 'text-zinc-500 hover:text-white'
                      : 'text-zinc-600 hover:text-black'
                  }`}>
                    {copied === i ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={`border rounded-xl overflow-hidden ${
            darkMode
              ? 'bg-[#1e1e1e] border-zinc-700'
              : 'bg-[#fffffe] border-zinc-300'
          }`}>
            <div className={`flex items-center gap-2 px-4 py-3 border-b ${
              darkMode
                ? 'border-zinc-700 bg-[#1e1e1e]'
                : 'border-zinc-300 bg-[#fffffe]'
            }`}>
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className={`ml-2 text-sm ${
                darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>Terminal</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className={darkMode ? 'text-zinc-500' : 'text-zinc-600'}>
                $ <span
                  dangerouslySetInnerHTML={createHighlightedJuiceCommand(typedText)}
                />
                <span className="animate-pulse">|</span>
              </div>
              <div className={`mt-4 ${
                darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>Creating new Luxid application...</div>
              <div className="text-green-500 mt-2">Application created successfully!</div>
              <div className={`mt-4 ${
                darkMode ? 'text-zinc-500' : 'text-zinc-600'
              }`}>
                $ <span dangerouslySetInnerHTML={createHighlightedJuiceCommand('cd myproject')} />
              </div>
              <div className={darkMode ? 'text-zinc-500' : 'text-zinc-600'}>
                $ <span dangerouslySetInnerHTML={createHighlightedJuiceCommand('juice serve')} />
              </div>
              <div className={`mt-2 ${
                darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>
                Server running at <span className={darkMode ? 'text-white' : 'text-black'}>http://localhost:8000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Juice CLI Syntax Highlighting */}
      <style>{`
        /* Ensure proper code styling */
        pre[class*="language-"] {
          background: transparent !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
        }

        code[class*="language-"] {
          background: transparent !important;
          text-shadow: none !important;
        }
      `}</style>
    </section>
  );
}
