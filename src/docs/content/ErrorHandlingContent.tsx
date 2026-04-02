import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function ErrorHandlingContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Hero Section */}
      <div className={`mb-8 p-6 rounded-2xl ${darkMode
        ? "bg-gray-900/50 border border-gray-800"
        : "bg-gray-50 border border-gray-200"
        }`}>
        <div className="flex items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Error Handling in Luxid</h1>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Luxid provides robust error handling mechanisms to catch and manage exceptions gracefully.
            </p>
          </div>
        </div>
      </div>

      {/* How Error Handling Works */}
      <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">How Error Handling Works in Luxid</h2>

      <div className="flex flex-col gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Global Exception Handler
          </h4>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Luxid catches all unhandled exceptions and converts them to formatted responses.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              In development mode, detailed error information is shown for debugging.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              In production, generic error messages are displayed for security.
            </li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            HTTP Exceptions
          </h4>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              HTTP-specific exceptions (404, 403, 500) are handled with appropriate responses.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Custom error pages can be created in the `nova/errors/` directory.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              API requests return JSON error responses with appropriate status codes.
            </li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Custom Error Handling
          </h4>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Create custom exception classes by extending the base Exception class.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Use try-catch blocks in your Actions to handle specific error cases.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              The `Response::error()` helper provides consistent error responses.
            </li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Validation Errors
          </h4>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Entity validation errors are collected and can be returned to the client.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'$entity->getErrors()'}</strong> to access validation failures.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Return 422 status codes with validation error details.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
