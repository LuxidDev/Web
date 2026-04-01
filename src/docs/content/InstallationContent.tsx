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
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Installation Guide</h2>
      <p
        className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
      >
        Follow this step-by-step guide to install Luxid Framework on your
        system.
      </p>

      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Prerequisites</h3>
      <div
        className={`mb-8 p-6 rounded-xl ${darkMode
          ? "bg-gray-900/50 border border-gray-800"
          : "bg-gray-50 border border-gray-200"
          }`}
      >
        <div className="grid grid-cols-1 gap-4">
          {/* PHP */}
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-gray-800" : "bg-gray-200"
                }`}
            >
              <Terminal className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
            </div>
            <div>
              <h4 className="font-bold mb-1 text-gray-900 dark:text-white">PHP 8.0 or higher</h4>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Check with: <code className={`font-mono text-xs px-1 py-0.5 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
                  }`}>php -v</code>
              </p>
              <div className={`mt-2 p-2 rounded text-xs ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}>
                <strong className={darkMode ? "text-white" : ""}>Required Extensions:</strong> PDO, MBString, JSON, OpenSSL
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-gray-800" : "bg-gray-200"
                }`}
            >
              <Package className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
            </div>
            <div>
              <h4 className="font-bold mb-1 text-gray-900 dark:text-white">Composer</h4>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                PHP dependency manager
              </p>
              <div className={`mt-2 p-2 rounded text-xs ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}>
                <strong className={darkMode ? "text-white" : ""}>Install:</strong>{" "}
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>curl -sS https://getcomposer.org/installer | php</strong>
              </div>
            </div>
          </div>

          {/* Database */}
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-gray-800" : "bg-gray-200"
                }`}
            >
              <Database className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
            </div>
            <div>
              <h4 className="font-bold mb-1 text-gray-900 dark:text-white">Database (Optional)</h4>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                MySQL
              </p>
              <div className={`mt-2 p-2 rounded text-xs ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}>
                <strong className={darkMode ? "text-white" : ""}>MySQL only supported,</strong> for now at least.
              </div>
            </div>
          </div>

          {/* Web Server */}
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? "bg-gray-800" : "bg-gray-200"
                }`}
            >
              <Server className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
            </div>
            <div>
              <h4 className="font-bold mb-1 text-gray-900 dark:text-white">Web Server</h4>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                The awesome PHP web server
              </p>
              <div className={`mt-2 p-2 rounded text-xs ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                }`}>
                <strong className={darkMode ? "text-white" : ""}>Built-in:</strong>{" "}
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>php juice start</strong> uses PHP's built-in server
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Installation Steps</h3>

      <div className="space-y-8">
        {/* Step 1 - Create Project */}
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"
            }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-600"
                }`}
            >
              1
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">Create New Project</h4>
          </div>

          <div className="mb-6">
            <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              You can create a new Luxid project using either{" "}
              <strong className="text-gray-900 dark:text-white">Composer</strong> or the official{" "}
              <strong className="text-gray-900 dark:text-white">Luxid CLI</strong>.
            </p>

            <InlineCodeExample
              code="composer create-project luxid/framework myapp"
              title="Using Composer"
              description="Downloads the Luxid framework starter template and sets up a new project"
              color="gray"
              language="bash"
            />

            <div className="h-4" />

            <InlineCodeExample
              code="luxid new myapp"
              title="Using Luxid CLI"
              description="Uses the Luxid command-line tool to scaffold a fresh project"
              color="gray"
              language="bash"
            />
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h5 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              What's happening under the hood?
            </h5>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Composer reads the <strong className={`px-1 py-0.5 rounded ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                }`}>composer.json</strong> file, which:
            </p>
            <ul className={`text-sm mt-2 space-y-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                Downloads Luxid Engine and all dependencies
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                Runs post-create-project scripts to set up the project structure
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                Creates the Juice CLI tool in your project root
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3 h-3 mt-1 text-gray-500 flex-shrink-0" />
                Sets up PSR-4 autoloading for your app classes
              </li>
            </ul>
          </div>
        </div>

        {/* Step 2 - Configure Environment */}
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-600"
                }`}
            >
              2
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">Configure Environment</h4>
          </div>

          <div className="mb-6">
            <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Set up your environment variables:
            </p>
            <CodeExample
              code={`# Navigate to your project
cd myapp

# Copy environment file
cp .env.example .env

# Edit .env with your settings
code .env`}
              title="Configure Environment"
              explanation="Copy and configure your environment file"
              language="bash"
            />
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Environment Configuration Options</h5>
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
              explanation="Update these values according to your environment"
            />
          </div>

          <div className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h5 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              How Luxid loads configuration
            </h5>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              In <strong className={`px-1 py-0.5 rounded ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                }`}>web/index.php</strong>, Luxid loads environment variables:
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
              explanation="The Application class uses this configuration to set up services"
            />
          </div>
        </div>

        {/* Step 3 - Database Setup */}
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-600"
                }`}
            >
              3
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">Database Setup</h4>
          </div>

          <div className="mb-6">
            <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Set up your database (optional for simple apps):
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Create Database</h5>
                <InlineCodeExample
                  code="php juice db:create"
                  title="Create Database"
                  description="Creates the database specified in your .env file"
                  color="gray"
                  language="bash"
                  compact={true}
                />
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                <h5 className="font-bold mb-2 text-gray-900 dark:text-white">Run Migrations</h5>
                <InlineCodeExample
                  code="php juice db:migrate"
                  title="Run Migrations"
                  description="Runs database migrations to create tables"
                  color="gray"
                  language="bash"
                  compact={true}
                />
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h5 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              <Database className="w-4 h-4 text-gray-500" />
              How Luxid handles database
            </h5>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              The <strong className={`px-1 py-0.5 rounded ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                }`}>Database</strong> class in Luxid Engine:
            </p>
            <CodeExample
              code={`<?php
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
}`}
              language="php"
              title="Database Class Implementation"
              explanation="Creates PDO connection and handles database operations"
            />
          </div>
        </div>

        {/* Step 4 - Start Server */}
        <div
          className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-600"
                }`}
            >
              4
            </div>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white">Start Development Server</h4>
          </div>

          <div className="mb-6">
            <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Start the built-in PHP development server:
            </p>
            <InlineCodeExample
              code="php juice start"
              title="Start Server"
              description="Starts the server at http://localhost:8000 by default"
              color="gray"
              language="bash"
            />

            <div className="mt-4">
              <p className={`mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Optional: Specify host and port:
              </p>
              <InlineCodeExample
                code="php juice start --host=127.0.0.1 --port=8080"
                title="Custom Host and Port"
                description="Start server with custom host and port"
                color="gray"
                language="bash"
              />
            </div>
          </div>

          <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h5 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              <Server className="w-4 h-4 text-gray-500" />
              How the development server works
            </h5>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              The <strong className={`px-1 py-0.5 rounded ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
                }`}>StartCommand</strong> in Juice CLI:
            </p>
            <CodeExample
              code={`<?php
