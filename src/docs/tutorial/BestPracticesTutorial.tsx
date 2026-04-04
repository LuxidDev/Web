import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle, AlertCircle, Code, ArrowRight
} from "lucide-react";

export default function BestPracticesTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          Best Practices for Building APIs
        </h3>
        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Follow these best practices to build secure, maintainable, and professional APIs with Luxid.
        </p>
      </div>

      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className="text-gray-900 dark:text-white">Validation</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Always validate input data in your Entity using PHP 8 attributes like
              <strong className={`font-mono px-1 mx-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>#[Required]</strong>,
              <strong className={`font-mono px-1 mx-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>#[Email]</strong>, and
              <strong className={`font-mono px-1 mx-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>#[Min(3)]</strong>.
              Never trust user input - validate before saving to the database.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className="text-gray-900 dark:text-white">Error Handling</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Use <strong className={`font-mono px-1 mx-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>Response::error()</strong> for consistent error responses.
              Include meaningful error messages and validation details to help API consumers debug issues.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className="text-gray-900 dark:text-white">HTTP Status strongs</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Return appropriate HTTP status strongs:
            </p>
            <div className={`mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs`}>
              <div className={`p-1.5 rounded ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>200 OK</strong> - Success
              </div>
              <div className={`p-1.5 rounded ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>201 Created</strong> - Resource created
              </div>
              <div className={`p-1.5 rounded ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>400 Bad Request</strong> - Invalid request
              </div>
              <div className={`p-1.5 rounded ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>404 Not Found</strong> - Resource not found
              </div>
              <div className={`p-1.5 rounded ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>422 Unprocessable Entity</strong> - Validation errors
              </div>
              <div className={`p-1.5 rounded ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>500 Internal Server Error</strong> - Server error
              </div>
            </div>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className="text-gray-900 dark:text-white">Security First</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Never trust user input. Always:
            </p>
            <ul className={`mt-2 space-y-1 text-sm ml-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0 text-gray-500" />
                <span>Validate data through Entity attributes</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0 text-gray-500" />
                <span>Hash passwords using <strong className={darkMode ? "text-white font-mono" : "font-mono"}>password_hash()</strong> in <strong className={darkMode ? "text-white font-mono" : "font-mono"}>beforeSave()</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0 text-gray-500" />
                <span>Use parameter binding in queries (Rocket does this automatically)</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0 text-gray-500" />
                <span>Hide sensitive data with <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Column(hidden: true)]</strong></span>
              </li>
            </ul>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className="text-gray-900 dark:text-white">Consistent API Responses</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Use <strong className={`font-mono px-1 mx-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>Response::success()</strong> helper to maintain a consistent response structure:
            </p>
            <div className={`mt-2 p-2 rounded text-xs font-mono ${darkMode ? "bg-gray-800 text-gray-300 border border-gray-700" : "bg-gray-100 text-gray-800 border border-gray-200"}`}>
              {`{
  "success": true,
  "message": "Todo created successfully",
  "data": { ... }
}`}
            </div>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className="text-gray-900 dark:text-white">Keep Actions Focused</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Actions should handle HTTP concerns (request/response). Keep business logic in Entities:
            </p>
            <ul className={`mt-2 space-y-1 text-sm ml-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0 text-gray-500" />
                <span>Entities: Validation rules, computed properties, lifecycle hooks</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0 text-gray-500" />
                <span>Actions: Request handling, response formatting, orchestration</span>
              </li>
            </ul>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className="text-gray-900 dark:text-white">Use LuxidAction for Filtering</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Extend <strong className={darkMode ? "text-white font-mono" : "font-mono"}>LuxidAction</strong> to get automatic filtering, pagination, and sorting:
            </p>
            <div
              className={`mt-2 p-3 rounded text-xs font-mono whitespace-pre-wrap border ${darkMode
                ? "bg-gray-800 text-gray-300 border-gray-700"
                : "bg-gray-100 text-gray-800 border-gray-200"
                }`}
            >
              {`protected array $filters = [
    'status' => ['column' => 'status'],
    'search' => ['column' => ['title', 'description'], 'operator' => 'LIKE']
];`}
            </div>
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
              Then use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>?status=pending&search=work</strong> in your API calls.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className="text-gray-900 dark:text-white">Database Indexes</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Add indexes to columns used in WHERE, ORDER BY, and JOIN clauses for better performance:
            </p>
            <div
              className={`mt-2 p-3 rounded text-xs font-mono whitespace-pre-wrap border ${darkMode
                ? "bg-gray-800 text-gray-300 border-gray-700"
                : "bg-gray-100 text-gray-800 border-gray-200"
                }`}
            >
              {`$column->string('email')->unique()->index();
$column->string('status')->index();`}
            </div>
          </div>
        </li>
      </ul>

      <div className={`mt-6 p-4 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-gray-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className="text-gray-900 dark:text-white">Remember</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Good APIs are predictable, secure, and well-documented. Follow these practices to build
              professional applications that are easy to maintain and scale.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
