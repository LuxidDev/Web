import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Database, Link, Search, Settings, Key, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import CodeExample from '@/components/CodeExample';
import InlineCodeExample from '@/components/InlineCodeExample';

export default function LORMContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'
          : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
      }`}>
        <div className="flex items-start gap-4">
          <Database className={`w-12 h-12 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">L ORM: Database Made Easy</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              L ORM is Luxid's Active Record implementation that makes database operations intuitive and secure.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">L ORM Overview</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        L ORM (Luxid Object-Relational Mapping) follows the Active Record pattern where each Entity class
        corresponds to a database table, and each instance represents a row. It provides automatic CRUD
        operations, validation, and relationship management.
      </p>

      <h3 className="text-2xl font-bold mb-4">Basic CRUD Operations</h3>

      <div className={`mb-8 p-6 rounded-xl ${
        darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <div className={`p-1.5 rounded ${darkMode ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
                <Database className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              Create & Read
            </h4>
            <InlineCodeExample
              code={`<?php
// Create new record
$user = new User();
$user->name = 'John Doe';
$user->email = 'john@example.com';
$user->save(); // Returns true/false

// Find by ID
$user = User::find(1);

// Find with conditions
$user = User::findOne(['email' => 'john@example.com']);
$users = User::findAll(['active' => true]);

// Count records
$count = User::count();
$count = User::count(['status' => 'active']);

// Pagination
$users = User::findAll([], 'created_at DESC', 10, 0);`}
              title="Create and Read Operations"
              description="Basic create and read operations using L ORM"
              icon={Database}
              color="blue"
              language="php"
              compact={true}
            />
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <div className={`p-1.5 rounded ${darkMode ? 'bg-green-500/10' : 'bg-green-100'}`}>
                <Settings className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              Update & Delete
            </h4>
            <InlineCodeExample
              code={`<?php
// Update existing record
$user = User::find(1);
$user->name = 'Jane Doe';
$user->save();

// Update multiple records
User::updateAll(['status' => 'inactive'], ['last_login' => ['<', strtotime('-30 days')]]);

// Delete record
$user = User::find(1);
$user->delete();

// Delete multiple records
User::deleteAll(['status' => 'banned']);

// Soft delete (if supported)
$user->softDelete();`}
              title="Update and Delete Operations"
              description="Update, delete, and bulk operations using L ORM"
              icon={Settings}
              color="green"
              language="php"
              compact={true}
            />
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Advanced Query Methods</h3>

      <div className={`mb-8 p-6 rounded-xl ${
        darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
            <Search className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h4 className="text-xl font-bold">Query Building</h4>
        </div>

        <CodeExample
          code={`<?php
// Complex WHERE conditions
$users = User::findAll([
    'status' => 'active',
    'created_at' => ['>=', '2024-01-01'],
    'age' => ['BETWEEN', [18, 65]]
], 'name ASC');

// OR conditions
$users = User::findAll([
    'OR' => [
        ['role' => 'admin'],
        ['role' => 'moderator']
    ]
]);

// JOIN queries
$posts = Post::findAllWithJoin('users', 'user_id = users.id', [
    'users.name as author_name'
]);

// Raw SQL (when needed)
$users = User::findBySql("
    SELECT * FROM users
    WHERE status = :status
    AND created_at > :date
", ['status' => 'active', 'date' => '2024-01-01']);

// Aggregate functions
$stats = [
    'total' => User::count(),
    'active' => User::count(['active' => true]),
    'revenue' => Order::sum('total'),
    'average' => Order::avg('total')
];`}
          language="php"
          title="Advanced Query Examples"
          explanation="L ORM supports complex queries while maintaining security through parameter binding."
        />
      </div>

      <h3 className="text-2xl font-bold mb-4">Relationships</h3>

      <div className={`mb-8 p-6 rounded-xl ${
        darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
            <Link className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          </div>
          <h4 className="text-xl font-bold">Defining Relationships</h4>
        </div>

        <CodeExample
          code={`<?php
namespace App\\Entities;

class User extends DbEntity
{
    // One-to-Many: User has many Posts
    public function posts()
    {
        return $this->hasMany(Post::class, 'user_id');
    }

    // One-to-One: User has one Profile
    public function profile()
    {
        return $this->hasOne(Profile::class, 'user_id');
    }

    // Many-to-Many: User belongs to many Roles
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles', 'user_id', 'role_id');
    }
}

class Post extends DbEntity
{
    // Many-to-One: Post belongs to a User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // Many-to-Many: Post has many Tags
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'post_tags', 'post_id', 'tag_id');
    }
}`}
          language="php"
          title="Entity Relationships"
          explanation="Define relationships in your Entities using intuitive methods."
        />

        <div className="mt-6">
          <h5 className="font-bold mb-2 flex items-center gap-2">
            <div className={`p-1.5 rounded ${darkMode ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
              <Link className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            Using Relationships
          </h5>
          <InlineCodeExample
            code={`<?php
// Get user with their posts
$user = User::find(1);
$posts = $user->posts; // Automatic loading

// Eager loading (prevents N+1 problem)
$users = User::with(['posts', 'profile'])->findAll();

// Filter related data
$recentPosts = $user->posts()
    ->where(['created_at' => ['>=', '2024-01-01']])
    ->orderBy('created_at', 'DESC')
    ->findAll();

// Count relationships
$postCount = $user->posts()->count();
$commentCount = $user->posts()->withCount('comments')->findAll();

// Create through relationships
$post = $user->posts()->create([
    'title' => 'New Post',
    'content' => 'Post content'
]);`}
            title="Working with Relationships"
            description="Query and manipulate related data using relationship methods"
            icon={Link}
            color="purple"
            language="php"
          />
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Events & Hooks</h3>

      <div className={`mb-8 p-6 rounded-xl ${
        darkMode ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-yellow-500/10' : 'bg-yellow-100'}`}>
            <Settings className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
          </div>
          <h4 className="text-xl font-bold">Lifecycle Hooks</h4>
        </div>

        <CodeExample
          code={`<?php
namespace App\\Entities;

class User extends DbEntity
{
    // Called before validation
    public function beforeValidate()
    {
        $this->slug = str_slug($this->name);
    }

    // Called after validation, before save
    public function beforeSave()
    {
        if ($this->isNewRecord()) {
            $this->created_at = date('Y-m-d H:i:s');
            $this->password = password_hash($this->password, PASSWORD_DEFAULT);
        }
        $this->updated_at = date('Y-m-d H:i:s');
    }

    // Called after save
    public function afterSave()
    {
        if ($this->isNewRecord()) {
            // Send welcome email
            $this->sendWelcomeEmail();
        }
    }

    // Called before delete
    public function beforeDelete()
    {
        // Clean up related records
        $this->posts()->delete();
        $this->comments()->delete();
    }

    // Custom finder methods
    public static function findActive()
    {
        return self::findAll(['active' => true], 'name ASC');
    }

    public static function findByEmail($email)
    {
        return self::findOne(['email' => $email]);
    }

    // Scopes for query building
    public function scopeActive($query)
    {
        return $query->where(['active' => true]);
    }

    public function scopeRecent($query, $days = 7)
    {
        return $query->where(['created_at' => ['>=', date('Y-m-d', strtotime("-$days days"))]]);
    }
}`}
          language="php"
          title="Entity Hooks and Custom Methods"
          explanation="Add custom logic at different points in the Entity lifecycle."
        />
      </div>

      <h3 className="text-2xl font-bold mb-4">Validation</h3>

      <div className={`mb-8 p-6 rounded-xl ${
        darkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-red-500/10' : 'bg-red-100'}`}>
            <Key className={`w-6 h-6 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
          </div>
          <h4 className="text-xl font-bold">Built-in Validation</h4>
        </div>

        <CodeExample
          code={`<?php
namespace App\\Entities;

class User extends DbEntity
{
    public function rules(): array
    {
        return [
            // Required field
            'name' => [self::RULE_REQUIRED],

            // Email format
            'email' => [
                self::RULE_REQUIRED,
                self::RULE_EMAIL,
                [self::RULE_UNIQUE, 'class' => self::class]
            ],

            // Minimum length
            'password' => [
                self::RULE_REQUIRED,
                [self::RULE_MIN, 'min' => 8]
            ],

            // Maximum length
            'bio' => [
                [self::RULE_MAX, 'max' => 500]
            ],

            // Match pattern
            'username' => [
                self::RULE_REQUIRED,
                [self::RULE_MATCH, 'pattern' => '/^[a-z0-9_]+$/']
            ],

            // Custom validation
            'age' => [
                [self::RULE_CALLBACK, 'callback' => 'validateAge']
            ],

            // Compare fields
            'password_confirm' => [
                [self::RULE_MATCH, 'match' => 'password']
            ]
        ];
    }

    // Custom validation method
    public function validateAge()
    {
        if ($this->age < 18) {
            $this->addError('age', 'You must be at least 18 years old');
            return false;
        }
        return true;
    }

    // Custom error messages
    public function errorMessages(): array
    {
        return [
            self::RULE_REQUIRED => '{field} is required',
            self::RULE_EMAIL => 'Please enter a valid email address',
            self::RULE_MIN => '{field} must be at least {min} characters',
            self::RULE_UNIQUE => '{field} "{value}" is already taken',
        ];
    }
}`}
          language="php"
          title="Entity Validation Rules"
          explanation="Define validation rules that are automatically checked before saving."
        />

        <div className="mt-6">
          <h5 className="font-bold mb-2 flex items-center gap-2">
            <div className={`p-1.5 rounded ${darkMode ? 'bg-red-500/10' : 'bg-red-100'}`}>
              <Key className={`w-4 h-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
            </div>
            Using Validation
          </h5>
          <InlineCodeExample
            code={`<?php
// Validate and save
$user = new User();
$user->loadData($_POST);

if ($user->validate()) {
    $user->save();
    echo "User saved successfully!";
} else {
    // Get all errors
    $errors = $user->errors;

    // Get specific field errors
    if ($user->hasError('email')) {
        echo $user->getFirstError('email');
    }

    // Display all errors
    foreach ($user->errors as $field => $fieldErrors) {
        foreach ($fieldErrors as $error) {
            echo "$field: $error\\n";
        }
    }
}`}
            title="Working with Validation"
            description="Validate Entity data and handle validation errors"
            icon={Key}
            color="red"
            language="php"
            compact={true}
          />
        </div>
      </div>

      <div className={`mt-8 p-6 rounded-xl ${
        darkMode
          ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'
          : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
      }`}>
        <h3 className="text-xl font-bold mb-4">Performance Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Zap className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h4 className="font-bold">Eager Loading</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Use <code className="font-mono">with()</code> to load relationships and avoid N+1 queries.
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Search className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              <h4 className="font-bold">Select Only Needed</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Use <code className="font-mono">select()</code> to fetch only required columns.
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Settings className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <h4 className="font-bold">Use Indexes</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Ensure database indexes on frequently queried columns.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <h3 className="text-xl font-bold mb-4">L ORM Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Do These
            </h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Use Entity validation for data integrity
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Implement relationships for data consistency
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Use eager loading to optimize queries
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Add indexes to frequently queried columns
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Use lifecycle hooks for business logic
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <span className="text-red-500 text-xl">×</span>
              Avoid These
            </h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Don't put business logic in Actions only
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Avoid raw SQL unless absolutely necessary
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Don't skip validation rules
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Avoid SELECT * in production
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Don't forget to handle database errors
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
