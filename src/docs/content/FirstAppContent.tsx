import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Code,
  Database,
  Terminal,
  Zap,
  CheckCircle,
  Rocket,
} from "lucide-react";
import CodeExample from "@/components/CodeExample";
import InlineCodeExample from "@/components/InlineCodeExample";
import QuickStartExample from "../components/QuickStartExample";

export default function FirstAppContent() {
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
          <Rocket
            className={`w-12 h-12 ${darkMode ? "text-purple-400" : "text-purple-600"}`}
          />
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Build Your First Luxid Application
            </h3>
            <p
              className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
            >
              In this tutorial, you'll build a complete blog application using
              Luxid's SEA architecture.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">What You'll Build</h2>
      <div
        className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                darkMode ? "bg-blue-500/20" : "bg-blue-100"
              }`}
            >
              <Database
                className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
              />
            </div>
            <h4 className="font-bold mb-2">Blog Posts</h4>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              Create, read, update, delete posts
            </p>
          </div>
          <div className="text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                darkMode ? "bg-green-500/20" : "bg-green-100"
              }`}
            >
              <Zap
                className={`w-8 h-8 ${darkMode ? "text-green-400" : "text-green-600"}`}
              />
            </div>
            <h4 className="font-bold mb-2">REST API</h4>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              Complete CRUD operations
            </p>
          </div>
          <div className="text-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                darkMode ? "bg-purple-500/20" : "bg-purple-100"
              }`}
            >
              <Code
                className={`w-8 h-8 ${darkMode ? "text-purple-400" : "text-purple-600"}`}
              />
            </div>
            <h4 className="font-bold mb-2">Nova Templates</h4>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              Beautiful frontend with layouts
            </p>
          </div>
        </div>
      </div>

      <div
        className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-yellow-900/20 border border-yellow-800" : "bg-yellow-50 border border-yellow-200"}`}
      >
        <div className="flex items-start gap-3">
          <Terminal
            className={`w-6 h-6 mt-1 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`}
          />
          <div>
            <h4 className="font-bold mb-2">Quick Start (Option 1)</h4>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              Use Juice CLI to generate everything automatically:
            </p>
            <InlineCodeExample
              code="php juice make:api Post"
              title="Generate API for Posts"
              description="Generates Entity, Action, Migration, and Routes for blog posts"
              icon={Terminal}
              color="yellow"
              language="bash"
            />
            <p
              className={`text-sm mt-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              Then run: <code className="font-mono">php juice db:migrate</code>{" "}
              to create the database tables.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Manual Tutorial (Option 2)</h3>
      <p className={`mb-6 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
        Follow these steps to understand how each component works:
      </p>

      <div className="space-y-8">
        {/* Step 1: Entity */}
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode
                  ? "bg-blue-500 text-white"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              1
            </div>
            <div>
              <h4 className="text-xl font-bold">Create Post Entity</h4>
              <p
                className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
              >
                Entities represent your data models and handle database
                operations.
              </p>
            </div>
          </div>

          <CodeExample
            code={`<?php
namespace App\\Entities;

use Luxid\\Database\\DbEntity;

class Post extends DbEntity
{
    public int $id = 0;
    public string $title = '';
    public string $content = '';
    public string $author = '';
    public bool $published = false;
    public string $created_at = '';
    public string $updated_at = '';

    public static function tableName(): string
    {
        return 'posts';
    }

    public static function primaryKey(): string
    {
        return 'id';
    }

    public function attributes(): array
    {
        return ['title', 'content', 'author', 'published', 'created_at', 'updated_at'];
    }

    public function rules(): array
    {
        return [
            'title' => [self::RULE_REQUIRED, [self::RULE_MIN, 'min' => 3]],
            'content' => [self::RULE_REQUIRED],
            'author' => [self::RULE_REQUIRED],
        ];
    }

    public function save(): bool
    {
        // Auto-set timestamps
        if ($this->id === 0) {
            $this->created_at = date('Y-m-d H:i:s');
        }
        $this->updated_at = date('Y-m-d H:i:s');

        return parent::save();
    }

    // Custom query method
    public static function findPublished()
    {
        return self::findAll(['published' => true], 'created_at DESC');
    }
}`}
            title="app/Entities/Post.php"
            explanation="This Entity extends DbEntity which provides automatic CRUD operations, validation, and database interaction."
          />

          <div
            className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-blue-900/20 border border-blue-800" : "bg-blue-50 border border-blue-200"}`}
          >
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Under the Hood: How Entities Work
            </h5>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              The <code>DbEntity</code> class in Luxid Engine provides:
            </p>
            <ul
              className={`text-sm mt-2 space-y-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                <strong>Active Record Pattern:</strong> Each entity instance
                corresponds to a database row
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                <strong>Automatic CRUD:</strong> <code>save()</code>,{" "}
                <code>update()</code>, <code>delete()</code> methods
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                <strong>Query Building:</strong> <code>find()</code>,{" "}
                <code>findAll()</code>, <code>findOne()</code> methods
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                <strong>Validation:</strong> Built-in validation rules and error
                messages
              </li>
            </ul>
          </div>
        </div>

        {/* Step 2: Action */}
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode
                  ? "bg-purple-500 text-white"
                  : "bg-purple-100 text-purple-600"
              }`}
            >
              2
            </div>
            <div>
              <h4 className="text-xl font-bold">Create Post Action</h4>
              <p
                className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
              >
                Actions handle HTTP requests and business logic.
              </p>
            </div>
          </div>

          <CodeExample
            code={`<?php
namespace App\\Actions;

use App\\Entities\\Post;
use Luxid\\Foundation\\Application;

class PostAction extends \\Luxid\\Foundation\\Action
{
    /**
     * List all posts (GET /posts)
     */
    public function index()
    {
        $posts = Post::findAll([], 'created_at DESC');

        // Return JSON for API
        return $this->success(['posts' => $posts]);

        // Or render Nova template for web:
        // return $this->nova('posts.index', ['posts' => $posts]);
    }

    /**
     * Show single post (GET /posts/{id})
     */
    public function show($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return $this->error('Post not found', null, 404);
        }

        return $this->success(['post' => $post]);
    }

    /**
     * Create new post (POST /posts)
     */
    public function store()
    {
        // Get request data (works with JSON or form data)
        $data = $this->request()->getBody();

        $post = new Post();
        $post->loadData($data);

        // Set current user as author
        if (Application::$app->user) {
            $post->author = Application::$app->user->getDisplayName();
        }

        if ($post->validate() && $post->save()) {
            return $this->success(['post' => $post], 'Post created successfully', 201);
        }

        return $this->error('Validation failed', $post->errors, 400);
    }

    /**
     * Update post (PUT /posts/{id})
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
     * Delete post (DELETE /posts/{id})
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

    /**
     * Publish post (POST /posts/{id}/publish)
     */
    public function publish($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return $this->error('Post not found', null, 404);
        }

        $post->published = true;

        if ($post->save()) {
            return $this->success(['post' => $post], 'Post published successfully');
        }

        return $this->error('Failed to publish post', null, 500);
    }
}`}
            title="app/Actions/PostAction.php"
            explanation="This Action handles all HTTP methods for blog posts. It uses the ActionHelpers trait for convenient response methods."
          />

          <div
            className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-purple-900/20 border border-purple-800" : "bg-purple-50 border border-purple-200"}`}
          >
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Under the Hood: How Actions Work
            </h5>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              Actions inherit from the <code>Action</code> base class which
              provides:
            </p>
            <InlineCodeExample
              code={`<?php
// Engine/Foundation/Action.php
class Action
{
    use ActionHelpers; // Provides helper methods

    public string $frame = 'app'; // Default layout
    public string $activity = '';

    protected array $middlewares = [];

    // Helper methods available:
    // - $this->request()   // Access Request object
    // - $this->response()  // Access Response object
    // - $this->db()        // Access Database
    // - $this->user()      // Access authenticated user
    // - $this->success()   // Return success response
    // - $this->error()     // Return error response
    // - $this->nova()      // Render Nova template
}`}
              title="Action Base Class"
              description="The Action base class provides all the tools needed to handle HTTP requests"
              icon={Zap}
              color="purple"
              language="php"
            />
          </div>
        </div>

        {/* Step 3: Screen */}
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-600"
              }`}
            >
              3
            </div>
            <div>
              <h4 className="text-xl font-bold">Create Post Screens</h4>
              <p
                className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
              >
                Screens are Nova templates that render the frontend.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h5 className="font-bold mb-2">Layout (Frame)</h5>
              <CodeExample
                code={`{{-- screens/frames/app.nova.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Luxid Blog')</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <a href="/" class="text-xl font-bold text-gray-800">Luxid Blog</a>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/posts" class="text-gray-700 hover:text-gray-900">Posts</a>
                    <a href="/posts/create" class="bg-blue-600 text-white px-4 py-2 rounded">New Post</a>
                </div>
            </div>
        </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        || content ||
    </main>
</body>
</html>`}
                language="html"
                title="screens/frames/app.nova.php"
                explanation="The layout contains the common HTML structure. The || content || placeholder is where individual screens are injected."
              />
            </div>

            <div>
              <h5 className="font-bold mb-2">Posts Index Screen</h5>
              <CodeExample
                code={`{{-- screens/posts/index.nova.php --}}
@extends('frames.app')

@section('title', 'Blog Posts')

@section('content')
<div class="mb-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-4">Blog Posts</h1>
    <a href="/posts/create" class="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Create New Post
    </a>
</div>

@if(count($posts) > 0)
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        @foreach($posts as $post)
            <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <h2 class="text-xl font-bold text-gray-900 mb-2">{{ $post->title }}</h2>

                <p class="text-gray-600 mb-4 line-clamp-3">
                    {{ $post->content }}
                </p>

                <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>By {{ $post->author }}</span>
                    <span>{{ date('M d, Y', strtotime($post->created_at)) }}</span>
                </div>

                <div class="flex space-x-2">
                    <a href="/posts/{{ $post->id }}"
                       class="flex-1 text-center bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">
                        View
                    </a>
                    <a href="/posts/{{ $post->id }}/edit"
                       class="flex-1 text-center bg-blue-100 text-blue-700 px-4 py-2 rounded hover:bg-blue-200">
                        Edit
                    </a>
                </div>

                @if($post->published)
                    <span class="inline-block mt-4 px-3 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                        Published
                    </span>
                @endif
            </div>
        @endforeach
    </div>
@else
    <div class="text-center py-12">
        <p class="text-gray-500 text-lg">No posts yet. Create your first post!</p>
    </div>
@endif
@endsection`}
                language="html"
                title="screens/posts/index.nova.php"
                explanation="This screen extends the app layout and displays a list of blog posts using Nova's template syntax."
              />
            </div>

            <div>
              <h5 className="font-bold mb-2">Post Show Screen</h5>
              <CodeExample
                code={`{{-- screens/posts/show.nova.php --}}
@extends('frames.app')

@section('title', $post->title)

@section('content')
<article class="max-w-4xl mx-auto">
    <header class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ $post->title }}</h1>

        <div class="flex items-center justify-between text-gray-600 mb-6">
            <div class="flex items-center space-x-4">
                <span class="font-medium">{{ $post->author }}</span>
                <span>•</span>
                <time datetime="{{ $post->created_at }}">
                    {{ date('F j, Y', strtotime($post->created_at)) }}
                </time>
            </div>

            @if($post->published)
                <span class="px-3 py-1 text-sm font-semibold bg-green-100 text-green-800 rounded-full">
                    Published
                </span>
            @endif
        </div>
    </header>

    <div class="prose prose-lg max-w-none mb-8">
        {!! nl2br(e($post->content)) !!}
    </div>

    <footer class="border-t pt-6">
        <div class="flex space-x-4">
            <a href="/posts" class="text-gray-600 hover:text-gray-900">
                ← Back to Posts
            </a>
            <a href="/posts/{{ $post->id }}/edit"
               class="ml-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Edit Post
            </a>
        </div>
    </footer>
