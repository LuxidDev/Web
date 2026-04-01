import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Code, ArrowRight, CheckCircle, Server } from 'lucide-react';
import CodeExample from '@/components/CodeExample';

export default function ActionsContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Header */}
      <div className={`mb-8 p-6 rounded-2xl ${darkMode
        ? "bg-gray-900/50 border border-gray-800"
        : "bg-gray-50 border border-gray-200"
        }`}>
        <div className="flex items-start gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Actions: The HTTP Layer</h3>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Actions handle HTTP requests, process business logic, and return responses.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">What Are Actions?</h2>
      <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Actions are Luxid's equivalent of controllers in traditional MVC frameworks. They receive HTTP requests,
        orchestrate business logic using Entities, and return appropriate responses (JSON, HTML, redirects, etc.).
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
            <Code className={darkMode ? "text-gray-400" : "text-gray-600"} />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">HTTP Request Handlers</h3>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Each Action method corresponds to an HTTP endpoint. They handle GET, POST, PUT, PATCH, and DELETE requests.
          </p>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
            <Server className={darkMode ? "text-gray-400" : "text-gray-600"} />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Business Logic Orchestrators</h3>
          <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
            Actions coordinate between Entities, validation, authentication, and response formatting.
          </p>
        </div>
      </div>

      {/* Basic Action Structure */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Basic Action Structure</h3>

      <CodeExample
        code={`<?php

namespace App\\Actions;

use App\\Entities\\Post;
use App\\Actions\\LuxidAction;
use Luxid\\Nodes\\Response;

class PostAction extends LuxidAction
{
    // List all posts
    public function index(): string
    {
        $posts = Post::findAll([], ['created_at DESC']);
        
        return Response::success([
            'posts' => $posts
        ]);
    }

    // Show single post
    public function show(int $id): string
    {
        $post = Post::find($id);

        if (!$post) {
            return Response::error("Post not found", null, 404);
        }

        return Response::success([
            'post' => $post
        ]);
    }

    /** 
    * Create new post
    */
    public function store(): string
    {
        $data = $this->request()->input();

        $post = new Post();
        $post->title = $data['title'];
        $post->description = $data['description'] ?? '';

        if ($post->validate() && $post->save()) {
            return Response::success([
                'post' => $post
            ], 201);
        }

        return Response::error('Validation failed', $post->getErrors(), 422);
    }
}`}
        title="app/Actions/PostAction.php - Basic CRUD Example"
        explanation="A minimal Action showing index, show, and store methods. Notice the clean separation of concerns."
      />

      {/* Action Helpers */}
      <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">Action Helpers</h3>

      <div className={`mb-8 p-6 rounded-2xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-2 flex items-center gap-3 text-gray-900 dark:text-white">
            <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
              <Code className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
            </div>
            <span>ActionHelpers Trait</span>
          </h3>
          <p className={`ml-11 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Convenient methods for common HTTP and response tasks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Request & Response Helpers */}
          <div className={`p-5 rounded-xl ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"}`}>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <span>Request & Response</span>
            </h4>
            <div className="space-y-3">
              {[
                { code: 'request()', desc: 'Access request data' },
                { code: 'response()', desc: 'Build responses' },
                { code: 'db()', desc: 'Database access' },
                { code: 'user()', desc: 'Current user' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <ArrowRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                  <div className="flex-1">
                    <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                      {item.code}
                    </strong>
                    <strong className={`text-sm ml-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {item.desc}
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Methods */}
          <div className={`p-5 rounded-xl ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-white border border-gray-200 shadow-sm"}`}>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <span>Response Methods</span>
            </h4>
            <div className="space-y-3">
              {[
                { code: 'success()', desc: 'Return success JSON' },
                { code: 'error()', desc: 'Return error JSON' },
                { code: 'json()', desc: 'Return custom JSON' },
                { code: 'nova()', desc: 'Render Nova template' },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <ArrowRight className={`w-4 h-4 mt-0.5 flex-shrink-0 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                  <div className="flex-1">
                    <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"}`}>
                      {item.code}
                    </strong>
                    <span className={`text-sm ml-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Under the Hood */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Under the Hood: How Actions Work</h3>

      <CodeExample
        code={`<?php
// Engine/Foundation/Action.php - Base Action class
class Action
{
    use ActionHelpers;

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

    // Send JSON response
    protected function json($data, int $statusCode = 200): string
    {
        $this->response()->setStatusCode($statusCode);
        header('Content-Type: application/json');
        return json_encode($data, JSON_PRETTY_PRINT);
    }

    // Send success response
    protected function success($data = null, string $message = 'Success'): string
    {
        return $this->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ]);
    }

    // Send error response
    protected function error(string $message = 'Error', $errors = null): string
    {
        return $this->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors
        ], 400);
    }
}`}
        title="Engine/Foundation/Action.php - Core Implementation"
        explanation="The Action base class provides helper methods that make writing actions consistent."
      />

      {/* Advanced Action Patterns */}
      <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">Advanced Action Patterns</h3>

      <div className="space-y-6">
        {/* Pattern 1: Resource Actions */}
        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Pattern 1: Resource Actions</h4>
          <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Group related CRUD operations in a single Action class:
          </p>
          <CodeExample
            code={`<?php
namespace App\\Actions;

use App\\Entities\\Product;

class ProductAction extends LuxidAction
{
    // RESTful resource methods
    public function index() {}     // GET /products
    public function store() {}     // POST /products
    public function show($id) {}   // GET /products/{id}
    public function update($id) {} // PUT/PATCH /products/{id}
    public function destroy($id) {} // DELETE /products/{id}
}`}
            language="php"
            title="Resource Action Pattern"
            explanation="Group all operations for a resource in one Action class."
          />
        </div>

        {/* Pattern 2: Single Action Classes */}
        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Pattern 2: Single Action Classes</h4>
          <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Create focused, single-purpose Action classes:
          </p>
          <CodeExample
            code={`<?php
namespace App\\Actions;

class RegisterUserAction extends LuxidAction
{
    public function __invoke()
    {
        $data = $this->request()->input();
        // ... registration logic
        return $this->success(['user' => $user], 'User registered');
    }
}

class LogoutUserAction extends LuxidAction
{
    public function __invoke()
    {
        Application::$app->logout();
        return $this->success(null, 'Logged out');
    }
}`}
            language="php"
            title="Single Action Pattern"
            explanation="Create focused Action classes that do one thing well."
          />
        </div>

        {/* Pattern 3: API Resource Actions */}
        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Pattern 3: API Resource Actions</h4>
          <p className={`mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Create API-only Actions with JSON responses:
          </p>
          <CodeExample
            code={`<?php
namespace App\\Actions\\Api;

use App\\Entities\\Product;

class ProductApiAction extends LuxidAction
{
    // API endpoints return JSON only
    public function index()
    {
        $products = Product::findAll(['active' => true]);
        return $this->success(['products' => $products]);
    }

    public function statistics()
    {
        $stats = [
            'total' => Product::count(),
            'active' => Product::count(['active' => true])
        ];

        return $this->success(['statistics' => $stats]);
    }
}`}
            language="php"
            title="API Resource Action Pattern"
            explanation="API-focused Actions that always return JSON."
          />
        </div>
      </div>

      {/* Middleware in Actions */}
      <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">Middleware in Actions</h3>

      <CodeExample
        code={`<?php
namespace App\\Actions;

use Luxid\\Middleware\\AuthMiddleware;

class OrderAction extends LuxidAction
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
        $data = $this->request()->input();
        // ... create order logic
    }
}`}
        language="php"
        title="Action Middleware"
        explanation="Actions can have their own middleware for authentication, validation, etc."
      />

      {/* Request Data Handling */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Request Data Handling</h3>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className={`p-3 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
            <Server className={`w-6 h-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">Request Data Handling</h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Access and validate HTTP requests efficiently
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <CodeExample
            code={`<?php
// Get all request data
$data = $this->request()->input();

// Get specific value with default
$name = $this->request()->input('name', 'Default');

// For JSON API requests
$jsonData = $this->request()->getJson();

// Get query parameters
$page = $this->request()->query('page', 1);
$limit = $this->request()->query('limit', 10);`}
            title="Getting Request Data"
            explanation="Access request payload, query parameters, and headers"
            language="php"
          />

          <CodeExample
            code={`<?php
// Validate in Action before passing to Entity
public function store()
{
    $data = $this->request()->input();

    // Simple validation
    if (empty($data['title'])) {
        return $this->error('Title is required');
    }

    // Use Entity validation (recommended)
    $post = new Post();
    $post->title = $data['title'];
    $post->content = $data['content'] ?? '';

    if (!$post->validate()) {
        return $this->error('Validation failed', $post->getErrors());
    }

    $post->save();
    return $this->success(['post' => $post]);
}`}
            title="Request Validation"
            explanation="Validate user input with built-in helpers and Entity validation"
            language="php"
          />
        </div>

        {/* Quick Notes */}
        <div className={`mt-6 p-4 rounded-xl ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <span className="font-bold text-gray-900 dark:text-white">Note:</span> Always validate user input on both client and server side for maximum security.
          </p>
        </div>
      </div>

      {/* Best Practices */}
      <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Best Practices for Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              Do These
              <CheckCircle className="w-5 h-5 text-green-500" />
            </h4>
            <ul className={`space-y-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
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
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              Avoid These
              <span className="text-red-500">✗</span>
            </h4>
            <ul className={`space-y-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
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

      {/* Quick Reference */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Quick Reference</h3>

        <div className="overflow-x-auto">
          <table className={`w-full ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <thead>
              <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
                <th className={darkMode ? "text-white py-2 px-4 text-left" : "py-2 px-4 text-left"}>HTTP Verb</th>
                <th className={darkMode ? "text-white py-2 px-4 text-left" : "py-2 px-4 text-left"}>Action Method</th>
                <th className={darkMode ? "text-white py-2 px-4 text-left" : "py-2 px-4 text-left"}>Purpose</th>
                <th className={darkMode ? "text-white py-2 px-4 text-left" : "py-2 px-4 text-left"}>Example Response</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <td className="py-2 px-4 font-mono">GET</td>
                <td className="py-2 px-4 font-mono">index()</td>
                <td className="py-2 px-4">List resources</td>
                <td className="py-2 px-4 font-mono text-sm">{'$this->success([items])'}</td>
              </tr>
              <tr className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <td className="py-2 px-4 font-mono">GET</td>
                <td className="py-2 px-4 font-mono">show($id)</td>
                <td className="py-2 px-4">Show single resource</td>
                <td className="py-2 px-4 font-mono text-sm">{'$this->success([item])'}</td>
              </tr>
              <tr className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <td className="py-2 px-4 font-mono">POST</td>
                <td className="py-2 px-4 font-mono">store()</td>
                <td className="py-2 px-4">Create resource</td>
                <td className="py-2 px-4 font-mono text-sm">{'$this->success([item], "Created", 201)'}</td>
              </tr>
              <tr className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <td className="py-2 px-4 font-mono">PUT/PATCH</td>
                <td className="py-2 px-4 font-mono">update($id)</td>
                <td className="py-2 px-4">Update resource</td>
                <td className="py-2 px-4 font-mono text-sm">{'$this->success([item], "Updated")'}</td>
              </tr>
              <tr className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
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
