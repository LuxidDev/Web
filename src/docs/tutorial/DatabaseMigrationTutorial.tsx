import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle, Database,
} from "lucide-react";
import InlineCodeExample from "@/components/InlineCodeExample";
import CodeExample from "@/components/CodeExample";

export default function DatabaseMigrationTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      <div
        className={`mb-8 p-6 rounded-2xl ${darkMode
          ? "bg-gray-900/50 border border-gray-800"
          : "bg-gray-50 border border-gray-200"
          }`}
      >
        <div className="flex items-start gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Database Migrations for Todo App</h3>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Create and manage your database schema using Rocket migrations.
              Migrations are version-controlled database changes that evolve with your application.
            </p>
          </div>
        </div>
      </div>

      <div className={`mb-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          Step 1: Create the Migration
        </h3>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          Use Juice CLI to generate a new migration file. The migration will be created in the
          <strong className={`font-mono px-1 mx-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>migrations/</strong>
          directory with a timestamp prefix.
        </p>

        <InlineCodeExample
          code={`php juice make:migration create_todos_table`}
          language="bash"
          title=""
          description="Generate Todo Table Migration. Creates a new migration file for the todos table with timestamp (e.g., m20240101_120000_create_todos_table.php)"
          color="gray"
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
        title="migrations/m00002_create_todos_table.php"
        explanation="A complete migration for the todos table with proper indexes and default values."
      />

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <Database className="w-5 h-5" />
          Understanding Migration Methods
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div>
              <strong className="text-gray-900 dark:text-white">up() Method</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Defines the forward migration - what changes to apply to your database.
                This method runs when you execute <strong className={darkMode ? "text-white font-mono" : "font-mono"}>php juice db:migrate</strong>.
                It typically creates tables, adds columns, or modifies indexes.
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <p>✓ Creates the <strong className={darkMode ? "text-white font-mono" : "font-mono"}>todos</strong> table with all required columns</p>
                <p>✓ Adds indexes for faster query performance on <strong className={darkMode ? "text-white font-mono" : "font-mono"}>title</strong> and <strong className={darkMode ? "text-white font-mono" : "font-mono"}>status</strong></p>
                <p>✓ Sets <code className="font-mono">pending</code> as default status</p>
                <p>✓ Automatically adds <strong className={darkMode ? "text-white font-mono" : "font-mono"}>created_at</strong> and <strong className={darkMode ? "text-white font-mono" : "font-mono"}>updated_at</strong> timestamps</p>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div>
              <strong className="text-gray-900 dark:text-white">down() Method</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Defines how to reverse the migration - what changes to revert.
                This method runs during rollback (<strong className={darkMode ? "text-white font-mono" : "font-mono"}>php juice db:rollback</strong>).
                It should undo everything that <strong className={darkMode ? "text-white font-mono" : "font-mono"}>up()</strong> did.
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <p>✓ Drops the <strong className={darkMode ? "text-white font-mono" : "font-mono"}>todos</strong> table completely</p>
                <p>✓ Reverts all columns, indexes, and constraints</p>
                <p>✓ Makes the migration reversible (safe to rollback)</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          Column Types & Modifiers Used
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Column Types</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>id()</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Auto-incrementing primary key (BIGINT UNSIGNED)</p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>string()</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>VARCHAR column (default length 255)</p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>text()</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>TEXT column for longer content</p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>timestamps()</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Creates created_at and updated_at DATETIME columns</p>
              </div>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Column Modifiers</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'->index()'}</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Adds a database index for faster queries</p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'->nullable()'}</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Allows NULL values in the column</p>
              </div>
              <div>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{`->default('pending')`}</strong>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Sets a default value for the column</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          Step 2: Run the Migration
        </h3>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          After creating your migration, run it to apply the changes to your database.
          Rocket will track which migrations have been run in a special <strong className={darkMode ? "text-white font-mono" : "font-mono"}>migrations</strong> table.
        </p>

        <InlineCodeExample
          code={`php juice db:migrate`}
          language="bash"
          title=""
          description="Apply migration to database. Executes all pending migrations, creating the todos table with proper schema, indexes, and constraints"
          color="gray"
          compact={true}
        />

        <div className={`mt-3 p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <strong className={darkMode ? "text-white font-mono" : "font-mono"}>What happens:</strong> Rocket reads the <strong className={darkMode ? "text-white font-mono" : "font-mono"}>up()</strong> method,
            creates the todos table with all columns and indexes, and records this migration as completed.
          </p>
        </div>
      </div>

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          Step 3: Rolling Back (Optional)
        </h3>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          If you need to undo a migration, use the rollback command. This executes the <strong className={darkMode ? "text-white font-mono" : "font-mono"}>down()</strong> method.
        </p>

        <InlineCodeExample
          code={`php juice db:rollback`}
          language="bash"
          title=""
          description="Rollback last migrations. Un-does the most recent migration batch by executing the down() method, dropping the todos table"
          color="gray"
          compact={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className={darkMode ? "text-white font-mono" : "font-mono"}>php juice db:rollback --step=3</strong>
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Rollback the last 3 migrations</p>
          </div>
          <div className={`p-2 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className={darkMode ? "text-white font-mono" : "font-mono"}>php juice db:reset</strong>
            <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Rollback all migrations (reset entire database)</p>
          </div>
        </div>
      </div>

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Migration Best Practices
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Always write both <strong className={darkMode ? "text-white font-mono" : "font-mono"}>up()</strong> and <strong className={darkMode ? "text-white font-mono" : "font-mono"}>down()</strong> methods for reversible migrations</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Use descriptive migration names like <strong className={darkMode ? "text-white font-mono" : "font-mono"}>create_todos_table</strong> or <strong className={darkMode ? "text-white font-mono" : "font-mono"}>add_status_to_todos</strong></span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Add indexes to columns used in <strong className={darkMode ? "text-white font-mono" : "font-mono"}>WHERE</strong> clauses for better performance</span>
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
