import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Cpu, Package, Layers, Code,
  Terminal, Download, ArrowRight,
  CheckCircle, AlertCircle
} from 'lucide-react';
import CodeExample from '../components/CodeExample';
import InlineCodeExample from '@/components/InlineCodeExample';

export default function ValidationContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Hero Section */}
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/20'
          : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'
      }`}>
        <div className="flex items-start gap-4">
          <Layers className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <h1 className="text-3xl font-bold mb-2">Luxid CORS Middleware</h1>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
              Luxid includes automatic CORS (<strong>Cross-Origin Resource Sharing</strong>) support for all applications built on the framework. This ensures that APIs and web apps built with Luxid can securely handle requests from different origins without requiring manual configuration from the developer.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <h2 className="text-2xl font-bold mb-4 mt-8">How CORS Works in Luxid</h2>

    <div className="flex flex-col gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
            <h4 className="font-bold mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Automatic Injection
            </h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
                The CorsMiddleware is included in Luxid's core engine and automatically added to the middleware stack.
            </li>
            <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
                During route resolution, Luxid executes all global middleware, which now includes CORS by default.
            </li>
            <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
                This means every Luxid app immediately has CORS enabled without the user needing to configure anything.
            </li>
            </ul>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
            <h4 className="font-bold mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Applied to All Routes
            </h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
                The middleware is executed for both standard web routes and API routes.
            </li>
            <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
                API requests (/api/... or requests with application/json headers) trigger the CORS middleware automatically.
            </li>
            </ul>
        </div>
    </div>
    </>
  );
}
