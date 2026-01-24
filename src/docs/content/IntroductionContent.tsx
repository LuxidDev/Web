import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Sparkles, Layers, Zap, Database, Terminal, Brain, Rocket, CheckCircle } from 'lucide-react';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import QuickStartExample from '../components/QuickStartExample';
import CodeExample from '../components/CodeExample';

export default function IntroductionContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20'
          : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'
      }`}>
        <div className="flex items-start gap-4">
          <Sparkles className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Welcome to Luxid Framework</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              The modern PHP framework built for developers who value elegance, performance, and simplicity.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">What Makes Luxid Different?</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
            darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <Brain className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
          </div>
          <h3 className="text-xl font-bold mb-2">SEA Architecture</h3>
          <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
            Screen, Entities, Actions - A modern approach that makes your code intuitive and organized.
          </p>
          <div className="mt-4 text-sm">
            <strong className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>Under the Hood:</strong>
            <p className={`mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
              Luxid's Application class bootstraps everything, managing dependency injection and request lifecycle.
            </p>
          </div>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
            darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
          }`}>
            <Zap className={darkMode ? 'text-purple-400' : 'text-purple-600'} />
          </div>
          <h3 className="text-xl font-bold mb-2">Batteries Included</h3>
          <p className={darkMode ? 'text-zinc-400' : 'text-zinc-600'}>
            Everything you need out of the box: ORM, templating, CLI tools, authentication, and more.
          </p>
          <div className="mt-4 text-sm">
            <strong className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>Under the Hood:</strong>
            <p className={`mt-1 ${darkMode ? 'text-zinc-500' : 'text-zinc-600'}`}>
              Juice CLI uses reflection and file generation to scaffold projects quickly.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">How Luxid Works</h3>

      <ArchitectureDiagram showFlow={true} />

      <div className={`my-8 p-6 rounded-xl ${
        darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-zinc-100 border border-zinc-300'
      }`}>
        <h4 className="text-xl font-bold mb-4">Request Lifecycle</h4>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              darkMode ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
            }`}>
              1
            </div>
            <div>
              <h5 className="font-bold">HTTP Request Arrives</h5>
              <p className={`text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <code className="font-mono bg-zinc-800/50 px-2 py-1 rounded">Application</code> class instantiates and sets up the environment,
                loading configuration, creating database connection, and starting session.
              </p>
              <CodeExample
                code={`// Entry point: web/index.php
require_once __DIR__ . '/../vendor/autoload.php';
use Luxid\\Foundation\\Application;

$dotenv = Dotenv\\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

$config = require_once __DIR__ . '/../config/config.php';
$app = new Application(dirname(__DIR__), $config);`}
                language="php"
                explanation="Main application bootstrap"
              />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              darkMode ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600'
            }`}>
              2
            </div>
            <div>
              <h5 className="font-bold">Router Resolution</h5>
              <p className={`text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <code className="font-mono bg-zinc-800/50 px-2 py-1 rounded">Router</code> matches the URL to a registered route,
                instantiates the Action class, and executes middleware.
              </p>
              <CodeExample
                code={`// Engine/Routing/Router.php
public function resolve()
{
    $path = $this->request->getPath();
    $method = $this->request->method();

    if (!isset($this->routes[$method][$path])) {
        throw new NotFoundException();
    }

    $route = $this->routes[$method][$path];
    $callback = $route['callback'];

    // Execute middleware
    foreach ($route['middleware'] as $middleware) {
        $middleware->execute();
    }

    // Execute callback
    return call_user_func($callback, $this->request, $this->response);
}`}
                language="php"
                explanation="Router finds and executes the matching route"
              />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              darkMode ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600'
            }`}>
              3
            </div>
            <div>
              <h5 className="font-bold">Action Execution</h5>
              <p className={`text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                The Action method runs, interacting with Entities via L ORM, processing business logic,
                and preparing data for the Screen.
              </p>
              <CodeExample
                code={`// Example Action method
public function show($id)
{
    $post = Post::find($id); // Uses L ORM

    if (!$post) {
        return $this->error('Post not found', null, 404);
    }

    // Returns data for Screen rendering
    return $this->nova('posts.show', ['post' => $post]);
}`}
                language="php"
                explanation="Action handles business logic and data processing"
              />
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              darkMode ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-600'
            }`}>
              4
            </div>
            <div>
              <h5 className="font-bold">Response Rendering</h5>
              <p className={`text-sm mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <code className="font-mono bg-zinc-800/50 px-2 py-1 rounded">Screen</code> class renders the Nova template,
                injecting data and applying the frame layout.
              </p>
              <CodeExample
                code={`// Engine/Foundation/Screen.php
public function renderScreen($screen, $data = [])
{
    $screenContent = $this->renderOnlyScreen($screen, $data);
    $frameContent = $this->frameContent();

    // Replace placeholder with actual content
    return str_replace('|| content ||', $screenContent, $frameContent);
}`}
                language="php"
                explanation="Screen engine renders templates with layouts"
              />
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Key Features Explained</h3>
      <div className={`p-6 rounded-xl mb-8 ${
        darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Modern PHP 8+
            </h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Luxid leverages PHP 8+ features like attributes, match expressions, and typed properties.
              The framework uses PSR-4 autoloading and follows modern PHP standards.
            </p>
            <CodeExample
              code={`// Using PHP 8 features
class User extends DbEntity
{
    public int $id = 0; // Typed properties
    public string $email = '';

    #[Validate('required|email|unique')] // Attributes
    public function validateEmail() {}
}`}
              language="php"
              title="PHP 8 Features in Luxid"
            />
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Database className="w-5 h-5" />
              L ORM (Active Record)
            </h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Database entities extend <code>DbEntity</code> which provides automatic CRUD operations,
              validation, and relationship management.
            </p>
            <CodeExample
              code={`// Automatic CRUD operations
$user = User::find(1); // Find by ID
$users = User::findAll(['status' => 'active']); // Find all with conditions
$user->email = 'new@email.com';
$user->save(); // Auto-update timestamps
$user->delete(); // Soft or hard delete`}
              language="php"
              title="L ORM in Action"
            />
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Juice CLI
            </h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Comprehensive command-line tools for scaffolding, database operations,
              and project management.
            </p>
            <CodeExample
              code={`php juice make:api Product      # Generate full API CRUD
php juice db:migrate           # Run migrations
php juice start               # Start dev server
php juice make:todo           # Generate TODO app
php juice env:check          # Check environment`}
              language="bash"
              title="Juice CLI Commands"
            />
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Nova Templating
            </h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Blade-inspired templating engine with layouts, components,
              and powerful directives.
            </p>
            <CodeExample
              code={`{{-- Extends layout --}}
@extends('layouts.app')

@section('content')
    <h1>{{ $title }}</h1>

    @if($items)
        @foreach($items as $item)
            <div class="item">
                <h2>{{ $item->title }}</h2>
                <p>{{ $item->content }}</p>
            </div>
        @endforeach
    @else
        <p>No items found</p>
    @endif
@endsection`}
              language="html"
              title="Nova Template Example"
            />
          </div>
        </div>
      </div>

      {/* Showcase a real code example */}
      <h3 className="text-2xl font-bold mb-4">See It in Action</h3>
      <p className={`mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        Here's what a complete Luxid application looks like:
      </p>

      <CodeExample
        code={`<?php
// Example: User registration flow

// 1. Entity (app/Entities/User.php)
class User extends DbEntity
{
    public int $id = 0;
    public string $email = '';
    public string $password = '';

    public static function tableName(): string { return 'users'; }

    public function rules(): array
    {
        return [
            'email' => [self::RULE_REQUIRED, self::RULE_EMAIL],
            'password' => [self::RULE_REQUIRED, [self::RULE_MIN, 'min' => 8]]
        ];
    }

    public function save(): bool
    {
        // Auto-hash password before saving
        $this->password = password_hash($this->password, PASSWORD_DEFAULT);
        return parent::save();
    }
}

// 2. Action (app/Actions/AuthAction.php)
class AuthAction extends Action
{
    public function register()
    {
        $data = $this->request()->getBody();

        $user = new User();
        $user->loadData($data);

        if ($user->validate() && $user->save()) {
            // Auto-login after registration
            Application::$app->login($user);
            return $this->success(['user' => $user], 'Registration successful');
        }

        return $this->error('Validation failed', $user->errors);
    }
}

// 3. Route (routes/api.php)
$router->post('/register', [AuthAction::class, 'register']);`}
        title="Complete User Registration Example"
        explanation="This shows how Luxid's SEA architecture works together: Entity handles data and validation, Action processes the request, and routing connects everything."
      />

      <QuickStartExample />

      <div className={`p-6 rounded-xl my-8 ${
        darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-zinc-100 border border-zinc-300'
      }`}>
        <h3 className="text-xl font-bold mb-4">Quick Start</h3>
        <pre className="font-mono text-sm overflow-x-auto mb-4">
          <code className={darkMode ? 'text-zinc-300' : 'text-zinc-800'}>
{`# Create a new Luxid project
composer create-project luxid/framework myapp

# Navigate to your project
cd myapp

# Start the development server
php juice start

# Visit http://localhost:8000`}
          </code>
        </pre>
        <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          That's it! You now have a running Luxid application. Continue to the next chapter to learn more.
        </p>
      </div>
    </>
  );
}
