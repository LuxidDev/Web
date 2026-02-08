import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Check,
  AlertCircle,
  Terminal,
  Package,
  Server,
  Database,
} from "lucide-react";
import CodeExample from "@/components/CodeExample";
import InlineCodeExample from "@/components/InlineCodeExample";

export default function InstallationContent() {
  const { darkMode } = useTheme();
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Installation Guide</h2>
      <p
        className={`text-lg mb-6 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
      >
        Follow this step-by-step guide to install Luxid Framework on your
        system.
      </p>

      <h3 className="text-2xl font-bold mb-4">Prerequisites</h3>
      <div
        className={`mb-8 p-6 rounded-xl ${
          darkMode
            ? "bg-zinc-900/50 border border-zinc-800"
            : "bg-zinc-50 border border-zinc-200"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? "bg-green-500/20" : "bg-green-100"
              }`}
            >
              <Terminal className="w-4 h-4 text-green-500" />
            </div>
            <div>
              <h4 className="font-bold mb-1">PHP 8.0 or higher</h4>
              <p
                className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
              >
                Check with: <code className="font-mono text-xs">php -v</code>
              </p>
              <div
                className={`mt-2 p-2 rounded text-xs ${
                  darkMode ? "bg-zinc-800" : "bg-zinc-100"
                }`}
              >
                <strong>Required Extensions:</strong> PDO, MBString, JSON,
                OpenSSL
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? "bg-blue-500/20" : "bg-blue-100"
              }`}
            >
              <Package className="w-4 h-4 text-blue-500" />
            </div>
            <div>
              <h4 className="font-bold mb-1">Composer</h4>
              <p
                className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
              >
                PHP dependency manager
              </p>
              <div
                className={`mt-2 p-2 rounded text-xs ${
                  darkMode ? "bg-zinc-800" : "bg-zinc-100"
                }`}
              >
                <strong>Install:</strong>{" "}
                <code className="font-mono">
                  curl -sS https://getcomposer.org/installer | php
                </code>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? "bg-purple-500/20" : "bg-purple-100"
              }`}
            >
              <Database className="w-4 h-4 text-purple-500" />
            </div>
            <div>
              <h4 className="font-bold mb-1">Database (Optional)</h4>
              <p
                className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
              >
                MySQL
              </p>
              <div
                className={`mt-2 p-2 rounded text-xs ${
                  darkMode ? "bg-zinc-800" : "bg-zinc-100"
                }`}
              >
                <strong>MySQL only supported,</strong> for now at least.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? "bg-yellow-500/20" : "bg-yellow-100"
              }`}
            >
              <Server className="w-4 h-4 text-yellow-500" />
            </div>
            <div>
              <h4 className="font-bold mb-1">Web Server</h4>
              <p
                className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
              >
                The awesome PHP web server
              </p>
              <div
                className={`mt-2 p-2 rounded text-xs ${
                  darkMode ? "bg-zinc-800" : "bg-zinc-100"
                }`}
              >
                <strong>Built-in:</strong>{" "}
                <code className="font-mono">php juice start</code> uses PHP's
                built-in server
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Installation Steps</h3>

      <div className="space-y-8">
        {/* Step 1 */}
        <div
          className={`p-6 rounded-xl ${
            darkMode
              ? "bg-zinc-900/50 border border-zinc-800"
              : "bg-zinc-50 border border-zinc-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode
                  ? "bg-blue-500 text-white"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              1
            </div>
            <h4 className="text-xl font-bold">Create New Project</h4>
          </div>

          <div className="mb-6">
            <p
              className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
            >
              You can create a new Luxid project using either{" "}
              <strong>Composer</strong> or the official{" "}
              <strong>Luxid CLI</strong>. Choose the approach that fits your
              workflow.
            </p>

            {/* Composer */}
            <InlineCodeExample
              code="composer create-project luxid/framework myapp"
              title="Using Composer"
              description="This downloads the Luxid framework starter template and sets up a new project in the 'myapp' directory."
              icon={Package}
              color="blue"
              language="bash"
            />

            {/* Spacer */}
            <div className="h-4" />
            {/* Luxid CLI */}
            <InlineCodeExample
              code="luxid new myapp"
              title="Using Luxid CLI"
              description="This uses the Luxid command-line tool to scaffold a fresh project with sensible defaults in seconds."
              icon={Terminal}
              color="purple"
              language="bash"
            />
          </div>

          <div
            className={`p-4 rounded-lg ${darkMode ? "bg-zinc-800/50" : "bg-zinc-100"}`}
          >
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              What's happening under the hood?
            </h5>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              Composer reads the <code>composer.json</code> file in the Luxid
              framework package, which:
            </p>
            <ul
              className={`text-sm mt-2 space-y-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                Downloads Luxid Engine and all dependencies
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                Runs post-create-project scripts to set up the project structure
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                Creates the Juice CLI tool in your project root
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 mt-1 text-green-500 flex-shrink-0" />
                Sets up PSR-4 autoloading for your app classes
              </li>
            </ul>
          </div>
        </div>

        {/* Step 2 */}
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode
                  ? "bg-purple-500 text-white"
                  : "bg-purple-100 text-purple-600"
              }`}
            >
              2
            </div>
            <h4 className="text-xl font-bold">Configure Environment</h4>
          </div>

          <div className="mb-6">
            <p
              className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
            >
              Set up your environment variables:
            </p>
            <InlineCodeExample
              code={`# Navigate to your project
