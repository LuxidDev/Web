import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Layers, ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function CorsContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Hero Section */}
      <div className={`mb-8 p-6 rounded-2xl ${darkMode
        ? "bg-gray-900/50 border border-gray-800"
        : "bg-gray-50 border border-gray-200"
        }`}>
        <div className="flex items-start gap-4">
          <Layers className={`w-12 h-12 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Luxid CORS Middleware</h1>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Luxid includes automatic CORS (<strong className="text-gray-900 dark:text-white">Cross-Origin Resource Sharing</strong>) support for all applications built on the framework. This ensures that APIs and web apps built with Luxid can securely handle requests from different origins without requiring manual configuration from the developer.
            </p>
          </div>
        </div>
      </div>

      {/* How CORS Works */}
      <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">How CORS Works in Luxid</h2>

      <div className="flex flex-col gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Automatic Injection
          </h4>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              The CorsMiddleware is included in Luxid's core engine and automatically added to the middleware stack.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              During route resolution, Luxid executes all global middleware, which now includes CORS by default.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              This means every Luxid app immediately has CORS enabled without the user needing to configure anything.
            </li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Applied to All Routes
          </h4>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              The middleware is executed for both standard web routes and API routes.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              API requests (/api/... or requests with application/json headers) trigger the CORS middleware automatically.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
