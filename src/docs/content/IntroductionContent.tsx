import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Layers,
  Zap,
  Database,
  Terminal,
  Shield,
  GitBranch,
  FileCode,
  Server,
} from "lucide-react";
import ArchitectureDiagram from "../components/ArchitectureDiagram";
import QuickStartExample from "../components/QuickStartExample";
import CodeExample from "@/components/CodeExample";

export default function IntroductionContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div
        className={`mb-8 p-6 rounded-2xl ${
          darkMode
            ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
            : "bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">Welcome to Luxid Framework</h1>
            <p
              className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-700"} mb-4`}
            >
              Luxid (pronounced "Lucid" with an X) is a modern, lightweight PHP framework designed with <strong>clarity and simplicity</strong> at its core. Built for developers who value explicit control and minimal magic, Luxid introduces the <strong>SEA Architecture</strong> — a refreshing approach that makes your code intuitive and maintainable.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className={`px-3 py-1 rounded-full ${darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
                <strong>Version:</strong> 1.0.0
              </span>
              <span className={`px-3 py-1 rounded-full ${darkMode ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-700"}`}>
                <strong>PHP:</strong> 8.0+
              </span>
              <span className={`px-3 py-1 rounded-full ${darkMode ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-700"}`}>
                <strong>License:</strong> MIT
              </span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">What is SEA Architecture?</h2>

      <div className={`mb-8 p-5 rounded-xl ${darkMode ? "bg-zinc-900/50" : "bg-zinc-50"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-4 rounded-lg ${darkMode ? "bg-blue-500/10 border border-blue-500/20" : "bg-blue-50 border border-blue-200"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                <FileCode className={`w-5 h-5 ${darkMode ? "text-blue-300" : "text-blue-600"}`} />
              </div>
              <h3 className="font-bold text-lg">Screens (Views)</h3>
            </div>
            <p className={darkMode ? "text-zinc-300 text-sm" : "text-zinc-700 text-sm"}>
              Pure presentation logic using <code>.nova.php</code> templates. Simple PHP files that render HTML with data from Actions.
            </p>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-green-500/10 border border-green-500/20" : "bg-green-50 border border-green-200"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-green-500/20" : "bg-green-100"}`}>
                <Database className={`w-5 h-5 ${darkMode ? "text-green-300" : "text-green-600"}`} />
              </div>
              <h3 className="font-bold text-lg">Entities (Models)</h3>
            </div>
            <p className={darkMode ? "text-zinc-300 text-sm" : "text-zinc-700 text-sm"}>
              Active Record pattern with built-in validation. Extend <code>DbEntity</code> for automatic CRUD operations.
            </p>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-purple-500/10 border border-purple-500/20" : "bg-purple-50 border border-purple-200"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-purple-500/20" : "bg-purple-100"}`}>
                <Server className={`w-5 h-5 ${darkMode ? "text-purple-300" : "text-purple-600"}`} />
              </div>
              <h3 className="font-bold text-lg">Actions (Controllers)</h3>
            </div>
            <p className={darkMode ? "text-zinc-300 text-sm" : "text-zinc-700 text-sm"}>
              Request handlers with middleware support. Process HTTP requests, interact with Entities, return responses.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">Core Features</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`p-5 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-white border border-zinc-200"}`}>
          <div className="flex items-start gap-3 mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
              <Terminal className={`w-6 h-6 ${darkMode ? "text-blue-300" : "text-blue-600"}`} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Juice CLI Tool</h3>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Built-in command-line interface for scaffolding, database operations, and project management.
              </p>
            </div>
          </div>
          <CodeExample
            code={`# Start development server
php juice start

# Create new Action
php juice make:action TodoAction

# Run migrations
php juice db:migrate

# List all routes
php juice routes`}
            language="bash"
            compact={true}
          />
        </div>

        <div className={`p-5 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-white border border-zinc-200"}`}>
          <div className="flex items-start gap-3 mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? "bg-green-500/20" : "bg-green-100"}`}>
              <Database className={`w-6 h-6 ${darkMode ? "text-green-300" : "text-green-600"}`} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Active Record ORM</h3>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Simple yet powerful ORM with validation, relationships, and automatic timestamps.
              </p>
            </div>
          </div>
          <CodeExample
            code={`<?php
class User extends DbEntity
{
    public static function tableName(): string {
        return 'users';
    }

    // Automatic CRUD operations
    $user = User::find(1);
    $user->email = 'new@example.com';
    $user->save();`}
            language="php"
            compact={true}
          />
        </div>

        <div className={`p-5 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-white border border-zinc-200"}`}>
          <div className="flex items-start gap-3 mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? "bg-purple-500/20" : "bg-purple-100"}`}>
              <GitBranch className={`w-6 h-6 ${darkMode ? "text-purple-300" : "text-purple-600"}`} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Expressive Routing</h3>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Fluent, action-first routing API with middleware support and parameter validation.
              </p>
            </div>
          </div>
          <CodeExample
            code={`<?php
// routes/api.php
route('todos')
    ->get('/todos')
    ->uses(TodoAction::class, 'index')
    ->open();

route('todo.create')
    ->post('/todos')
    ->uses(TodoAction::class, 'store')
    ->auth();`}
            language="php"
            compact={true}
          />
        </div>

        <div className={`p-5 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-white border border-zinc-200"}`}>
          <div className="flex items-start gap-3 mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? "bg-yellow-500/20" : "bg-yellow-100"}`}>
              <Shield className={`w-6 h-6 ${darkMode ? "text-yellow-300" : "text-yellow-600"}`} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Built-in Security</h3>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Request sanitization, CSRF protection, authentication middleware, and validation.
              </p>
            </div>
          </div>
          <CodeExample
            code={`<?php
// Automatic input sanitization
$data = $request->getBody(); // Already sanitized

// Entity validation
public function rules(): array
{
    return [
        'email' => [self::RULE_REQUIRED, self::RULE_EMAIL],
        'password' => [self::RULE_REQUIRED, [self::RULE_MIN, 'min' => 8]]
    ];
}`}
            language="php"
            compact={true}
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">How Luxid Works</h2>

      <ArchitectureDiagram showFlow={true} />

      <div className={`my-8 p-6 rounded-xl ${darkMode ? "bg-zinc-900 border border-zinc-800" : "bg-zinc-100 border border-zinc-300"}`}>
        <h3 className="text-xl font-bold mb-4">Request Lifecycle</h3>
        <div className="space-y-6">

          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" : "bg-blue-100 text-blue-600 border border-blue-300"}`}>
              1
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">HTTP Request</h4>
              <p className={`mt-2 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Request arrives at <code>web/index.php</code>, bootstraps the Application with configuration and environment variables.
              </p>
              <CodeExample
                code={`<?php
// web/index.php - Main entry point
require_once __DIR__ . '/../vendor/autoload.php';
use Luxid\\Foundation\\Application;

// Load environment
$dotenv = Dotenv\\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

// Create application
$config = require __DIR__ . '/../config/config.php';
$app = new Application(dirname(__DIR__), $config);

// Load routes and run
require_once __DIR__ . '/../routes/api.php';
$app->run();`}
                language="php"
                compact={true}
              />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-green-500/20 text-green-300 border border-green-500/30" : "bg-green-100 text-green-600 border border-green-300"}`}>
              2
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">Router Matching</h4>
              <p className={`mt-2 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Router finds matching route, executes middleware, and instantiates the Action class.
              </p>
              <CodeExample
                code={`<?php
// Engine/Routing/Router.php
public function resolve()
{
    $path = $this->request->getPath();
    $method = $this->request->method();

    // Find route
    $callback = $this->routes[$method][$path]['callback'];

    // Execute middleware
    foreach ($middleware as $mw) {
        $mw->execute();
    }

    // Execute action
    return call_user_func($callback, $this->request, $this->response);
}`}
                language="php"
                compact={true}
              />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : "bg-purple-100 text-purple-600 border border-purple-300"}`}>
              3
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">Action Processing</h4>
              <p className={`mt-2 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Action processes the request, interacts with Entities via L ORM, and prepares data for response.
              </p>
              <CodeExample
                code={`<?php
// app/Actions/TodoAction.php
class TodoAction extends Action
{
    public function index()
    {
        // Use L ORM to get data
        $todos = Todo::findAll(['user_id' => $this->user()->id]);

        // Return JSON response or render screen
        return $this->success(['todos' => $todos]);
    }
}`}
                language="php"
                compact={true}
              />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30" : "bg-yellow-100 text-yellow-600 border border-yellow-300"}`}>
              4
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg">Response Rendering</h4>
              <p className={`mt-2 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Response is rendered as JSON (for APIs) or via Nova templates (for web pages).
              </p>
              <CodeExample
                code={`<?php
// Return JSON (API)
return $this->success(['message' => 'Todo created']);

// Or render Nova template (Web)
return $this->nova('todos.index', [
    'todos' => $todos,
    'title' => 'My Todos'
]);`}
                language="php"
                compact={true}
              />
            </div>
          </div>

        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">Real-World Example</h2>

      <div className="mb-8">
        <CodeExample
          code={`<?php
// Complete Todo API example

// 1. Entity (app/Entities/Todo.php)
class Todo extends DbEntity
{
    public int $id = 0;
    public string $title = '';
    public bool $completed = false;
    public int $user_id = 0;
    public string $created_at = '';

    public static function tableName(): string {
        return 'todos';
    }

    public function rules(): array {
        return [
            'title' => [self::RULE_REQUIRED, [self::RULE_MAX, 'max' => 255]],
            'user_id' => [self::RULE_REQUIRED]
        ];
    }
}

// 2. Action (app/Actions/TodoAction.php)
class TodoAction extends Action
{
    public function index()
    {
        $todos = Todo::findAll(['user_id' => $this->user()->id]);
        return $this->success(['todos' => $todos]);
    }

    public function store()
    {
        $data = $this->request()->getBody();
        $data['user_id'] = $this->user()->id;

        $todo = new Todo();
        $todo->loadData($data);

        if ($todo->validate() && $todo->save()) {
            return $this->success(['todo' => $todo], 201);
        }

        return $this->error('Validation failed', $todo->errors, 400);
    }
}

// 3. Routes (routes/api.php)
route('todos')
    ->get('/todos')
    ->uses(TodoAction::class, 'index')
    ->auth();

route('todo.create')
    ->post('/todos')
    ->uses(TodoAction::class, 'store')
    ->auth();

// 4. Migration (migrations/m00001_create_todos_table.php)
class m00001_create_todos_table
{
    public function apply()
    {
        $sql = "CREATE TABLE todos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            completed BOOLEAN DEFAULT FALSE,
            user_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_user_id (user_id)
        )";

        Application::$app->db->pdo->exec($sql);
    }
}`}
          language="php"
          title="Complete Todo API Implementation"
          explanation="This shows the complete SEA architecture: Entity defines data structure and validation, Action handles HTTP logic, Routes connect endpoints, and Migration creates the database table."
        />
      </div>

      <QuickStartExample />

      <div className={`p-6 rounded-xl my-8 ${darkMode ? "bg-zinc-900 border border-zinc-800" : "bg-zinc-100 border border-zinc-300"}`}>
        <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">For Beginners</h4>
            <ol className={`space-y-2 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              <li className="flex items-start gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-600"}`}>1</span>
                <span>Follow the <a href="/docs/installation" className="underline">Installation Guide</a></span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${darkMode ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-600"}`}>2</span>
                <span>Try the <a href="/docs/tutorial" className="underline">Todo App Tutorial</a></span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${darkMode ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-600"}`}>3</span>
                <span>Explore the <a href="/docs/sea-architecture" className="underline">SEA Architecture</a></span>
              </li>
            </ol>
          </div>
          <div>
            <h4 className="font-bold mb-2">For Experienced Developers</h4>
            <ol className={`space-y-2 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              <li className="flex items-start gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-600"}`}>1</span>
                <span>Check the <a href="/docs/routing-reference" className="underline">API Reference</a></span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${darkMode ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-600"}`}>2</span>
                <span>Explore <a href="/docs/juice-cli" className="underline">Juice CLI Commands</a></span>
              </li>
              <li className="flex items-start gap-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${darkMode ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-600"}`}>3</span>
                <span>Learn about <a href="/docs/middleware" className="underline">Custom Middleware</a></span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}