cd myapp

# Copy environment file
cp .env.example .env

# Edit .env with your settings
nano .env`}
              title="Configure Environment"
              description="Copy and configure your environment file"
              icon={Terminal}
              color="purple"
              language="bash"
            />
          </div>

          <div
            className={`p-4 rounded-lg ${darkMode ? "bg-zinc-800/50" : "bg-zinc-100"}`}
          >
            <h5 className="font-bold mb-2">
              Environment Configuration Options
            </h5>
            <CodeExample
              code={`# Database Configuration
DB_DSN=mysql:host=localhost;port=3306;dbname=luxid
DB_USER=root
DB_PASSWORD=

# Application Settings
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Session
SESSION_LIFETIME=120`}
              language="ini"
              title=".env File Example"
              explanation="Update these values according to your environment. For development, you can use the defaults."
            />
          </div>

          <div
            className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-blue-900/20 border border-blue-800" : "bg-blue-50 border border-blue-200"}`}
          >
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-500" />
              How Luxid loads configuration
            </h5>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              In <code>web/index.php</code>, Luxid loads environment variables:
            </p>
            <CodeExample
              code={`<?php
// Load environment variables
$dotenv = Dotenv\\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

// Configuration is passed to Application constructor
$config = require_once __DIR__ . '/../config/config.php';
$app = new Application(dirname(__DIR__), $config);`}
              language="php"
              title="Application Bootstrap"
              explanation="The Application class uses this configuration to set up database connections and other services."
            />
          </div>
        </div>

        {/* Step 3 */}
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode
                  ? "bg-green-500 text-white"
                  : "bg-green-100 text-green-600"
              }`}
            >
              3
            </div>
            <h4 className="text-xl font-bold">Database Setup</h4>
          </div>

          <div className="mb-6">
            <p
              className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
            >
              Set up your database (optional for simple apps):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div
                className={`p-4 rounded-lg ${darkMode ? "bg-zinc-800" : "bg-zinc-100"}`}
              >
                <h5 className="font-bold mb-2">Create Database</h5>
                <InlineCodeExample
                  code="php juice db:create"
                  title="Create Database"
                  description="Creates the database specified in your .env file"
                  icon={Database}
                  color="green"
                  language="bash"
                  compact={true}
                />
              </div>

              <div
                className={`p-4 rounded-lg ${darkMode ? "bg-zinc-800" : "bg-zinc-100"}`}
              >
                <h5 className="font-bold mb-2">Run Migrations</h5>
                <InlineCodeExample
                  code="php juice db:migrate"
                  title="Run Migrations"
                  description="Runs database migrations to create tables"
                  icon={Database}
                  color="green"
                  language="bash"
                  compact={true}
                />
              </div>
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${darkMode ? "bg-green-900/20 border border-green-800" : "bg-green-50 border border-green-200"}`}
          >
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-green-500" />
              How Luxid handles database
            </h5>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              The <code>Database</code> class in Luxid Engine:
            </p>
            <CodeExample
              code={`<?php
// Engine/Database/Database.php
class Database
{
    public \\PDO $pdo;

    public function __construct(array $config)
    {
        $dsn = $config['dsn'] ?? '';
        $user = $config['user'] ?? '';
        $password = $config['password'] ?? '';

        $this->pdo = new \\PDO($dsn, $user, $password);
        $this->pdo->setAttribute(\\PDO::ATTR_ERRMODE, \\PDO::ERRMODE_EXCEPTION);
    }

    public function applyMigrations()
    {
        $this->createMigrationsTable();
        // ... migration logic
    }
}`}
              language="php"
              title="Database Class Implementation"
              explanation="Creates PDO connection and handles migrations automatically"
            />
          </div>
        </div>

        {/* Step 4 */}
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                darkMode
                  ? "bg-yellow-500 text-white"
                  : "bg-yellow-100 text-yellow-600"
              }`}
            >
              4
            </div>
            <h4 className="text-xl font-bold">Start Development Server</h4>
          </div>

          <div className="mb-6">
            <p
              className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
            >
              Start the built-in PHP development server:
            </p>
            <InlineCodeExample
              code="php juice start"
              title="Start Server"
              description="Starts the server at http://localhost:8000 by default"
              icon={Server}
              color="yellow"
              language="bash"
            />

            <div className="mt-4">
              <p
                className={`mb-2 ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
              >
                Optional: Specify host and port:
              </p>
              <InlineCodeExample
                code="php juice start --host=127.0.0.1 --port=8080"
                title="Custom Host and Port"
                description="Start server with custom host and port"
                icon={Server}
                color="yellow"
                language="bash"
              />
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${darkMode ? "bg-yellow-900/20 border border-yellow-800" : "bg-yellow-50 border border-yellow-200"}`}
          >
            <h5 className="font-bold mb-2 flex items-center gap-2">
              <Server className="w-4 h-4 text-yellow-500" />
              How the development server works
            </h5>
            <p
              className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              The <code>StartCommand</code> in Juice CLI:
            </p>
            <CodeExample
              code={`<?php
