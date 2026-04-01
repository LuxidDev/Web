import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Database, Globe, Server, Brain } from 'lucide-react';

interface ArchitectureDiagramProps {
  showFlow?: boolean;
}

export default function ArchitectureDiagram({ showFlow = true }: ArchitectureDiagramProps) {
  const { darkMode } = useTheme();

  return (
    <div className={`my-8 p-6 rounded-2xl ${darkMode
      ? 'bg-gray-900/50 border border-gray-800'
      : 'bg-gray-50 border border-gray-200'
      }`}>
      <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Luxid Architecture Flow
      </h3>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Actions */}
          <div className={`p-6 rounded-xl text-center transition-all hover:scale-105 ${darkMode
            ? 'bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20'
            : 'bg-purple-50 border border-purple-200 hover:bg-purple-100'
            }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
              <Brain className={`w-8 h-8 ${darkMode ? 'text-purple-300' : 'text-purple-600'}`} />
            </div>
            <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Actions</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              HTTP Controllers
              <br />
              <strong className="text-xs mt-1 inline-block text-gray-700 dark:text-gray-400">
                app/Actions/
              </strong>
            </p>
          </div>

          {/* Views */}
          <div className={`p-6 rounded-xl text-center transition-all hover:scale-105 ${darkMode
            ? 'bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20'
            : 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
            }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
              <Globe className={`w-8 h-8 ${darkMode ? 'text-blue-300' : 'text-blue-600'}`} />
            </div>
            <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Views</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Nova Engine
              <br />
              <strong className="text-xs mt-1 inline-block text-gray-700 dark:text-gray-400">
                nova/
              </strong>
            </p>
          </div>

          {/* Entities */}
          <div className={`p-6 rounded-xl text-center transition-all hover:scale-105 ${darkMode
            ? 'bg-green-500/10 border border-green-500/20 hover:bg-green-500/20'
            : 'bg-green-50 border border-green-200 hover:bg-green-100'
            }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-green-500/20' : 'bg-green-100'
              }`}>
              <Database className={`w-8 h-8 ${darkMode ? 'text-green-300' : 'text-green-600'}`} />
            </div>
            <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Entities</h4>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Data Models
              <br />
              <strong className="text-xs mt-1 inline-block text-gray-700 dark:text-gray-400">
                app/Entities/
              </strong>
            </p>
          </div>
        </div>

        {/* Under the hood explanation */}
        <div className={`mt-8 pt-6 border-t ${darkMode ? 'border-gray-800' : 'border-gray-300'
          }`}>
          <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
            <Server className="w-5 h-5" />
            Under the Hood
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-100 border border-gray-200'
              }`}>
              <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Application Class</h5>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Main entry point that bootstraps the framework, sets up dependency injection, and manages the request lifecycle.
              </p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-gray-100 border border-gray-200'
              }`}>
              <h5 className="font-semibold mb-2 text-gray-900 dark:text-white">Router & Middleware</h5>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Handles HTTP routing, middleware execution, and dispatches requests to appropriate actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
