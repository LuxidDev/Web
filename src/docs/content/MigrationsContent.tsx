import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Database, ArrowUp, ArrowDown, RefreshCw, AlertCircle,
  CheckCircle, ArrowRight, Info,
  Hash, Type, Calendar, Trash2
} from 'lucide-react';
import CodeExample from '@/components/CodeExample';
import InlineCodeExample from '@/components/InlineCodeExample';

export default function MigrationsContent() {
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
            <h3 className="text-2xl font-bold mb-2">Database Migrations</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Version control for your database schema. Migrate up and down with ease, ensuring
              consistent database structures across all environments.
            </p>
          </div>
        </div>
      </div>

      {/* What Are Migrations */}
      <h2 className="text-3xl font-bold mb-6">What Are Migrations?</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        Migrations are like version control for your database. They allow you to define and share
        your database schema changes in a consistent, repeatable way. Each migration file contains
        instructions for modifying the database schema (up) and reverting those changes (down).
      </p>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        With Rocket migrations, you can:
      </p>
      <ul className={`space-y-2 mb-8 ml-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Track database changes alongside your application code</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Share schema changes with your team seamlessly</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Roll back changes if something goes wrong</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Keep development, staging, and production databases in sync</span>
        </li>
      </ul>

      {/* Creating Migrations */}
      <h3 className="text-2xl font-bold mb-4 mt-8">Creating Migrations</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Use the Juice CLI to generate migration files. Migration files are stored in the
          <strong className="font-mono"> migrations/</strong> directory and follow a naming convention
          of <strong className="font-mono">{"m{timestamp}_{name}.php"}</strong>.
        </p>

        <div className="space-y-2 mb-6">
          <InlineCodeExample
            code="php juice make:migration create_users_table"
            title="Create a migration"
            description="Generates a new migration file for creating a users table"
            color="blue"
            compact={true}
          />
          <InlineCodeExample
            code="php juice make:migration add_email_to_users"
            title="Add column to existing table"
            description="Creates a migration to add an email column to users table"
            color="blue"
            compact={true}
          />
          <InlineCodeExample
            code="php juice make:migration create_products_table"
            title="Create another table"
            description="Generates a migration for a products table"
            color="blue"
            compact={true}
          />
        </div>
      </div>

      {/* Migration Structure */}
      <h3 className="text-2xl font-bold mb-4">Migration Structure</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Each migration extends the <strong className="font-mono">Migration</strong> class and implements
          <strong className="font-mono">up()</strong> and <strong className="font-mono">down()</strong> methods.
        </p>

        <CodeExample
          code={`<?php
use Rocket\\Migration\\Migration;
use Rocket\\Migration\\Rocket;

class m00001_create_users_table extends Migration
{
    public function up(): void
    {
        Rocket::table('users', function($column) {
            // Primary key
            $column->id('id');
            
            // Basic columns
            $column->string('email')->unique();
            $column->string('password')->hidden();
            $column->string('firstname');
            $column->string('lastname');
            
            // Nullable column
            $column->string('phone')->nullable();
            
            // Integer with default
            $column->integer('age')->default(0);
            
            // Boolean with default
            $column->boolean('is_active')->default(true);
            
            // Timestamps
            $column->timestamps(); // created_at, updated_at
            
            // Soft deletes
            $column->softDeletes(); // deleted_at
        });
    }
    
    public function down(): void
    {
        Rocket::drop('users');
    }
}`}
          language="php"
          title="Complete Migration Example"
          explanation="Define your table schema in up() and rollback in down()."
        />
      </div>

      {/* Column Types Reference */}
      <h3 className="text-2xl font-bold mb-4">Column Types Reference</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Numeric Types
            </h5>
            <div className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <p><strong className="font-mono">id()</strong> - Auto-incrementing primary key</p>
              <p><strong className="font-mono">integer()</strong> - INT column</p>
              <p><strong className="font-mono">float()</strong> - FLOAT column</p>
              <p><strong className="font-mono">decimal(10,2)</strong> - DECIMAL with precision</p>
              <p><strong className="font-mono">boolean()</strong> - BOOLEAN column</p>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <Type className="w-4 h-4" />
              String Types
            </h5>
            <div className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <p><strong className="font-mono">string()</strong> - VARCHAR column</p>
              <p><strong className="font-mono">text()</strong> - TEXT column</p>
              <p><strong className="font-mono">longText()</strong> - LONGTEXT column</p>
            </div>
          </div>

          <div>
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date & Time Types
            </h5>
            <div className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <p><strong className="font-mono">datetime()</strong> - DATETIME column</p>
              <p><strong className="font-mono">date()</strong> - DATE column</p>
              <p><strong className="font-mono">time()</strong> - TIME column</p>
              <p><strong className="font-mono">timestamp()</strong> - TIMESTAMP column</p>
              <p><strong className="font-mono">timestamps()</strong> - created_at + updated_at</p>
              <p><strong className="font-mono">softDeletes()</strong> - deleted_at column</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h5 className="font-bold mb-2">Column Modifiers</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <p><strong className="font-mono">{'->unique()'}</strong> - Add unique constraint</p>
              <p><strong className="font-mono">{'->nullable()'}</strong> - Allow NULL values</p>
              <p><strong className="font-mono">{'->default(value)'}</strong> - Set default value</p>
            </div>
            <div className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <p><strong className="font-mono">{'->index()'}</strong> - Add index</p>
              <p><strong className="font-mono">{'->hidden()'}</strong> - Hide from serialization</p>
              <p><strong className="font-mono">{'->primary()'}</strong> - Set as primary key</p>
            </div>
          </div>
        </div>
      </div>

      {/* Foreign Keys & Relationships */}
      <h3 className="text-2xl font-bold mb-4">Foreign Keys & Relationships</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-indigo-900/20 border border-indigo-800' : 'bg-indigo-50 border border-indigo-200'}`}>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Define relationships between tables using foreign key constraints.
        </p>

        <CodeExample
          code={`<?php
class m00002_create_posts_table extends Migration
{
    public function up(): void
    {
        Rocket::table('posts', function($column) {
            $column->id('id');
            $column->string('title');
            $column->text('content');
            $column->integer('user_id');
            
            // Foreign key constraint
            $column->foreign('user_id')
                ->references('id')
                ->on('users')
                ->cascadeOnDelete();
            
            $column->timestamps();
        });
    }
    
    public function down(): void
    {
        Rocket::drop('posts');
    }
}

class m00003_create_comments_table extends Migration
{
    public function up(): void
    {
        Rocket::table('comments', function($column) {
            $column->id('id');
            $column->text('content');
            $column->integer('post_id');
            $column->integer('user_id')->nullable();
            
            // Multiple foreign keys
            $column->foreign('post_id')
                ->references('id')
                ->on('posts')
                ->cascadeOnDelete();
            
            $column->foreign('user_id')
                ->references('id')
                ->on('users')
                ->setNullOnDelete(); // Set to NULL when user is deleted
            
            $column->timestamps();
        });
    }
    
    public function down(): void
    {
        Rocket::drop('comments');
    }
}`}
          language="php"
          title="Foreign Key Constraints"
          explanation="Define relationships between tables with cascade options."
        />

        <div className="mt-4">
          <h5 className="font-bold mb-2">Foreign Key Actions</h5>
          <div className={`text-sm space-y-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
            <p><strong className="font-mono">{'->cascadeOnDelete()'}</strong> - Delete child records when parent is deleted</p>
            <p><strong className="font-mono">{'->setNullOnDelete()'}</strong> - Set foreign key to NULL when parent is deleted</p>
            <p><strong className="font-mono">{'->restrictOnDelete()'}</strong> - Prevent deletion if child records exist</p>
            <p><strong className="font-mono">{'->cascadeOnUpdate()'}</strong> - Update foreign key when parent is updated</p>
          </div>
        </div>
      </div>

      {/* Modifying Existing Tables */}
      <h3 className="text-2xl font-bold mb-4">Modifying Existing Tables</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Use migrations to modify existing tables by adding, removing, or changing columns.
        </p>

        <CodeExample
          code={`<?php
class m00004_add_email_to_users extends Migration
{
    public function up(): void
    {
        // Add new columns
        Rocket::table('users', function($column) {
            $column->string('email')->unique()->after('id');
            $column->string('phone')->nullable()->after('email');
        });
    }
    
    public function down(): void
    {
        // Remove columns (rollback)
        Rocket::table('users', function($column) {
            $column->dropColumn('email');
            $column->dropColumn('phone');
        });
    }
}

class m00005_change_column_type extends Migration
{
    public function up(): void
    {
        // Modify existing column
        Rocket::table('users', function($column) {
            $column->text('bio')->change();
        });
    }
    
    public function down(): void
    {
        // Revert column type
        Rocket::table('users', function($column) {
            $column->string('bio')->change();
        });
    }
}

class m00006_rename_column extends Migration
{
    public function up(): void
    {
        Rocket::table('users', function($column) {
            $column->renameColumn('firstname', 'first_name');
            $column->renameColumn('lastname', 'last_name');
        });
    }
    
    public function down(): void
    {
        Rocket::table('users', function($column) {
            $column->renameColumn('first_name', 'firstname');
            $column->renameColumn('last_name', 'lastname');
        });
    }
}

class m00007_drop_table extends Migration
{
    public function up(): void
    {
        Rocket::dropIfExists('old_table');
    }
    
    public function down(): void
    {
        Rocket::table('old_table', function($column) {
            $column->id('id');
            $column->string('name');
            $column->timestamps();
        });
    }
}`}
          language="php"
          title="Table Modifications"
          explanation="Add, modify, or remove columns from existing tables."
        />
      </div>

      {/* Running Migrations */}
      <h3 className="text-2xl font-bold mb-4">Running Migrations</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-cyan-900/20 border border-cyan-800' : 'bg-cyan-50 border border-cyan-200'}`}>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Execute migrations using the Juice CLI. Migrations run in order based on their timestamp.
        </p>

        <div className="space-y-3 mb-6">
          <div className={`flex items-baseline gap-3 p-3 rounded-lg ${darkMode ? 'hover:bg-cyan-900/30' : 'hover:bg-cyan-100/50'}`}>
            <ArrowUp className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? 'bg-zinc-800 text-green-400' : 'bg-cyan-100 text-green-700'}`}>php juice db:migrate</strong>
            <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Run all pending migrations</span>
          </div>

          <div className={`flex items-baseline gap-3 p-3 rounded-lg ${darkMode ? 'hover:bg-cyan-900/30' : 'hover:bg-cyan-100/50'}`}>
            <ArrowDown className={`w-4 h-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
            <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? 'bg-zinc-800 text-red-400' : 'bg-cyan-100 text-red-700'}`}>php juice db:rollback</strong>
            <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Rollback the last batch of migrations</span>
          </div>

          <div className={`flex items-baseline gap-3 p-3 rounded-lg ${darkMode ? 'hover:bg-cyan-900/30' : 'hover:bg-cyan-100/50'}`}>
            <RefreshCw className={`w-4 h-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? 'bg-zinc-800 text-yellow-400' : 'bg-cyan-100 text-yellow-700'}`}>php juice db:reset</strong>
            <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Rollback all migrations</span>
          </div>

          <div className={`flex items-baseline gap-3 p-3 rounded-lg ${darkMode ? 'hover:bg-cyan-900/30' : 'hover:bg-cyan-100/50'}`}>
            <Trash2 className={`w-4 h-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
            <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? 'bg-zinc-800 text-red-400' : 'bg-cyan-100 text-red-700'}`}>php juice db:fresh</strong>
            <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Drop all tables and re-run all migrations</span>
          </div>

          <div className={`flex items-baseline gap-3 p-3 rounded-lg ${darkMode ? 'hover:bg-cyan-900/30' : 'hover:bg-cyan-100/50'}`}>
            <Database className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <strong className={`font-mono text-sm px-2 py-1 rounded ${darkMode ? 'bg-zinc-800 text-blue-400' : 'bg-cyan-100 text-blue-700'}`}>php juice db:fresh --seed</strong>
            <span className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Fresh migrate and run seeders</span>
          </div>
        </div>

        <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
          <h5 className="font-bold mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Migration Status
          </h5>
          <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Rocket tracks which migrations have been run in a <strong className="font-mono">migrations</strong> table.
            This ensures migrations are only run once and can be rolled back in order.
          </p>
        </div>
      </div>

      {/* Best Practices */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <h3 className="text-xl font-bold mb-6">Migration Best Practices</h3>
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
                <span>Always write both <strong className="font-mono">up()</strong> and <strong className="font-mono">down()</strong> methods</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use descriptive migration names (e.g., <strong className="font-mono">create_users_table</strong>)</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Keep migrations atomic - one change per migration when possible</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Version control your migration files with your application code</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Test migrations locally before deploying to production</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use foreign key constraints for data integrity</span>
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
                <span>Don't modify existing migrations after they've been run</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid using raw SQL when schema builder methods are available</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Don't use environment-specific code in migrations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid making destructive changes without proper backups</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Don't skip writing <strong className="font-mono">down()</strong> methods - you'll need them!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-amber-900/20 border border-amber-800' : 'bg-amber-50 border border-amber-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Troubleshooting
        </h3>
        <div className="space-y-3">
          <div>
            <h4 className="font-bold mb-1">"Migration table not found"</h4>
            <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              Run <strong className="font-mono">php juice db:migrate</strong> to create the migrations tracking table.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1">"Cannot add foreign key constraint"</h4>
            <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              Ensure the referenced table and column exist before creating the foreign key. Order your migrations correctly.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1">"Migration already exists"</h4>
            <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              Use <strong className="font-mono">php juice db:rollback</strong> to revert, then modify your migration and run again.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1">"Column already exists"</h4>
            <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              Check if the column was added in a previous migration. Use <strong className="font-mono">{'->ifNotExists()'}</strong> modifier.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
