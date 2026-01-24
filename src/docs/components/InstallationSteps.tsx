import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { CheckCircle, Terminal, Package, Server, Database, Copy, Check } from 'lucide-react';
import CodeExample from './CodeExample';

interface InstallationStepsProps {
  darkMode: boolean;
  onCopyCommand?: (command: string) => void;
  copiedCommand?: string | null;
}

export default function InstallationSteps({ darkMode, onCopyCommand, copiedCommand }: InstallationStepsProps) {
  const steps = [
    {
      step: 1,
      title: "Prerequisites",
      icon: CheckCircle,
      content: (
        <>
          <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Ensure you have the following installed:
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Terminal className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <div>
                <div className="font-medium">PHP 8.0+</div>
                <div className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  <code className="font-mono text-xs">php -v</code> to check
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Package className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <div>
                <div className="font-medium">Composer</div>
                <div className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  PHP dependency manager
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Database className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <div>
                <div className="font-medium">Database (Optional)</div>
                <div className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  MySQL, PostgreSQL, or SQLite
                </div>
              </div>
            </div>
          </div>
        </>
      )
    },
    {
      step: 2,
      title: "Create Project",
      icon: Terminal,
      content: (
        <>
          <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Create a new Luxid project using Composer:
          </p>
          {onCopyCommand && (
            <button
              onClick={() => onCopyCommand('composer create-project luxid/framework myapp')}
              className={`w-full flex items-center justify-between p-4 rounded-lg mb-4 transition-colors ${
                darkMode
                  ? 'bg-zinc-800 hover:bg-zinc-700'
                  : 'bg-zinc-100 hover:bg-zinc-200'
              }`}
            >
              <code className="font-mono">composer create-project luxid/framework myapp</code>
              {copiedCommand === 'composer create-project luxid/framework myapp' ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          )}
          <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            This creates a new directory called <code className="font-mono">myapp</code> with the Luxid framework.
          </p>
        </>
      )
    },
    {
      step: 3,
      title: "Configure",
      icon: Server,
      content: (
        <>
          <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Set up your environment configuration:
          </p>
          <CodeExample
            code={`cd myapp
cp .env.example .env
# Edit .env with your database credentials`}
            language="bash"
            explanation="Copy and configure your environment file"
            compact
          />
        </>
      )
    },
    {
      step: 4,
      title: "Database Setup",
      icon: Database,
      content: (
        <>
          <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Set up your database (optional):
          </p>
          <div className="space-y-2">
            <CodeExample
              code="php juice db:create"
              language="bash"
              explanation="Create database"
              compact
            />
            <CodeExample
              code="php juice db:migrate"
              language="bash"
              explanation="Run migrations"
              compact
            />
          </div>
        </>
      )
    },
    {
      step: 5,
      title: "Start Server",
      icon: Terminal,
      content: (
        <>
          <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Start the development server:
          </p>
          <CodeExample
            code="php juice start"
            language="bash"
            explanation="Visit http://localhost:8000"
            compact
          />
          <p className={`text-sm mt-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Your Luxid application is now running!
          </p>
        </>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {steps.map((step) => (
        <div
          key={step.step}
          className={`p-6 rounded-xl ${
            darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
            }`}>
              <step.icon className={`w-6 h-6 ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div>
              <h4 className="text-xl font-bold">
                Step {step.step}: {step.title}
              </h4>
            </div>
          </div>
          {step.content}
        </div>
      ))}
    </div>
  );
}
