import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  CheckCircle, ArrowRight,
} from 'lucide-react';
import CodeExample from '@/components/CodeExample';
import InlineCodeExample from '@/components/InlineCodeExample';

export default function AuthenticationContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Hero Section */}
      <div className={`mb-8 p-6 rounded-2xl ${darkMode
        ? "bg-gray-900/50 border border-gray-800"
        : "bg-gray-50 border border-gray-200"
        }`}>
        <div className="flex items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Luxid Haven Authentication</h1>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Haven is Luxid's official authentication package. One command installs a complete,
              secure, session-based authentication system with user registration, login, logout,
              and "remember me" functionality.
            </p>
          </div>
        </div>
      </div>

      {/* What is Haven */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">What is Luxid Haven?</h2>
      <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Haven is the official authentication package for Luxid. It provides a complete, production-ready
        authentication system with zero boilerplate. One command installs everything you need:
      </p>
      <ul className={`space-y-2 mb-8 ml-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Session-based authentication with bcrypt password hashing</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Complete User entity with Rocket ORM attributes</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>AuthAction with register, login, logout, and me endpoints</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Database migration for users table</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Authentication routes automatically registered</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>"Remember me" functionality with secure tokens</span>
        </li>
      </ul>

      {/* Installation */}
      <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">Installation</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Installing Haven is incredibly simple. Just two commands and you're ready to go:
        </p>

        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Step 1: Install via Composer</h4>
            <InlineCodeExample
              code="composer require luxid/haven"
              language="bash"
              title=""
              description="Install Haven. Adds the Haven package to your Luxid project"
              color="gray"
              compact={true}
            />
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Step 2: Run the Installer</h4>
            <InlineCodeExample
              code="php juice haven:install"
              language="bash"
              title=""
              description="Run Haven Installer. Generates all authentication files and configurations"
              color="gray"
              compact={true}
            />
            <p className={`text-sm mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              The installer will publish the config file, create the User entity, generate the AuthAction,
              create the migration, and register the authentication routes.
            </p>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Step 3: Run Migrations</h4>
            <InlineCodeExample
              code="php juice db:migrate"
              language="bash"
              title=""
              description="Run migrations. Creates the users table in your database"
              color="gray"
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* What Gets Installed */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What Gets Installed?</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Haven generates everything you need for a complete authentication system:
        </p>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              1. Configuration File
            </h4>
            <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>config/haven.php</strong> - Controls guards, providers, hashing settings, and remember me options.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              2. User Entity
            </h4>
            <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>app/Entities/User.php</strong> - Extends UserEntity and implements Authenticatable with Rocket ORM attributes.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              3. Auth Action
            </h4>
            <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>app/Actions/AuthAction.php</strong> - Handles register, login, logout, and me endpoints.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              4. Database Migration
            </h4>
            <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>migrations/m00001_create_users_table.php</strong> - Creates the users table with all necessary columns.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              5. API Routes
            </h4>
            <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>routes/api.php</strong> - Authentication endpoints automatically registered.
            </p>
          </div>
        </div>
      </div>

      {/* The User Entity */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">The User Entity</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Haven generates a complete User entity using Rocket ORM attributes. Let's break down what each part does:
        </p>

        <CodeExample
          code={`<?php

namespace App\Entities;

use Luxid\ORM\UserEntity;
use Rocket\Attributes\Entity as EntityAttr;
use Rocket\Attributes\Column;
use Rocket\Attributes\Rules\Required;
use Rocket\Attributes\Rules\Email;
use Rocket\Attributes\Rules\Min;
use Rocket\Attributes\Rules\Unique;
use Luxid\Contracts\Auth\Authenticatable;

#[EntityAttr(table: 'users')]
class User extends UserEntity implements Authenticatable
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

    #[Column(nullable: true)]
    public ?string $remember_token = null;

    #[Column(autoCreate: true)]
    public string $created_at = '';

    #[Column(autoCreate: true, autoUpdate: true)]
    public string $updated_at = '';

    public function getDisplayName(): string
    {
        return trim($this->firstname . ' ' . $this->lastname) ?: $this->email;
    }

    // Authenticatable interface methods
    public function getAuthIdentifierName(): string
    {
        return 'id';
    }

    public function getAuthIdentifier()
    {
        return $this->id;
    }

    public function getAuthPassword(): string
    {
        return $this->password;
    }

    public function getAuthPasswordName(): string
    {
        return 'password';
    }

    public function getRememberToken(): ?string
    {
        return $this->remember_token;
    }

    public function setRememberToken(?string $value): void
    {
        $this->remember_token = $value;
    }

    public function getRememberTokenName(): string
    {
        return 'remember_token';
    }
}`}
          language="php"
          title="app/Entities/User.php"
          explanation="The User entity with Rocket ORM attributes and Authenticatable implementation"
        />

        <div className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Key Features of the User Entity:</h5>
          <ul className={`space-y-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[EntityAttr(table: 'users')]</strong> - Maps this entity to the users table</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Column(hidden: true)]</strong> - Password is excluded from JSON responses</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Required, #[Email], #[Unique]</strong> - Validation rules for email</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Column(autoCreate: true)]</strong> - Automatically sets created_at on insert</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Column(autoCreate: true, autoUpdate: true)]</strong> - Updates updated_at on every save</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span><strong className={darkMode ? "text-white font-mono" : "font-mono"}>getDisplayName()</strong> - Computed property for full name or email fallback</span>
            </li>
          </ul>
        </div>
      </div>

      {/* The Auth Action */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">The Auth Action</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          The AuthAction handles all authentication endpoints. Notice how simple and clean it is:
        </p>

        <CodeExample
          code={`<?php

namespace App\Actions;

use App\Actions\LuxidAction;
use App\Entities\User;
use Luxid\Nodes\Response;

class AuthAction extends LuxidAction
{
    // Register a new user
    public function register(): string
    {
        $data = $this->request()->input();

        // Create new user
        $user = new User();
        $user->email = $data['email'];
        $user->password = $data['password'];
        $user->firstname = $data['firstname'];
        $user->lastname = $data['lastname'];

        // Validate and save
        if (!$user->validate()) {
            return Response::error('Validation failed', $user->getErrors(), 422);
        }

        $user->save();
        
        // Log the user in automatically
        auth()->login($user);

        return Response::success([
            'user' => $user,
            'message' => 'Registration successful!'
        ], 201);
    }

    // Login a user
    public function login(): string
    {
        $data = $this->request()->input();

        $credentials = [
            'email' => $data['email'],
            'password' => $data['password'],
        ];

        $remember = !empty($data['remember']);

        if (auth()->attempt($credentials, $remember)) {
            return Response::success([
                'user' => auth()->user(),
                'message' => 'Login successful!'
            ]);
        }

        return Response::error('Invalid credentials.', null, 401);
    }

    // Logout current user
    public function logout(): string
    {
        auth()->logout();
        return Response::success(['message' => 'Logged out successfully!']);
    }

    // Get current authenticated user
    public function me(): string
    {
        $user = auth()->user();
        
        if (!$user) {
            return Response::error('Not authenticated', null, 401);
        }
        
        return Response::success(['user' => $user]);
    }
}`}
          language="php"
          title="app/Actions/AuthAction.php"
          explanation="Complete authentication endpoints with input validation and responses"
        />

        <div className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <h5 className="font-bold mb-2 text-gray-900 dark:text-white">What Makes AuthAction Awesome:</h5>
          <ul className={`space-y-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <li className="flex items-start gap-2">
              <span><strong className={darkMode ? "text-white font-mono" : "font-mono"}>• {'auth()->attempt()'}</strong> - One line does everything: validates credentials, checks password, creates session</span>
            </li>
            <li className="flex items-start gap-2">
              <span><strong className={darkMode ? "text-white font-mono" : "font-mono"}>• {'auth()->login($user)'}</strong> - Log in a user directly without credentials</span>
            </li>
            <li className="flex items-start gap-2">
              <span><strong className={darkMode ? "text-white font-mono" : "font-mono"}>• {'auth()->user()'}</strong> - Get the currently authenticated user</span>
            </li>
            <li className="flex items-start gap-2">
              <span><strong className={darkMode ? "text-white font-mono" : "font-mono"}>• {'auth()->logout()'}</strong> - Clear the session and logout</span>
            </li> <br></br>
            <li className="flex items-start gap-2">
              <span>• Automatic password hashing via Entity's <strong className={darkMode ? "text-white font-mono" : "font-mono"}>beforeSave()</strong> hook</span>
            </li>
          </ul>
        </div>
      </div>

      {/* The Auth Helper */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">The Auth Helper</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Haven provides a global <strong className={darkMode ? "text-white font-mono" : "font-mono"}>auth()</strong> helper function that gives you access to all authentication features:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className="font-mono text-sm">{'auth()->user()'}</strong>
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Get the currently authenticated user</p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className="font-mono text-sm">{'auth()->check()'}</strong>
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Check if a user is logged in</p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className="font-mono text-sm">{'auth()->guest()'}</strong>
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Check if no user is logged in</p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className="font-mono text-sm">{'auth()->id()'}</strong>
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Get the authenticated user's ID</p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className="font-mono text-sm">{'auth()->attempt($credentials)'}</strong>
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Attempt to log in with credentials</p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className="font-mono text-sm">{'auth()->logout()'}</strong>
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Log the user out</p>
          </div>
        </div>

        <CodeExample
          code={`<?php
// In your Action
public function dashboard()
{
    // Check if user is authenticated
    if (!auth()->check()) {
        return Response::error('Unauthorized', null, 401);
    }
    
    // Get the current user
    $user = auth()->user();
    
    // Get user ID
    $userId = auth()->id();
    
    // Use the user
    return Response::success([
        'user' => $user,
        'user_id' => $userId
    ]);
}

// In your Nova templates
@if(auth()->check())
    <p>Welcome back, {{ auth()->user()->displayName }}</p>
    <a href="/logout">Logout</a>
@else
    <a href="/login">Login</a>
@endif`}
          language="php"
          title="Using the Auth Helper"
          explanation="The auth() helper works everywhere - in Actions, Nova templates, and even in your Entities"
        />
      </div>

      {/* Authentication Routes */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Authentication Routes</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Haven automatically registers these routes in your <strong className={darkMode ? "text-white font-mono" : "font-mono"}>routes/api.php</strong> file:
        </p>

        <div className="space-y-3">
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-xs font-mono bg-green-500/20 text-green-400 rounded">POST</span>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>/auth/register</strong>
              <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>- Create a new user account</span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-xs font-mono bg-blue-500/20 text-blue-400 rounded">POST</span>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>/auth/login</strong>
              <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>- Log in an existing user</span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-xs font-mono bg-purple-500/20 text-purple-400 rounded">GET</span>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>/auth/me</strong>
              <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>- Get the authenticated user (requires auth)</span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 text-xs font-mono bg-red-500/20 text-red-400 rounded">POST</span>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>/auth/logout</strong>
              <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>- Log out (requires auth)</span>
            </div>
          </div>
        </div>

        <div className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-blue-900/20 border border-blue-800" : "bg-blue-50 border border-blue-200"}`}>
          <h5 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
            Route Protection
          </h5>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Routes that require authentication use the <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'->auth()'}</strong> method.
            This adds the <strong className={darkMode ? "text-white font-mono" : "font-mono"}>RequireAuth</strong> middleware which checks for a valid session
            before allowing access. If no valid session exists, it returns a 401 Unauthorized response.
          </p>
        </div>
      </div>

      {/* Database Migration */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Database Migration</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Haven generates a clean migration using Rocket's schema builder:
        </p>

        <CodeExample
          code={`<?php

use Rocket\Migration\Migration;
use Rocket\Migration\Rocket;

class m00001_create_users_table extends Migration
{
    public function up(): void
    {
        Rocket::table('users', function($column) {
            $column->id('id');
            $column->string('email')->unique()->index();
            $column->string('password')->hidden();
            $column->string('firstname');
            $column->string('lastname');
            $column->string('remember_token')->nullable();
            $column->timestamps();
        });
    }

    public function down(): void
    {
        Rocket::drop('users');
    }
}`}
          language="php"
          title="migrations/m00001_create_users_table.php"
          explanation="The migration creates the users table with proper indexes and columns"
        />

        <div className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <strong className="text-gray-900 dark:text-white">Note:</strong> The <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'->hidden()'}</strong> modifier on the password column
            ensures that password hashes are never exposed in query logs or debugging outputs.
          </p>
        </div>
      </div>

      {/* Configuration */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Configuration</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Haven's configuration file gives you full control over authentication behavior:
        </p>

        <CodeExample
          code={`<?php

return [
    // Default authentication guard
    'default' => 'session',

    // Authentication guards
    'guards' => [
        'session' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
    ],

    // User providers
    'providers' => [
        'users' => [
            'entity' => App\Entities\User::class,
        ],
    ],

    // Password hashing settings
    'hashing' => [
        'driver' => 'bcrypt',
        'bcrypt' => [
            'rounds' => $_ENV['BCRYPT_ROUNDS'] ?? 12,
        ],
    ],

    // Remember me settings
    'remember' => [
        'enabled' => true,
        'lifetime' => 43200, // 30 days in minutes
    ],
];`}
          language="php"
          title="config/haven.php"
          explanation="Configure guards, providers, hashing, and remember me settings"
        />

        <div className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Configuration Options:</h5>
          <ul className={`space-y-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <li><strong className={darkMode ? "text-white font-mono" : "font-mono"}>default</strong> - Which guard to use by default</li>
            <li><strong className={darkMode ? "text-white font-mono" : "font-mono"}>guards</strong> - Define different authentication methods (session, token, etc.)</li>
            <li><strong className={darkMode ? "text-white font-mono" : "font-mono"}>providers</strong> - Tell Haven which entity to use for users</li>
            <li><strong className={darkMode ? "text-white font-mono" : "font-mono"}>hashing</strong> - Configure password hashing (bcrypt with configurable rounds)</li>
            <li><strong className={darkMode ? "text-white font-mono" : "font-mono"}>remember</strong> - Enable/disable "remember me" functionality and set token lifetime</li>
          </ul>
        </div>
      </div>

      {/* Testing the API */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Testing the Authentication API</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Here's how to test your authentication endpoints using curl:
        </p>

        <div className="space-y-4">
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Register a User</h4>
            <CodeExample
              code={`curl -X POST http://localhost:8000/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "firstname": "John",
    "lastname": "Doe"
  }'`}
              language="bash"
              title="Register Request"
              compact={true}
            />
            <div className={`mt-2 p-2 rounded ${darkMode ? "bg-gray-800/50" : "bg-gray-200"}`}>
              <p className={`text-xs font-mono ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                {'Response: {"{"}"success": true, "data": {"user": {...}, "message": "Registration successful!"{"}"}'}
              </p>
            </div>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Login</h4>
            <CodeExample
              code={`curl -X POST http://localhost:8000/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "john@example.com",
    "password": "password123",
    "remember": true
  }'`}
              language="bash"
              title="Login Request"
              compact={true}
            />
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Get Current User</h4>
            <CodeExample
              code={`curl -X GET http://localhost:8000/auth/me \\
  -H "Cookie: PHPSESSID=your_session_id"`}
              language="bash"
              title="Get User Request"
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Authentication Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Do These
            </h4>
            <ul className={`space-y-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Always use auth() helper instead of direct session access
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Protect sensitive routes with auth() middleware
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Use strong password requirements (min 8 characters)
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Enable "remember me" for better user experience
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Log authentication attempts for security monitoring
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              <span className="text-red-500 text-xl">×</span>
              Avoid These
            </h4>
            <ul className={`space-y-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Never store plain text passwords
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Don't expose user IDs in URLs or logs
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Avoid using simple or predictable passwords
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Don't skip validation rules on the User entity
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Avoid storing sensitive user data in sessions
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="flex items-start gap-3">
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Summary: Haven Makes Authentication Simple</h3>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Luxid Haven provides everything you need for secure authentication:
            </p>
            <ul className={`mt-3 space-y-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <li>✓ One-command installation with <strong className={darkMode ? "text-white font-mono" : "font-mono"}>composer require luxid/haven</strong></li>
              <li>✓ Automatic file generation with <strong className={darkMode ? "text-white font-mono" : "font-mono"}>php juice haven:install</strong></li>
              <li>✓ Complete User entity with Rocket ORM attributes</li>
              <li>✓ AuthAction with register, login, logout, and me endpoints</li>
              <li>✓ Global <strong className={darkMode ? "text-white font-mono" : "font-mono"}>auth()</strong> helper for easy access</li>
              <li>✓ Session-based authentication with bcrypt password hashing</li>
              <li>✓ "Remember me" functionality with secure tokens</li>
              <li>✓ Automatic route registration and middleware protection</li>
            </ul>
            <p className={`mt-3 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Haven handles all the complexity so you can focus on building your application.
              It's secure, modern, and incredibly easy to use. Just install, migrate, and you're ready to go!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
