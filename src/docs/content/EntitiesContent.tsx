import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Database, CheckCircle, ArrowRight, Zap, Code } from "lucide-react";
import CodeExample from "@/components/CodeExample";
import InlineCodeExample from "@/components/InlineCodeExample";

export default function EntitiesContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Header */}
      <div
        className={`mb-8 p-6 rounded-2xl ${
          darkMode
            ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
            : "bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200"
        }`}
      >
        <div className="flex items-start gap-4">
          <Database
            className={`w-12 h-12 ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          />
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Entities: The Data Layer
            </h3>
            <p
              className={`text-lg ${
                darkMode ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              Entities represent your data models and handle all database
              operations with L ORM.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <h2 className="text-3xl font-bold mb-6">What Are Entities?</h2>
      <p
        className={`text-lg mb-6 ${
          darkMode ? "text-zinc-300" : "text-zinc-700"
        }`}
      >
        Entities are Luxid's implementation of the Active Record pattern. Each
        Entity class represents a database table, and each instance represents a
        row in that table. Entities handle data validation, business rules, and
        database operations.
      </p>

      {/* Entity Example */}
      <CodeExample
        title="app/Entities/User.php - Basic Entity Example"
        explanation="Entities extend DbEntity and define table structure, validation, and custom business logic."
        code={`<?php
namespace App\\Entities;

use Luxid\\Database\\DbEntity;

class User extends DbEntity
{
    public int $id = 0;
    public string $email = '';
    public string $password = '';
    public string $firstname = '';
    public string $lastname = '';
    public string $created_at = '';

    public static function tableName(): string
    {
        return 'users';
    }

    public static function primaryKey(): string
    {
        return 'id';
    }

    public function attributes(): array
    {
        return ['email', 'password', 'firstname', 'lastname', 'created_at'];
    }

    public function rules(): array
    {
        return [
            'email' => [self::RULE_REQUIRED, self::RULE_EMAIL],
            'password' => [self::RULE_REQUIRED, [self::RULE_MIN, 'min' => 8]],
            'firstname' => [self::RULE_REQUIRED],
            'lastname' => [self::RULE_REQUIRED],
        ];
    }

    public function save(): bool
    {
        if ($this->id === 0) {
            $this->created_at = date('Y-m-d H:i:s');
            $this->password = password_hash($this->password, PASSWORD_DEFAULT);
        }

        return parent::save();
    }
}`}
        language="php"
      />

      {/* Usage */}
      <h3 className="text-2xl font-bold mb-4 mt-8">Entity Methods and Usage</h3>

      <div
        className={`mb-8 p-6 rounded-xl ${
          darkMode
            ? "bg-zinc-900/50 border border-zinc-800"
            : "bg-zinc-50 border border-zinc-200"
        }`}
      >
        <div className="grid grid-cols-1 gap-6">
          {/* CRUD */}
          <div>
            <InlineCodeExample
              code={`<?php
// Create
$user = new User();
$user->email = 'test@example.com';
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
$user->delete();`}
              title="Basic CRUD Operations"
              description="Create, Read, Update, and Delete operations using Entity methods"
              icon={Database}
              color="blue"
              language="php"
              compact={true}
            />
          </div>

          {/* Validation */}
          <div>
            <InlineCodeExample
              code={`<?php
$user = new User();
$user->loadData($_POST);

if ($user->validate()) {
    $user->save();
    echo "User saved!";
} else {
    $errors = $user->errors;

    if ($user->hasError('email')) {
        echo $user->getFirstError('email');
    }
}`}
              title="Validation Example"
              description="Data validation and error handling with Entities"
              icon={CheckCircle}
              color="green"
              language="php"
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <h3 className="text-2xl font-bold mb-4">Advanced Entity Features</h3>

      <div className="space-y-6">
        {/* Relationships */}
        <div
          className={`p-6 rounded-xl ${
            darkMode
              ? "bg-purple-900/20 border border-purple-800"
              : "bg-purple-50 border border-purple-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`p-2 rounded-lg ${darkMode ? "bg-purple-500/10" : "bg-purple-100"}`}
            >
              <Zap
                className={`w-6 h-6 ${darkMode ? "text-purple-400" : "text-purple-600"}`}
              />
            </div>
            <h4 className="text-xl font-bold">Entity Relationships</h4>
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
    public int $user_id = 0;
    public string $created_at = '';

    public function user()
    {
        return $this->hasOne(User::class, ['id' => 'user_id']);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, ['post_id' => 'id']);
    }
}

class Comment extends DbEntity
{
    public int $id = 0;
    public string $content = '';
    public int $post_id = 0;
    public int $user_id = 0;

    public function post()
    {
        return $this->belongsTo(Post::class, ['post_id' => 'id']);
    }

    public function user()
    {
        return $this->belongsTo(User::class, ['user_id' => 'id']);
    }
}

// Usage
$post = Post::find(1);
$author = $post->user(); // Get post author
$comments = $post->comments(); // Get all comments for this post`}
            language="php"
            title="Entity Relationships Example"
            explanation="Entities support relationships like hasOne, hasMany, and belongsTo."
          />
        </div>

        {/* Custom Methods */}
        <div
          className={`p-6 rounded-xl ${
            darkMode
              ? "bg-blue-900/20 border border-blue-800"
              : "bg-blue-50 border border-blue-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`p-2 rounded-lg ${darkMode ? "bg-blue-500/10" : "bg-blue-100"}`}
            >
              <Code
                className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
              />
            </div>
            <h4 className="text-xl font-bold">Custom Business Logic</h4>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <InlineCodeExample
              code={`<php
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

public function sendWelcomeEmail()
{
    // Email sending logic here
    return Mail::send($this->email, 'Welcome!', 'welcome_template');
}`}
              title="Custom Methods"
              description="Add custom business logic and query methods to your Entities"
              icon={Code}
              color="blue"
              language="php"
            />

            <InlineCodeExample
              code={`<php
// Usage examples
$activeUsers = User::findActiveUsers();
$user = User::findByEmail('john@example.com');

if ($user) {
    $user->activate();
    $fullName = $user->getFullName();
    $user->sendWelcomeEmail();
}

// Scope methods
public function scopeActive($query)
{
    return $query->where('active', true);
}

public function scopeRecent($query, $days = 7)
{
    $date = date('Y-m-d H:i:s', strtotime("-$days days"));
    return $query->where('created_at', '>=', $date);
}

// Using scopes
$recentActiveUsers = User::find()->active()->recent(30)->all();`}
              title="Scopes & Advanced Usage"
              description="Query scopes and advanced Entity usage patterns"
              icon={Database}
              color="green"
              language="php"
            />
          </div>
        </div>
      </div>

      {/* Validation Rules */}
      <h3 className="text-2xl font-bold mb-4 mt-8">
        Validation Rules Reference
      </h3>

      <div
        className={`mb-8 p-6 rounded-xl ${
          darkMode
            ? "bg-yellow-900/20 border border-yellow-800"
            : "bg-yellow-50 border border-yellow-200"
        }`}
      >
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h4 className="font-bold mb-2">Built-in Validation Rules</h4>
            <ul
              className={`space-y-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
            >
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                <code>self::RULE_REQUIRED</code> - Field is required
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                <code>self::RULE_EMAIL</code> - Must be valid email
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                <code>self::RULE_MIN</code> - Minimum length/value
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                <code>self::RULE_MAX</code> - Maximum length/value
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                <code>self::RULE_UNIQUE</code> - Must be unique in database
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                <code>self::RULE_MATCH</code> - Must match another field
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">Custom Validation Examples</h4>
            <InlineCodeExample
              code={`<?php
public function rules(): array
{
    return [
        'email' => [
            self::RULE_REQUIRED,
            self::RULE_EMAIL,
            [self::RULE_UNIQUE, 'class' => self::class]
        ],
        'password' => [
            self::RULE_REQUIRED,
            [self::RULE_MIN, 'min' => 8],
            [self::RULE_MAX, 'max' => 64]
        ],
        'confirmPassword' => [
            self::RULE_REQUIRED,
            [self::RULE_MATCH, 'match' => 'password']
        ],
        'age' => [
            self::RULE_REQUIRED,
            [self::RULE_MIN, 'min' => 18],
            [self::RULE_MAX, 'max' => 100]
        ],
        'username' => [
            self::RULE_REQUIRED,
            [self::RULE_MIN, 'min' => 3],
            [self::RULE_MAX, 'max' => 20],
            [self::RULE_UNIQUE, 'class' => self::class]
        ]
    ];
}`}
              title="Validation Rules Configuration"
              description="Comprehensive validation rules configuration for Entity fields"
              icon={CheckCircle}
              color="yellow"
              language="php"
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* Summary */}
      <div
        className={`mt-8 p-6 rounded-xl ${
          darkMode
            ? "bg-zinc-900/50 border border-zinc-800"
            : "bg-zinc-50 border border-zinc-200"
        }`}
      >
        <h3 className="text-xl font-bold mb-4">Entity Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Do These
            </h4>
            <ul
              className={`space-y-2 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Put business logic in Entities
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Use Entity validation rules
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
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <span className="text-red-500 text-xl">×</span>
              Avoid These
            </h4>
            <ul
              className={`space-y-2 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Don't put HTTP logic in Entities
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Avoid direct SQL in Entities
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