</article>
@endsection`}
                language="html"
                title="screens/posts/show.nova.php"
                explanation="Individual post view screen with proper HTML structure and styling."
              />
            </div>
          </div>

          <div
            className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-200"}`}
          >
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Under the Hood: How Nova Templating Works
            </h5>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              The <code>Screen</code> class in Luxid Engine handles template
              rendering:
            </p>
            <InlineCodeExample
              code={`<?php
// Engine/Foundation/Screen.php
public function renderScreen($screen, $data = [])
{
    $screenContent = $this->renderOnlyScreen($screen, $data);
    $frameContent = $this->frameContent();

    // Replace placeholder with actual content
    return str_replace('|| content ||', $screenContent, $frameContent);
}

protected function renderOnlyScreen($screen, $data)
{
    foreach ($data as $key => $value) {
        $$key = $value; // Extract variables
    }

    ob_start();
    include_once Application::$ROOT_DIR . "/screens/$screen.nova.php";
    return ob_get_clean();
}

protected function frameContent()
{
    $frame = Application::$app->frame;
    if (Application::$app->action) {
        $frame = Application::$app->action->frame;
    }

    ob_start();
    include_once Application::$ROOT_DIR . "/screens/frames/$frame.nova.php";
    return ob_get_clean();
}`}
              title="Screen Rendering Engine"
              description="Nova uses output buffering and string replacement to create a simple yet powerful templating system."
              icon={Code}
              color="green"
              language="php"
            />
          </div>
        </div>

        {/* Step 4: Routes */}
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode
                  ? "bg-yellow-500 text-white"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              4
            </div>
            <div>
              <h4 className="text-xl font-bold">Define Routes</h4>
              <p
                className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
              >
                Routes connect URLs to Action methods.
              </p>
            </div>
          </div>

          <CodeExample
            code={`<?php
// routes/api.php

use App\\Actions\\PostAction;

// RESTful API routes for posts
$router->get('/posts', [PostAction::class, 'index']);
$router->get('/posts/{id}', [PostAction::class, 'show']);
$router->post('/posts', [PostAction::class, 'store']);
$router->put('/posts/{id}', [PostAction::class, 'update']);
$router->delete('/posts/{id}', [PostAction::class, 'destroy']);

// Custom action
$router->post('/posts/{id}/publish', [PostAction::class, 'publish']);

// Web routes (render Nova templates)
$router->get('/blog', [PostAction::class, 'index']);
$router->get('/blog/{id}', [PostAction::class, 'show']);

// Add middleware (authentication)
$router->post('/posts', [PostAction::class, 'store'])
    ->middleware(new AuthMiddleware());

// Group routes with middleware
$router->group([new AuthMiddleware()], function($router) {
    $router->put('/posts/{id}', [PostAction::class, 'update']);
    $router->delete('/posts/{id}', [PostAction::class, 'destroy']);
});`}
            title="routes/api.php"
            explanation="Routes define the URL patterns and connect them to Action methods. Parameters in curly braces {id} are automatically passed to the Action method."
          />

          <div
            className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-yellow-900/20 border border-yellow-800" : "bg-yellow-50 border border-yellow-200"}`}
          >
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Under the Hood: How Routing Works
            </h5>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              The <code>Router</code> class in Luxid Engine:
            </p>
            <InlineCodeExample
              code={`<?php
// Engine/Routing/Router.php
public function resolve()
{
    $path = $this->request->getPath();
    $method = $this->request->method();

    // Check if route exists
    if (!isset($this->routes[$method][$path])) {
        throw new NotFoundException();
    }

    $route = $this->routes[$method][$path];
    $callback = $route['callback'];

    // Execute middleware
    foreach ($route['middleware'] as $middleware) {
        $middleware->execute();
    }

    // If callback is array [Action::class, 'method']
    if (is_array($callback)) {
        $action = new $callback[0]();
        Application::$app->action = $action;
        $action->activity = $callback[1];
        $callback[0] = $action;
    }

    // Extract route parameters (e.g., {id})
    $params = $this->extractRouteParams($path);

    // Execute with parameters
    if (!empty($params)) {
        return call_user_func_array($callback, array_merge(
            [$this->request, $this->response],
            $params
        ));
    }

    return call_user_func($callback, $this->request, $this->response);
}`}
              title="Router Class"
              description="The router matches URLs to registered routes, executes middleware, and calls the appropriate Action method with parameters."
              icon={Zap}
              color="yellow"
              language="php"
            />
          </div>
        </div>

        {/* Step 5: Migration */}
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode ? "bg-red-500 text-white" : "bg-red-100 text-red-600"
              }`}
            >
              5
            </div>
            <div>
              <h4 className="text-xl font-bold">Create Database Migration</h4>
              <p
                className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
              >
                Migrations create and modify database tables.
              </p>
            </div>
          </div>

          <CodeExample
            code={`<?php
