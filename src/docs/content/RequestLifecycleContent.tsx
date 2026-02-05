import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  Cpu, Package, Layers, Code,
  Terminal, Download, ArrowRight,
  CheckCircle, AlertCircle
} from 'lucide-react';
import CodeExample from '../components/CodeExample';
import InlineCodeExample from '@/components/InlineCodeExample';

export default function RequestLifecycleContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Hero Section */}
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-800/20'
          : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200'
      }`}>
        <div className="flex items-start gap-4">
          <Layers className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <h1 className="text-3xl font-bold mb-2">Engine vs Framework: Luxid's Unique Architecture</h1>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
              Understanding the separation between core engine and starter framework is key to mastering Luxid.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <h2 className="text-2xl font-bold mb-4">Why Two Packages?</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
        Luxid follows a modular architecture where the core functionality (<strong>Engine</strong>) is separate
        from the starter project (<strong>Framework</strong>). This separation provides flexibility, better
        dependency management, and easier updates.
      </p>

      {/* Comparison Table */}
      <div className={`my-8 rounded-xl overflow-hidden ${
        darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-300'
      }`}>
        <div className={`grid grid-cols-1 md:grid-cols-2 divide-x ${darkMode ? 'divide-zinc-800' : 'divide-zinc-300'}`}>
          {/* Engine Column */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-blue-500/20' : 'bg-blue-100'
              }`}>
                <Cpu className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Luxid Engine</h3>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  <code className="font-mono">luxid/engine</code>
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {[
                'Core framework classes (Router, ORM, Request, Response)',
                'Juice CLI tool',
                'Middleware system',
                'Database abstraction layer',
                'Form builders and validation',
                'Exception handling'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="font-bold mb-2">Install Engine Only</h4>
              <InlineCodeExample
                code="composer require luxid/engine"
                title="Command"
                description="Install just the core engine without the starter template"
                icon={Download}
                color="blue"
                language="bash"
              />
            </div>
          </div>

          {/* Framework Column */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                darkMode ? 'bg-purple-500/20' : 'bg-purple-100'
              }`}>
                <Package className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Luxid Framework</h3>
                <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  <code className="font-mono">luxid/framework</code>
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {[
                'Pre-configured application structure',
                'Example Actions, Entities, Screens',
                'Basic authentication setup',
                'Development environment configuration',
                '.env.example with common settings',
                'Basic migrations and seeds',
                'Tailwind CSS setup',
                'Welcome page and error templates'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <span className={darkMode ? 'text-zinc-300' : 'text-zinc-700'}>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="font-bold mb-2">Create Starter Project</h4>
              <InlineCodeExample
                code="composer create-project luxid/framework myapp"
                title="Command"
                description="Create a complete starter application"
                icon={Terminal}
                color="purple"
                language="bash"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Directory Structure Comparison */}
      <h2 className="text-2xl font-bold mb-4 mt-8">Directory Structure</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Cpu className="w-5 h-5" />
            Engine Structure
          </h3>
          <CodeExample
            code={`luxid/engine/
├── Engine/
│   ├── Console/          # Juice CLI
│   ├── Database/         # L ORM
│   ├── Exceptions/       # Custom exceptions
│   ├── Facades/          # Facade classes
│   ├── Foundation/       # Core framework
│   ├── Form/             # Form builders
│   ├── Http/             # Request/Response
│   ├── Middleware/       # Middleware system
│   ├── ORM/              # Object-Relational Mapping
│   └── Routing/          # Router system
├── juice                 # CLI executable
└── composer.json         # Engine package`}
            language="bash"
            title="luxid/engine Package Structure"
            explanation="The core engine contains all framework logic without any application code."
          />
        </div>

        <div>
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Framework Structure
          </h3>
          <CodeExample
            code={`myapp/                   # Your application
├── app/
│   ├── Actions/          # Your Action classes
│   ├── Entities/         # Your Entity classes
│   └── Middleware/       # Custom middleware
├── config/               # Configuration files
├── migrations/           # Database migrations
├── routes/               # Route definitions
├── screens/              # Nova templates
├── web/                  # Public assets
├── juice                 # Juice CLI (copied)
└── composer.json         # Your app dependencies`}
            language="bash"
            title="Starter Project Structure"
            explanation="The framework provides a ready-to-use application structure with the engine as a dependency."
          />
        </div>
      </div>

      {/* Real-World Example */}
      <h2 className="text-2xl font-bold mb-4">Real-World Usage</h2>

      <div className="space-y-6">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Code className="w-5 h-5" />
            Scenario 1: Building a Custom Application
          </h3>
          <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            You want to build a custom e-commerce platform with specific requirements:
          </p>
          <div className="space-y-2">
            <InlineCodeExample
              code="composer create-project luxid/framework ecommerce"
              title="Start with Framework"
              description="Get the complete starter structure"
              icon={ArrowRight}
              color="blue"
              language="bash"
            />
            <InlineCodeExample
              code="cd ecommerce\nphp juice make:api Product\nphp juice make:api Order"
              title="Generate Custom Code"
              description="Use Juice CLI to create your domain-specific code"
              icon={ArrowRight}
              color="purple"
              language="bash"
            />
          </div>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Scenario 2: Contributing to Luxid Engine
          </h3>
          <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            You want to contribute to the Luxid core or extend its functionality:
          </p>
          <div className="space-y-2">
            <InlineCodeExample
              code="composer require luxid/engine"
              title="Require Only Engine"
              description="Add just the engine to your existing project"
              icon={ArrowRight}
              color="blue"
              language="bash"
            />
            <InlineCodeExample
              code="<?php\n// Extend core classes\nclass CustomRouter extends \\Luxid\\Routing\\Router\n{\n    // Custom routing logic\n}"
              title="Extend Engine Classes"
              description="Extend and customize core Luxid components"
              icon={ArrowRight}
              color="purple"
              language="php"
            />
          </div>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Scenario 3: Integrating with Existing Systems
          </h3>
          <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            You have an existing application and want to use Luxid's ORM or Router:
          </p>
          <CodeExample
            code={`<?php
// Existing legacy application
require_once 'vendor/autoload.php';

// Use Luxid ORM without the full framework
use Luxid\\Database\\DbEntity;

class LegacyProduct extends DbEntity
{
    public static function tableName(): string
    {
        return 'legacy_products';
    }

    // Use L ORM features in legacy app
    public static function findActiveProducts()
    {
        return self::findAll(['active' => 1]);
    }
}

// Use in legacy code
$products = LegacyProduct::findActiveProducts();`}
            language="php"
            title="Using Engine in Legacy Applications"
            explanation="The engine can be used independently without the full framework structure."
          />
        </div>
      </div>

      {/* Dependency Management */}
      <h2 className="text-2xl font-bold mb-4 mt-8">Dependency Management</h2>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-300'}`}>
        <h3 className="text-xl font-bold mb-3">composer.json Comparison</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">Engine Package</h4>
            <CodeExample
              code={`{
  "name": "luxid/engine",
  "type": "library",
  "require": {
    "php": "^8.0",
    "vlucas/phpdotenv": "^5.6"
  },
  "autoload": {
    "psr-4": {
      "Luxid\\\\": "Engine/"
    }
  },
  "bin": ["juice"]
}`}
              language="json"
              title="luxid/engine composer.json"
              explanation="Minimal dependencies - just PHP 8.0+ and dotenv for environment variables."
            />
          </div>

          <div>
            <h4 className="font-bold mb-2">Framework Starter</h4>
            <CodeExample
              code={`{
  "name": "luxid/framework",
  "type": "project",
  "require": {
    "php": "^8.0",
    "luxid/engine": "^1.0",
    "vlucas/phpdotenv": "^5.6"
  },
  "scripts": {
    "post-create-project-cmd": [
      "Luxid\\\\Framework\\\\Kernel::postCreateProject"
    ]
  }
}`}
              language="json"
              title="luxid/framework composer.json"
              explanation="Includes luxid/engine as a dependency and adds setup scripts."
            />
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <h2 className="text-2xl font-bold mb-4 mt-8">Best Practices</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            When to Use Framework
          </h4>
          <ul className={`space-y-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
              Starting a new greenfield project
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
              Learning Luxid for the first time
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
              Need a complete MVC structure
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
              Want built-in authentication and examples
            </li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            When to Use Engine Only
          </h4>
          <ul className={`space-y-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
              Integrating into existing applications
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
              Building microservices or APIs
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
              Need only specific components (ORM, Router)
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0" />
              Contributing to Luxid core development
            </li>
          </ul>
        </div>
      </div>

      {/* Version Management */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-amber-900/20 border border-amber-800' : 'bg-amber-50 border border-amber-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          Version Management Tips
        </h3>
        <div className="space-y-4">
          <InlineCodeExample
            code="composer update luxid/engine"
            title="Update Engine Only"
            description="Update the core engine independently"
            icon={Download}
            color="yellow"
            language="bash"
          />
          <InlineCodeExample
            code="composer outdated luxid/*"
            title="Check for Updates"
            description="See available updates for Luxid packages"
            icon={Terminal}
            color="yellow"
            language="bash"
          />
          <p className={`text-sm ${darkMode ? 'text-amber-300' : 'text-amber-700'}`}>
            <strong>Note:</strong> The framework starter project pins to specific engine versions for stability.
            Update intentionally and test thoroughly.
          </p>
        </div>
      </div>

      {/* Next Steps */}
      <div className={`mt-8 p-6 rounded-xl ${
        darkMode
          ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'
          : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
      }`}>
        <h3 className="text-xl font-bold mb-3">What's Next?</h3>
        <p className={`mb-4 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
          Now that you understand Luxid's dual-package architecture, explore these topics:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/docs/juice-cli"
            className={`p-4 rounded-lg text-center transition-colors ${
              darkMode
                ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                : 'bg-zinc-200 hover:bg-zinc-300 text-black'
            }`}
          >
            <Terminal className="w-6 h-6 mx-auto mb-2" />
            <div className="font-bold">Juice CLI</div>
            <div className="text-sm opacity-80">Master the command line tool</div>
          </a>
          <a
            href="/docs/sea-architecture"
            className={`p-4 rounded-lg text-center transition-colors ${
              darkMode
                ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                : 'bg-zinc-200 hover:bg-zinc-300 text-black'
            }`}
          >
            <Layers className="w-6 h-6 mx-auto mb-2" />
            <div className="font-bold">SEA Architecture</div>
            <div className="text-sm opacity-80">Understand the core pattern</div>
          </a>
          <a
            href="/docs/first-app"
            className={`p-4 rounded-lg text-center transition-colors ${
              darkMode
                ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                : 'bg-zinc-200 hover:bg-zinc-300 text-black'
            }`}
          >
            <Code className="w-6 h-6 mx-auto mb-2" />
            <div className="font-bold">Your First App</div>
            <div className="text-sm opacity-80">Build a complete Todo API</div>
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-300'}`}>
        <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold mb-1">Can I use multiple engines in one project?</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              No, you should only have one <code className="font-mono">luxid/engine</code> package per project.
              The engine is designed as a singleton foundation.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-1">How do I update the engine in an existing project?</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Run <code className="font-mono">composer update luxid/engine</code> and test thoroughly.
              Breaking changes are documented in release notes.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-1">Can I create my own framework starter?</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Absolutely! Fork the <code className="font-mono">luxid/framework</code> repository or create your own
              Composer package that requires <code className="font-mono">luxid/engine</code> and provides your preferred structure.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-1">What if I only need the ORM or Router?</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Install <code className="font-mono">luxid/engine</code> and use only the components you need.
              The engine is modular, though some components have inter-dependencies.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
