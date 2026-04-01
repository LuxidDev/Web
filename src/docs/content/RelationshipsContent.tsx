import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  CheckCircle, ArrowRight, AlertCircle, Info,
} from 'lucide-react';
import CodeExample from '@/components/CodeExample';
import InlineCodeExample from '@/components/InlineCodeExample';

export default function RelationshipsContent() {
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
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Entity Relationships</h3>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Define and work with relationships between entities in Rocket ORM. Connect your data
              and build powerful, expressive queries with ease.
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Understanding Relationships</h2>
      <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Relationships are the heart of any database-driven application. Rocket ORM provides a clean,
        intuitive way to define relationships between your entities using PHP 8 attributes.
      </p>
      <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        There are three main types of relationships:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-gray-900 dark:text-white">HasOne / BelongsTo</h4>
          </div>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            One-to-one relationships where one entity belongs to another.
          </p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-gray-900 dark:text-white">HasMany / BelongsTo</h4>
          </div>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            One-to-many relationships where one entity has many related entities.
          </p>
        </div>
        <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-bold text-gray-900 dark:text-white">BelongsToMany</h4>
          </div>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Many-to-many relationships using a pivot table.
          </p>
        </div>
      </div>

      {/* HasOne Relationship */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">HasOne Relationship</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          A <strong className="font-mono text-gray-900 dark:text-white">HasOne</strong> relationship defines that an entity has one related entity.
          For example, a user has one profile.
        </p>

        <CodeExample
          code={`<?php
namespace App\\Entities;

use Rocket\\Attributes\\Relations\\HasOne;
use Rocket\\Attributes\\Relations\\BelongsTo;

class User extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $name = '';
    
    // Define the relationship
    #[HasOne(Profile::class, 'user_id', 'id')]
    protected $profile;
    
    // Accessor method (optional)
    public function getProfile()
    {
        return $this->profile;
    }
}

class Profile extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $bio = '';
    
    #[Column]
    public string $avatar = '';
    
    #[Column]
    public int $user_id = 0;
    
    // Inverse relationship
    #[BelongsTo(User::class, 'user_id', 'id')]
    protected $user;
}

// Usage
$user = User::find(1);
echo $user->profile->bio; // Access the profile

// Create a profile for a user
$profile = new Profile();
$profile->bio = 'Software developer';
$profile->user_id = $user->id;
$profile->save();

// Or using the relationship
$user->profile()->create([
    'bio' => 'Software developer',
    'avatar' => 'avatar.jpg'
]);`}
          language="php"
          title="HasOne Relationship Example"
          explanation="Define a one-to-one relationship between User and Profile."
        />

        <div className="mt-4">
          <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Relationship Parameters</h5>
          <div className={`text-sm space-y-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <p><strong className="font-mono text-gray-900 dark:text-white">#[HasOne(Profile::class, 'user_id', 'id')]</strong></p>
            <p className="ml-4">1. Related entity class</p>
            <p className="ml-4">2. Foreign key on the related table</p>
            <p className="ml-4">3. Local key on the current table</p>
          </div>
        </div>
      </div>

      {/* HasMany Relationship */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">HasMany Relationship</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          A <strong className="font-mono text-gray-900 dark:text-white">HasMany</strong> relationship defines that an entity has many related entities.
          For example, a user has many posts.
        </p>

        <CodeExample
          code={`<?php
namespace App\\Entities;

use Rocket\\Attributes\\Relations\\HasMany;
use Rocket\\Attributes\\Relations\\BelongsTo;

class User extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $name = '';
    
    // User has many posts
    #[HasMany(Post::class, 'user_id', 'id')]
    protected $posts;
    
    // User has many comments
    #[HasMany(Comment::class, 'user_id', 'id')]
    protected $comments;
}

class Post extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $title = '';
    
    #[Column]
    public string $content = '';
    
    #[Column]
    public int $user_id = 0;
    
    // Inverse relationship
    #[BelongsTo(User::class, 'user_id', 'id')]
    protected $author;
    
    // Post has many comments
    #[HasMany(Comment::class, 'post_id', 'id')]
    protected $comments;
}

class Comment extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $content = '';
    
    #[Column]
    public int $post_id = 0;
    
    #[Column]
    public int $user_id = 0;
    
    #[BelongsTo(Post::class, 'post_id', 'id')]
    protected $post;
    
    #[BelongsTo(User::class, 'user_id', 'id')]
    protected $author;
}

