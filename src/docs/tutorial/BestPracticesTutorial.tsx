import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle, Shield, AlertCircle, Code, ArrowRight
} from "lucide-react";

export default function BestPracticesTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-6 p-5 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Best Practices for Building APIs
        </h3>
        <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
          Follow these best practices to build secure, maintainable, and professional APIs with Luxid.
        </p>
      </div>

      <ul className="space-y-4">
        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className={darkMode ? "text-green-400" : "text-green-700"}>Validation</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Always validate input data in your Entity using PHP 8 attributes like
              <code className={`font-mono px-1 mx-1 rounded ${darkMode ? "bg-zinc-800/50 text-green-300" : "bg-green-100 text-green-700"}`}>#[Required]</code>,
              <code className={`font-mono px-1 mx-1 rounded ${darkMode ? "bg-zinc-800/50 text-green-300" : "bg-green-100 text-green-700"}`}>#[Email]</code>, and
              <code className={`font-mono px-1 mx-1 rounded ${darkMode ? "bg-zinc-800/50 text-green-300" : "bg-green-100 text-green-700"}`}>#[Min(3)]</code>.
              Never trust user input - validate before saving to the database.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className={darkMode ? "text-green-400" : "text-green-700"}>Error Handling</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Use <code className={`font-mono px-1 mx-1 rounded ${darkMode ? "bg-zinc-800/50 text-green-300" : "bg-green-100 text-green-700"}`}>Response::error()</code> for consistent error responses.
              Include meaningful error messages and validation details to help API consumers debug issues.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className={darkMode ? "text-green-400" : "text-green-700"}>HTTP Status Codes</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Return appropriate HTTP status codes:
            </p>
            <div className={`mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs`}>
              <div className={`p-1.5 rounded ${darkMode ? "bg-zinc-800/50" : "bg-gray-100"}`}>
                <code className="font-mono">200 OK</code> - Success
              </div>
              <div className={`p-1.5 rounded ${darkMode ? "bg-zinc-800/50" : "bg-gray-100"}`}>
                <code className="font-mono">201 Created</code> - Resource created
              </div>
              <div className={`p-1.5 rounded ${darkMode ? "bg-zinc-800/50" : "bg-gray-100"}`}>
                <code className="font-mono">400 Bad Request</code> - Invalid request
              </div>
              <div className={`p-1.5 rounded ${darkMode ? "bg-zinc-800/50" : "bg-gray-100"}`}>
                <code className="font-mono">404 Not Found</code> - Resource not found
              </div>
              <div className={`p-1.5 rounded ${darkMode ? "bg-zinc-800/50" : "bg-gray-100"}`}>
                <code className="font-mono">422 Unprocessable Entity</code> - Validation errors
              </div>
              <div className={`p-1.5 rounded ${darkMode ? "bg-zinc-800/50" : "bg-gray-100"}`}>
                <code className="font-mono">500 Internal Server Error</code> - Server error
              </div>
            </div>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className={darkMode ? "text-green-400" : "text-green-700"}>Security First</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Never trust user input. Always:
            </p>
            <ul className={`mt-2 space-y-1 text-sm ml-5 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                <span>Validate data through Entity attributes</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                <span>Hash passwords using <code className="font-mono">password_hash()</code> in <code className="font-mono">beforeSave()</code></span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                <span>Use parameter binding in queries (Rocket does this automatically)</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                <span>Hide sensitive data with <code className="font-mono">#[Column(hidden: true)]</code></span>
              </li>
            </ul>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className={darkMode ? "text-green-400" : "text-green-700"}>Consistent API Responses</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Use <code className={`font-mono px-1 mx-1 rounded ${darkMode ? "bg-zinc-800/50 text-green-300" : "bg-green-100 text-green-700"}`}>Response::success()</code> helper to maintain a consistent response structure:
            </p>
            <div className={`mt-2 p-2 rounded text-xs font-mono ${darkMode ? "bg-zinc-800" : "bg-gray-100"}`}>
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
            <strong className={darkMode ? "text-green-400" : "text-green-700"}>Keep Actions Focused</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Actions should handle HTTP concerns (request/response). Keep business logic in Entities:
            </p>
            <ul className={`mt-2 space-y-1 text-sm ml-5 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                <span>Entities: Validation rules, computed properties, lifecycle hooks</span>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-3 h-3 mt-1 flex-shrink-0" />
                <span>Actions: Request handling, response formatting, orchestration</span>
              </li>
            </ul>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className={darkMode ? "text-green-400" : "text-green-700"}>Use LuxidAction for Filtering</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Extend <code className="font-mono">LuxidAction</code> to get automatic filtering, pagination, and sorting:
            </p>
            <pre
              className={`mt-2 p-3 rounded text-xs font-mono whitespace-pre-wrap border ${darkMode
                ? "bg-zinc-900 text-zinc-200 border-zinc-700"
                : "bg-gray-100 text-gray-800 border-gray-200"
                }`}
            >
              {`protected array $filters = [
    'status' => ['column' => 'status'],
    'search' => ['column' => ['title', 'description'], 'operator' => 'LIKE']
];`}
            </pre>
            <p className={`text-xs mt-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
              Then use <code className="font-mono">?status=pending&search=work</code> in your API calls.
            </p>
          </div>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className={darkMode ? "text-green-400" : "text-green-700"}>Database Indexes</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Add indexes to columns used in WHERE, ORDER BY, and JOIN clauses for better performance:
            </p>
            <pre
              className={`mt-2 p-3 rounded text-xs font-mono whitespace-pre-wrap border ${darkMode
                ? "bg-zinc-900 text-zinc-200 border-zinc-700"
                : "bg-gray-100 text-gray-800 border-gray-200"
                }`}
            >
              {`$column->string('email')->unique()->index();
$column->string('status')->index();`}
            </pre>
          </div>
        </li>
      </ul>

      <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'}`}>
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-500 flex-shrink-0" />
          <div className="flex-1">
            <strong className={darkMode ? "text-yellow-400" : "text-yellow-700"}>Remember</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Good APIs are predictable, secure, and well-documented. Follow these practices to build
              professional applications that are easy to maintain and scale.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
