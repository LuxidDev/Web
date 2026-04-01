import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle,
} from "lucide-react";
import CodeExample from "@/components/CodeExample";
import InlineCodeExample from "@/components/InlineCodeExample";

export default function DefineRoutesTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      <div
        className={`mb-8 p-6 rounded-2xl ${darkMode
            ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
            : "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200"
          }`}
      >
        <div className="flex items-start gap-4">
          <div>
            <p
              className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}
            >
              Actions are where you handle HTTP requests. <br />
              Create
              <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                app/Actions/TodoAction.php
              </code>{" "}
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
        title="app/Actions/TodoAction.php"
        explanation=""
      />

      <h3 className="text-2xl font-bold mb-4">Route Features:</h3>

      <ul className="mt-4 space-y-3">
        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
          <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>Fluent API: </strong>
            Each method handles a specific HTTP verb
          </span>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
          <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>Named Routes: </strong>
            First parameter names the route for easy reference
          </span>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
          <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>Method Binding: </strong>
            <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
              uses()
            </code>{" "}
            connects to specific Action class and method
          </span>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
          <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>Route Parameters: </strong>
            Use
            <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
              {"{id}"}
            </code>{" "}
            connects to specific Action class and method
          </span>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
          <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>open(): </strong>
            Marks route as publicly accessible (no authentication needed)
          </span>
        </li>
      </ul>
    </>
  );
}