// Usage
$user = User::find(1);

// Get all posts by user
foreach ($user->posts as $post) {
    echo $post->title;
}

// Get all comments by user
foreach ($user->comments as $comment) {
    echo $comment->content;
}

// Create a new post for user
$user->posts()->create([
    'title' => 'My New Post',
    'content' => 'Post content here...'
]);

// Count related records
$postCount = $user->posts()->count();
$activePosts = $user->posts()->where('status', '=', 'published')->count();`}
          language="php"
          title="HasMany Relationship Example"
          explanation="Define one-to-many relationships between User, Post, and Comment."
        />

        <div className="mt-4">
          <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Common HasMany Operations</h5>
          <div className="space-y-2">
            <InlineCodeExample
              code="$user->posts()->count()"
              title=""
              description="Cound related records. Get the number of posts for a user"
              color="gray"
              compact={true}
            />
            <InlineCodeExample
              code="$user->posts()->where('published', true)->all()"
              title=""
              description="Filtered query. Get only published posts"
              color="gray"
              compact={true}
            />
            <InlineCodeExample
              code="$user->posts()->orderBy('created_at', 'DESC')->limit(5)->all()"
              title=""
              description="Latest posts. Get the 5 most recent posts"
              color="gray"
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* BelongsTo Relationship */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">BelongsTo Relationship</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          A <strong className="font-mono text-gray-900 dark:text-white">BelongsTo</strong> relationship is the inverse of HasOne and HasMany.
          It defines that an entity belongs to another entity.
        </p>

        <CodeExample
          code={`<?php
namespace App\\Entities;

use Rocket\\Attributes\\Relations\\BelongsTo;

class Post extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $title = '';
    
    #[Column]
    public string $content = '';
    
    #[Column]
    public int $user_id = 0;
    
    // Post belongs to a user
    #[BelongsTo(User::class, 'user_id', 'id')]
    protected $author;
    
    // Post belongs to a category
    #[BelongsTo(Category::class, 'category_id', 'id')]
    protected $category;
}

class Comment extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $content = '';
    
    #[Column]
    public int $post_id = 0;
    
    #[Column]
    public int $user_id = 0;
    
    // Comment belongs to a post
    #[BelongsTo(Post::class, 'post_id', 'id')]
    protected $post;
    
    // Comment belongs to a user
    #[BelongsTo(User::class, 'user_id', 'id')]
    protected $author;
}

// Usage
$post = Post::find(1);
echo $post->author->name; // Access the author

$comment = Comment::find(1);
echo $comment->post->title; // Access the post
echo $comment->author->name; // Access the comment author

// Eager loading to avoid N+1 queries
$posts = Post::with(['author', 'category'])->findAll();

foreach ($posts as $post) {
    echo $post->author->name; // No additional queries!
}`}
          language="php"
          title="BelongsTo Relationship Example"
          explanation="Define inverse relationships for HasOne and HasMany."
        />
      </div>

      {/* BelongsToMany Relationship */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">BelongsToMany Relationship</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          A <strong className="font-mono text-gray-900 dark:text-white">BelongsToMany</strong> relationship defines a many-to-many relationship.
          For example, a user can have many roles, and a role can belong to many users.
        </p>

        <CodeExample
          code={`<?php
namespace App\\Entities;

use Rocket\\Attributes\\Relations\\BelongsToMany;

class User extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $name = '';
    
    // Many-to-many with roles
    #[BelongsToMany(Role::class, 'user_roles', 'user_id', 'role_id')]
    protected $roles;
    
    // Many-to-many with tags (through posts)
    #[BelongsToMany(Tag::class, 'post_tags', 'post_id', 'tag_id', Post::class)]
    protected $tags;
}

class Role extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $name = '';
    
    #[Column]
    public string $slug = '';
    
    // Inverse many-to-many
    #[BelongsToMany(User::class, 'user_roles', 'role_id', 'user_id')]
    protected $users;
}

class Post extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $title = '';
    
    // Many-to-many with tags
    #[BelongsToMany(Tag::class, 'post_tags', 'post_id', 'tag_id')]
    protected $tags;
}