// Use Juice CLI to generate migration
php juice make:migration create_posts_table

// Or create manually: migrations/m00002_create_posts_table.php

use Luxid\\Database\\Database;

class m00002_create_posts_table
{
    /**
     * Create the posts table
     */
    public function apply()
    {
        $db = \\Luxid\\Foundation\\Application::$app->db;

        $sql = "CREATE TABLE IF NOT EXISTS \\\`posts\\\` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            author VARCHAR(100) NOT NULL,
            published BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_author (author),
            INDEX idx_published (published),
            INDEX idx_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

        try {
            $db->pdo->exec($sql);
            echo "Table 'posts' created successfully\\\\n";
        } catch (\\Exception $e) {
            throw new \\Exception("Migration failed: " . $e->getMessage());
        }
    }

    /**
     * Drop the posts table (rollback)
     */
    public function down()
    {
        $db = \\Luxid\\Foundation\\Application::$app->db;

        $sql = "DROP TABLE IF EXISTS \\\`posts\\\`";

        try {
            $db->pdo->exec($sql);
            echo "Table 'posts' dropped successfully\\\\n";
        } catch (\\Exception $e) {
            throw new \\Exception("Rollback failed: " . $e->getMessage());
        }
    }
}`}
            title="migrations/m00002_create_posts_table.php"
            explanation="Migrations are version-controlled database changes. Each migration has apply() (up) and down() (rollback) methods."
          />

          <div className="mt-6">
            <h5 className="font-bold mb-2">Run the Migration</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <InlineCodeExample
                code="php juice db:migrate"
                title="Run Migration"
                description="Apply all pending migrations"
                icon={Database}
                color="red"
                language="bash"
                compact={true}
              />
              <InlineCodeExample
                code="php juice db:rollback"
                title="Rollback"
                description="Rollback last migration"
                icon={Database}
                color="red"
                language="bash"
                compact={true}
              />
              <InlineCodeExample
                code="php juice db:status"
                title="Check Status"
                description="View migration status"
                icon={Database}
                color="red"
                language="bash"
                compact={true}
              />
            </div>
          </div>

          <div
            className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-red-900/20 border border-red-800" : "bg-red-50 border border-red-200"}`}
          >
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Under the Hood: How Migrations Work
            </h5>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              The <code>Database</code> class manages migrations:
            </p>
            <InlineCodeExample
              code={`<?php
// Engine/Database/Database.php
public function applyMigrations()
{
    $this->createMigrationsTable();
    $appliedMigrations = $this->getAppliedMigrations();

    $files = scandir(Application::$ROOT_DIR . '/migrations');
    $toApplyMigrations = array_diff($files, $appliedMigrations);

    foreach ($toApplyMigrations as $migration) {
        if ($migration === '.' || $migration === '..') continue;

        require_once Application::$ROOT_DIR . '/migrations/' . $migration;
        $className = pathinfo($migration, PATHINFO_FILENAME);
        $instance = new $className();

        $instance->apply();
        $this->saveMigration($migration);
    }
}

protected function createMigrationsTable()
{
    $this->pdo->exec("
        CREATE TABLE IF NOT EXISTS migrations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            migration VARCHAR(255) NOT NULL UNIQUE,
            applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=INNODB;
    ");
}`}
              title="Migration Management"
              description="Luxid tracks applied migrations in a migrations table and only runs new migrations."
              icon={Database}
              color="red"
              language="php"
            />
          </div>
        </div>
      </div>

      {/* Testing the Application */}
      <div
        className={`mt-8 p-6 rounded-xl ${
          darkMode
            ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
            : "bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200"
        }`}
      >
        <h3 className="text-2xl font-bold mb-4">Test Your Application</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">API Endpoints</h4>
            <div className="space-y-3">
              <InlineCodeExample
                code={`# Get all posts
curl http://localhost:8000/posts`}
                title="Get All Posts"
                description="Retrieve all blog posts"
                icon={Terminal}
                color="blue"
                language="bash"
                compact={true}
              />
              <InlineCodeExample
                code={`# Get single post
curl http://localhost:8000/posts/1`}
                title="Get Single Post"
                description="Retrieve a specific post"
                icon={Terminal}
                color="blue"
                language="bash"
                compact={true}
              />
              <InlineCodeExample
                code={`# Create post
curl -X POST http://localhost:8000/posts \\
  -H "Content-Type: application/json" \\
  -d '{"title":"My Post","content":"Hello World"}'`}
                title="Create Post"
                description="Create a new blog post"
                icon={Terminal}
                color="blue"
                language="bash"
                compact={true}
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Web Interface</h4>
            <div
              className={`p-4 rounded-lg ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}
            >
              <ul
                className={`space-y-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
              >
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Visit{" "}
                    <a
                      href="http://localhost:8000/blog"
                      className="text-blue-500 hover:underline"
                    >
                      http://localhost:8000/blog
                    </a>{" "}
                    to see all posts
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Click on a post to view details</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Use the API to create new posts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div
        className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}
      >
        <h3 className="text-xl font-bold mb-4">🎉 Congratulations!</h3>
        <p className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
          You've built a complete blog application with Luxid! Let's review what
          you've accomplished:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div
            className={`p-4 rounded-lg ${darkMode ? "bg-blue-900/20" : "bg-blue-50"}`}
          >
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Entity (Model)
            </h4>
            <ul
              className={`text-sm space-y-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              <li>• Database table definition</li>
              <li>• CRUD operations</li>
              <li>• Validation rules</li>
              <li>• Business logic methods</li>
            </ul>
          </div>

          <div
            className={`p-4 rounded-lg ${darkMode ? "bg-purple-900/20" : "bg-purple-50"}`}
          >
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Action (Controller)
            </h4>
            <ul
              className={`text-sm space-y-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              <li>• HTTP request handling</li>
              <li>• Business logic</li>
              <li>• JSON API responses</li>
              <li>• Error handling</li>
            </ul>
          </div>

          <div
            className={`p-4 rounded-lg ${darkMode ? "bg-green-900/20" : "bg-green-50"}`}
          >
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Code className="w-4 h-4" />
              Screen (View)
            </h4>
            <ul
              className={`text-sm space-y-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              <li>• Nova templates</li>
              <li>• Layout system</li>
              <li>• Frontend presentation</li>
              <li>• Data rendering</li>
            </ul>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg ${darkMode ? "bg-yellow-900/20 border border-yellow-800" : "bg-yellow-50 border border-yellow-200"}`}
        >
          <h4 className="font-bold mb-2">Next Steps</h4>
          <p
            className={`text-sm mb-3 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
          >
            Now that you understand the basics, explore these advanced topics:
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="/docs/sea-architecture"
              className={`px-3 py-1 rounded text-sm ${
                darkMode
                  ? "bg-zinc-800 hover:bg-zinc-700"
                  : "bg-zinc-200 hover:bg-zinc-300"
              }`}
            >
              SEA Architecture Deep Dive
            </a>
            <a
              href="/docs/l-orm"
              className={`px-3 py-1 rounded text-sm ${
                darkMode
                  ? "bg-zinc-800 hover:bg-zinc-700"
                  : "bg-zinc-200 hover:bg-zinc-300"
              }`}
            >
              L ORM Relationships
            </a>
            <a
              href="/docs/nova-templating"
              className={`px-3 py-1 rounded text-sm ${
                darkMode
                  ? "bg-zinc-800 hover:bg-zinc-700"
                  : "bg-zinc-200 hover:bg-zinc-300"
              }`}
            >
              Advanced Nova Templates
            </a>
            <a
              href="/docs/juice-cli"
              className={`px-3 py-1 rounded text-sm ${
                darkMode
                  ? "bg-zinc-800 hover:bg-zinc-700"
                  : "bg-zinc-200 hover:bg-zinc-300"
              }`}
            >
              Juice CLI Commands
            </a>
          </div>
        </div>
      </div>

      <QuickStartExample />
    </>
  );
}
