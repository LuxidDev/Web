import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Database, CheckCircle, ArrowRight, Zap, Code } from "lucide-react";
import CodeExample from "@/components/CodeExample";

export default function EntitiesContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Header */}
      <div
        className={`mb-8 p-6 rounded-2xl ${darkMode
          ? "bg-gray-900/50 border border-gray-800"
          : "bg-gray-50 border border-gray-200"
          }`}
      >
        <div className="flex items-start gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Entities: The Data Layer
            </h3>
            <p
              className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              Entities represent your data models and handle all database
              operations with Rocket ORM.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">What Are Entities?</h2>
      <p
        className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"
          }`}
      >
        Entities are Luxid's implementation of the Active Record pattern using Rocket ORM. Each
        Entity class represents a database table, and each instance represents a
        row in that table. Entities handle data validation, business rules, and
        database operations using PHP 8 attributes.
      </p>

      {/* Entity Example */}
      <CodeExample
        title="app/Entities/User.php - Basic Entity Example"
        explanation="Entities extend Entity and use PHP 8 attributes to define table structure, validation, and custom business logic."
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

    public function getDisplayName(): string
    {
        return trim($this->firstname . ' ' . $this->lastname) ?: $this->email;
    }
}`}
        language="php"
      />

      {/* Usage */}
      <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">Entity Methods and Usage</h3>

      <div
        className={`mb-8 p-6 rounded-xl ${darkMode
          ? "bg-gray-900/50 border border-gray-800"
          : "bg-gray-50 border border-gray-200"
          }`}
      >
        <div className="grid grid-cols-1 gap-6">
          {/* CRUD */}
          <div>
            <CodeExample
              code={`<?php
// Create
$user = new User();
$user->email = 'test@example.com';
$user->password = 'password123';
$user->firstname = 'John';
$user->lastname = 'Doe';
$user->save();

// Read
$user = User::find(1);
$user = User::findOne(['email' => 'test@example.com']);
$users = User::findAll(['active' => true], 'created_at DESC');

// Update
$user = User::find(1);
$user->email = 'new@example.com';
$user->save();

// Delete
$user = User::find(1);
$user->delete();

// Count
$total = User::count();`}
              title="Basic CRUD Operations"
              explanation="Create, Read, Update, and Delete operations using Entity methods"
              language="php"
              compact={true}
            />
          </div>

          {/* Validation */}
          <div>
            <CodeExample
              code={`<?php
$user = new User();
$user->email = 'invalid-email';
$user->password = '123';
$user->firstname = 'John';

if ($user->validate()) {
    $user->save();
    echo "User saved!";
} else {
    $errors = $user->getErrors();

    if ($user->hasError('email')) {
        echo $user->getFirstError('email');
    }

    // Print all errors
    foreach ($user->getErrors() as $field => $errors) {
        echo "$field: " . implode(', ', $errors);
    }
}`}
              title="Validation Example"
              explanation="Data validation and error handling with Entities"
              language="php"
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Advanced Entity Features</h3>

      <div className="space-y-6">
        {/* Relationships */}
        <div
          className={`p-6 rounded-xl ${darkMode
            ? "bg-gray-900/50 border border-gray-800"
            : "bg-gray-50 border border-gray-200"
            }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">Entity Relationships</h4>
          </div>

          <CodeExample
            code={`<?php
namespace App\\Entities;

use Rocket\\ORM\\Entity;
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

class Comment extends Entity
{
    #[BelongsTo(Post::class, 'post_id', 'id')]
    protected $post;
    
    #[BelongsTo(User::class, 'user_id', 'id')]
    protected $author;
}

// Usage
$post = Post::find(1);
$author = $post->author; // Get post author
$comments = $post->comments; // Get all comments for this post

$user = User::find(1);
$profile = $user->profile; // Get user profile
$posts = $user->posts; // Get all user posts`}
            language="php"
            title="Entity Relationships Example"
            explanation="Entities support relationships like HasOne, HasMany, and BelongsTo using PHP 8 attributes."
          />
        </div>

        {/* Custom Methods */}
        <div
          className={`p-6 rounded-xl ${darkMode
            ? "bg-gray-900/50 border border-gray-800"
            : "bg-gray-50 border border-gray-200"
            }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">Custom Business Logic</h4>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <CodeExample
              code={`<?php
// Custom query methods
public static function findActiveUsers()
{
    return self::findAll(['active' => true], 'created_at DESC');
}

public static function findByEmail($email)
{
    return self::findOne(['email' => $email]);
}

// Business logic methods
public function activate()
{
    $this->active = true;
    $this->activated_at = date('Y-m-d H:i:s');
    return $this->save();
}

public function getFullName()
{
    return trim($this->firstname . ' ' . $this->lastname);
}

public function getInitials()
{
    return strtoupper(substr($this->firstname, 0, 1) . substr($this->lastname, 0, 1));
}

public function sendWelcomeEmail()
{
    // Email sending logic here
    return Mail::send($this->email, 'Welcome!', 'welcome_template');
}`}
              title="Custom Methods"
              explanation="Add custom business logic and query methods to your Entities"
              language="php"
            />

            <CodeExample
              code={`<?php
// Query scopes using the query builder
public static function active()
{
    return self::query()->where('active', '=', true);
}

public static function recent($days = 7)
{
    $date = date('Y-m-d H:i:s', strtotime("-$days days"));
    return self::query()->where('created_at', '>=', $date);
}

public static function byRole($role)
{
    return self::query()->where('role', '=', $role);
}

// Using scopes
$recentActiveUsers = User::active()->recent(30)->all();
$admins = User::byRole('admin')->all();

// Combining with query builder
$users = User::active()
    ->orderBy('created_at', 'DESC')
    ->limit(10)
    ->all();`}
              title="Scopes & Advanced Usage"
              explanation="Query scopes and advanced Entity usage patterns using the query builder"
              language="php"
            />
          </div>
        </div>
      </div>

      {/* Lifecycle Hooks */}
      <h3 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">Lifecycle Hooks</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Entities provide lifecycle hooks that run at specific points during the save/delete process:
        </p>
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
        // Clean up related records
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
          explanation="Override these methods to add custom logic at different points in the Entity lifecycle"
        />
      </div>

      {/* Validation Rules */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Validation Rules Reference
      </h3>

      <div
        className={`mb-8 p-6 rounded-xl ${darkMode
          ? "bg-gray-900/50 border border-gray-800"
          : "bg-gray-50 border border-gray-200"
          }`}
      >
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Built-in Validation Rules</h4>
            <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li className="flex items-start gap-2">
                <span className="text-gray-700 dark:text-gray-300">#[Required]</span> - Field is required
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-700 dark:text-gray-300">#[Email]</span> - Must be valid email
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-700 dark:text-gray-300">#[Min(8)]</span> - Minimum length/value
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-700 dark:text-gray-300">#[Max(100)]</span> - Maximum length/value
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-700 dark:text-gray-300">#[Unique]</span> - Must be unique in database
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-700 dark:text-gray-300">#[In(['a', 'b'])]</span> - Must be in allowed values
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Custom Validation Examples</h4>
            <CodeExample
              code={`<?php
class User extends Entity
{
    #[Column]
    #[Required]
    #[Email]
    #[Unique]
    public string $email = '';

    #[Column(hidden: true)]
    #[Required]
    #[Min(8)]
    #[Max(64)]
    public string $password = '';

    #[Column]
    #[Required]
    #[Min(3)]
    #[Max(20)]
    #[Unique]
    public string $username = '';

    #[Column]
    #[Required]
    #[Min(18)]
    #[Max(100)]
    public int $age = 0;

    #[Column]
    #[In(['admin', 'user', 'moderator'])]
    public string $role = 'user';

    // Custom validation in beforeSave
    protected function beforeSave(): void
    {
        if (strpos($this->email, 'example.com') !== false) {
            throw new \\Exception('Email cannot be from example.com');
        }
    }
}`}
              title="Validation Rules Configuration"
              explanation="Comprehensive validation rules configuration using PHP 8 attributes"
              language="php"
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div
        className={`mt-8 p-6 rounded-xl ${darkMode
          ? "bg-gray-900/50 border border-gray-800"
          : "bg-gray-50 border border-gray-200"
          }`}
      >
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Entity Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              Do These
              <CheckCircle className="w-5 h-5 text-green-500" />
            </h4>
            <ul
              className={`space-y-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Put business logic in Entities
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Use validation attributes for data integrity
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Create custom query methods
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Define relationships between Entities
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Use type hints for properties
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              Avoid These
              <span className="text-red-500 text-xl">×</span>
            </h4>
            <ul
              className={`space-y-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Don't put HTTP logic in Entities
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Avoid raw SQL (use query builder)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Don't skip validation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Avoid fat Entities (split them)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Don't access $_POST/$_GET directly
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
