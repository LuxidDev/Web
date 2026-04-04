import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Layers, CheckCircle, ArrowRight,
  AlertCircle, Eye,
} from 'lucide-react';
import CodeExample from '@/components/CodeExample';
import TerminalCommand from '@/components/TerminalCommand';

export default function JuiceCLIContent() {
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
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Juice CLI</h3>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              The command-line interface for Luxid Framework. Generate code, manage databases, and control your application.
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">What is Juice CLI?</h2>
      <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        Juice is Luxid's command-line tool, inspired by Laravel's Artisan. It provides a powerful set of commands
        to speed up development, automate repetitive tasks, and manage your Luxid applications.
      </p>
      <p className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        With Juice CLI, you can:
      </p>
      <ul className={`space-y-2 mb-8 ml-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Generate Actions, Entities and Migrations with a single command</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Install Luxid Service Providers with a single command</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Manage database migrations and seeding</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Start the development server</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Check application status and environment</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>Create complete CRUD APIs in seconds</span>
        </li>
      </ul>

      {/* Getting Started */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Getting Started</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Juice CLI is automatically available in any Luxid project. To see available commands:
        </p>
        <div className="space-y-2">
          <TerminalCommand
            command="php juice"
            description="List all commands. Show all available Juice CLI commands"
          />
          <TerminalCommand
            command="php juice help <command>"
            description="Get command help. Show detailed help for a specific command"
          />
          <TerminalCommand
            command="php juice version"
            description="Check version. Show Juice CLI and Luxid version information"
          />
        </div>
      </div>

      {/* Server Commands */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Server Commands</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              php juice start
            </h4>
            <p className={`mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Start the built-in PHP development server.
            </p>
            <div className="space-y-2">
              <TerminalCommand
                command="php juice start"
                description="Starts server at http://localhost:8000"
              />
              <TerminalCommand
                command="php juice start --host=127.0.0.1 --port=8080"
                description="Custom host and port. Start server on specific host and port"
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              php juice fresh
            </h4>
            <p className={`mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Fresh install - clears cache, runs migrations, and seeds the database.
            </p>
            <TerminalCommand
              command="php juice fresh"
              description="Fresh install. Complete project reset for new installations"
            />
          </div>
        </div>
      </div>

      {/* Application Commands */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Application Commands</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              <Eye className="w-4 h-4" />
              php juice status
            </h4>
            <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Check application status and environment.
            </p>
            <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
              Shows: PHP version, directories, routes count, migrations, environment status
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              <Layers className="w-4 h-4" />
              php juice routes
            </h4>
            <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              List all registered routes.
            </p>
            <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
              Shows: Method, Path, Handler, Middleware for each route
            </p>
          </div>
        </div>
      </div>

      {/* Database Commands */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Database Commands</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Creation & Status</h4>
            <div className="space-y-2">
              <TerminalCommand
                command="php juice db:create"
                description="Create database from .env configuration"
              />
              <TerminalCommand
                command="php juice db:drop"
                description="Drop entire database (with confirmation)"
              />
              <TerminalCommand
                command="php juice db:reset"
                description="Drop and recreate database"
              />
              <TerminalCommand
                command="php juice db:status"
                description="Show database info, tables, and migrations"
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Migrations</h4>
            <div className="space-y-2">
              <TerminalCommand
                command="php juice db:migrate"
                description="Run all pending migrations"
              />
              <TerminalCommand
                command="php juice db:migrate --fresh"
                description="Drop all tables and re-run migrations"
              />
              <TerminalCommand
                command="php juice db:rollback"
                description="Rollback the last migration"
              />
              <TerminalCommand
                command="php juice db:refresh"
                description="Rollback all and migrate again"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Code Generation Commands */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Code Generation (Make Commands)</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Core Components</h4>
            <div className="space-y-2">
              <TerminalCommand
                command="php juice make:action TodoAction"
                description="Generate a new Action class"
              />
              <TerminalCommand
                command="php juice make:entity User"
                description="Generate a new Entity with basic CRUD"
              />
              <TerminalCommand
                command="php juice make:middleware AuthMiddleware"
                description="Generate a new Middleware class"
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Database & Resources</h4>
            <div className="space-y-2">
              <TerminalCommand
                command="php juice make:migration create_users_table"
                description="Generate a new migration file"
              />
              <TerminalCommand
                command="php juice make:seeder UserSeeder"
                description="Generate a new database seeder"
              />
              <TerminalCommand
                command="php juice make:factory UserFactory"
                description="Generate a new model factory"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Quick Generators</h4>
          <div className="space-y-2">
            <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
              <TerminalCommand
                command="php juice make:api Product"
                description="Generate complete API. Creates Entity, Action, Migration, and Routes for a resource"
              />
              <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Generates: Entity class, CRUD Actions, Migration file, Route definitions, and Factory
              </p>
            </div>

            <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
              <TerminalCommand
                command="php juice make:todo"
                description="Create a Todo example. Generate a complete working Todo CRUD example"
              />
              <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Perfect for learning or starting a new feature
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Commands */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Help Commands</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="space-y-2">
          <TerminalCommand
            command="php juice help"
            description="General help. Show all available commands grouped by category"
          />
          <TerminalCommand
            command="php juice help make:action"
            description="Command help. Show detailed help for a specific command"
          />
        </div>
      </div>

      {/* Directory Structure */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Directory Structure Created by Juice</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <CodeExample
          code={`my_app/
├── app/
│   ├── Actions/          # Action classes (generated by make:action)
│   ├── Entities/         # Entity classes (generated by make:entity)
│   └── Middleware/       # Middleware classes (generated by make:middleware)
│   └── Providers/        # Service Providers classes (generated by <provider>:install)
├── config/               # Configuration files
├── migrations/           # Database migrations (generated by make:migration)
├── nova/                 # Frontend 
├── routes/               # Route definitions
├── seeds/                # Database seeders (generated by make:seeder)
├── web/                  # Public web files
├── juice                 # Juice CLI executable
├── .env                  # Environment variables
└── composer.json         # Dependencies`}
          language="bash"
          title="Luxid Project Structure"
          explanation="Juice CLI commands automatically place generated files in the correct directories."
        />
      </div>

      {/* Quick Start Examples */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Quick Start Examples</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Start a new project:</h4>
            <div className="space-y-2">
              <TerminalCommand
                command="composer create-project luxid/framework my_app"
                description="Create a new Luxid application"
              />
              <TerminalCommand
                command="cd my_app"
                description="Enter your project directory"
              />
              <TerminalCommand
                command="php juice status"
                description="Checks current status of the app (.env, routes, etc)"
              />
              <TerminalCommand
                command="php juice start"
                description="Launch the development server"
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Create a blog system:</h4>
            <div className="space-y-2">
              <TerminalCommand
                command="php juice make:api Post"
                description="Create Post API. Generate complete CRUD for posts"
              />
              <TerminalCommand
                command="php juice make:api Comment"
                description="Create Comment API. Generate complete CRUD for comments"
              />
              <TerminalCommand
                command="php juice db:migrate"
                description="Run migrations. Create database tables"
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Check everything is working:</h4>
            <div className="space-y-2">
              <TerminalCommand
                command="php juice status"
                description="Application status. Check environment and setup"
              />
              <TerminalCommand
                command="php juice db:status"
                description="Database status. Check database and tables"
              />
              <TerminalCommand
                command="php juice routes"
                description="List routes. See all registered routes"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tips & Best Practices */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Juice CLI Tips & Best Practices</h3>
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
                <span>Use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>make:api</strong> to quickly scaffold resources</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Run <strong className={darkMode ? "text-white font-mono" : "font-mono"}>db:status</strong> regularly to monitor your database</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>--force</strong> flag to overwrite files when needed</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Check <strong className={darkMode ? "text-white font-mono" : "font-mono"}>env:check</strong> before deploying to production</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>help</strong> command to discover new features</span>
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
                <span>Don't run <strong className={darkMode ? "text-white font-mono" : "font-mono"}>db:drop</strong> or <strong className={darkMode ? "text-white font-mono" : "font-mono"}>db:reset</strong> in production without backups</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid modifying generated files manually after running <strong className={darkMode ? "text-white font-mono" : "font-mono"}>make:api</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Don't run <strong className={darkMode ? "text-white font-mono" : "font-mono"}>fresh</strong> if you have important data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid using <strong className={darkMode ? "text-white font-mono" : "font-mono"}>--force</strong> without reviewing what will be overwritten</span>
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
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">"Command not found"</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Make sure you're in a Luxid project directory. Run <strong className={darkMode ? "text-white font-mono" : "font-mono"}>composer install</strong> if needed.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">"Database connection failed"</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Check your <strong className={darkMode ? "text-white font-mono" : "font-mono"}>.env</strong> file and run <strong className={darkMode ? "text-white font-mono" : "font-mono"}>php juice env:check</strong> to validate.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">"Migration class not found"</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Run <strong className={darkMode ? "text-white font-mono" : "font-mono"}>composer dump-autoload</strong> to regenerate the autoloader.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">"Permission denied"</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Ensure you have write permissions for the project directory, especially <strong className={darkMode ? "text-white font-mono" : "font-mono"}>migrations/</strong> and <strong className={darkMode ? "text-white font-mono" : "font-mono"}>app/</strong> folders.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Frequently Asked Questions</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">Can I create my own Juice commands?</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Yes! Create command classes in <strong className={darkMode ? "text-white font-mono" : "font-mono"}>app/Console/Commands/</strong> extending
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>Luxid\Console\Command</strong>.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">How do I use Juice in production?</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>php juice db:migrate</strong> for deployments. Avoid destructive commands like <strong className={darkMode ? "text-white font-mono" : "font-mono"}>fresh</strong> or <strong className={darkMode ? "text-white font-mono" : "font-mono"}>db:drop</strong> in production.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">What's the difference between fresh and migrate --fresh?</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>fresh</strong> clears cache, runs migrations, and seeds. <strong className={darkMode ? "text-white font-mono" : "font-mono"}>migrate --fresh</strong> only handles database operations.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-1 text-gray-900 dark:text-white">Can I customize the generated code templates?</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Yes! Publish the stubs using <strong className={darkMode ? "text-white font-mono" : "font-mono"}>php juice stub:publish</strong> and modify them in <strong className={darkMode ? "text-white font-mono" : "font-mono"}>resources/stubs/</strong>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
