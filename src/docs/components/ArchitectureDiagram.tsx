import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Database, Code, Zap, ArrowRight, Globe, Server } from 'lucide-react';

interface ArchitectureDiagramProps {
  showFlow?: boolean;
}

export default function ArchitectureDiagram({ showFlow = true }: ArchitectureDiagramProps) {
  const { darkMode } = useTheme();

  return (
    <div className={`my-8 p-6 rounded-2xl ${
      darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
    }`}>
      <h3 className="text-2xl font-bold mb-6 text-center">Luxid Architecture Flow</h3>

      <div className="relative">
        {/* Flow arrows */}
        {showFlow && (
          <>
            <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/2">
              <ArrowRight className={`w-8 h-8 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`} />
            </div>
            <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 -translate-x-1/2">
              <ArrowRight className={`w-8 h-8 ${darkMode ? 'text-zinc-600' : 'text-zinc-400'}`} />
            </div>
          </>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Screen */}
          <div className={`p-6 rounded-xl text-center ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
            }`}>
              <Globe className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h4 className="text-xl font-bold mb-2">Screen</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Views & Templates (Nova Engine)
              <br />
              <code className="text-xs mt-1 inline-block">screens/</code>
            </p>
          </div>

          {/* Actions */}
          <div className={`p-6 rounded-xl text-center ${darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
            }`}>
              <Zap className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h4 className="text-xl font-bold mb-2">Actions</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              HTTP Controllers
              <br />
              <code className="text-xs mt-1 inline-block">app/Actions/</code>
            </p>
          </div>

          {/* Entities */}
          <div className={`p-6 rounded-xl text-center ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              darkMode ? 'bg-green-500/20' : 'bg-green-100'
            }`}>
              <Database className={`w-8 h-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h4 className="text-xl font-bold mb-2">Entities</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Data Models (L ORM)
              <br />
              <code className="text-xs mt-1 inline-block">app/Entities/</code>
            </p>
          </div>
        </div>

        {/* Under the hood explanation */}
        <div className={`mt-8 pt-6 border-t ${
          darkMode ? 'border-zinc-800' : 'border-zinc-300'
        }`}>
          <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Server className="w-5 h-5" />
            Under the Hood
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
              <h5 className="font-semibold mb-2">Application Class</h5>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Main entry point that bootstraps the framework, sets up dependency injection, and manages the request lifecycle.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
              <h5 className="font-semibold mb-2">Router & Middleware</h5>
              <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Handles HTTP routing, middleware execution, and dispatches requests to appropriate actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
