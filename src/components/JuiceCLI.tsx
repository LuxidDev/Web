import React, { useState, useEffect } from 'react';
import { Terminal, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import TerminalCommand from '@/components/TerminalCommand';

const commands = [
  { cmd: 'php juice status', desc: 'Show application current status' },
  { cmd: 'php juice make:action UserAction', desc: 'Generate a new Action (Controller)' },
  { cmd: 'php juice make:entity User', desc: 'Generate a new Entity (Model)' },
  { cmd: 'php juice make:migration create_users', desc: 'Create a database migration' },
  { cmd: 'php juice db:migrate', desc: 'Run all pending migrations' },
  { cmd: 'php juice start', desc: 'Start the development server' },
];

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

  return (
    <section className={`py-32 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center ${darkMode
                ? 'from-white to-zinc-400'
                : 'from-black to-zinc-600'
                }`}>
                <Terminal className={`w-6 h-6 ${darkMode ? 'text-black' : 'text-white'
                  }`} />
              </div>
              <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'
                }`}>Juice CLI</h2>
            </div>
            <p className={`text-xl mb-8 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
              }`}>Powerful command-line tools that make development a breeze. Generate, migrate, and serve with simple commands.</p>
            <div className="space-y-3">
              {commands.slice(1).map((c, i) => (
                <div key={i} className={`flex items-center justify-between p-3 border rounded-lg group transition-colors ${darkMode
                  ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-600'
                  : 'bg-zinc-100/50 border-zinc-300 hover:border-zinc-400'
                  }`}>
                  <div className="flex-1 min-w-0">
                    <TerminalCommand command={c.cmd} />
                    <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-600'
                      }`}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={`border rounded-xl overflow-hidden ${darkMode
            ? 'bg-[#1e1e1e] border-zinc-700'
            : 'bg-[#fffffe] border-zinc-300'
            }`}>
            <div className={`flex items-center gap-2 px-4 py-3 border-b ${darkMode
              ? 'border-zinc-700 bg-[#1e1e1e]'
              : 'border-zinc-300 bg-[#fffffe]'
              }`}>
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className={`ml-2 text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}>Terminal</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className={darkMode ? 'text-zinc-500' : 'text-zinc-600'}>
                $ <TerminalCommand command={typedText} />
              </div>
              <div className={`mt-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}>⚡ Creating Action... <br></br>
                🎉 Action created successfully!
              </div>
              <div className="text-green-500 mt-2">📁 Location: app/Actions/UserAction.php</div><br></br>
              <div className={darkMode ? 'text-zinc-500' : 'text-zinc-600'}>
                $ <TerminalCommand command="juice start" />
              </div>
              <div className={`mt-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'
                }`}>
                <p>🚀 Starting Luxid development server...</p>
                <br></br>
                <p>🌐 Server running at: http://localhost:8000</p>
                <p>📁 Serving from: /home/ .../my_app/web</p>
                <p>🛑 Press Ctrl+C to stop</p>
                <br></br>
                <p>Starting PHP built-in server...</p>
                <p>Development Server <span className={darkMode ? 'text-white' : 'text-black'}>(http://localhost:8000)</span> started</p>
              </div>

            </div>
          </div>
          <a href="docs/cli-basics" className={`inline-flex items-center gap-2 transition-colors ${darkMode
            ? 'text-white hover:text-zinc-300'
            : 'text-black hover:text-zinc-700'
            }`}>
            Learn more about Juice-CLI <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
