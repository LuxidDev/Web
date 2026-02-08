import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle,
} from "lucide-react";
import CodeExample from "@/components/CodeExample";

export default function TodoActionTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      <div
        className={`mb-8 p-6 rounded-2xl ${
          darkMode
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
namespace App\Actions;

use App\Entities\Todo;
use Luxid\Foundation\Action;
use Luxid\Http\Request;
use Luxid\Http\Response;

class TodoAction extends Action
{
    /**
     * Get all todos (with optional filtering)
     * GET /api/todos
     */
    public function index(Request $request, Response $response)
    {
        // Use query() for query parameters
        $status = $request->query('status');
        $search = $request->query('search');

        // Build where conditions
        $where = [];
        if ($status && in_array($status, ['pending', 'in_progress', 'completed'])) {
            $where['status'] = $status;
        }

        // Get todos from database
        $todos = Todo::findAll($where, 'created_at DESC');

        // Search in results
        if ($search) {
            $todos = array_filter($todos, function($todo) use ($search) {
                return stripos($todo->title, $search) !== false ||
                       stripos($todo->description, $search) !== false;
            });
            $todos = array_values($todos);
        }

        // Format for JSON response
        $data = array_map(function ($todo) {
            return $todo->toArray();
        }, $todos);

        return $response->success([
            'todos' => $data,
            'count' => count($data),
            'meta' => [
                'status_filter' => $status,
                'search_term' => $search
            ]
        ]);
    }

    /**
     * Get single todo by ID
     * GET /api/todos/{id}
     */
    public function show(Response $response, $id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return $response->error("Todo with ID $id not found", null, 404);
        }

        return $response->success([
            'todo' => $todo->toArray()
        ]);
    }

    /**
     * Create new todo
     * POST /api/todos
     */
    public function store(Request $request, Response $response)
    {
        $data = $request->input();

        $todo = new Todo();
        $todo->loadData($data);

        if ($todo->validate() && $todo->save()) {
            return $response->success([
                'todo' => $todo->toArray(),
                'message' => 'Todo created successfully'
            ], 201);
        }

        return $response->error('Validation failed', $todo->errors, 422);
    }

    /**
     * Update todo
     * PUT /api/todos/{id}
     */
    public function update(Request $request, Response $response, $id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return $response->error("Todo with ID $id not found", null, 404);
        }

        $data = $request->input();
        $todo->loadData($data);

        if ($todo->validate() && $todo->update()) {
            return $response->success([
                'todo' => $todo->toArray(),
                'message' => 'Todo updated successfully'
            ]);
        }

        return $response->error('Validation failed', $todo->errors, 422);
    }

    /**
     * Delete todo
     * DELETE /api/todos/{id}
     */
    public function destroy(Request $request, Response $response, $id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return $response->error("Todo with ID $id not found", null, 404);
        }

        if ($todo->delete()) {
            return $response->success([
                'message' => 'Todo deleted successfully'
            ]);
        }

        return $response->error('Failed to delete todo', null, 500);
    }

    /**
     * Bulk update status
     * PATCH /api/todos/bulk-status
     */
    public function bulkUpdateStatus(Request $request, Response $response)
    {
        $data = $request->input();

        if (!isset($data['todo_ids']) || !is_array($data['todo_ids']) || !isset($data['status'])) {
            return $response->error('Missing todo_ids array or status', null, 400);
        }

        $status = $data['status'];
        if (!in_array($status, ['pending', 'in_progress', 'completed'])) {
            return $response->error('Invalid status value', null, 400);
        }

        $updatedCount = 0;
        foreach ($data['todo_ids'] as $id) {
            $todo = Todo::find($id);
            if ($todo) {
                $todo->status = $status;
                if ($todo->update()) {
                    $updatedCount++;
                }
            }
        }

        return $response->success([
            'message' => "Updated {$updatedCount} todos",
            'updated_count' => $updatedCount
        ]);
    }
}`}
        title="app/Actions/TodoAction.php"
        explanation=""
      />

    <ul className="mt-4 space-y-3">
        <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>HTTP Methods: </strong>
            Each method handles a specific HTTP verb
            </span>
        </li>

        <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>Request Object: </strong>
            Access query params
            <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                query()
            </code>{" "}
            , body data
            <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                input()
            </code>{" "}, files, etc.
            </span>
        </li>

        <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>Response Object: </strong>
            Use
            <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                success()
            </code>{" "}
            and
            <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                error()
            </code>{" "}
            helpers for consistent JSON responses
            </span>
        </li>

        <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>Entity Integration: </strong>
            Directly use your Todo entity for database operations
            </span>
        </li>

        <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>Validation: </strong>
            Built-in validation through entity's
            <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                validate()
            </code>{" "}
            method
            </span>
        </li>
       </ul>
    </>
  );
}