class Tag extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $name = '';
    
    // Inverse many-to-many
    #[BelongsToMany(Post::class, 'post_tags', 'tag_id', 'post_id')]
    protected $posts;
}

// Usage
$user = User::find(1);

// Get all roles for a user
foreach ($user->roles as $role) {
    echo $role->name;
}

// Check if user has a specific role
if ($user->roles()->where('slug', '=', 'admin')->exists()) {
    echo "User is an admin!";
}

// Attach roles to user
$user->roles()->attach([1, 2, 3]);

// Sync roles (remove all and add only these)
$user->roles()->sync([1, 3]);

// Detach a specific role
$user->roles()->detach(2);

// Detach all roles
$user->roles()->detach();

// Get posts with specific tags
$posts = Post::with('tags')->whereHas('tags', function($query) {
    $query->where('name', '=', 'PHP');
})->all();`}
          language="php"
          title="BelongsToMany Relationship Example"
          explanation="Define many-to-many relationships using a pivot table."
        />

        <div className="mt-4">
          <h5 className="font-bold mb-2 text-gray-900 dark:text-white">BelongsToMany Parameters</h5>
          <div className={`text-sm space-y-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <p><strong className="font-mono text-gray-900 dark:text-white">#[BelongsToMany(Role::class, 'user_roles', 'user_id', 'role_id')]</strong></p>
            <p className="ml-4">1. Related entity class</p>
            <p className="ml-4">2. Pivot table name</p>
            <p className="ml-4">3. Foreign key on pivot table for current entity</p>
            <p className="ml-4">4. Foreign key on pivot table for related entity</p>
          </div>
        </div>

        <div className="mt-4">
          <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Pivot Table Operations</h5>
          <div className="space-y-2">
            <InlineCodeExample
              code="$user->roles()->attach(1)"
              title=""
              description="Attach. Add a relationship without checking for duplicates"
              color="gray"
              compact={true}
            />
            <InlineCodeExample
              code="$user->roles()->attach([1, 2, 3])"
              title=""
              description="Attach multiple. Attach multiple roles at once"
              color="gray"
              compact={true}
            />
            <InlineCodeExample
              code="$user->roles()->detach(2)"
              title=""
              description="Detach. Remove a specific relationship"
              color="gray"
              compact={true}
            />
            <InlineCodeExample
              code="$user->roles()->sync([1, 3])"
              title=""
              description="Sync. Synchronize relationships (adds missing, removes extras)"
              color="gray"
              compact={true}
            />
            <InlineCodeExample
              code="$user->roles()->toggle([1, 2])"
              title=""
              description="Toggle. Attach if not attached, detach if attached"
              color="gray"
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* Eager Loading */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Eager Loading</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Eager loading helps you avoid the N+1 query problem by loading relationships upfront.
          Use the <strong className={darkMode ? "text-white font-mono" : "font-mono"}>with()</strong> method to specify which relationships to load.
        </p>

        <CodeExample
          code={`<?php
// Without eager loading (N+1 problem)
$users = User::findAll();
foreach ($users as $user) {
    // This runs a separate query for each user
    echo $user->posts()->count();
}

// With eager loading (only 2 queries total)
$users = User::with('posts')->findAll();
foreach ($users as $user) {
    // Posts are already loaded, no additional queries
    echo $user->posts->count();
}

// Load multiple relationships
$users = User::with(['posts', 'profile', 'roles'])->findAll();

// Nested eager loading
$posts = Post::with(['author', 'comments.author'])->findAll();

// Conditional eager loading
$posts = Post::with(['comments' => function($query) {
    $query->where('approved', true)->orderBy('created_at', 'DESC');
}])->findAll();

// Eager loading with constraints
$users = User::with(['posts' => function($query) {
    $query->where('published', true)->limit(5);
}])->findAll();`}
          language="php"
          title="Eager Loading Examples"
          explanation="Optimize your queries by loading relationships upfront."
        />

        <div className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <h5 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
            <Info className="w-4 h-4" />
            Performance Tip
          </h5>
          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            Always use eager loading when accessing relationships in loops. A simple <strong className={darkMode ? "text-white font-mono" : "font-mono"}>with()</strong>
            can reduce dozens of queries to just a few!
          </p>
        </div>
      </div>

      {/* Querying Relationships */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Querying Relationships</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Filter and query based on relationships using <strong className={darkMode ? "text-white font-mono" : "font-mono"}>whereHas()</strong>
          and <strong className={darkMode ? "text-white font-mono" : "font-mono"}>orWhereHas()</strong> methods.
        </p>

        <CodeExample
          code={`<?php
// Get users who have at least one post
$users = User::whereHas('posts')->findAll();

// Get users with published posts
$users = User::whereHas('posts', function($query) {
    $query->where('published', true);
})->findAll();

// Get users who have at least 5 posts
$users = User::whereHas('posts', function($query) {
    $query->having('COUNT(*)', '>=', 5);
})->findAll();

// Get users who have no posts
$users = User::whereDoesntHave('posts')->findAll();

// Get posts with comments by a specific user
$posts = Post::whereHas('comments', function($query) {
    $query->where('user_id', 1);
})->findAll();

// Nested relationship conditions
$posts = Post::whereHas('comments.author', function($query) {
    $query->where('is_active', true);
})->findAll();

// Get posts with at least one comment
$posts = Post::has('comments')->findAll();

// Get posts with at least 3 comments
$posts = Post::has('comments', '>=', 3)->findAll();

// Combine conditions
$posts = Post::whereHas('author', function($query) {
    $query->where('is_active', true);
})->has('comments', '>=', 2)
  ->orderBy('created_at', 'DESC')
  ->limit(10)
  ->findAll();`}
          language="php"
          title="Querying Relationships"
          explanation="Filter records based on relationship existence and conditions."
        />
      </div>

      {/* Polymorphic Relationships */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Polymorphic Relationships</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Polymorphic relationships allow an entity to belong to multiple other entities on a single association.
          For example, a comment can belong to either a post or a video.
        </p>

        <CodeExample
          code={`<?php
namespace App\\Entities;

use Rocket\\Attributes\\Relations\\MorphTo;
use Rocket\\Attributes\\Relations\\MorphMany;

class Comment extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $content = '';
    
    #[Column]
    public int $commentable_id = 0;
    
    #[Column]
    public string $commentable_type = '';
    
    // Polymorphic relationship
    #[MorphTo('commentable_id', 'commentable_type')]
    protected $commentable;
}

class Post extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $title = '';
    
    #[Column]
    public string $content = '';
    
    // Define polymorphic relationship
    #[MorphMany(Comment::class, 'commentable_id', 'commentable_type')]
    protected $comments;
}

class Video extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;
    
    #[Column]
    public string $title = '';
    
    #[Column]
    public string $url = '';
    
    // Define polymorphic relationship
    #[MorphMany(Comment::class, 'commentable_id', 'commentable_type')]
    protected $comments;
}

// Usage
$post = Post::find(1);
$post->comments()->create([
    'content' => 'Great post!'
]);

$video = Video::find(1);
$video->comments()->create([
    'content' => 'Awesome video!'
]);

// Retrieve commentable entity
$comment = Comment::find(1);
if ($comment->commentable instanceof Post) {
    echo "Comment on post: " . $comment->commentable->title;
} elseif ($comment->commentable instanceof Video) {
    echo "Comment on video: " . $comment->commentable->title;
}`}
          language="php"
          title="Polymorphic Relationships"
          explanation="Create relationships where an entity can belong to multiple types."
        />
      </div>

      {/* Best Practices */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Relationship Best Practices</h3>
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
                <span>Always define inverse relationships for consistency</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use eager loading with <strong className={darkMode ? "text-white font-mono" : "font-mono"}>with()</strong> to prevent N+1 queries</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Add foreign key indexes for better performance</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>whereHas()</strong> for relationship filtering</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Keep relationship names clear and descriptive</span>
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
                <span>Don't forget to define foreign key constraints in migrations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid loading relationships in loops without eager loading</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Don't use deep nested relationships unnecessarily</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid circular relationships that could cause infinite loops</span>
              </li>
            </ul>
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
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">"Relationship method not found"</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Ensure you've imported the relationship attributes and defined them as <strong className={darkMode ? "text-white font-mono" : "font-mono"}>protected</strong> properties.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">"N+1 query problem"</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>with()</strong> to eager load relationships. Check your logs for repeated queries.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">"Foreign key constraint fails"</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Ensure the referenced record exists and the foreign key columns are properly indexed.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
