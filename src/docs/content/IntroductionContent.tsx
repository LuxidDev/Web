import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Database,
  Terminal,
  Shield,
  Route,
  FileCode,
  Server,
} from "lucide-react";
import ArchitectureDiagram from "../components/ArchitectureDiagram";
import CodeExample from "@/components/CodeExample";

export default function IntroductionContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div
        className={`mb-8 p-6 rounded-2xl ${darkMode
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
              Luxid (pronounced "Lucid" with an X) is a modern, lightweight PHP framework designed with
              <strong> clarity and simplicity</strong> at its core. Built for developers who value explicit control and minimal magic,
              Luxid introduces the <strong>AVE Architecture</strong>
              — a refreshing approach that makes your code intuitive and maintainable.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className={`px-3 py-1 rounded-full ${darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"}`}>
                <strong>Version:</strong> 0.7.1
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

      <h2 className="text-3xl font-bold mb-6">What is AVE Architecture?</h2>

      <div className={`mb-8 p-5 rounded-xl ${darkMode ? "bg-zinc-900/50" : "bg-zinc-50"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className={`p-4 rounded-lg ${darkMode ? "bg-purple-500/10 border border-purple-500/20" : "bg-purple-50 border border-purple-200"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-purple-500/20" : "bg-purple-100"}`}>
                <Server className={`w-5 h-5 ${darkMode ? "text-purple-300" : "text-purple-600"}`} />
              </div>
              <h3 className="font-bold text-lg">Actions</h3>
            </div>
            <p className={darkMode ? "text-zinc-300 text-sm" : "text-zinc-700 text-sm"}>
              Build powerful request handlers using action classes. Process input, interact with entities, apply filters, and return structured responses, all with built-in middleware support.
            </p>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-blue-500/10 border border-blue-500/20" : "bg-blue-50 border border-blue-200"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-blue-500/20" : "bg-blue-100"}`}>
                <FileCode className={`w-5 h-5 ${darkMode ? "text-blue-300" : "text-blue-600"}`} />
              </div>
              <h3 className="font-bold text-lg">Views</h3>
            </div>
            <p className={darkMode ? "text-zinc-300 text-sm" : "text-zinc-700 text-sm"}>
              Create dynamic UIs with <strong>Nova</strong> using a component-driven approach. Define state and render views with plain PHP, enabling clean, reactive interfaces without leaving the backend.
            </p>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-green-500/10 border border-green-500/20" : "bg-green-50 border border-green-200"}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-green-500/20" : "bg-green-100"}`}>
                <Database className={`w-5 h-5 ${darkMode ? "text-green-300" : "text-green-600"}`} />
              </div>
              <h3 className="font-bold text-lg">Entities</h3>
            </div>
            <p className={darkMode ? "text-zinc-300 text-sm" : "text-zinc-700 text-sm"}>
              Model your data with PHP attributes and a modern Active Record approach. Extend a base entity and instantly gain CRUD operations, schema mapping, and built-in validation, no boilerplate required.
            </p>
          </div>

        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">Core Features</h2>

      <div className="grid grid-cols-1 gap-6 mb-8">
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
php juice gen:action TodoAction

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
              <h3 className="font-bold text-lg">Rocket-ORM</h3>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Simple yet powerful ORM with validation, relationships, and automatic timestamps.
              </p>
            </div>
          </div>
          <CodeExample
            code={`<?php

use LuxidORMUserEntity;
use RocketAttributesEntity as EntityAttr;
use RocketAttributesColumn;
use RocketAttributesRulesRequired;
use RocketAttributesRulesEmail;
use RocketAttributesRulesMin;
use RocketAttributesRulesUnique;

#[EntityAttr(table: 'users')]
class User extends UserEntity
{
  #[Column(primary: true, autoIncrement: true)]
  public int $id = 0;

  #[Column]
  #[Required]
  #[Email]
  #[Unique]
  public string $email = '';

  #[Column(hidden: true)]
  #[Required]
  #[Min(8)]
  public string $password = '';

  #[Column]
  #[Required]
  public string $firstname = '';

  #[Column]
  #[Required]
  public string $lastname = '';

  #[Column(autoCreate: true)]
  public string $created_at = '';

  #[Column(autoCreate: true, autoUpdate: true)]
  public string $updated_at = '';

  public function getDisplayName(): string
  {
    return trim($this->firstname . ' ' . $this->lastname) ?: $this->email;
  }
}`}
            language="php"
            compact={true}
          />
        </div>

        <div className={`p-5 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-white border border-zinc-200"}`}>
          <div className="flex items-start gap-3 mb-4">
            <div className={`p-2 rounded-lg ${darkMode ? "bg-purple-500/20" : "bg-purple-100"}`}>
              <Route className={`w-6 h-6 ${darkMode ? "text-purple-300" : "text-purple-600"}`} />
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

use App\\Actions\\TodoAction;

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
// Luxid Framework - Entry Point

require_once __DIR__ . '/../vendor/autoload.php';

use Luxid\Foundation\Application;
use Luxid\Nova\Compiler;
use Rocket\Connection\Connection;

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

// Load configuration
$config = require_once __DIR__ . '/../config/config.php';

// Initialize Rocket connection
if (isset($config['db'])) {
  Connection::initialize($config['db']);
  // Store connection in app container
  $config['rocket_connection'] = Connection::getInstance();
}

// Configure Nova if available
if (class_exists('Luxid\Nova\Compiler')) {
  $novaConfig = __DIR__ . '/../nova/nova.json';
  if (file_exists($novaConfig)) {
    $novaSettings = json_decode(file_get_contents($novaConfig), true);

    if ($novaSettings['compiler']['cache']['enabled'] ?? false) {
      Compiler::setCachePath($novaSettings['compiler']['cache']['path']);
      Compiler::enableDebug($novaSettings['compiler']['cache']['debug'] ?? false);
    }
  }
}

// Load Nova components
$novaBase = __DIR__ . '/../nova';
$directories = ['components', 'pages', 'layouts'];
foreach ($directories as $dir) {
  $path = $novaBase . '/' . $dir;
  if (is_dir($path)) {
    $files = glob($path . '/*.nova.php');
    foreach ($files as $file) {
      require_once $file;
    }

    // Handle subdirectories (for nested pages)
    $subDirs = glob($path . '/*', GLOB_ONLYDIR);
    foreach ($subDirs as $subDir) {
      $subFiles = glob($subDir . '/*.nova.php');
      foreach ($subFiles as $file) {
        require_once $file;
      }
    }
  }
}

// Load Nova helpers
$helpersPath = $novaBase . '/helpers';
if (is_dir($helpersPath)) {
  $helpers = glob($helpersPath . '/*.php');
  foreach ($helpers as $file) {
    require_once $file;
  }
}

// Create application instance
$app = new Application(dirname(__DIR__), $config);

// Load routes
require_once __DIR__ . '/../routes/api.php';
require_once __DIR__ . '/../routes/web.php';

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

    if (isset($this->routes[$method][$path])) {
      $route = $this->routes[$method][$path];
      $callback = $route['callback'];
      $params = [];
      $matchedRoutePath = $path;
    } else {
      // Try to find a parameterized route match
      $foundRoute = null;
      $params = [];
      $matchedRoutePath = null;

      foreach ($this->routes[$method] as $routePath => $routeData) {
        // Only check routes with parameters
        if (strpos($routePath, '{') === false) {
          continue;
        }

        // Try to extract parameters using the ROUTE PATTERN
        $extractedParams = $this->extractRouteParams($routePath);
        if (!empty($extractedParams)) {
          $foundRoute = $routeData;
          $params = $extractedParams;
          $matchedRoutePath = $routePath;
          break;
        }
      }

      if (!$foundRoute) {
        throw new NotFoundException();
      }

      $route = $foundRoute;
      $callback = $route['callback'];
    }

    // Determine if this is an API request
    $isApiRequest = strpos($path, '/api/') === 0 ||
      (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false) ||
      (isset($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false);

    // Run global middleware (for all requests)
    foreach ($this->globalMiddleware as $middleware) {
      $middleware->execute();
    }

    // Run API-only global middleware if this is an API request
    if ($isApiRequest) {
      foreach ($this->apiGlobalMiddleware as $middleware) {
        $middleware->execute();
      }
    }

    // Combine flattened route middleware
    $cacheKey = $method . ':' . $path;
    $middlewares = isset($this->flattenedMiddleware[$cacheKey])
      ? array_merge($this->flattenedMiddleware[$cacheKey], $route['middleware'])
      : array_merge($this->middlewareStack, $route['groupMiddleware'] ?? [], $route['middleware']);

    if (is_string($callback)) {
      return Application::$app->screen->renderScreen($callback);
    }

    if (is_array($callback)) {
      // Validate callback class exists and is instantiable
      if (!class_exists($callback[0])) {
        throw new \RuntimeException(
          sprintf('Action class "%s" does not exist', $callback[0])
        );
      }

      if (!is_subclass_of($callback[0], '\\Luxid\\Foundation\\Action')) {
        throw new \RuntimeException(
          sprintf('Class "%s" must extend \\Luxid\\Foundation\\Action', $callback[0])
        );
      }

      $action = new $callback[0]();
      Application::$app->action = $action;
      $action->activity = $callback[1];
      $callback[0] = $action;

      // Execute route middleware
      foreach ($middlewares as $middleware) {
        $middleware->execute();
      }

      // Execute action middleware
      foreach ($action->getMiddlewares() as $middleware) {
        $middleware->execute();
      }
    }
`}
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
                Action processes the request, interacts with Entities via Rocket-ORM, and prepares data for response.
              </p>
              <CodeExample
                code={`<?php
// app/Actions/TodoAction.php

namespace App\Actions;

use App\Actions\LuxidAction;
use App\Entities\Todo;
use Luxid\Nodes\Response;

class TodoAction extends LuxidAction
{
    public function index()
    {
        // Use Rocket-ORM to get data
        $todos = Todo::findAll(['user_id' => $this->user()->id]);

        // Return JSON response or render screen
        return Response::success([
          'todos' => $todos
        ]);
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
return Response::success([
    'message' => 'Todo created'
]);


// Render Nova template (Web)
return Nova::render('Dashboard', [
    'admin' => $admin,
    'title' => 'My Super Admin'
]);`}
                language="php"
                compact={true}
              />
            </div>
          </div>

        </div>
      </div>

    </>
  );
}
