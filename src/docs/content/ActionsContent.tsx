import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Zap, Code, ArrowRight, CheckCircle, Terminal, Server } from 'lucide-react';
import CodeExample from '../components/CodeExample';

export default function ActionsContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20'
          : 'bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200'
      }`}>
        <div className="flex items-start gap-4">
          <Zap className={`w-12 h-12 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Actions: The HTTP Layer</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
              Actions handle HTTP requests, process business logic, and return responses.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">What Are Actions?</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
        Actions are Luxid's equivalent of controllers in traditional MVC frameworks. They receive HTTP requests,
        orchestrate business logic using Entities, and return appropriate responses (JSON, HTML, redirects, etc.).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
            darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            <Code className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
          </div>
          <h3 className="text-xl font-bold mb-2">HTTP Request Handlers</h3>
          <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
            Each Action method corresponds to an HTTP endpoint. They handle GET, POST, PUT, PATCH, and DELETE requests.
          </p>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
            darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <Server className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
          </div>
          <h3 className="text-xl font-bold mb-2">Business Logic Orchestrators</h3>
          <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
            Actions coordinate between Entities, validation, authentication, and response formatting.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Basic Action Structure</h3>

      <CodeExample
        code={`<?php
namespace App\\Actions;

use App\\Entities\\Post;
use Luxid\\Foundation\\Application;

class PostAction extends \\Luxid\\Foundation\\Action
{
    /**
     * GET /posts - List all posts
     */
    public function index()
    {
        // 1. Fetch data using Entity
        $posts = Post::findAll([], 'created_at DESC');

        // 2. Return JSON response
        return $this->success(['posts' => $posts]);

        // OR return Nova template:
        // return $this->nova('posts.index', ['posts' => $posts]);
    }

    /**
     * GET /posts/{id} - Show single post
     */
    public function show($id)
    {
        // Route parameter $id is automatically injected
        $post = Post::find($id);

        if (!$post) {
            return $this->error('Post not found', null, 404);
        }

        return $this->success(['post' => $post]);
    }

    /**
     * POST /posts - Create new post
     */
    public function store()
    {
        // Get request data (works with JSON or form data)
        $data = $this->request()->getBody();

        // Create Entity instance
        $post = new Post();
        $post->loadData($data);

        // Set current user as author
        if (Application::$app->user) {
            $post->author = Application::$app->user->getDisplayName();
        }

        // Validate and save
        if ($post->validate() && $post->save()) {
            return $this->success(['post' => $post], 'Post created successfully', 201);
        }

        return $this->error('Validation failed', $post->errors, 400);
    }

    /**
     * PUT /posts/{id} - Update post
     */
    public function update($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return $this->error('Post not found', null, 404);
        }

        $data = $this->request()->getBody();
        $post->loadData($data);

        if ($post->validate() && $post->save()) {
            return $this->success(['post' => $post], 'Post updated successfully');
        }

        return $this->error('Validation failed', $post->errors, 400);
    }

    /**
     * DELETE /posts/{id} - Delete post
     */
    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return $this->error('Post not found', null, 404);
        }

        if ($post->delete()) {
            return $this->success(null, 'Post deleted successfully');
        }

        return $this->error('Failed to delete post', null, 500);
    }
}`}
        title="app/Actions/PostAction.php - Complete CRUD Action"
        explanation="This shows a complete RESTful Action for blog posts with all HTTP methods."
      />

      <h3 className="text-2xl font-bold mb-4 mt-8">Action Helpers</h3>

      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
          The <code>ActionHelpers</code> trait provides convenient methods for common tasks:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">Request & Response Helpers</h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <code>{'$this->request()'}</code> - Access request data
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <code>{'$this->response()'}</code> - Build responses
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <code>{'$this->db()'}</code> - Database access
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <code>{'$this->user()'}</code> - Current authenticated user
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">Response Methods</h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <code>{'$this->success()'}</code> - Return success JSON
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <code>{'$this->error()'}</code> - Return error JSON
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <code>{'$this->json()'}</code> - Return custom JSON
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <code>{'$this->nova()'}</code> - Render Nova template
              </li>
            </ul>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Under the Hood: How Actions Work</h3>

      <CodeExample
        code={`// Engine/Foundation/Action.php - Base Action class
class Action
{
    use ActionHelpers; // Import all helper methods

    public string $frame = 'app'; // Default layout frame
    public string $activity = ''; // Current activity name
    protected array $middlewares = []; // Middleware stack

    // Get the Application instance
    protected function app(): Application
    {
        return Application::$app;
    }

    // Get the Request instance
    protected function request(): Request
    {
        return Application::$app->request;
    }

    // Get the Response instance
    protected function response(): Response
    {
        return Application::$app->response;
    }

    // Get the Database instance
    protected function db(): Database
    {
        return Application::$app->db;
    }

    // Get current authenticated user
    protected function user(): ?DbEntity
    {
        return Application::$app->user;
    }

    // Check if user is guest
    protected function isGuest(): bool
    {
        return Application::isGuest();
    }

    // Send JSON response
    protected function json($data, int $statusCode = 200): string
    {
        $this->response()->setStatusCode($statusCode);
        header('Content-Type: application/json');
        return json_encode($data, JSON_PRETTY_PRINT);
    }

    // Send success response
    protected function success($data = null, string $message = 'Success', int $statusCode = 200): string
    {
        return $this->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $statusCode);
    }

    // Send error response
    protected function error(string $message = 'Error', $errors = null, int $statusCode = 400): string
    {
        return $this->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], $statusCode);
    }

    // Render Nova template
    protected function nova($screen, $data = [])
    {
        return $this->app()->screen->renderScreen($screen, $data);
    }
}`}
        title="Engine/Foundation/Action.php - Core Implementation"
        explanation="The Action base class provides all the helper methods that make writing actions easy and consistent."
      />

      <h3 className="text-2xl font-bold mb-4 mt-8">Advanced Action Patterns</h3>

      <div className="space-y-6">
        {/* Pattern 1: Resource Actions */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
          <h4 className="text-xl font-bold mb-2">Pattern 1: Resource Actions</h4>
          <p className={`mb-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Group related CRUD operations in a single Action class:
          </p>
          <CodeExample
            code={`<?php
namespace App\\Actions;

use App\\Entities\\Product;

class ProductAction extends Action
{
    // RESTful resource methods
    public function index() {}     // GET /products
    public function create() {}    // GET /products/create (form)
    public function store() {}     // POST /products
    public function show($id) {}   // GET /products/{id}
    public function edit($id) {}   // GET /products/{id}/edit
    public function update($id) {} // PUT/PATCH /products/{id}
    public function destroy($id) {} // DELETE /products/{id}

    // Custom actions
    public function search() {}    // GET /products/search
    public function export() {}    // GET /products/export
    public function import() {}    // POST /products/import
}`}
            language="php"
            title="Resource Action Pattern"
            explanation="Group all operations for a resource in one Action class for better organization."
          />
        </div>

        {/* Pattern 2: Single Action Classes */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
          <h4 className="text-xl font-bold mb-2">Pattern 2: Single Action Classes</h4>
          <p className={`mb-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Create focused, single-purpose Action classes:
          </p>
          <CodeExample
            code={`<?php
namespace App\\Actions;

// Each Action handles one specific task
class RegisterUserAction extends Action
{
    public function __invoke()
    {
        // Single responsibility: user registration
        $data = $this->request()->getBody();
        // ... registration logic
    }
}

class LoginUserAction extends Action
{
    public function __invoke()
    {
        // Single responsibility: user login
        $credentials = $this->request()->getBody();
        // ... login logic
    }
}

class LogoutUserAction extends Action
{
    public function __invoke()
    {
        // Single responsibility: user logout
        Application::$app->logout();
        return $this->success(null, 'Logged out successfully');
    }
}`}
            language="php"
            title="Single Action Pattern"
            explanation="Create focused Action classes that do one thing well. Use __invoke() for single-method Actions."
          />
        </div>

        {/* Pattern 3: API Resource Actions */}
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
          <h4 className="text-xl font-bold mb-2">Pattern 3: API Resource Actions</h4>
          <p className={`mb-4 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            Create API-only Actions with JSON responses:
          </p>
          <CodeExample
            code={`<?php
namespace App\\Actions\\Api;

use App\\Entities\\Product;

class ProductApiAction extends Action
{
    // API endpoints return JSON only
    public function index()
    {
        $products = Product::findAll(['active' => true]);
        return $this->success(['products' => $products]);
    }

    public function store()
    {
        $data = $this->request()->getJson();

        $product = new Product();
        $product->loadData($data);

        if ($product->save()) {
            return $this->success(['product' => $product], 'Product created', 201);
        }

        return $this->error('Failed to create product', $product->errors);
    }

    // API-specific methods
    public function bulkUpdate()
    {
        $updates = $this->request()->getJson();

        foreach ($updates as $update) {
            $product = Product::find($update['id']);
            if ($product) {
                $product->loadData($update);
                $product->save();
            }
        }

        return $this->success(null, 'Bulk update completed');
    }

    public function statistics()
    {
        $stats = [
            'total' => Product::count(),
            'active' => Product::count(['active' => true]),
            'inactive' => Product::count(['active' => false]),
        ];

        return $this->success(['statistics' => $stats]);
    }
}`}
            language="php"
            title="API Resource Action Pattern"
            explanation="API-focused Actions that always return JSON and include API-specific functionality."
          />
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4 mt-8">Middleware in Actions</h3>

      <CodeExample
        code={`<?php
namespace App\\Actions;

use Luxid\\Middleware\\AuthMiddleware;

class OrderAction extends Action
{
    protected array $middlewares = [];

    public function __construct()
    {
        // Register middleware for this Action
        $this->registerMiddleware(new AuthMiddleware(['create', 'update', 'destroy']));
    }

    public function index()
    {
        // Public - no auth required
        $orders = Order::findAll();
        return $this->success(['orders' => $orders]);
    }

    public function create()
    {
        // Protected by AuthMiddleware
        $data = $this->request()->getBody();
        // ... create order logic
    }

    // Route-level middleware example
    // In routes/api.php:
    // $router->post('/orders', [OrderAction::class, 'create'])
    //     ->middleware(new AuthMiddleware());`}
        language="php"
        title="Action Middleware"
        explanation="Actions can have their own middleware or use route-level middleware for authentication, validation, etc."
      />

      <h3 className="text-2xl font-bold mb-4">Request Data Handling</h3>

      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">Getting Request Data</h4>
            <CodeExample
              code={`// Get all request data (JSON or form)
$data = $this->request()->getBody();

// Get specific value with default
$name = $this->request()->getBody()['name'] ?? 'Default';

// For JSON API requests
$jsonData = $this->request()->getJson();

// Get query parameters
$page = $_GET['page'] ?? 1;
$limit = $_GET['limit'] ?? 10;

// Get uploaded files
$file = $_FILES['avatar'] ?? null;

// Get headers
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';`}
              language="php"
              title="Accessing Request Data"
              compact
            />
          </div>

          <div>
            <h4 className="font-bold mb-2">Request Validation</h4>
            <CodeExample
              code={`// Validate in Action before passing to Entity
public function store()
{
    $data = $this->request()->getBody();

    // Simple validation
    if (empty($data['title'])) {
        return $this->error('Title is required');
    }

    if (strlen($data['title']) < 3) {
        return $this->error('Title must be at least 3 characters');
    }

    // Use Entity validation (recommended)
    $post = new Post();
    $post->loadData($data);

    if (!$post->validate()) {
        return $this->error('Validation failed', $post->errors);
    }

    // Proceed with business logic
    $post->save();

    return $this->success(['post' => $post]);
}`}
              language="php"
              title="Request Validation Patterns"
              compact
            />
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-xl ${
        darkMode
          ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'
          : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
      }`}>
        <h3 className="text-xl font-bold mb-4">Best Practices for Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Do These
            </h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Keep Actions focused and single-purpose
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Delegate business logic to Entities
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Use Entity validation whenever possible
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Return appropriate HTTP status codes
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Handle errors gracefully with proper messages
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-red-500" />
              Avoid These
            </h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                Don't put SQL queries in Actions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                Avoid fat Actions - split them up
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                Don't mix API and web responses arbitrarily
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                Avoid direct $_POST/$_GET in business logic
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                Don't forget to validate ALL user input
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <h3 className="text-xl font-bold mb-4">Quick Reference</h3>

        <div className="overflow-x-auto">
          <table className={`w-full ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <thead>
              <tr className={`border-b ${darkMode ? 'border-zinc-700' : 'border-zinc-300'}`}>
                <th className="py-2 px-4 text-left">HTTP Method</th>
                <th className="py-2 px-4 text-left">Action Method</th>
                <th className="py-2 px-4 text-left">Purpose</th>
                <th className="py-2 px-4 text-left">Example Response</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <td className="py-2 px-4 font-mono">GET</td>
                <td className="py-2 px-4 font-mono">index()</td>
                <td className="py-2 px-4">List resources</td>
                <td className="py-2 px-4 font-mono text-sm">{'$this->success([items])'}</td>
              </tr>
              <tr className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <td className="py-2 px-4 font-mono">GET</td>
                <td className="py-2 px-4 font-mono">show($id)</td>
                <td className="py-2 px-4">Show single resource</td>
                <td className="py-2 px-4 font-mono text-sm">{'$this->success([item])'}</td>
              </tr>
              <tr className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <td className="py-2 px-4 font-mono">POST</td>
                <td className="py-2 px-4 font-mono">store()</td>
                <td className="py-2 px-4">Create resource</td>
                <td className="py-2 px-4 font-mono text-sm">{'$this->success([item], "Created", 201)'}</td>
              </tr>
              <tr className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <td className="py-2 px-4 font-mono">PUT/PATCH</td>
                <td className="py-2 px-4 font-mono">update($id)</td>
                <td className="py-2 px-4">Update resource</td>
                <td className="py-2 px-4 font-mono text-sm">{'$this->success([item], "Updated")'}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono">DELETE</td>
                <td className="py-2 px-4 font-mono">destroy($id)</td>
                <td className="py-2 px-4">Delete resource</td>
                <td className="py-2 px-4 font-mono text-sm">{'$this->success(null, "Deleted")'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
