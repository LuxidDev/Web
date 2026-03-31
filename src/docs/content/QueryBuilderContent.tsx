import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Search, Filter, SortAsc, SortDesc, Hash, Calendar, CheckCircle,
  ArrowRight, AlertCircle, Code, Layers, Terminal, Database,
  GitBranch, Settings, Plus, Minus, BarChart, PieChart, TrendingUp
} from 'lucide-react';
import CodeExample from '@/components/CodeExample';
import InlineCodeExample from '@/components/InlineCodeExample';

export default function QueryBuilderContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Hero Section */}
      <div className={`mb-8 p-6 rounded-2xl ${darkMode
        ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20'
        : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'
        }`}>
        <div className="flex items-start gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Rocket Query Builder</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Build complex database queries with a fluent, intuitive PHP interface.
              Write safe, expressive queries without writing raw SQL.
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <h2 className="text-3xl font-bold mb-6">What is the Query Builder?</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        Rocket's Query Builder provides a fluent interface for constructing SQL queries programmatically.
        It's more flexible than raw SQL and more powerful than simple ORM methods, giving you complete
        control over your database interactions while maintaining security through automatic parameter binding.
      </p>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        The Query Builder helps you:
      </p>
      <ul className={`space-y-2 mb-8 ml-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Build complex queries with conditions, joins, and aggregations</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Prevent SQL injection with automatic parameter binding</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Write database-agnostic queries that work with MySQL, PostgreSQL, SQLite, and more</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Chain methods for readable and maintainable code</span>
        </li>
      </ul>

      {/* Getting Started */}
      <h3 className="text-2xl font-bold mb-4">Getting Started</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Access the query builder through your entity's <strong className="font-mono">query()</strong> method.
        </p>

        <CodeExample
          code={`<?php
use App\\Entities\\User;

// Start building a query
$query = User::query();

// Execute the query
$users = $query->all();           // Get all records
$user = $query->first();          // Get first record
$count = $query->count();         // Get count
$exists = $query->exists();       // Check if any records exist

// Chain methods
$activeUsers = User::query()
    ->where('status', '=', 'active')
    ->orderBy('created_at', 'DESC')
    ->limit(10)
    ->all();

// Get raw SQL (for debugging)
$sql = User::query()
    ->where('age', '>', 18)
    ->toSql();
// Returns: "SELECT * FROM users WHERE age > ?"`}
          language="php"
          title="Basic Query Builder Usage"
          explanation="Start building queries and chain methods for readable code."
        />
      </div>

      {/* Basic Queries */}
      <h3 className="text-2xl font-bold mb-4">Basic Queries</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Selecting Data
            </h4>
            <CodeExample
              code={`<?php
// Select specific columns
$users = User::query()
    ->select(['id', 'name', 'email'])
    ->all();

// Select with aliases
$users = User::query()
    ->select(['id', 'name as username', 'email'])
    ->all();

// Select distinct records
$users = User::query()
    ->distinct()
    ->select(['status'])
    ->all();

// Select raw expression
$users = User::query()
    ->selectRaw('COUNT(*) as total, DATE(created_at) as date')
    ->groupBy('date')
    ->all();

// Get single record
$user = User::query()
    ->where('id', '=', 1)
    ->first();

// Get specific column value
$email = User::query()
    ->where('id', '=', 1)
    ->value('email');

// Get list of column values
$emails = User::query()
    ->pluck('email');

// Get array of key-value pairs
$users = User::query()
    ->pluck('name', 'id');`}
              language="php"
              title="Select Queries"
              explanation="Control which columns and how many records to fetch."
            />
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Basic Where Clauses
            </h4>
            <CodeExample
              code={`<?php
// Simple where
$users = User::query()
    ->where('status', '=', 'active')
    ->all();

// Where with operator
$users = User::query()
    ->where('age', '>', 18)
    ->all();

// Multiple where conditions
$users = User::query()
    ->where('status', '=', 'active')
    ->where('age', '>=', 18)
    ->all();

// Or where
$users = User::query()
    ->where('status', '=', 'active')
    ->orWhere('status', '=', 'pending')
    ->all();

// Where in array
$users = User::query()
    ->whereIn('id', [1, 2, 3])
    ->all();

// Where not in
$users = User::query()
    ->whereNotIn('status', ['banned', 'deleted'])
    ->all();

// Where between
$users = User::query()
    ->whereBetween('age', [18, 65])
    ->all();

// Where null
$users = User::query()
    ->whereNull('deleted_at')
    ->all();

// Where not null
$users = User::query()
    ->whereNotNull('email_verified_at')
    ->all();`}
              language="php"
              title="Where Clauses"
              explanation="Filter records using various conditions."
            />
          </div>
        </div>
      </div>

      {/* Advanced Where Clauses */}
      <h3 className="text-2xl font-bold mb-4">Advanced Where Clauses</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Build complex conditions using nested groupings and parameter grouping.
        </p>

        <CodeExample
          code={`<?php
// Nested conditions (WHERE (a OR b) AND c)
$users = User::query()
    ->where('status', '=', 'active')
    ->where(function($query) {
        $query->where('age', '<', 30)
              ->orWhere('experience', '>', 5);
    })
    ->all();

// Multiple or conditions
$users = User::query()
    ->where('role', '=', 'admin')
    ->orWhere(function($query) {
        $query->where('role', '=', 'moderator')
              ->where('is_active', '=', true);
    })
    ->all();

// Where exists
$users = User::query()
    ->whereExists(function($query) {
        $query->select('*')
              ->from('orders')
              ->whereRaw('orders.user_id = users.id')
              ->where('orders.total', '>', 1000);
    })
    ->all();

// Where date
$users = User::query()
    ->whereDate('created_at', '=', '2024-01-01')
    ->all();

// Where month
$users = User::query()
    ->whereMonth('created_at', '=', 12)
    ->all();

// Where day
$users = User::query()
    ->whereDay('created_at', '=', 25)
    ->all();

// Where year
$users = User::query()
    ->whereYear('created_at', '=', 2024)
    ->all();

// Where time
$users = User::query()
    ->whereTime('created_at', '>=', '14:00:00')
    ->all();

// Where column comparison
$users = User::query()
    ->whereColumn('updated_at', '>', 'created_at')
    ->all();

// Where raw (use with caution!)
$users = User::query()
    ->whereRaw('age > ? AND status = ?', [18, 'active'])
    ->all();`}
          language="php"
          title="Advanced Where Clauses"
          explanation="Build complex nested conditions and date filters."
        />
      </div>

      {/* Ordering, Grouping & Limiting */}
      <h3 className="text-2xl font-bold mb-4">Ordering, Grouping & Limiting</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <SortAsc className="w-4 h-4" />
              Ordering
            </h4>
            <CodeExample
              code={`<?php
// Order by column
$users = User::query()
    ->orderBy('name', 'ASC')
    ->all();

// Multiple order by
$users = User::query()
    ->orderBy('status', 'ASC')
    ->orderBy('created_at', 'DESC')
    ->all();

// Order by raw
$users = User::query()
    ->orderByRaw('RAND()')
    ->all();

// Latest first
$users = User::query()
    ->latest()
    ->all();

// Oldest first
$users = User::query()
    ->oldest()
    ->all();

// Random order
$randomUser = User::query()
    ->inRandomOrder()
    ->first();`}
              language="php"
              title="Ordering Results"
              explanation="Sort your query results."
            />
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Grouping & Limiting
            </h4>
            <CodeExample
              code={`<?php
// Group by
$users = User::query()
    ->select(['status', 'COUNT(*) as count'])
    ->groupBy('status')
    ->all();

// Having
$users = User::query()
    ->select(['status', 'COUNT(*) as count'])
    ->groupBy('status')
    ->having('count', '>', 10)
    ->all();

// Limit and offset
$users = User::query()
    ->limit(10)
    ->offset(20)
    ->all();

// Pagination (page 3 with 15 per page)
$users = User::query()
    ->limit(15)
    ->offset(30)
    ->all();

// Take and skip (aliases)
$users = User::query()
    ->take(10)
    ->skip(20)
    ->all();`}
              language="php"
              title="Grouping & Limiting"
              explanation="Group results and control result set size."
            />
          </div>
        </div>
      </div>

      {/* Joins */}
      <h3 className="text-2xl font-bold mb-4">Joins</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-indigo-900/20 border border-indigo-800' : 'bg-indigo-50 border border-indigo-200'}`}>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Join tables together to fetch related data in a single query.
        </p>

        <CodeExample
          code={`<?php
// Inner join
$posts = Post::query()
    ->select(['posts.*', 'users.name as author_name'])
    ->join('users', 'posts.user_id', '=', 'users.id')
    ->all();

// Left join
$posts = Post::query()
    ->select(['posts.*', 'users.name as author_name'])
    ->leftJoin('users', 'posts.user_id', '=', 'users.id')
    ->all();

// Right join
$posts = Post::query()
    ->select(['posts.*', 'users.name as author_name'])
    ->rightJoin('users', 'posts.user_id', '=', 'users.id')
    ->all();

// Join with conditions
$posts = Post::query()
    ->join('comments', function($join) {
        $join->on('posts.id', '=', 'comments.post_id')
             ->where('comments.approved', '=', true);
    })
    ->all();

// Multiple joins
$comments = Comment::query()
    ->select(['comments.*', 'users.name as author', 'posts.title'])
    ->join('users', 'comments.user_id', '=', 'users.id')
    ->join('posts', 'comments.post_id', '=', 'posts.id')
    ->all();

// Join with aliases
$posts = Post::query()
    ->select(['p.*', 'u.name as author'])
    ->from('posts', 'p')
    ->join('users as u', 'p.user_id', '=', 'u.id')
    ->all();

// Cross join
$products = Product::query()
    ->crossJoin('categories')
    ->all();`}
          language="php"
          title="Join Queries"
          explanation="Combine data from multiple tables."
        />
      </div>

      {/* Aggregate Functions */}
      <h3 className="text-2xl font-bold mb-4">Aggregate Functions</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'}`}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <BarChart className="w-4 h-4" />
              Basic Aggregates
            </h4>
            <CodeExample
              code={`<?php
// Count
$total = User::query()->count();
$active = User::query()->where('status', '=', 'active')->count();

// Sum
$totalRevenue = Order::query()->sum('total');
$userTotal = Order::query()->where('user_id', '=', 1)->sum('total');

// Average
$averageAge = User::query()->avg('age');
$averageOrder = Order::query()->avg('total');

// Minimum
$minAge = User::query()->min('age');
$lowestPrice = Product::query()->min('price');

// Maximum
$maxAge = User::query()->max('age');
$highestPrice = Product::query()->max('price');

// Multiple aggregates
$stats = User::query()
    ->selectRaw('
        COUNT(*) as total,
        AVG(age) as average_age,
        MIN(age) as youngest,
        MAX(age) as oldest
    ')
    ->first();`}
              language="php"
              title="Aggregate Functions"
              explanation="Calculate statistics from your data."
            />
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Advanced Aggregates
            </h4>
            <CodeExample
              code={`<?php
// Grouped aggregates
$stats = User::query()
    ->select(['status', 'COUNT(*) as count', 'AVG(age) as average_age'])
    ->groupBy('status')
    ->all();

// Having with aggregates
$popularCategories = Category::query()
    ->select(['categories.*', 'COUNT(posts.id) as post_count'])
    ->join('posts', 'categories.id', '=', 'posts.category_id')
    ->groupBy('categories.id')
    ->having('post_count', '>', 10)
    ->all();

// Multiple aggregates with conditions
$revenue = Order::query()
    ->select([
        'DATE(created_at) as date',
        'SUM(total) as daily_total',
        'COUNT(*) as order_count',
        'AVG(total) as average_order'
    ])
    ->where('created_at', '>=', '2024-01-01')
    ->groupBy('date')
    ->orderBy('date', 'DESC')
    ->limit(30)
    ->all();`}
              language="php"
              title="Advanced Aggregates"
              explanation="Group and filter aggregate data."
            />
          </div>
        </div>
      </div>

      {/* Subqueries */}
      <h3 className="text-2xl font-bold mb-4">Subqueries</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Use subqueries to perform complex filtering and calculations.
        </p>

        <CodeExample
          code={`<?php
// Where with subquery
$users = User::query()
    ->where('id', '=', function($query) {
        $query->select('user_id')
              ->from('orders')
              ->orderBy('total', 'DESC')
              ->limit(1);
    })
    ->all();

// Select subquery
$users = User::query()
    ->select([
        'users.*',
        function($query) {
            return $query->selectRaw('COUNT(*)')
                         ->from('posts')
                         ->whereColumn('posts.user_id', 'users.id');
        }
    ])
    ->all();

// From subquery (derived table)
$sub = Post::query()
    ->select(['user_id', 'COUNT(*) as post_count'])
    ->groupBy('user_id');

$users = User::query()
    ->from($sub, 'post_counts')
    ->join('users', 'post_counts.user_id', '=', 'users.id')
    ->all();

// Where in with subquery
$users = User::query()
    ->whereIn('id', function($query) {
        $query->select('user_id')
              ->from('orders')
              ->where('total', '>', 1000);
    })
    ->all();

// Where exists with subquery
$users = User::query()
    ->whereExists(function($query) {
        $query->select('*')
              ->from('orders')
              ->whereColumn('orders.user_id', 'users.id')
              ->where('orders.total', '>', 1000);
    })
    ->all();`}
          language="php"
          title="Subqueries"
          explanation="Embed queries within queries for complex logic."
        />
      </div>

      {/* Unions */}
      <h3 className="text-2xl font-bold mb-4">Unions</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-cyan-900/20 border border-cyan-800' : 'bg-cyan-50 border border-cyan-200'}`}>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Combine results from multiple queries using unions.
        </p>

        <CodeExample
          code={`<?php
// Basic union
$activeUsers = User::query()->where('status', '=', 'active');
$pendingUsers = User::query()->where('status', '=', 'pending');

$users = $activeUsers->union($pendingUsers)->all();

// Union all (includes duplicates)
$first = User::query()->where('age', '<', 30);
$second = User::query()->where('age', '>', 50);

$users = $first->unionAll($second)->all();

// Multiple unions
$admins = User::query()->where('role', '=', 'admin');
$moderators = User::query()->where('role', '=', 'moderator');
$editors = User::query()->where('role', '=', 'editor');

$users = $admins
    ->union($moderators)
    ->union($editors)
    ->all();

// Union with ordering
$users = $activeUsers
    ->union($pendingUsers)
    ->orderBy('created_at', 'DESC')
    ->limit(50)
    ->all();`}
          language="php"
          title="Union Queries"
          explanation="Combine multiple query results."
        />
      </div>

      {/* Insert, Update, Delete */}
      <h3 className="text-2xl font-bold mb-4">Insert, Update & Delete</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-orange-900/20 border border-orange-800' : 'bg-orange-50 border border-orange-200'}`}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Insert Operations
            </h4>
            <CodeExample
              code={`<?php
// Insert single record
$id = User::query()->insert([
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'password' => password_hash('secret', PASSWORD_DEFAULT)
]);

// Insert multiple records
User::query()->insert([
    ['name' => 'Jane Doe', 'email' => 'jane@example.com'],
    ['name' => 'Bob Smith', 'email' => 'bob@example.com']
]);

// Insert and get ID
$user = User::query()->create([
    'name' => 'John Doe',
    'email' => 'john@example.com'
]);

// Insert or update (upsert)
User::query()->upsert([
    ['id' => 1, 'name' => 'Updated Name', 'email' => 'updated@example.com'],
    ['id' => 2, 'name' => 'Another Name', 'email' => 'another@example.com']
], ['id'], ['name', 'email']);`}
              language="php"
              title="Insert Operations"
              explanation="Insert new records into the database."
            />
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Update & Delete
            </h4>
            <CodeExample
              code={`<?php
// Update records
User::query()
    ->where('status', '=', 'inactive')
    ->update(['status' => 'active']);

// Update with increment/decrement
User::query()
    ->where('id', '=', 1)
    ->increment('login_count');

User::query()
    ->where('id', '=', 1)
    ->decrement('points', 10);

// Delete records
User::query()
    ->where('status', '=', 'banned')
    ->delete();

// Delete all
User::query()->delete();

// Truncate table
User::query()->truncate();`}
              language="php"
              title="Update & Delete"
              explanation="Update and delete records conditionally."
            />
          </div>
        </div>
      </div>

      {/* Performance Tips */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode
        ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20'
        : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'
        }`}>
        <h3 className="text-xl font-bold mb-4">Query Builder Performance Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-4 h-4" />
              <h4 className="font-bold">Use Indexes</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Ensure columns used in WHERE, JOIN, and ORDER BY clauses are indexed.
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4" />
              <h4 className="font-bold">Select Only Needed</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Use <strong className="font-mono">select()</strong> to fetch only required columns.
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <GitBranch className="w-4 h-4" />
              <h4 className="font-bold">Limit Results</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Always use <strong className="font-mono">limit()</strong> when you don't need all records.
            </p>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-zinc-800/50' : 'bg-zinc-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4" />
              <h4 className="font-bold">Avoid N+1</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Use eager loading with <strong className="font-mono">with()</strong> for relationships.
            </p>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <h3 className="text-xl font-bold mb-6">Query Builder Best Practices</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Do These Column */}
          <div className={`p-5 rounded-xl ${darkMode ? 'bg-green-500/5 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
            <h4 className="font-bold mb-4 flex items-center gap-2 text-lg">
              <span className={darkMode ? 'text-green-400' : 'text-green-700'}>Do These</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </h4>
            <ul className={`space-y-3 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Always use parameter binding instead of concatenating values</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use <strong className="font-mono">select()</strong> to limit columns returned</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Chain methods for readability and maintainability</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use <strong className="font-mono">toSql()</strong> for debugging complex queries</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Add indexes for columns used in WHERE and JOIN clauses</span>
              </li>
            </ul>
          </div>

          {/* Avoid These Column */}
          <div className={`p-5 rounded-xl ${darkMode ? 'bg-red-500/5 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
            <h4 className="font-bold mb-4 flex items-center gap-2 text-lg">
              <span className={darkMode ? 'text-red-400' : 'text-red-700'}>Avoid These</span>
              <span className="text-red-500 text-xl font-bold">×</span>
            </h4>
            <ul className={`space-y-3 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Don't use raw SQL unless absolutely necessary</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid <strong className="font-mono">SELECT *</strong> in production queries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Don't build queries in loops (use batch operations)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid complex joins when simpler queries would work</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Debugging */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-amber-900/20 border border-amber-800' : 'bg-amber-50 border border-amber-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Debugging Queries
        </h3>
        <div className="space-y-3">
          <CodeExample
            code={`<?php
// Get the SQL without executing
$sql = User::query()
    ->where('age', '>', 18)
    ->where('status', '=', 'active')
    ->toSql();
// Returns: "SELECT * FROM users WHERE age > ? AND status = ?"

// Get SQL with bound parameters
$sql = User::query()
    ->where('age', '>', 18)
    ->where('status', '=', 'active')
    ->toSqlWithBindings();
// Returns: "SELECT * FROM users WHERE age > 18 AND status = 'active'"

// Dump query results (dd = dump and die)
User::query()
    ->where('age', '>', 18)
    ->dd(); // Dumps results and stops execution

// Dump query (dump and continue)
User::query()
    ->where('age', '>', 18)
    ->dump(); // Dumps results and continues

// Log all queries (for development)
// Add to your configuration
\\Rocket\\Database\\Connection::listen(function($query) {
    error_log($query->sql . ' - ' . json_encode($query->bindings));
});`}
            language="php"
            title="Debugging Techniques"
            explanation="Inspect and debug your queries."
          />
        </div>
      </div>
    </>
  );
}