// Engine/Console/Commands/StartCommand.php
public function handle(array $argv): int
{
    $host = $this->options['host'] ?? 'localhost';
    $port = $this->options['port'] ?? 8000;
    $webDir = $this->getProjectRoot() . '/web';

    passthru("php -S {$host}:{$port} -t {$webDir}");
    return 0;
}`}
              language="php"
              title="Start Command Implementation"
              explanation="Uses PHP's built-in web server and serves files from the web/ directory"
            />
          </div>
        </div>
      </div>

      {/* Verification */}
      <div
          className={`mt-8 p-6 rounded-xl ${
            darkMode
              ? "bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
              : "bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200"
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? "bg-green-500/20" : "bg-green-100"
              }`}
            >
              <Check
                className={`w-6 h-6 ${darkMode ? "text-green-400" : "text-green-600"}`}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Verification</h3>
              <p className={`${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
                Verify your installation is working correctly
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Check Application Status */}
            <div
              className={`p-4 rounded-lg flex flex-col ${darkMode ? "bg-zinc-800/50" : "bg-zinc-100"}`}
            >
              <h4 className="font-bold mb-3 text-lg">Check Application Status</h4>
              <div className="mb-4">
                <div className="font-mono text-sm bg-black/10 dark:bg-white/10 px-3 py-2 rounded">
                  <code>php juice status</code>
                </div>
              </div>
              <p className={`text-sm mt-auto ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Shows environment, routes, and database status
              </p>
            </div>

            {/* List Routes */}
            <div
              className={`p-4 rounded-lg flex flex-col ${darkMode ? "bg-zinc-800/50" : "bg-zinc-100"}`}
            >
              <h4 className="font-bold mb-3 text-lg">List Routes</h4>
              <div className="mb-4">
                <div className="font-mono text-sm bg-black/10 dark:bg-white/10 px-3 py-2 rounded">
                  <code>php juice routes</code>
                </div>
              </div>
              <p className={`text-sm mt-auto ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Displays all registered routes
              </p>
            </div>

            {/* Check Environment */}
            <div
              className={`p-4 rounded-lg flex flex-col ${darkMode ? "bg-zinc-800/50" : "bg-zinc-100"}`}
            >
              <h4 className="font-bold mb-3 text-lg">Check Environment</h4>
              <div className="mb-4">
                <div className="font-mono text-sm bg-black/10 dark:bg-white/10 px-3 py-2 rounded">
                  <code>php juice env:check</code>
                </div>
              </div>
              <p className={`text-sm mt-auto ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Validates environment configuration
              </p>
            </div>
          </div>

          <div
            className={`mt-6 p-5 rounded-lg flex items-center gap-4 ${
              darkMode ? "bg-green-900/20 border border-green-800/50" : "bg-green-100 border border-green-200"
            }`}
          >
            <div className={`p-2 rounded-full ${darkMode ? "bg-green-500/20" : "bg-green-200"}`}>
              <Check className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-600"}`} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-1">🎉 Installation Complete!</h4>
              <p
                className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}
              >
                Visit{" "}
                <a
                  href="http://localhost:8000"
                  className="text-blue-500 hover:underline font-medium"
                >
                  http://localhost:8000
                </a>{" "}
                in your browser. You should see the Luxid welcome page. Your
                installation is successful!
              </p>
            </div>
          </div>
        </div>

      {/* Troubleshooting */}
      <div
        className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}
      >
        <h3 className="text-xl font-bold mb-4">Troubleshooting</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              Database Connection Issues
            </h4>
            <p
              className={`text-sm mb-2 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              If you see database connection errors:
            </p>
            <ul
              className={`text-sm space-y-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                Verify database credentials in <code>.env</code> file
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                Make sure database server is running
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">•</span>
                Try: <code className="font-mono">php juice db:create</code>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              Port Already in Use
            </h4>
            <p
              className={`text-sm mb-2 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              If port 8000 is already in use:
            </p>
            <InlineCodeExample
              code="php juice start --port=8080"
              title="Use Different Port"
              description="Start server on a different port"
              icon={Server}
              color="yellow"
              language="bash"
            />
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-blue-500" />
              Juice CLI Not Found
            </h4>
            <p
              className={`text-sm mb-2 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              If <code>php juice</code> doesn't work:
            </p>
            <CodeExample
              code={`chmod +x juice  # Make executable (Unix/Linux/macOS)
php vendor/luxid/engine/juice  # Alternative path`}
              language="bash"
              title="Fix Juice CLI Issues"
              explanation="Make the juice file executable or use the vendor path directly"
            />
          </div>
        </div>
      </div>

            <div
        className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-zinc-900/50 border border-zinc-800" : "bg-zinc-50 border border-zinc-200"}`}
      >
        <h3 className="text-xl font-bold mb-6">Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Learn the Basics Card */}
          <div
            className={`p-5 rounded-xl flex flex-col justify-between ${darkMode ? "bg-blue-900/20 border border-blue-800" : "bg-blue-50 border border-blue-200"}`}
          >
            <div>
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                <div className={`p-2 rounded-lg ${darkMode ? "bg-blue-500/10" : "bg-blue-100"}`}>
                  <Terminal className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                Learn the Basics
              </h4>
              <p
                className={`text-sm mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}
              >
                Continue to the next chapter to build your first Luxid application
                and understand the SEA architecture.
              </p>
            </div>
            <a
              href="/docs/first-app"
              className={`inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-colors w-full ${
                darkMode
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Start Building Your First App →
            </a>
          </div>

          {/* Explore Juice CLI Card */}
          <div
            className={`p-5 rounded-xl ${darkMode ? "bg-purple-900/20 border border-purple-800" : "bg-purple-50 border border-purple-200"}`}
          >
            <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
              <div className={`p-2 rounded-lg ${darkMode ? "bg-purple-500/10" : "bg-purple-100"}`}>
                <Terminal className={`w-5 h-5 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
              </div>
              Explore Juice CLI
            </h4>
            <p
              className={`text-sm mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}
            >
              Try these Juice CLI commands to explore your new project:
            </p>
            <div className="space-y-3">
              {/* Juice CLI Commands - Compact Version */}
              <div className={`p-3 rounded-lg ${darkMode ? "bg-purple-900/20 border border-purple-800/50" : "bg-white border border-purple-200"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1 rounded ${darkMode ? "bg-purple-500/10" : "bg-purple-100"}`}>
                    <Terminal className={`w-3.5 h-3.5 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                  </div>
                  <span className="text-sm font-medium">Generate Todo App</span>
                </div>
                <div className="font-mono text-sm bg-black/5 dark:bg-white/5 px-3 py-2 rounded mt-1">
                  <code>php juice make:todo</code>
                </div>
                <p className="text-xs mt-2 text-zinc-500 dark:text-zinc-400">
                  Generate a complete TODO application
                </p>
              </div>

              <div className={`p-3 rounded-lg ${darkMode ? "bg-purple-900/20 border border-purple-800/50" : "bg-white border border-purple-200"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className={`p-1 rounded ${darkMode ? "bg-purple-500/10" : "bg-purple-100"}`}>
                    <Terminal className={`w-3.5 h-3.5 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                  </div>
                  <span className="text-sm font-medium">Generate API CRUD</span>
                </div>
                <div className="font-mono text-sm bg-black/5 dark:bg-white/5 px-3 py-2 rounded mt-1">
                  <code>php juice make:api Product</code>
                </div>
                <p className="text-xs mt-2 text-zinc-500 dark:text-zinc-400">
                  Generate full API CRUD for Products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
