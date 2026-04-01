import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle, Database, ArrowUp, ArrowDown, Terminal, Rocket, Shield, Clock
} from "lucide-react";
import InlineCodeExample from "@/components/InlineCodeExample";
import CodeExample from "@/components/CodeExample";

export default function DatabaseMigrationTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      <div
        className={`mb-8 p-6 rounded-2xl ${darkMode
          ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
          : "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200"
          }`}
      >
        <div className="flex items-start gap-4">
          <Rocket className={`w-8 h-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Database Migrations for Todo App</h3>
            <p className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
              Create and manage your database schema using Rocket migrations.
              Migrations are version-controlled database changes that evolve with your application.
            </p>
          </div>
        </div>
      </div>

      <div className={`mb-6 p-5 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Terminal className="w-5 h-5" />
          Step 1: Create the Migration
        </h3>
        <p className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
          Use Juice CLI to generate a new migration file. The migration will be created in the
          <code className={`font-mono px-1 mx-1 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>migrations/</code>
          directory with a timestamp prefix.
        </p>

        <InlineCodeExample
          code={`php juice make:migration create_todos_table`}
          language="bash"
          title="📝 Generate Todo Table Migration"
          description="Creates a new migration file for the todos table with timestamp (e.g., m20240101_120000_create_todos_table.php)"
          icon={Terminal}
          color="blue"
          compact={true}
        />
      </div>

      <CodeExample
        code={`<?php
use Rocket\\Migration\\Migration;
use Rocket\\Migration\\Rocket;

/**
 * Create todos table migration
 * 
 * This migration creates the 'todos' table with:
 * - id: Primary key
 * - title: Required, max 255 chars
 * - description: Optional text field
 * - status: Enum with default 'pending'
 * - timestamps: created_at and updated_at
 * 
 * This demonstrates the beautiful Rocket DSL for migrations
 */
class m00002_create_todos_table extends Migration
{
    /**
    * Run the migration - create the table
    */
    public function up(): void
    {
        Rocket::table('todos', function ($column) {
          // Primary key
          $column->id('id');

          // Todo title - required, indexed for faster searches
          $column->string('title')->index();

          // Todo description - optional text
          $column->text('description')->nullable();

          // Todo status with default value
          $column->string('status')->default('pending')->index();

          // Timestamps for created_at and updated_at
          $column->timestamps();
        });
    }
    
    /**
    * Rollback the migration - drop the table
    */
    public function down(): void
    {
        Rocket::drop('todos');
    }
}`}
        title="📄 migrations/m00002_create_todos_table.php"
        explanation="A complete migration for the todos table with proper indexes and default values."
      />

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Database className="w-5 h-5" />
          Understanding Migration Methods
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-green-400" : "text-green-700"}>up() Method</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Defines the forward migration - what changes to apply to your database.
                This method runs when you execute <code className="font-mono">php juice db:migrate</code>.
                It typically creates tables, adds columns, or modifies indexes.
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                <p>✓ Creates the <code className="font-mono">todos</code> table with all required columns</p>
                <p>✓ Adds indexes for faster query performance on <code className="font-mono">title</code> and <code className="font-mono">status</code></p>
                <p>✓ Sets <code className="font-mono">pending</code> as default status</p>
                <p>✓ Automatically adds <code className="font-mono">created_at</code> and <code className="font-mono">updated_at</code> timestamps</p>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-red-400" : "text-red-700"}>down() Method</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Defines how to reverse the migration - what changes to revert.
                This method runs during rollback (<code className="font-mono">php juice db:rollback</code>).
                It should undo everything that <code className="font-mono">up()</code> did.
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                <p>✓ Drops the <code className="font-mono">todos</code> table completely</p>
                <p>✓ Reverts all columns, indexes, and constraints</p>
                <p>✓ Makes the migration reversible (safe to rollback)</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Column Types & Modifiers Used
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
            <h4 className="font-bold mb-2">Column Types</h4>
            <div className="space-y-2 text-sm">
              <div>
                <code className="font-mono">id()</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Auto-incrementing primary key (BIGINT UNSIGNED)</p>
              </div>
              <div>
                <code className="font-mono">string()</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>VARCHAR column (default length 255)</p>
              </div>
              <div>
                <code className="font-mono">text()</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>TEXT column for longer content</p>
              </div>
              <div>
                <code className="font-mono">timestamps()</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Creates created_at and updated_at DATETIME columns</p>
              </div>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
            <h4 className="font-bold mb-2">Column Modifiers</h4>
            <div className="space-y-2 text-sm">
              <div>
                <code className="font-mono">{'->index()'}</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Adds a database index for faster queries</p>
              </div>
              <div>
                <code className="font-mono">{'->nullable()'}</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Allows NULL values in the column</p>
              </div>
              <div>
                <code className="font-mono">{`->default('pending')`}</code>
                <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Sets a default value for the column</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-cyan-800' : 'bg-cyan-50 border border-cyan-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          Step 2: Run the Migration
        </h3>
        <p className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
          After creating your migration, run it to apply the changes to your database.
          Rocket will track which migrations have been run in a special <code className="font-mono">migrations</code> table.
        </p>

        <InlineCodeExample
          code={`php juice db:migrate`}
          language="bash"
          title="Apply Migration to Database"
          description="Executes all pending migrations, creating the todos table with proper schema, indexes, and constraints"
          color="blue"
          compact={true}
        />

        <div className={`mt-3 p-3 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-cyan-100'}`}>
          <p className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
            <strong>What happens:</strong> Rocket reads the <code className="font-mono">up()</code> method,
            creates the todos table with all columns and indexes, and records this migration as completed.
          </p>
        </div>
      </div>

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          Step 3: Rolling Back (Optional)
        </h3>
        <p className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
          If you need to undo a migration, use the rollback command. This executes the <code className="font-mono">down()</code> method.
        </p>

        <InlineCodeExample
          code={`php juice db:rollback`}
          language="bash"
          title="Rollback Last Migration"
          description="Undoes the most recent migration batch by executing the down() method, dropping the todos table"
          color="purple"
          compact={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <code className="font-mono text-sm">php juice db:rollback --step=3</code>
            <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Rollback the last 3 migrations</p>
          </div>
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <code className="font-mono text-sm">php juice db:reset</code>
            <p className={`text-xs mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Rollback all migrations (reset entire database)</p>
          </div>
        </div>
      </div>

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Migration Best Practices
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Always write both <code className="font-mono">up()</code> and <code className="font-mono">down()</code> methods for reversible migrations</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Use descriptive migration names like <code className="font-mono">create_todos_table</code> or <code className="font-mono">add_status_to_todos</code></span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Add indexes to columns used in <code className="font-mono">WHERE</code> clauses for better performance</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Keep migrations atomic - one logical change per migration file</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Version control your migrations alongside your application code</span>
          </li>
        </ul>
      </div>
    </>
  );
}
