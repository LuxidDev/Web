import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Terminal, CheckCircle, AlertCircle } from "lucide-react";
import InlineCodeExample from "@/components/InlineCodeExample";
import CodeExample from "@/components/CodeExample"; // Fixed import path

export default function QuickStartExample() {
  const { darkMode } = useTheme();

  return (
    <div
      className={`my-8 rounded-2xl overflow-hidden ${
        darkMode
          ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
          : "bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              darkMode ? "bg-green-500/20" : "bg-green-100"
            }`}
          >
            <CheckCircle
              className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`}
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Quick Start Example</h3>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              Build a complete TODO application in minutes
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <div>
            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  darkMode
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100 text-blue-600"
                }`}
              >
                1
              </span>
              Create Todo Entity
            </h4>
            <CodeExample
              code={`<?php
namespace App\\Entities;

use Luxid\\Database\\DbEntity;

class Todo extends DbEntity
{
    public int $id = 0;
    public string $title = '';
    public string $description = '';
    public bool $completed = false;
    public string $created_at = '';
    public string $updated_at = '';

    public static function tableName(): string
    {
        return 'todos';
    }

    public static function primaryKey(): string
    {
        return 'id';
    }

    public function attributes(): array
    {
        return ['title', 'description', 'completed', 'created_at', 'updated_at'];
    }

    public function save(): bool
    {
        if ($this->id === 0) {
            $this->created_at = date('Y-m-d H:i:s');
        }
        $this->updated_at = date('Y-m-d H:i:s');
        return parent::save();
    }
}`}
              title="app/Entities/Todo.php"
              explanation="Entity class representing a todo item in the database. Extends DbEntity for automatic CRUD operations."
            />
          </div>

          {/* Step 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  darkMode
                    ? "bg-purple-500 text-white"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                2
              </span>
              Create Todo Action
            </h4>
            <CodeExample
              code={`<?php
namespace App\\Actions;

use App\\Entities\\Todo;

class TodoAction extends \\Luxid\\Foundation\\Action
{
    public function index()
    {
        $todos = Todo::findAll([], 'created_at DESC');
        return $this->success(['todos' => $todos]);
    }

    public function store()
    {
        $data = $this->request()->getBody();

        $todo = new Todo();
        $todo->loadData($data);

        if ($todo->save()) {
            return $this->success(['todo' => $todo], 'Todo created successfully', 201);
        }

        return $this->error('Failed to create todo', $todo->errors);
    }

    public function update($id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return $this->error('Todo not found', null, 404);
        }

        $data = $this->request()->getBody();
        $todo->loadData($data);

        if ($todo->save()) {
            return $this->success(['todo' => $todo]);
        }

        return $this->error('Failed to update todo', $todo->errors);
    }

    public function destroy($id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return $this->error('Todo not found', null, 404);
        }

        if ($todo->delete()) {
            return $this->success(null, 'Todo deleted successfully');
        }

        return $this->error('Failed to delete todo');
    }
}`}
              title="app/Actions/TodoAction.php"
              explanation="Action class handling HTTP requests for todo operations. Uses the ActionHelpers trait for convenient response methods."
            />
          </div>

          {/* Step 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  darkMode
                    ? "bg-green-500 text-white"
                    : "bg-green-100 text-green-600"
                }`}
              >
                3
              </span>
              Add Routes
            </h4>
            <CodeExample
              code={`<?php
// routes/api.php

use App\\Actions\\TodoAction;

$router->get('/todos', [TodoAction::class, 'index']);
$router->post('/todos', [TodoAction::class, 'store']);
$router->put('/todos/{id}', [TodoAction::class, 'update']);
$router->delete('/todos/{id}', [TodoAction::class, 'destroy']);`}
              title="routes/api.php"
              explanation="Define RESTful routes for the todo API. The router automatically injects request parameters."
            />
          </div>

          {/* Bonus: Using Juice CLI */}
          <div
            className={`p-4 rounded-lg ${
              darkMode
                ? "bg-zinc-800/50 border border-zinc-700"
                : "bg-zinc-100 border border-zinc-300"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Terminal
                className={`w-5 h-5 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}
              />
              <h4 className="font-semibold">Pro Tip: Use Juice CLI</h4>
            </div>
            <p
              className={`text-sm mb-2 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              Generate all of this automatically with:
            </p>
            <InlineCodeExample
              code="php juice make:api Todo"
              title="Juice CLI Command"
              description="This single command generates Entity, Action, Migration, and Routes for a complete CRUD API."
              icon={Terminal}
              color="yellow"
              language="bash"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
