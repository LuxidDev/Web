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
          ? "bg-gray-900/50 border border-gray-800"
          : "bg-gray-50 border border-gray-200"
          }`}
      >
        <div className="flex items-start gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Todo CRUD Actions</h3>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Actions handle HTTP requests and orchestrate your application logic.
              Create a complete REST API for your Todo entity with filtering, bulk operations, and statistics.
            </p>
          </div>
        </div>
      </div>

      <div className={`mb-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          Creating the Todo Action
        </h3>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Actions extend <strong className={darkMode ? "text-white font-mono" : "font-mono"}>LuxidAction</strong> and provide methods for each endpoint.
          Create <strong className={darkMode ? "text-white font-mono" : "font-mono"}>app/Actions/TodoAction.php</strong> with the following complete CRUD implementation.
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
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          Understanding Action Methods
        </h3>

        <div className="space-y-4">
          {/* CRUD Methods */}
          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              Standard CRUD Methods
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>index()</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  GET /api/todos - Lists all todos with automatic filtering support
                </p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>show($id)</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  GET /api/todos/{'{id}'} - Returns a single todo by ID
                </p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>store()</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  POST /api/todos - Creates a new todo with validation
                </p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>update($id)</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  PUT /api/todos/{'{id}'} - Updates an existing todo
                </p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>destroy($id)</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  DELETE /api/todos/{'{id}'} - Removes a todo
                </p>
              </div>
            </div>
          </div>

          {/* Advanced Features */}
          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              Advanced Features
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>getEntityClass()</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Specifies which Entity this action works with, enabling automatic filtering capabilities
                </p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>$filters</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Defines automatic filtering rules - status filter and search across title/description
                </p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>getFilteredResults()</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Applies query parameters automatically (e.g., <strong className={darkMode ? "text-white font-mono" : "font-mono"}>?status=pending&search=work</strong>)
                </p>
              </div>
            </div>
          </div>

          {/* Bulk Operations */}
          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              Bulk Operations & Statistics
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>bulkUpdateStatus()</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  PATCH /api/todos/bulk-status - Updates multiple todos at once, returns success/failure counts
                </p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>stats()</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  GET /api/todos/stats - Returns aggregated data: totals by status and completion rate
                </p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>calculateCompletionRate()</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Private helper that computes the percentage of completed todos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Concepts Explained */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          Core Action Concepts
        </h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
            <div>
              <strong className="text-gray-900 dark:text-white">HTTP Methods = Action Methods</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Each public method in your Action corresponds to an endpoint. The method name determines the HTTP verb:
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>index()</strong> (GET list), <strong className={darkMode ? "text-white font-mono" : "font-mono"}>show()</strong> (GET single),
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>store()</strong> (POST), <strong className={darkMode ? "text-white font-mono" : "font-mono"}>update()</strong> (PUT),
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>destroy()</strong> (DELETE). URL paramete00rs like <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'{id}'}</strong> are passed as method arguments.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
            <div>
              <strong className="text-gray-900 dark:text-white">Request Object</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'$this->request()'}</strong> to access request data:
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>input()</strong> - Get all POST/PUT request body data</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>query()</strong> - Get URL query parameters</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>files()</strong> - Access uploaded files</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>headers()</strong> - Get request headers</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
            <div>
              <strong className="text-gray-900 dark:text-white">Response Helpers</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Consistent JSON responses with proper HTTP status codes:
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>Response::success($data, $statusCode = 200)</strong> - Success response with optional status code</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>Response::error($message, $errors = null, $statusCode = 400)</strong> - Error response with details</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
            <div>
              <strong className="text-gray-900 dark:text-white">Entity Integration</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Actions work directly with your Entities. Use Entity methods for database operations:
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>Todo::find($id)</strong> - Retrieve a todo by ID</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>new Todo()</strong> - Create a new todo instance</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'$todo->save()'}</strong> - Persist to database</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'$todo->delete()'}</strong> - Remove from database</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'Todo::query()'}</strong> - Use query builder for complex queries</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
            <div>
              <strong className="text-gray-900 dark:text-white">Validation</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Validation is handled at the Entity level. Call <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'$todo->validate()'}</strong> before saving:
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <p>• Returns <strong className={darkMode ? "text-white font-mono" : "font-mono"}>true</strong> if data is valid</p>
                <p>• Returns <strong className={darkMode ? "text-white font-mono" : "font-mono"}>false</strong> and populates <code className="font-mono">{'$todo->getErrors()'}</code> with validation messages</p>
                <p>• Automatically validates rules defined in Entity with PHP 8 attributes</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
            <div>
              <strong className="text-gray-900 dark:text-white">Automatic Filtering</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                The <strong className={darkMode ? "text-white font-mono" : "font-mono"}>$filters</strong> array enables automatic query parameter filtering:
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>?status=pending</strong> - Filters todos by status</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>?search=groceries</strong> - Searches across title and description</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>?status=pending&search=work</strong> - Combines multiple filters</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Example API Usage */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          Example API Usage
        </h3>
        <div className="space-y-3">
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Create a todo:</h4>
            <strong className="block text-sm p-2 rounded bg-black/10 dark:text-white font-mono">
              curl -X POST http://localhost:8000/api/todos <br />
              &nbsp;&nbsp;-H "Content-Type: application/json" <br />
              &nbsp;&nbsp;-d {'{"title": "Learn Luxid", "description": "Master the framework"}'}
            </strong>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Filter todos by status:</h4>
            <strong className="block text-sm p-2 rounded bg-black/10 dark:text-white font-mono">
              curl "http://localhost:8000/api/todos?status=pending&search=Luxid"
            </strong>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Bulk update todos:</h4>
            <strong className="block text-sm p-2 rounded bg-black/10 dark:text-white font-mono">
              curl -X PATCH http://localhost:8000/api/todos/bulk-status <br />
              &nbsp;&nbsp;-H "Content-Type: application/json" <br />
              &nbsp;&nbsp;-d {'{"todo_ids": [1,2,3], "status": "completed"}'}
            </strong>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Get statistics:</h4>
            <strong className="block text-sm p-2 rounded bg-black/10 dark:text-white font-mono">
              curl http://localhost:8000/api/todos/stats
            </strong>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
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
            <span>Use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>getEntityClass()</strong> and <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'$filters'}</strong> for automatic filtering</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Always validate data before saving (use entity's <strong className={darkMode ? "text-white font-mono" : "font-mono"}>validate()</strong> method)</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Return consistent responses using <strong className={darkMode ? "text-white font-mono" : "font-mono"}>Response::success()</strong> and <strong className={darkMode ? "text-white font-mono" : "font-mono"}>Response::error()</strong></span>
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
