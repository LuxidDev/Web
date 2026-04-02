import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export default function AuthenticationContent() {
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
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Luxid Authentication</h1>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Luxid includes built-in authentication support, making it easy to secure your applications.
            </p>
          </div>
        </div>
      </div>

      {/* How Authentication Works */}
      <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">How Authentication Works in Luxid</h2>

      <div className="flex flex-col gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Session-Based Authentication
          </h4>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Luxid uses PHP's built-in session management for web applications.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              User authentication state persists across requests automatically.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              The `Auth` helper provides convenient methods for checking authentication status.
            </li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Authentication Middleware
          </h4>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Use the `auth()` middleware to protect routes that require authentication.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              The middleware redirects unauthenticated users to the login page.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Apply to individual routes or entire route groups.
            </li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            User Entity
          </h4>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Extend the base `User` entity to add custom authentication logic.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              The entity includes methods for password hashing and verification.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Built-in validation rules ensure data integrity.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
