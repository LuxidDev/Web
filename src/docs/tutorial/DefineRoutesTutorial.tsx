import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle,
} from "lucide-react";
import CodeExample from "@/components/CodeExample";

export default function DefineRoutesTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      <div
        className={`mb-8 p-6 rounded-2xl ${darkMode
          ? "bg-gray-900/50 border border-gray-800"
          : "bg-gray-50 border border-gray-200"
          }`}
      >
        <div className="flex items-start gap-4">
          <div>
            <p
              className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Routes are where you map incoming HTTP requests and map them to actions that process the request and return a response. <br />
              Find this file here:
              <strong className={`font-mono px-2 py-1 rounded mx-1 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
                routes/api.php
              </strong>
            </p>
          </div>
        </div>
      </div>

      <CodeExample
        code={`<?php
// API routes (JSON responses)

use App\Actions\HealthCheckAction;
use App\Actions\TodoAction;

/**
 * API Routes
 * 
 * All API endpoints return JSON responses.
 * CORS is enabled for cross-origin requests.
 * 
 * Base URL: /api
 */

// Health check endpoint
route('api.health')
  ->get('/api/health')
  ->uses(HealthCheckAction::class, 'index')
  ->open();

// Todo API endpoints
route('api.todos.index')
  ->get('/api/todos')
  ->uses(TodoAction::class, 'index')
  ->open();

route('api.todos.stats')
  ->get('/api/todos/stats')
  ->uses(TodoAction::class, 'stats')
  ->open();

route('api.todos.show')
  ->get('/api/todos/{id}')
  ->uses(TodoAction::class, 'show')
  ->open();

route('api.todos.store')
  ->post('/api/todos')
  ->uses(TodoAction::class, 'store')
  ->open();

route('api.todos.update')
  ->put('/api/todos/{id}')
  ->uses(TodoAction::class, 'update')
  ->open();

route('api.todos.destroy')
  ->delete('/api/todos/{id}')
  ->uses(TodoAction::class, 'destroy')
  ->open();

route('api.todos.bulk-update')
  ->patch('/api/todos/bulk-status')
  ->uses(TodoAction::class, 'bulkUpdateStatus')
  ->open();

`}
        title="routes/api.php"
        explanation=""
      />

      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Route Features:</h3>

      <ul className="mt-4 space-y-3">
        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
            <strong className="text-gray-900 dark:text-white">Fluent API: </strong>
            Each method handles a specific HTTP verb
          </span>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
            <strong className="text-gray-900 dark:text-white">Named Routes: </strong>
            First parameter names the route for easy reference
          </span>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
            <strong className="text-gray-900 dark:text-white">Method Binding: </strong>
            <strong className={`font-mono px-2 py-1 rounded mx-1 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
              uses()
            </strong>
            connects to specific Action class and method
          </span>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
            <strong className="text-gray-900 dark:text-white">Route Parameters: </strong>
            Use
            <strong className={`font-mono px-2 py-1 rounded mx-1 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
              {"{id}"}
            </strong>
            to capture dynamic URL segments
          </span>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
            <strong className="text-gray-900 dark:text-white">open(): </strong>
            Marks route as publicly accessible (no authentication needed)
          </span>
        </li>
      </ul>
    </>
  );
}
