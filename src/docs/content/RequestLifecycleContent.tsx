import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Cpu, Package, Layers, Code,
  Terminal, Download, ArrowRight,
  CheckCircle, AlertCircle, Server,
  Database, FileCode, Globe, Shield,
  Zap, GitBranch, Workflow, Clock
} from 'lucide-react';
import CodeExample from '@/components/CodeExample';
import InlineCodeExample from '@/components/InlineCodeExample';

export default function RequestLifecycleContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${darkMode ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20" : "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200"}`}>
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3">Request Lifecycle</h1>
            <p className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
              Understanding how Luxid processes HTTP requests from arrival to response. Every request follows a predictable path through the framework's core components.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Complete Request Journey</h2>

      {/* Main Flow Visualization */}
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-zinc-900 border border-zinc-800" : "bg-zinc-100 border border-zinc-300"}`}>
        <div className="flex flex-col items-center">
          {/* Flow Steps */}
          <div className="w-full space-y-8">

            {/* Step 1: HTTP Request */}
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"}`}>Step 1</span>
                  HTTP Request Arrives
                </h3>
                <p className={`mb-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  The request hits <code>web/index.php</code> which bootstraps the application, loads environment variables, and creates the Application instance.
                </p>
                <CodeExample
                  code={`<?php
// web/index.php - Entry Point
require_once __DIR__ . '/../vendor/autoload.php';

use Luxid\\Foundation\\Application;

// 1. Load environment
$dotenv = Dotenv\\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

// 2. Load configuration
$config = require __DIR__ . '/../config/config.php';

// 3. Create Application instance
$app = new Application(dirname(__DIR__), $config);

// 4. This creates:
//    - Router with Request/Response
//    - Database connection
//    - Session management
//    - Screen renderer`}
                  language="php"
                  compact={true}
                />
              </div>
            </div>

            {/* Step 2: Application Boot */}
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? "bg-green-500/20 text-green-300" : "bg-green-100 text-green-700"}`}>Step 2</span>
                  Application Bootstrapping
                </h3>
                <p className={`mb-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  The Application constructor sets up all core components and loads the authenticated user if session exists.
                </p>
                <CodeExample
                  code={`<?php
// Engine/Foundation/Application.php
public function __construct($rootPath, array $config)
{
    self::$ROOT_DIR = $rootPath;
    self::$app = $this;

    // Core components initialization
    $this->request = new Request();
    $this->response = new Response();
    $this->session = new Session();
    $this->router = new Router($this->request, $this->response);
    $this->screen = new Screen();

    // Database connection
    if (isset($config['db'])) {
        $this->db = new Database($config['db']);
    }

    // User authentication from session
    $primaryValue = $this->session->get('user');
    if ($primaryValue !== null) {
        $primaryKey = $this->userClass::primaryKey();
        $this->user = $this->userClass::findOne([$primaryKey => $primaryValue]);
    }
}`}
                  language="php"
                  compact={true}
                />
              </div>
            </div>

            {/* Step 3: Route Loading */}
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-700"}`}>Step 3</span>
                  Route File Loading
                </h3>
                <p className={`mb-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Routes are loaded from <code>routes/api.php</code>, registering all endpoint definitions with the Router.
                </p>
                <CodeExample
                  code={`<?php
// routes/api.php - Route definitions
require_once __DIR__ . '/../routes/api.php';

// Example routes using Luxid's fluent API:
route('welcome')
    ->get('/')
    ->uses(WelcomeAction::class, 'index')
    ->open();

route('todos')
    ->get('/todos')
    ->uses(TodoAction::class, 'index')
    ->auth();

// The route() helper creates RouteBuilder instances
// which register routes with the Router`}
                  language="php"
                  compact={true}
                />
              </div>
            </div>

            {/* Step 4: Router Resolution */}
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? "bg-yellow-500/20 text-yellow-300" : "bg-yellow-100 text-yellow-700"}`}>Step 4</span>
                  Router Matching & Execution
                </h3>
                <p className={`mb-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Router finds the matching route, executes middleware, and calls the Action method.
                </p>
                <CodeExample
                  code={`<?php
// Engine/Routing/Router.php
public function resolve()
{
    $path = $this->request->getPath();
    $method = $this->request->method();

    // 1. Find matching route
    if (isset($this->routes[$method][$path])) {
        $route = $this->routes[$method][$path];
    } else {
        // Try parameterized route matching
        foreach ($this->routes[$method] as $routePath => $routeData) {
            if (strpos($routePath, '{') !== false) {
                $params = $this->extractRouteParams($routePath);
                if (!empty($params)) {
                    $route = $routeData;
                    break;
                }
            }
        }
    }

    if (!isset($route)) {
        throw new NotFoundException();
    }

    $callback = $route['callback'];

    // 2. Execute middleware
    foreach ($route['middleware'] as $middleware) {
        $middleware->execute();
    }

    // 3. Execute Action method
    if (is_array($callback)) {
        $action = new $callback[0]();
        Application::$app->action = $action;
        $action->activity = $callback[1];
        $callback[0] = $action;
    }

    return call_user_func($callback, $this->request, $this->response);
}`}
                  language="php"
                  compact={true}
                />
              </div>
            </div>

            {/* Step 5: Action Processing */}
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? "bg-red-500/20 text-red-300" : "bg-red-100 text-red-700"}`}>Step 5</span>
                  Action Method Execution
                </h3>
                <p className={`mb-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  The Action method runs business logic, interacts with Entities, and prepares the response.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CodeExample
                    code={`<?php
// Simple Action Example
class TodoAction extends Action
{
    public function index()
    {
        // Get current user
        $userId = $this->user()->id;

        // Query database using Entity
        $todos = Todo::findAll([
            'user_id' => $userId,
            'completed' => false
        ]);

        // Return JSON response
        return $this->response()->success([
            'todos' => $todos,
            'count' => count($todos)
        ]);
    }
}`}
                    language="php"
                    compact={true}
                    title="Simple GET Action"
                  />
                  <CodeExample
                    code={`<?php
// Complex Action with Validation
class AuthAction extends Action
{
    public function register()
    {
        // Get sanitized request data
        $data = $this->request()->getBody();

        // Create and validate Entity
        $user = new User();
        $user->loadData($data);

        if (!$user->validate()) {
            return $this->response()->error(
                'Validation failed',
                $user->errors,
                400
            );
        }

        // Save to database
        if ($user->save()) {
            // Login user
            Application::$app->login($user);

            return $this->response()->success([
                'user' => $user,
                'message' => 'Registration successful'
            ], 201);
        }

        return $this->response()->error(
            'Registration failed',
            null,
            500
        );
    }
}`}
                    language="php"
                    compact={true}
                    title="Complex POST Action"
                  />
                </div>
              </div>
            </div>

            {/* Step 6: Response Handling */}
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-100 text-indigo-700"}`}>Step 6</span>
                  Response Generation
                </h3>
                <p className={`mb-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Response is generated either as JSON (API) or rendered via Nova templates (Web).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">JSON Response (API)</h4>
                    <CodeExample
                      code={`<?php
// Engine/Http/Response.php
public function success($data = null, string $message = 'Success', int $statusCode = 200): string
{
    $this->setStatusCode($statusCode);
    header('Content-Type: application/json');

    return json_encode([
        'success' => true,
        'message' => $message,
        'data' => $data
    ], JSON_PRETTY_PRINT);
}

// In Action:
return $this->response()->success([
    'todos' => $todos,
    'count' => count($todos)
], 'Todos retrieved successfully');`}
                      language="php"
                      compact={true}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">HTML Response (Web)</h4>
                    <CodeExample
                      code={`<?php
// Render Nova template
return $this->nova('todos.index', [
    'todos' => $todos,
    'title' => 'My Todo List',
    'user' => $this->user()
]);

// Engine/Foundation/Action.php
public function nova($screen, $data = [])
{
    return $this->app()->screen->renderScreen($screen, $data);
}

// Screens use simple PHP includes:
// screens/todos/index.nova.php
<h1><?= htmlspecialchars($title) ?></h1>
<?php foreach ($todos as $todo): ?>
    <div class="todo">
        <?= htmlspecialchars($todo->title) ?>
    </div>
<?php endforeach; ?>`}
                      language="php"
                      compact={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 7: Error Handling */}
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? "bg-rose-500/20 text-rose-300" : "bg-rose-100 text-rose-700"}`}>Step 7</span>
                  Error Handling & Cleanup
                </h3>
                <p className={`mb-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                  Any exceptions are caught and converted to proper HTTP error responses.
                </p>
                <CodeExample
                  code={`<?php
// Engine/Foundation/Application.php - run() method
public function run()
{
    try {
        echo $this->router->resolve();
    } catch (\\Exception $e) {
        // Get exception code
        $code = $e->getCode();

        // Validate HTTP status code
        if (!is_int($code) || $code < 100 || $code > 599) {
            $code = $e instanceof \\PDOException ? 500 : 404;
        }

        $this->response->setStatusCode($code);

        // Check if API request
        $path = $this->request->getPath();
        $isApiRequest = strpos($path, '/api/') === 0;

        if ($isApiRequest) {
            // JSON error for API
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage(),
                'code' => $code
            ]);
        } else {
            // HTML error for web
            echo $this->screen->renderScreen('_error', [
                'exception' => $e
            ]);
        }
    }
}`}
                  language="php"
                  compact={true}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Request Lifecycle Visualized</h2>

      {/* Timeline Visualization */}
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-zinc-200 shadow-sm"}`}>
        <div className="relative">
          {/* Timeline line */}
          <div className={`absolute left-6 top-0 bottom-0 w-0.5 ${darkMode ? "bg-zinc-700" : "bg-zinc-300"}`}></div>

          {/* Timeline items */}
          <div className="space-y-10 relative">

            {/* Item 1 */}
            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${darkMode ? "bg-blue-500/20 border-2 border-blue-500/40" : "bg-blue-100 border-2 border-blue-300"}`}>
                <div className={`w-4 h-4 rounded-full ${darkMode ? "bg-blue-400" : "bg-blue-500"}`}></div>
              </div>
              <div className="flex-1">
                <div className={`p-4 rounded-lg ${darkMode ? "bg-blue-500/10 border border-blue-500/20" : "bg-blue-50 border border-blue-200"}`}>
                  <h4 className="font-bold text-lg mb-2">1. HTTP Request</h4>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    Request arrives at <code>web/index.php</code>, starts output buffering, loads Composer autoloader.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${darkMode ? "bg-green-500/20 border-2 border-green-500/40" : "bg-green-100 border-2 border-green-300"}`}>
                <div className={`w-4 h-4 rounded-full ${darkMode ? "bg-green-400" : "bg-green-500"}`}></div>
              </div>
              <div className="flex-1">
                <div className={`p-4 rounded-lg ${darkMode ? "bg-green-500/10 border border-green-500/20" : "bg-green-50 border border-green-200"}`}>
                  <h4 className="font-bold text-lg mb-2">2. Application Setup</h4>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    <code>Application</code> instance created with Router, Request, Response, Session, Database.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${darkMode ? "bg-purple-500/20 border-2 border-purple-500/40" : "bg-purple-100 border-2 border-purple-300"}`}>
                <div className={`w-4 h-4 rounded-full ${darkMode ? "bg-purple-400" : "bg-purple-500"}`}></div>
              </div>
              <div className="flex-1">
                <div className={`p-4 rounded-lg ${darkMode ? "bg-purple-500/10 border border-purple-500/20" : "bg-purple-50 border border-purple-200"}`}>
                  <h4 className="font-bold text-lg mb-2">3. Route Loading</h4>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    <code>routes/api.php</code> loaded, registering all routes with the Router.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${darkMode ? "bg-yellow-500/20 border-2 border-yellow-500/40" : "bg-yellow-100 border-2 border-yellow-300"}`}>
                <div className={`w-4 h-4 rounded-full ${darkMode ? "bg-yellow-400" : "bg-yellow-500"}`}></div>
              </div>
              <div className="flex-1">
                <div className={`p-4 rounded-lg ${darkMode ? "bg-yellow-500/10 border border-yellow-500/20" : "bg-yellow-50 border border-yellow-200"}`}>
                  <h4 className="font-bold text-lg mb-2">4. Router Resolution</h4>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    Router matches URL to route, executes middleware, instantiates Action.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 5 */}
            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${darkMode ? "bg-red-500/20 border-2 border-red-500/40" : "bg-red-100 border-2 border-red-300"}`}>
                <div className={`w-4 h-4 rounded-full ${darkMode ? "bg-red-400" : "bg-red-500"}`}></div>
              </div>
              <div className="flex-1">
                <div className={`p-4 rounded-lg ${darkMode ? "bg-red-500/10 border border-red-500/20" : "bg-red-50 border border-red-200"}`}>
                  <h4 className="font-bold text-lg mb-2">5. Action Execution</h4>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    Action method runs, interacts with Entities via L ORM, processes business logic.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 6 */}
            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${darkMode ? "bg-indigo-500/20 border-2 border-indigo-500/40" : "bg-indigo-100 border-2 border-indigo-300"}`}>
                <div className={`w-4 h-4 rounded-full ${darkMode ? "bg-indigo-400" : "bg-indigo-500"}`}></div>
              </div>
              <div className="flex-1">
                <div className={`p-4 rounded-lg ${darkMode ? "bg-indigo-500/10 border border-indigo-500/20" : "bg-indigo-50 border border-indigo-200"}`}>
                  <h4 className="font-bold text-lg mb-2">6. Response Generation</h4>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    Response generated as JSON or rendered Nova template, proper headers set.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 7 */}
            <div className="flex items-start gap-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${darkMode ? "bg-rose-500/20 border-2 border-rose-500/40" : "bg-rose-100 border-2 border-rose-300"}`}>
                <div className={`w-4 h-4 rounded-full ${darkMode ? "bg-rose-400" : "bg-rose-500"}`}></div>
              </div>
              <div className="flex-1">
                <div className={`p-4 rounded-lg ${darkMode ? "bg-rose-500/10 border border-rose-500/20" : "bg-rose-50 border border-rose-200"}`}>
                  <h4 className="font-bold text-lg mb-2">7. Output & Cleanup</h4>
                  <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                    Response sent to browser, session data saved, output buffer flushed.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Performance Optimizations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`p-5 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-white border border-zinc-200 shadow-sm"}`}>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Shield className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
            Automatic Input Sanitization
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Luxid automatically sanitizes all request data using <code>FILTER_SANITIZE_SPECIAL_CHARS</code>, preventing XSS attacks.
          </p>
          <CodeExample
            code={`<?php
// Engine/Http/Request.php - Automatic sanitization
public function getBody()
{
    if ($this->cachedBody !== null) {
        return $this->cachedBody; // Cached for performance
    }

    $body = [];

    foreach ($_GET as $key => $value) {
        $body[$key] = filter_input(INPUT_GET, $key, FILTER_SANITIZE_SPECIAL_CHARS);
    }

    foreach ($_POST as $key => $value) {
        $body[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
    }

    $this->cachedBody = $body; // Cache results
    return $body;
}`}
            language="php"
            compact={true}
          />
        </div>

        <div className={`p-5 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-white border border-zinc-200 shadow-sm"}`}>
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Zap className={`w-5 h-5 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
            Intelligent Caching
          </h3>
          <p className={`text-sm mb-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
            Request data, parsed JSON, and route parameters are cached to avoid redundant processing.
          </p>
          <CodeExample
            code={`<?php
// Performance optimizations in Luxid:

// 1. Request body cached
private ?array $cachedBody = null;
public function getBody() {
    if ($this->cachedBody !== null) return $this->cachedBody;
    // ... parse and cache
}

// 2. Route parameters pre-flattened
private array $flattenedMiddleware = [];
// Middleware flattened per route for O(1) lookup

// 3. PDO connection reused
public ?Database $db = null;
// Single database connection per request

// 4. Compiled route caching
private array $routeCache = [];
// Parameterized routes cached for fast matching`}
            language="php"
            compact={true}
          />
        </div>
      </div>

      <div className={`p-6 rounded-xl my-8 ${darkMode ? "bg-zinc-900 border border-zinc-800" : "bg-zinc-100 border border-zinc-300"}`}>
        <h3 className="text-xl font-bold mb-4">Key Takeaways</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">For Application Developers</h4>
            <ul className={`space-y-2 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              <li className="flex items-start gap-2">
                <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                <span>All request data is automatically sanitized for security</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                <span>Middleware runs before your Action methods</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                <span>User authentication is handled automatically if session exists</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">For Performance Tuning</h4>
            <ul className={`space-y-2 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              <li className="flex items-start gap-2">
                <Zap className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                <span>Request data is cached to avoid repeated parsing</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                <span>Database connection is reused within the same request</span>
              </li>
              <li className="flex items-start gap-2">
                <Zap className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                <span>Route matching is optimized with caching</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
