import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle, ArrowRight,
} from "lucide-react";
import CodeExample from "@/components/CodeExample";

export default function TodoActionTutorial() {
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
            <h3 className="text-2xl font-bold mb-2">Todo CRUD Actions</h3>
            <p className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
              Actions handle HTTP requests and orchestrate your application logic.
              Create a complete REST API for your Todo entity with filtering, bulk operations, and statistics.
            </p>
          </div>
        </div>
      </div>

      <div className={`mb-6 p-5 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          Creating the Todo Action
        </h3>
        <p className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
          Actions extend <code className="font-mono">LuxidAction</code> and provide methods for each endpoint.
          Create <code className="font-mono">app/Actions/TodoAction.php</code> with the following complete CRUD implementation.
        </p>
      </div>

      <CodeExample
        code={`<?php
namespace App\Actions;

use App\Actions\LuxidAction;
use App\Entities\Todo;
use Luxid\Nodes\Response;

class TodoAction extends LuxidAction
{
  /**
   * Define the entity class for this action
   * This enables automatic filtering and base functionality
   */
  protected function getEntityClass(): string
  {
    return Todo::class;
  }

  /**
   * Define filters for this action
   * Automatically applies to index() method
   * 
   * @var array
   */
  protected array $filters = [
    'status' => [
      'column' => 'status',
      'values' => ['pending', 'in_progress', 'completed'],
    ],
    'search' => [
      'column' => ['title', 'description'],
      'operator' => 'LIKE',
    ],
  ];

  /**
   * Get all todos with filtering
   * GET /api/todos
   * 
   * Query params: ?status=pending&search=work
   * 
   * @return string JSON response with todos and metadata
   */
  public function index(): string
  {
    $todos = $this->getFilteredResults();
    $total = $this->getFilteredCount();

    return Response::success([
      'todos' => $todos,
      'count' => count($todos),
      'total' => $total,
      'filters' => $this->getQueryParams(),
      'meta' => [
        'valid_statuses' => ['pending', 'in_progress', 'completed'],
      ]
    ]);
  }

  /**
   * Get a single todo by ID
   * GET /api/todos/{id}
   * 
   * @param int $id Todo ID
   * @return string JSON response with todo or 404 error
   */
  public function show(int $id): string
  {
    $todo = Todo::find($id);

    if (!$todo) {
      return Response::error("Todo not found", null, 404);
    }

    return Response::success(['todo' => $todo]);
  }

  /**
   * Create a new todo
   * POST /api/todos
   * 
   * Request body: { "title": "Buy groceries", "description": "Milk, eggs, bread" }
   * 
   * @return string JSON response with created todo or validation errors
   */
  public function store(): string
  {
    $data = $this->request()->input();

    if (empty($data['title'])) {
      return Response::error('Validation failed', [
        'title' => ['Title is required']
      ], 422);
    }

    $todo = new Todo();
    $todo->title = $data['title'];
    $todo->description = $data['description'] ?? '';
    $todo->status = $data['status'] ?? 'pending';

    if ($todo->validate() && $todo->save()) {
      return Response::success([
        'todo' => $todo,
        'message' => 'Todo created successfully'
      ], 201);
    }

    return Response::error('Validation failed', $todo->getErrors(), 422);
  }

  /**
   * Update an existing todo
   * PUT /api/todos/{id}
   * 
   * @param int $id Todo ID
   * @return string JSON response with updated todo or validation errors
   */
  public function update(int $id): string
  {
    $todo = Todo::find($id);

    if (!$todo) {
      return Response::error("Todo not found", null, 404);
    }

    $data = $this->request()->input();

    foreach (['title', 'description', 'status'] as $field) {
      if (isset($data[$field])) {
        $todo->$field = $data[$field];
      }
    }

    if ($todo->validate() && $todo->save()) {
      return Response::success([
        'todo' => $todo,
        'message' => 'Todo updated successfully'
      ]);
    }

    return Response::error('Validation failed', $todo->getErrors(), 422);
  }

  /**
   * Delete a todo
   * DELETE /api/todos/{id}
   * 
   * @param int $id Todo ID
   * @return string JSON response confirming deletion
   */
  public function destroy(int $id): string
  {
    $todo = Todo::find($id);

    if (!$todo) {
      return Response::error("Todo not found", null, 404);
    }

    if ($todo->delete()) {
      return Response::success([
        'message' => 'Todo deleted successfully',
        'id' => $id
      ]);
    }

    return Response::error('Failed to delete todo', null, 500);
  }

  /**
   * Bulk update status for multiple todos
   * PATCH /api/todos/bulk-status
   * 
   * Request body: { "todo_ids": [1,2,3], "status": "completed" }
   * 
   * @return string JSON response with update statistics
   */
  public function bulkUpdateStatus(): string
  {
    $data = $this->request()->input();

    if (!isset($data['todo_ids']) || !is_array($data['todo_ids'])) {
      return Response::error('Missing todo_ids array', null, 400);
    }

    if (empty($data['status'])) {
      return Response::error('Missing status', null, 400);
    }

    $status = $data['status'];
    $validStatuses = ['pending', 'in_progress', 'completed'];

    if (!in_array($status, $validStatuses)) {
      return Response::error('Invalid status', [
        'status' => ['Status must be one of: ' . implode(', ', $validStatuses)]
      ], 400);
    }

    $updatedCount = 0;
    $failedIds = [];

    foreach ($data['todo_ids'] as $id) {
      $todo = Todo::find($id);
      if ($todo) {
        $todo->status = $status;
        if ($todo->save()) {
          $updatedCount++;
        } else {
          $failedIds[] = $id;
        }
      } else {
        $failedIds[] = $id;
      }
    }

    return Response::success([
      'message' => "Updated {$updatedCount} todos",
      'updated_count' => $updatedCount,
      'failed_ids' => $failedIds,
      'status' => $status
    ]);
  }

  /**
   * Get todo statistics
   * GET /api/todos/stats
   * 
   * @return string JSON response with counts and completion rate
   */
  public function stats(): string
  {
    return Response::success([
      'total' => Todo::count(),
      'pending' => Todo::query()->where('status', '=', 'pending')->count(),
      'in_progress' => Todo::query()->where('status', '=', 'in_progress')->count(),
      'completed' => Todo::query()->where('status', '=', 'completed')->count(),
      'completion_rate' => $this->calculateCompletionRate(),
    ]);
  }

  /**
   * Calculate the completion rate percentage
   * 
   * @return float Percentage of completed todos (0-100)
   */
  private function calculateCompletionRate(): float
  {
    $total = Todo::count();
    if ($total === 0) {
      return 0;
    }

    $completed = Todo::query()->where('status', '=', 'completed')->count();
    return round(($completed / $total) * 100, 2);
  }
}`}
        title="app/Actions/TodoAction.php"
        explanation="A complete REST API implementation for Todo management with filtering, bulk operations, and statistics."
      />

      {/* Key Concepts Section */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          Understanding Action Methods
        </h3>

        <div className="space-y-4">
          {/* CRUD Methods */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              Standard CRUD Methods
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <code className="font-mono text-blue-500">index()</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  GET /api/todos - Lists all todos with automatic filtering support
                </p>
              </div>
              <div>
                <code className="font-mono text-blue-500">show($id)</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  GET /api/todos/{'{id}'} - Returns a single todo by ID
                </p>
              </div>
              <div>
                <code className="font-mono text-blue-500">store()</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  POST /api/todos - Creates a new todo with validation
                </p>
              </div>
              <div>
                <code className="font-mono text-blue-500">update($id)</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  PUT /api/todos/{'{id}'} - Updates an existing todo
                </p>
              </div>
              <div>
                <code className="font-mono text-blue-500">destroy($id)</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  DELETE /api/todos/{'{id}'} - Removes a todo
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              Advanced Features
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <code className="font-mono text-purple-500">getEntityClass()</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Specifies which Entity this action works with, enabling automatic filtering capabilities
                </p>
              </div>
              <div>
                <code className="font-mono text-purple-500">$filters</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Defines automatic filtering rules - status filter and search across title/description
                </p>
              </div>
              <div>
                <code className="font-mono text-purple-500">getFilteredResults()</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Applies query parameters automatically (e.g., <code className="font-mono">?status=pending&search=work</code>)
                </p>
              </div>
            </div>
          </div>

          {/* Bulk Operations */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              Bulk Operations & Statistics
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <code className="font-mono text-orange-500">bulkUpdateStatus()</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  PATCH /api/todos/bulk-status - Updates multiple todos at once, returns success/failure counts
                </p>
              </div>
              <div>
                <code className="font-mono text-orange-500">stats()</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  GET /api/todos/stats - Returns aggregated data: totals by status and completion rate
                </p>
              </div>
              <div>
                <code className="font-mono text-orange-500">calculateCompletionRate()</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Private helper that computes the percentage of completed todos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Concepts Explained */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-cyan-900/20 border border-cyan-800' : 'bg-cyan-50 border border-cyan-200'}`}>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          Core Action Concepts
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <div>
              <strong className={darkMode ? "text-cyan-400" : "text-cyan-700"}>HTTP Methods = Action Methods</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Each public method in your Action corresponds to an endpoint. The method name determines the HTTP verb:
                <code className="font-mono">index()</code> (GET list), <code className="font-mono">show()</code> (GET single),
                <code className="font-mono">store()</code> (POST), <code className="font-mono">update()</code> (PUT),
                <code className="font-mono">destroy()</code> (DELETE). URL parameters like <code className="font-mono">{'{id}'}</code> are passed as method arguments.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <div>
              <strong className={darkMode ? "text-cyan-400" : "text-cyan-700"}>Request Object</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Use <code className="font-mono">{'$this->request()'}</code> to access request data:
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                <p>• <code className="font-mono">input()</code> - Get all POST/PUT request body data</p>
                <p>• <code className="font-mono">query()</code> - Get URL query parameters</p>
                <p>• <code className="font-mono">files()</code> - Access uploaded files</p>
                <p>• <code className="font-mono">headers()</code> - Get request headers</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <div>
              <strong className={darkMode ? "text-cyan-400" : "text-cyan-700"}>Response Helpers</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Consistent JSON responses with proper HTTP status codes:
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                <p>• <code className="font-mono">Response::success($data, $statusCode = 200)</code> - Success response with optional status code</p>
                <p>• <code className="font-mono">Response::error($message, $errors = null, $statusCode = 400)</code> - Error response with details</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <div>
              <strong className={darkMode ? "text-cyan-400" : "text-cyan-700"}>Entity Integration</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Actions work directly with your Entities. Use Entity methods for database operations:
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                <p>• <code className="font-mono">Todo::find($id)</code> - Retrieve a todo by ID</p>
                <p>• <code className="font-mono">new Todo()</code> - Create a new todo instance</p>
                <p>• <code className="font-mono">{'$todo->save()'}</code> - Persist to database</p>
                <p>• <code className="font-mono">{'$todo->delete()'}</code> - Remove from database</p>
                <p>• <code className="font-mono">{'Todo::query()'}</code> - Use query builder for complex queries</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <div>
              <strong className={darkMode ? "text-cyan-400" : "text-cyan-700"}>Validation</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Validation is handled at the Entity level. Call <code className="font-mono">{'$todo->validate()'}</code> before saving:
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                <p>• Returns <code className="font-mono">true</code> if data is valid</p>
                <p>• Returns <code className="font-mono">false</code> and populates <code className="font-mono">{'$todo->getErrors()'}</code> with validation messages</p>
                <p>• Automatically validates rules defined in Entity with PHP 8 attributes</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <div>
              <strong className={darkMode ? "text-cyan-400" : "text-cyan-700"}>Automatic Filtering</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                The <code className="font-mono">$filters</code> array enables automatic query parameter filtering:
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                <p>• <code className="font-mono">?status=pending</code> - Filters todos by status</p>
                <p>• <code className="font-mono">?search=groceries</code> - Searches across title and description</p>
                <p>• <code className="font-mono">?status=pending&search=work</code> - Combines multiple filters</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Example API Usage */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-orange-900/20 border border-orange-800' : 'bg-orange-50 border border-orange-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          Example API Usage
        </h3>
        <div className="space-y-3">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
            <h4 className="font-bold mb-2">Create a todo:</h4>
            <code className="block text-sm p-2 rounded bg-black/10 font-mono">
              curl -X POST http://localhost:8000/api/todos <br />
              &nbsp;&nbsp;-H "Content-Type: application/json" <br />
              &nbsp;&nbsp;-d {'{"title": "Learn Luxid", "description": "Master the framework"}'}
            </code>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
            <h4 className="font-bold mb-2">Filter todos by status:</h4>
            <code className="block text-sm p-2 rounded bg-black/10 font-mono">
              curl "http://localhost:8000/api/todos?status=pending&search=Luxid"
            </code>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
            <h4 className="font-bold mb-2">Bulk update todos:</h4>
            <code className="block text-sm p-2 rounded bg-black/10 font-mono">
              curl -X PATCH http://localhost:8000/api/todos/bulk-status <br />
              &nbsp;&nbsp;-H "Content-Type: application/json" <br />
              &nbsp;&nbsp;-d {'{"todo_ids": [1,2,3], "status": "completed"}'}
            </code>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-orange-900/30' : 'bg-orange-100'}`}>
            <h4 className="font-bold mb-2">Get statistics:</h4>
            <code className="block text-sm p-2 rounded bg-black/10 font-mono">
              curl http://localhost:8000/api/todos/stats
            </code>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Action Best Practices
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Keep actions focused - one action per resource when possible</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Use <code className="font-mono">getEntityClass()</code> and <code className="font-mono">$filters</code> for automatic filtering</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Always validate data before saving (use entity's <code className="font-mono">validate()</code> method)</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Return consistent responses using <code className="font-mono">Response::success()</code> and <code className="font-mono">Response::error()</code></span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Use appropriate HTTP status codes (200 for success, 201 for created, 404 for not found, 422 for validation errors)</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Keep business logic in Entities, not in Actions</span>
          </li>
        </ul>
      </div>
    </>
  );
}
