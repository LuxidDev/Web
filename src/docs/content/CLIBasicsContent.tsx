import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Terminal, Server, Database, Code, Layers, CheckCircle, ArrowRight,
  AlertCircle, Info, Plus, Settings, RefreshCw, Trash2, Eye,
  FileText, HelpCircle, Command, Rocket, Zap, Shield
} from 'lucide-react';
import CodeExample from '@/components/CodeExample';
import InlineCodeExample from '@/components/InlineCodeExample';

export default function JuiceCLIContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Hero Section */}
      <div className={`mb-8 p-6 rounded-2xl ${darkMode
        ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'
        : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
        }`}>
        <div className="flex items-start gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Juice CLI</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              The command-line interface for Luxid Framework. Generate code, manage databases, and control your application.
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <h2 className="text-3xl font-bold mb-6">What is Juice CLI?</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        Juice is Luxid's command-line tool, inspired by Laravel's Artisan. It provides a powerful set of commands
        to speed up development, automate repetitive tasks, and manage your Luxid applications.
      </p>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        With Juice CLI, you can:
      </p>
      <ul className={`space-y-2 mb-8 ml-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
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
      <h3 className="text-2xl font-bold mb-4">Getting Started</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Juice CLI is automatically available in any Luxid project. To see available commands:
        </p>
        <div className="space-y-2">
          <InlineCodeExample
            code="php juice"
            title="List all commands"
            description="Show all available Juice CLI commands"
            color="green"
            compact={true}
          />
          <InlineCodeExample
            code="php juice help <command>"
            title="Get command help"
            description="Show detailed help for a specific command"
            color="green"
            compact={true}
          />
          <InlineCodeExample
            code="php juice version"
            title="Check version"
            description="Show Juice CLI and Luxid version information"
            color="green"
            compact={true}
          />
        </div>
      </div>

      {/* Server Commands */}
      <h3 className="text-2xl font-bold mb-4">Server Commands</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              php juice start
            </h4>
            <p className={`mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Start the built-in PHP development server.
            </p>
            <div className="space-y-2">
              <InlineCodeExample
                code="php juice start"
                title="Default server"
                description="Starts server at http://localhost:8000"
                color="blue"
                compact={true}
              />
              <InlineCodeExample
                code="php juice start --host=127.0.0.1 --port=8080"
                title="Custom host and port"
                description="Start server on specific host and port"
                color="blue"
                compact={true}
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              php juice fresh
            </h4>
            <p className={`mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Fresh install - clears cache, runs migrations, and seeds the database.
            </p>
            <InlineCodeExample
              code="php juice fresh"
              title="Fresh install"
              description="Complete project reset for new installations"
              color="blue"
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* Application Commands */}
      <h3 className="text-2xl font-bold mb-4">Application Commands</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              php juice status
            </h4>
            <p className={`text-sm mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Check application status and environment.
            </p>
            <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Shows: PHP version, directories, routes count, migrations, environment status
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              php juice routes
            </h4>
            <p className={`text-sm mb-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              List all registered routes.
            </p>
            <p className={`text-xs ${darkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              Shows: Method, Path, Handler, Middleware for each route
            </p>
          </div>
        </div>
      </div>

      {/* Database Commands */}
      <h3 className="text-2xl font-bold mb-4">Database Commands</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-cyan-800' : 'bg-cyan-50 border border-cyan-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">Creation & Status</h4>
            <div className="space-y-2">
              <InlineCodeExample
                code="php juice db:create"
                title="Create database"
                description="Create database from .env configuration"
                color="blue"
                compact={true}
              />
              <InlineCodeExample
                code="php juice db:drop"
                title="Drop database"
                description="Drop entire database (with confirmation)"
                color="blue"
                compact={true}
              />
              <InlineCodeExample
                code="php juice db:reset"
                title="Reset database"
                description="Drop and recreate database"
                color="blue"
                compact={true}
              />
              <InlineCodeExample
                code="php juice db:status"
                title="Database status"
                description="Show database info, tables, and migrations"
                color="blue"
                compact={true}
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Migrations</h4>
            <div className="space-y-2">
              <InlineCodeExample
                code="php juice db:migrate"
                title="Run migrations"
                description="Run all pending migrations"
                color="blue"
                compact={true}
              />
              <InlineCodeExample
                code="php juice db:migrate --fresh"
                title="Fresh migrations"
                description="Drop all tables and re-run migrations"
                color="blue"
                compact={true}
              />
              <InlineCodeExample
                code="php juice db:rollback"
                title="Rollback"
                description="Rollback the last migration"
                color="blue"
                compact={true}
              />
              <InlineCodeExample
                code="php juice db:refresh"
                title="Refresh"
                description="Rollback all and migrate again"
                color="blue"
                compact={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Code Generation Commands */}
      <h3 className="text-2xl font-bold mb-4">Code Generation (Make Commands)</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">Core Components</h4>
            <div className="space-y-2">
              <InlineCodeExample
                code="php juice make:action TodoAction"
                title="Create Action"
                description="Generate a new Action class"
                color="green"
                compact={true}
              />
              <InlineCodeExample
                code="php juice make:entity User"
                title="Create Entity"
                description="Generate a new Entity with basic CRUD"
                color="green"
                compact={true}
              />
              <InlineCodeExample
                code="php juice make:middleware AuthMiddleware"
                title="Create Middleware"
                description="Generate a new Middleware class"
                color="green"
                compact={true}
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Database & Resources</h4>
            <div className="space-y-2">
              <InlineCodeExample
                code="php juice make:migration create_users_table"
                title="Create Migration"
                description="Generate a new migration file"
                color="green"
                compact={true}
              />
              <InlineCodeExample
                code="php juice make:seeder UserSeeder"
                title="Create Seeder"
                description="Generate a new database seeder"
                color="green"
                compact={true}
              />
              <InlineCodeExample
                code="php juice make:factory UserFactory"
                title="Create Factory"
                description="Generate a new model factory"
                color="green"
                compact={true}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-bold mb-2">Quick Generators</h4>
          <div className="space-y-2">
            <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
              <InlineCodeExample
                code="php juice make:api Product"
                title="Generate Complete API"
                description="Creates Entity, Action, Migration, and Routes for a resource"
                color="green"
                compact={true}
              />
              <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Generates: Entity class, CRUD Actions, Migration file, Route definitions, and Factory
              </p>
            </div>

            <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
              <InlineCodeExample
                code="php juice make:todo"
                title="Create Todo Example"
                description="Generate a complete working Todo CRUD example"
                color="green"
                compact={true}
              />
              <p className={`text-xs mt-1 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Perfect for learning or starting a new feature
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Commands */}
      <h3 className="text-2xl font-bold mb-4">Help Commands</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-yellow-900/20 border border-yellow-800' : 'bg-yellow-50 border border-yellow-200'}`}>
        <div className="space-y-2">
          <InlineCodeExample
            code="php juice help"
            title="General Help"
            description="Show all available commands grouped by category"
            color="yellow"
            compact={true}
          />
          <InlineCodeExample
            code="php juice help make:action"
            title="Command Help"
            description="Show detailed help for a specific command"
            color="yellow"
            compact={true}
          />
        </div>
      </div>

      {/* Directory Structure */}
      <h3 className="text-2xl font-bold mb-4">Directory Structure Created by Juice</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <CodeExample
          code={`myapp/
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
      <h3 className="text-2xl font-bold mb-4">Quick Start Examples</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-indigo-900/20 border border-indigo-800' : 'bg-indigo-50 border border-indigo-200'}`}>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold mb-2">Start a new project:</h4>
            <div className="space-y-2">
              <InlineCodeExample
                code="composer create-project luxid/framework my_app"
                title="Create project"
                description="Create a new Luxid application"
                color="indigo"
                compact={true}
              />
              <InlineCodeExample
                code="cd my_app"
                title="Setup"
                description="Run fresh install (clears cache, migrates, seeds)"
                color="indigo"
                compact={true}
              />
              <InlineCodeExample
                code="php juice status"
                title="Setup"
                description="Checks current status of the app (.env, routes, etc)"
                color="indigo"
                compact={true}
              />
              <InlineCodeExample
                code="php juice start"
                title="Start server"
                description="Launch the development server"
                color="indigo"
                compact={true}
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Create a blog system:</h4>
            <div className="space-y-2">
              <InlineCodeExample
                code="php juice make:api Post"
                title="Create Post API"
                description="Generate complete CRUD for posts"
                color="indigo"
                compact={true}
              />
              <InlineCodeExample
                code="php juice make:api Comment"
                title="Create Comment API"
                description="Generate complete CRUD for comments"
                color="indigo"
                compact={true}
              />
              <InlineCodeExample
                code="php juice db:migrate"
                title="Run migrations"
                description="Create database tables"
                color="indigo"
                compact={true}
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Check everything is working:</h4>
            <div className="space-y-2">
              <InlineCodeExample
                code="php juice status"
                title="Application status"
                description="Check environment and setup"
                color="indigo"
                compact={true}
              />
              <InlineCodeExample
                code="php juice db:status"
                title="Database status"
                description="Check database and tables"
                color="indigo"
                compact={true}
              />
              <InlineCodeExample
                code="php juice routes"
                title="List routes"
                description="See all registered routes"
                color="indigo"
                compact={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tips & Best Practices */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <h3 className="text-xl font-bold mb-6">Juice CLI Tips & Best Practices</h3>
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
                <span>Use <strong className="font-mono">make:api</strong> to quickly scaffold resources</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Run <strong className="font-mono">db:status</strong> regularly to monitor your database</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use <strong className="font-mono">--force</strong> flag to overwrite files when needed</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Check <strong className="font-mono">env:check</strong> before deploying to production</span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                <span>Use <strong className="font-mono">help</strong> command to discover new features</span>
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
                <span>Don't run <strong className="font-mono">db:drop</strong> or <strong className="font-mono">db:reset</strong> in production without backups</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid modifying generated files manually after running <strong className="font-mono">make:api</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Don't run <strong className="font-mono">fresh</strong> if you have important data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 text-lg font-bold mt-0.5">×</span>
                <span>Avoid using <strong className="font-mono">--force</strong> without reviewing what will be overwritten</span>
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
            <h4 className="font-bold mb-1">"Command not found"</h4>
            <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              Make sure you're in a Luxid project directory. Run <strong className="font-mono">composer install</strong> if needed.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1">"Database connection failed"</h4>
            <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              Check your <strong className="font-mono">.env</strong> file and run <strong className="font-mono">php juice env:check</strong> to validate.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1">"Migration class not found"</h4>
            <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              Run <strong className="font-mono">composer dump-autoload</strong> to regenerate the autoloader.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-1">"Permission denied"</h4>
            <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
              Ensure you have write permissions for the project directory, especially <strong className="font-mono">migrations/</strong> and <strong className="font-mono">app/</strong> folders.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold mb-1">Can I create my own Juice commands?</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Yes! Create command classes in <strong className="font-mono">app/Console/Commands/</strong> extending
              <strong className="font-mono">Luxid\Console\Command</strong>.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-1">How do I use Juice in production?</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Use <strong className="font-mono">php juice db:migrate</strong> for deployments. Avoid destructive commands like <strong className="font-mono">fresh</strong> or <strong className="font-mono">db:drop</strong> in production.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-1">What's the difference between fresh and migrate --fresh?</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <strong className="font-mono">fresh</strong> clears cache, runs migrations, and seeds. <strong className="font-mono">migrate --fresh</strong> only handles database operations.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-1">Can I customize the generated code templates?</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Yes! Publish the stubs using <strong className="font-mono">php juice stub:publish</strong> and modify them in <strong className="font-mono">resources/stubs/</strong>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