public function handle(array $argv): int
{

    $this->parseArguments($argv);

    $host = $this->options['host'] ?? 'localhost';
    $port = $this->options['port'] ?? 8000;
    $webDir = $this->getProjectRoot() . '/web';

    passthru("php -S {$host}:{$port} -t {$webDir}");
    return 0;
}`}
              language="php"
              title="Start Command Implementation"
              explanation="Uses PHP's built-in web server"
            />
          </div>
        </div>
      </div>

      {/* Verification */}
      <div
        className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
            <Check className={`w-6 h-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Verification</h3>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Verify your installation is working correctly
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg flex flex-col ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-3 text-lg text-gray-900 dark:text-white">Check Application Status</h4>
            <div className="mb-4">
              <div className={`font-mono text-sm ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"} px-3 py-2 rounded`}>
                <strong>php juice status</strong>
              </div>
            </div>
            <p className={`text-sm mt-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Shows environment, routes, and database status
            </p>
          </div>

          <div className={`p-4 rounded-lg flex flex-col ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-3 text-lg text-gray-900 dark:text-white">List Routes</h4>
            <div className="mb-4">
              <div className={`font-mono text-sm ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"} px-3 py-2 rounded`}>
                <strong>php juice routes</strong>
              </div>
            </div>
            <p className={`text-sm mt-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Displays all registered routes
            </p>
          </div>

          <div className={`p-4 rounded-lg flex flex-col ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-3 text-lg text-gray-900 dark:text-white">Check Environment</h4>
            <div className="mb-4">
              <div className={`font-mono text-sm ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"} px-3 py-2 rounded`}>
                <strong>php juice env:check</strong>
              </div>
            </div>
            <p className={`text-sm mt-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Validates environment configuration
            </p>
          </div>
        </div>

        <div className={`mt-6 p-5 rounded-lg flex items-center gap-4 ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <div className={`p-2 rounded-full ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}>
            <Check className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">🎉 Installation Complete!</h4>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Visit{" "}
              <a href="http://localhost:8000" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline font-medium">
                http://localhost:8000
              </a>{" "}
              in your browser. You should see the Luxid welcome page.
            </p>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div
        className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}
      >
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Troubleshooting</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              <AlertCircle className="w-4 h-4 text-gray-500" />
              Database Connection Issues
            </h4>
            <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              If you see database connection errors:
            </p>
            <ul className={`text-sm space-y-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span>
                Verify database credentials in <strong className={`px-1 py-0.5 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>.env</strong> file
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span>
                Make sure database server is running
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-500">•</span>
                Try: <strong className={`px-1 py-0.5 rounded font-mono ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>php juice db:create</strong>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">
              <AlertCircle className="w-4 h-4 text-gray-500" />
              Port Already in Use
            </h4>
            <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              If port 8000 is already in use:
            </p>
            <InlineCodeExample
              code="php juice start --port=8080"
              title=""
              description="Use different port. Start server on a different port"
              color="gray"
              language="bash"
            />
          </div>
        </div>
      </div>
    </>
  );
}
