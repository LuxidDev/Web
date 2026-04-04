import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  CheckCircle, ArrowRight,
  AlertCircle,
} from 'lucide-react';
import CodeExample from '@/components/CodeExample';
import InlineCodeExample from '@/components/InlineCodeExample';
import TerminalCommand from '@/components/TerminalCommand';

export default function RocketORMContent() {
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
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Rocket ORM: Modern Database Layer</h3>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Rocket is a modern, attribute-based ORM for the Luxid Framework. It leverages PHP 8 attributes for a clean,
              intuitive, and type-safe way to interact with your database.
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Rocket ORM Overview</h2>
      <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Rocket ORM is a powerful and expressive way to manage
        your database interactions. It follows the Active Record pattern but enhances it with modern PHP features
        like attributes, providing a more declarative and less verbose syntax.
      </p>
      <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Each Entity class corresponds to a database table, and each instance represents a row. Rocket handles
        automatic CRUD operations, validation, relationship management, and includes a powerful query builder,
        all while maintaining security through parameter binding and data sanitization.
      </p>

      {/* Installation & Configuration */}
      <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">Installation & Configuration</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Rocket is automatically included when you create a new Luxid Framework project. The database connection
          is configured using environment variables in your <strong className="font-mono text-gray-900 dark:text-white">.env</strong> file.
        </p>
        <CodeExample
          code={`# Database Configuration
DB_DSN=mysql:host=127.0.0.1;dbname=myapp
DB_USER=root
DB_PASSWORD=secret

# Platform-specific (Linux/Arch with MariaDB)
# DB_DSN=mysql:unix_socket=/run/mysqld/mysqld.sock;dbname=myapp

# macOS with MAMP
# DB_DSN=mysql:unix_socket=/Applications/MAMP/tmp/mysql/mysql.sock;dbname=myapp`}
          title="Database Configuration (.env)"
          explanation="Configure your database connection for different environments."
          language="bash"
        />
      </div>

      {/* Defining Entities */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Defining Entities</h3>
      <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Entities are PHP classes that represent database tables. Use PHP 8 attributes to define the table structure,
        columns, and validation rules. This declarative approach keeps your code clean and focused.
      </p>

      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="flex items-center gap-3 mb-4">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">Basic Entity Example</h4>
        </div>

        <CodeExample
          code={`<?php
namespace App\\Entities;

use Rocket\\ORM\\Entity;
use Rocket\\Attributes\\Entity as EntityAttr;
use Rocket\\Attributes\\Column;
use Rocket\\Attributes\\Rules\\Required;
use Rocket\\Attributes\\Rules\\Email;
use Rocket\\Attributes\\Rules\\Min;
use Rocket\\Attributes\\Rules\\Unique;

#[EntityAttr(table: 'users')]
class User extends Entity
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
}`}
          language="php"
          title="User Entity"
          explanation="Define your table structure using PHP 8 attributes."
        />

        <div className="mt-6 grid grid-cols-1 gap-6">
          <div>
            <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Column Attributes</h5>
            <div className={`text-sm space-y-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <p><strong className="text-gray-900 dark:text-white">#[Column(primary: true)]</strong> - Sets column as primary key</p>
              <p><strong className="text-gray-900 dark:text-white">#[Column(autoIncrement: true)]</strong> - Auto-incrementing integer</p>
              <p><strong className="text-gray-900 dark:text-white">#[Column(hidden: true)]</strong> - Excludes from JSON serialization</p>
              <p><strong className="text-gray-900 dark:text-white">#[Column(autoCreate: true)]</strong> - Automatically sets on create</p>
              <p><strong className="text-gray-900 dark:text-white">#[Column(autoUpdate: true)]</strong> - Automatically updates on every save</p>
              <p><strong className="text-gray-900 dark:text-white">#[Column(nullable: true)]</strong> - Allows NULL values</p>
              <p><strong className="text-gray-900 dark:text-white">#[Column(default: value)]</strong> - Sets default value</p>
            </div>
          </div>
          <div>
            <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Validation Rules</h5>
            <div className={`text-sm space-y-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <p><strong className="text-gray-900 dark:text-white">#[Required]</strong> - Field cannot be empty</p>
              <p><strong className="text-gray-900 dark:text-white">#[Email]</strong> - Must be valid email</p>
              <p><strong className="text-gray-900 dark:text-white">#[Min(8)]</strong> - Minimum length/value</p>
              <p><strong className="text-gray-900 dark:text-white">#[Max(100)]</strong> - Maximum length/value</p>
              <p><strong className="text-gray-900 dark:text-white">#[Unique]</strong> - Must be unique in table</p>
              <p><strong className="text-gray-900 dark:text-white">#[In(['a', 'b'])]</strong> - Must be in allowed values</p>
            </div>
          </div>
        </div>
      </div>

      {/* Basic CRUD Operations */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Basic CRUD Operations</h3>
      <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Rocket provides a simple and intuitive interface for creating, reading, updating, and deleting records.
      </p>

      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              Create & Read
            </h4>
            <CodeExample
              code={`<?php
// Create new record
$user = new User();
$user->email = 'john@example.com';
$user->password = 'password123';
$user->firstname = 'John';
$user->lastname = 'Doe';

if ($user->save()) {
    echo "User created! ID: {$user->id}";
} else {
    print_r($user->getErrors());
}

// Find by ID
$user = User::find(1);

// Find with conditions
$user = User::findOne(['email' => 'john@example.com']);
$users = User::findAll(['is_active' => true], ['created_at' => 'DESC'], 10);

// Count records
$count = User::count();
$count = User::count(['status' => 'active']);`}
              title="Create and Read Operations"
              explanation="Basic create and read operations using Rocket ORM"
              language="php"
            />
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              Update & Delete
            </h4>
            <CodeExample
              code={`<?php
// Update existing record
$user = User::find(1);
$user->firstname = 'Jonathan';
$user->save();

// Delete record
$user = User::find(1);
$user->delete();

// Delete all records
User::deleteAll();

// Truncate table (delete all and reset auto-increment)
User::truncate();`}
              title="Update and Delete Operations"
              explanation="Update, delete, and bulk operations using Rocket ORM"
              language="php"
            />
          </div>
        </div>
      </div>

      {/* Query Builder */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Advanced Query Builder</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="flex items-center gap-3 mb-4">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">Fluent Query Building</h4>
        </div>

        <CodeExample
          code={`<?php
use App\\Entities\\User;

// Basic queries
$users = User::query()
    ->select(['id', 'firstname', 'lastname', 'email'])
    ->where('is_active', '=', true)
    ->where('age', '>=', 18)
    ->orderBy('created_at', 'DESC')
    ->limit(10)
    ->offset(20)
    ->all();

// Where IN
$users = User::query()
    ->whereIn('id', [1, 2, 3])
    ->all();

// Where NULL / NOT NULL
$users = User::query()
    ->whereNull('deleted_at')
    ->whereNotNull('email_verified_at')
    ->all();

// Complex WHERE conditions
$users = User::query()
    ->where('status', '=', 'active')
    ->where(function($query) {
        $query->where('age', '<', 30)
              ->orWhere('experience', '>', 5);
    })
    ->all();

// Aggregate functions
$total = User::query()->count();
$averageAge = User::query()->avg('age');
$maxSalary = User::query()->max('salary');

// Helper methods
$firstUser = User::first();        // Get first record
$lastUser = User::last();          // Get last record
$randomUsers = User::random(3);    // Get random records
$exists = User::exists();          // Check if any records exist`}
          language="php"
          title="Query Builder Examples"
          explanation="Build complex queries using the fluent query builder interface."
        />
      </div>

      {/* Relationships */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Relationships</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="flex items-center gap-3 mb-4">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">Defining Relationships</h4>
        </div>

        <CodeExample
          code={`<?php
namespace App\\Entities;

use Rocket\\Attributes\\Relations\\HasOne;
use Rocket\\Attributes\\Relations\\HasMany;
use Rocket\\Attributes\\Relations\\BelongsTo;

class User extends Entity
{
    #[HasOne(Profile::class, 'user_id', 'id')]
    protected $profile;
    
    #[HasMany(Post::class, 'user_id', 'id')]
    protected $posts;
}

class Post extends Entity
{
    #[BelongsTo(User::class, 'user_id', 'id')]
    protected $author;
    
    #[HasMany(Comment::class, 'post_id', 'id')]
    protected $comments;
}

class Profile extends Entity
{
    #[BelongsTo(User::class, 'user_id', 'id')]
    protected $user;
}`}
          language="php"
          title="Entity Relationships"
          explanation="Define relationships using attributes. Supports HasOne, HasMany, and BelongsTo."
        />

        <div className="mt-6">
          <h5 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
            Using Relationships
          </h5>
          <CodeExample
            code={`<?php
// Access related data
$user = User::find(1);
echo $user->profile->bio;           // HasOne
foreach ($user->posts as $post) {   // HasMany
    echo $post->title;
}

// Inverse relationship
$post = Post::find(1);
echo $post->author->name;           // BelongsTo

// Create related records
$user->posts()->create([
    'title' => 'New Post',
    'content' => 'Content here...'
]);

// Query through relationships
$posts = $user->posts()
    ->where('published', '=', true)
    ->orderBy('created_at', 'DESC')
    ->all();`}
            title="Working with Relationships"
            explanation="Query and manipulate related data using relationship methods"
            language="php"
          />
        </div>
      </div>

      {/* Computed Properties */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Computed Properties</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Use the <strong className="font-mono text-gray-900 dark:text-white">get</strong> prefix to create computed properties that aren't stored in the database.
        </p>
        <CodeExample
          code={`<?php
class User extends Entity
{
    #[Column]
    public string $firstname = '';
    
    #[Column]
    public string $lastname = '';
    
    // Computed property (not stored)
    public function getFullName(): string
    {
        return $this->firstname . ' ' . $this->lastname;
    }
    
    public function getInitials(): string
    {
        return strtoupper(substr($this->firstname, 0, 1) . substr($this->lastname, 0, 1));
    }
}

// Usage
$user = User::find(1);
echo $user->fullName;  // "John Doe"
echo $user->initials;  // "JD"`}
          language="php"
          title="Computed Properties"
          explanation="Add derived values that don't need database storage."
        />
      </div>

      {/* Lifecycle Hooks */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Lifecycle Hooks</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="flex items-center gap-3 mb-4">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">Entity Lifecycle Events</h4>
        </div>

        <CodeExample
          code={`<?php
class User extends Entity
{
    protected function beforeSave(): void
    {
        // Hash password before saving
        if (!empty($this->password) && !$this->isPasswordHashed()) {
            $this->password = password_hash($this->password, PASSWORD_DEFAULT);
        }
        
        // Auto-set timestamps
        if ($this->isNew && empty($this->created_at)) {
            $this->created_at = date('Y-m-d H:i:s');
        }
        $this->updated_at = date('Y-m-d H:i:s');
    }
    
    protected function afterSave(): void
    {
        // Clear cache, send welcome email, etc.
        Cache::forget('user_' . $this->id);
    }
    
    protected function beforeDelete(): void
    {
        // Soft delete related records
        $this->posts()->update(['deleted_at' => now()]);
    }
    
    protected function afterDelete(): void
    {
        // Log deletion
        Log::info("User {$this->id} was deleted");
    }
    
    private function isPasswordHashed(): bool
    {
        return password_get_info($this->password)['algo'] !== 0;
    }
}`}
          language="php"
          title="Lifecycle Hooks"
          explanation="Add custom logic at different points in the Entity lifecycle."
        />
      </div>

      {/* Migrations */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Database Migrations</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="flex items-center gap-3 mb-4">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">Version Control for Your Database</h4>
        </div>

        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Migrations allow you to version control your database schema changes.
        </p>

        <TerminalCommand
          command="php juice make:migration create_users_table"
          description="Create a Migration. Generate migration files using the CLI."
        />

        <div className="mt-4">
          <CodeExample
            code={`<?php
use Rocket\\Migration\\Migration;
use Rocket\\Migration\\Rocket;

class m00001_create_users_table extends Migration
{
    public function up(): void
    {
        Rocket::table('users', function($column) {
            $column->id('id');
            $column->string('email')->unique();
            $column->string('password')->hidden();
            $column->string('firstname');
            $column->string('lastname');
            $column->timestamps();
            $column->softDeletes(); // Adds deleted_at column for soft deletes
        });
    }
    
    public function down(): void
    {
        Rocket::drop('users');
    }
}`}
            language="php"
            title="Migration Structure"
            explanation="Define schema changes in up() and rollback in down()."
          />
        </div>

        <div className="mt-6">
          <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Column Types</h5>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-2 text-sm">
            <div className={darkMode ? "text-white" : ""}><strong className="text-gray-900 dark:text-white">id()</strong> - Auto-incrementing primary key</div>
            <div className={darkMode ? "text-white" : ""}><strong className="text-gray-900 dark:text-white">string()</strong> - VARCHAR</div>
            <div className={darkMode ? "text-white" : ""}><strong className="text-gray-900 dark:text-white">text()</strong> - TEXT</div>
            <div className={darkMode ? "text-white" : ""}><strong className="text-gray-900 dark:text-white">integer()</strong> - INT</div>
            <div className={darkMode ? "text-white" : ""}><strong className="text-gray-900 dark:text-white">float()</strong> - FLOAT</div>
            <div className={darkMode ? "text-white" : ""}><strong className="text-gray-900 dark:text-white">decimal(10,2)</strong> - DECIMAL</div>
            <div className={darkMode ? "text-white" : ""}><strong className="text-gray-900 dark:text-white">boolean()</strong> - BOOLEAN</div>
            <div className={darkMode ? "text-white" : ""}><strong className="text-gray-900 dark:text-white">datetime()</strong> - DATETIME</div>
            <div className={darkMode ? "text-white" : ""}><strong className="text-gray-900 dark:text-white">timestamps()</strong> - created_at + updated_at</div>
            <div className={darkMode ? "text-white" : ""}><strong className="text-gray-900 dark:text-white">softDeletes()</strong> - deleted_at column</div>
          </div>
        </div>

        <div className="mt-6">
          <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Running Migrations</h5>
          <div className="space-y-2">
            <TerminalCommand command="php juice db:migrate" description="Run all pending database migrations" />
            <TerminalCommand command="php juice db:rollback" description="Rollback the most recent migration batch" />
            <TerminalCommand command="php juice db:reset" description="Rollback all migrations (reset database)" />
            <TerminalCommand command="php juice db:fresh --seed" description="Reset, re-run all migrations, and seed. Fresh migrate and seed database" />
          </div>
        </div>
      </div>

      {/* Seeding */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Database Seeding</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="flex items-center gap-3 mb-4">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">Populate Your Database with Test Data</h4>
        </div>

        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Seeders allow you to populate your database with test or default data. Use factories to generate consistent data.
        </p>

        <TerminalCommand
          command="php juice make:factory UserFactory
php juice make:seeder UserSeeder"
          description="Create Factory and Seeder. Generate a factory for fake data and a seeder to populate it."
        />

        <div className="mt-4">
          <CodeExample
            code={`<?php
namespace Seeds;

use Rocket\\Seed\\Factory;
use Rocket\\Seed\\Faker;
use App\\Entities\\User;

class UserFactory extends Factory
{
    protected static function getEntityClass(): string
    {
        return User::class;
    }
    
    protected function definition(): array
    {
        return [
            'firstname' => Faker::firstName(),
            'lastname' => Faker::lastName(),
            'email' => Faker::unique()->email(),
            'password' => 'password123',
            'is_active' => true,
        ];
    }
    
    public function admin(): self
    {
        return $this->state([
            'firstname' => 'Admin',
            'lastname' => 'User',
            'email' => 'admin@example.com',
            'is_admin' => true,
        ]);
    }
}`}
            language="php"
            title="Factory Definition"
            explanation="Define how to generate fake data for your entities."
          />
        </div>

        <div className="mt-4">
          <CodeExample
            code={`<?php
namespace Seeds;

use Rocket\\Seed\\Seeder;
use App\\Entities\\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        echo "🌱 Seeding users...\\n";
        
        // Clean the table before seeding
        User::truncate();
        
        // Create admin user
        $admin = new User();
        $admin->email = 'admin@example.com';
        $admin->password = 'admin123';
        $admin->firstname = 'Admin';
        $admin->lastname = 'User';
        $admin->save();
        echo "  ✓ Created admin user\\n";
        
        // Create 10 regular users using the factory
        UserFactory::new()->count(10)->create();
        echo "  ✓ Created 10 regular users\\n";
        
        echo "✅ User seeding completed!\\n";
    }
}`}
            language="php"
            title="Seeder Example"
            explanation="Populate your database with data using factories."
          />
        </div>

        <div className="mt-4">
          <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Running Seeders</h5>
          <div className="space-y-2">
            <TerminalCommand command="php juice seed" description="Run all seeders. Execute all database seeders" />
            <TerminalCommand command="php juice seed UserSeeder" description="Run a specific seeder. Execute a specific seeder class" />
          </div>
        </div>
      </div>

      {/* Validation */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Validation</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="flex items-center gap-3 mb-4">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white">Built-in & Custom Validation</h4>
        </div>

        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Validation runs automatically when calling <strong className="font-mono text-gray-900 dark:text-white">save()</strong>. You can also validate manually.
        </p>

        <CodeExample
          code={`<?php
class User extends Entity
{
    public function validate(): bool
    {
        // Run default validation first
        if (!parent::validate()) {
            return false;
        }
        
        // Add custom validation
        if (strpos($this->email, 'example.com') !== false) {
            $this->addError('email', 'Email cannot be from example.com');
            return false;
        }
        
        if (strlen($this->password) < 8) {
            $this->addError('password', 'Password must be at least 8 characters');
            return false;
        }
        
        return true;
    }
}

// Usage
$user = new User();
$user->email = 'invalid-email';

if (!$user->validate()) {
    foreach ($user->getErrors() as $field => $errors) {
        echo "{$field}: " . implode(', ', $errors);
    }
}`}
          language="php"
          title="Custom Validation"
          explanation="Add your own validation rules beyond the built-in attributes."
        />
      </div>

      {/* Performance Tips */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Rocket ORM Performance Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-bold text-gray-900 dark:text-white">Eager Loading</h4>
            </div>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>with()</strong> to load relationships and avoid N+1 queries.
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-bold text-gray-900 dark:text-white">Select Only Needed</h4>
            </div>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>select()</strong> to fetch only required columns.
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-bold text-gray-900 dark:text-white">Use Indexes</h4>
            </div>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Ensure database indexes on frequently queried columns.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Rocket ORM Best Practices</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Do These Column */}
          <div className={`p-5 rounded-xl ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-4 flex items-center gap-2 text-lg text-gray-900 dark:text-white">
              Do These
              <CheckCircle className="w-5 h-5 text-green-500" />
            </h4>
            <ul className={`space-y-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Always set default values for typed properties <strong className={`px-1.5 py-0.5 rounded text-xs font-mono ${darkMode ? "bg-gray-800 text-green-400" : "bg-gray-200 text-green-800"}`}>public int $id = 0;</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use <strong className={`px-1.5 py-0.5 rounded text-xs font-mono ${darkMode ? "bg-gray-800 text-green-400" : "bg-gray-200 text-green-800"}`}>hidden: true</strong> for sensitive data (passwords, tokens)</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Add validation rules to ensure data integrity</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use lifecycle hooks for side effects like password hashing</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Leverage relationships to keep code clean and expressive</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use the query builder for complex queries instead of raw SQL</span>
              </li>
            </ul>
          </div>

          {/* Avoid These Column */}
          <div className={`p-5 rounded-xl ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-4 flex items-center gap-2 text-lg text-gray-900 dark:text-white">
              Avoid These
              <span className="text-red-500 text-xl font-bold">×</span>
            </h4>
            <ul className={`space-y-3 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Don't put business logic in Actions only - keep it in Entities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid raw SQL unless absolutely necessary</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Don't skip validation rules</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid <strong className={`px-1.5 py-0.5 rounded text-xs font-mono ${darkMode ? "bg-gray-800 text-red-400" : "bg-gray-200 text-red-800"}`}>SELECT *</strong> in production</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Don't forget to handle database errors and validation failures</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid N+1 queries - use eager loading</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CLI Commands Reference */}
      <div className={`mt-8 rounded-xl overflow-hidden ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className={`p-6 border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
          <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            Rocket CLI Commands Reference
          </h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 gap-8">
            {/* Database Commands */}
            <div>
              <h4 className="font-bold mb-4 flex items-center gap-2 text-base text-gray-900 dark:text-white">
                Database Commands
              </h4>
              <div className="space-y-2">
                <div className={`flex items-baseline gap-3 p-2 rounded-lg ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`}>
                  <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice db:create</strong>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Create database</span>
                </div>
                <div className={`flex items-baseline gap-3 p-2 rounded-lg ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`}>
                  <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice db:migrate</strong>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Run migrations</span>
                </div>
                <div className={`flex items-baseline gap-3 p-2 rounded-lg ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`}>
                  <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice db:rollback</strong>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Rollback last batch</span>
                </div>
                <div className={`flex items-baseline gap-3 p-2 rounded-lg ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`}>
                  <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice db:reset</strong>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Rollback all migrations</span>
                </div>
                <div className={`flex items-baseline gap-3 p-2 rounded-lg ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`}>
                  <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice db:fresh --seed</strong>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Reset and re-migrate with seed</span>
                </div>
                <div className={`flex items-baseline gap-3 p-2 rounded-lg ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`}>
                  <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice seed</strong>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Run all seeders</span>
                </div>
              </div>
            </div>

            {/* Code Generation & Info Commands */}
            <div>
              <div className="mb-6">
                <h4 className="font-bold mb-4 flex items-center gap-2 text-base text-gray-900 dark:text-white">
                  Code Generation
                </h4>
                <div className="space-y-2">
                  <div className={`flex items-baseline gap-3 p-2 rounded-lg ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`}>
                    <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice make:entity Product</strong>
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Create entity</span>
                  </div>
                  <div className={`flex items-baseline gap-3 p-2 rounded-lg ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`}>
                    <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice make:migration</strong>
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Create migration</span>
                  </div>
                  <div className={`flex items-baseline gap-3 p-2 rounded-lg ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`}>
                    <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice make:seeder</strong>
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Create seeder</span>
                  </div>
                  <div className={`flex items-baseline gap-3 p-2 rounded-lg ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`}>
                    <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice make:factory</strong>
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Create factory</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-4 flex items-center gap-2 text-base text-gray-900 dark:text-white">
                  Info Commands
                </h4>
                <div className="space-y-2">
                  <div className={`flex items-baseline gap-3 p-2 rounded-lg ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`}>
                    <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice status</strong>
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Check application status</span>
                  </div>
                  <div className={`flex items-baseline gap-3 p-2 rounded-lg ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-gray-100"}`}>
                    <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice routes</strong>
                    <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>List all routes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          <AlertCircle className="w-5 h-5 text-gray-500" />
          Troubleshooting
        </h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">"Typed property must not be accessed before initialization"</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Add default values to all typed properties: <strong className={darkMode ? "text-white font-mono" : "font-mono"}>public int $id = 0;</strong>
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">"Class not found"</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Run <strong className={darkMode ? "text-white font-mono" : "font-mono"}>composer dump-autoload</strong> to regenerate the autoloader.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">"Validation failed"</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Check <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'$entity->getErrors()'}</strong> for detailed error messages.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">"Connection failed"</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Verify your <strong className={darkMode ? "text-white font-mono" : "font-mono"}>.env</strong> database configuration and ensure the database server is running.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
