import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Database,
  FileCode,
  Server,
} from "lucide-react";
import ArchitectureDiagram from "../components/ArchitectureDiagram";
import CodeExample from "@/components/CodeExample";

export default function IntroductionContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Hero Section - Clean, no gradient */}
      <div
        className={`mb-8 p-6 rounded-2xl ${darkMode
          ? "bg-gray-900/50 border border-gray-800"
          : "bg-gray-50 border border-gray-200"
          }`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
              Welcome to Luxid Framework
            </h1>
            <p className={`text-lg mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Luxid (pronounced "Lucid" with an X) is a modern, lightweight PHP framework designed with
              <strong className={darkMode ? "text-white" : "text-gray-900"}> clarity and simplicity</strong> at its core. Built for developers who value explicit control and minimal magic,
              Luxid introduces the <strong className={darkMode ? "text-white" : "text-gray-900"}>AVE Architecture</strong>
              — a refreshing approach that makes your code intuitive and maintainable.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className={`px-3 py-1 rounded-full ${darkMode
                ? "bg-gray-800 text-gray-300 border border-gray-700"
                : "bg-gray-100 text-gray-700 border border-gray-200"
                }`}>
                <strong className={darkMode ? "text-white" : ""}>Version:</strong> 0.7.1
              </span>
              <span className={`px-3 py-1 rounded-full ${darkMode
                ? "bg-gray-800 text-gray-300 border border-gray-700"
                : "bg-gray-100 text-gray-700 border border-gray-200"
                }`}>
                <strong className={darkMode ? "text-white" : ""}>PHP:</strong> 8.0+
              </span>
              <span className={`px-3 py-1 rounded-full ${darkMode
                ? "bg-gray-800 text-gray-300 border border-gray-700"
                : "bg-gray-100 text-gray-700 border border-gray-200"
                }`}>
                <strong className={darkMode ? "text-white" : ""}>License:</strong> MIT
              </span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">What is AVE Architecture?</h2>

      <div className={`mb-8 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Actions - Gray theme */}
          <div className={`p-4 rounded-lg ${darkMode
            ? "bg-gray-800/30 border border-gray-800 hover:bg-gray-800/50 transition-colors"
            : "bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors"
            }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-gray-200"
                }`}>
                <Server className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Actions</h3>
            </div>
            <p className={darkMode ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>
              Build powerful request handlers using action classes. Process input, interact with entities, apply filters, and return structured responses, all with built-in middleware support.
            </p>
          </div>

          {/* Views - Gray theme */}
          <div className={`p-4 rounded-lg ${darkMode
            ? "bg-gray-800/30 border border-gray-800 hover:bg-gray-800/50 transition-colors"
            : "bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors"
            }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-gray-200"
                }`}>
                <FileCode className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Views</h3>
            </div>
            <p className={darkMode ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>
              Create dynamic UIs with <strong className="text-gray-900 dark:text-white">Nova</strong> using a component-driven approach. Define state and render views with plain PHP, enabling clean, reactive interfaces without leaving the backend.
            </p>
          </div>

          {/* Entities - Gray theme */}
          <div className={`p-4 rounded-lg ${darkMode
            ? "bg-gray-800/30 border border-gray-800 hover:bg-gray-800/50 transition-colors"
            : "bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors"
            }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-800" : "bg-gray-200"
                }`}>
                <Database className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Entities</h3>
            </div>
            <p className={darkMode ? "text-gray-400 text-sm" : "text-gray-600 text-sm"}>
              Model your data with PHP attributes and a modern Active Record approach. Extend a base entity and instantly gain CRUD operations, schema mapping, and built-in validation, no boilerplate required.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Core Features</h2>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {/* Juice CLI - Gray theme */}
        <div className={`p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"
          }`}>
          <div className="flex items-start gap-3 mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Juice CLI Tool</h3>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Built-in command-line interface for scaffolding, database operations, and project management.
              </p>
            </div>
          </div>
          <CodeExample
            code={`# Start development server
php juice start

# Create new Action
php juice make:action TodoAction

# Run migrations
php juice db:migrate

# List all routes
php juice routes`}
            language="bash"
            compact={true}
          />
        </div>

        {/* Rocket-ORM - Gray theme */}
        <div className={`p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"
          }`}>
          <div className="flex items-start gap-3 mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Rocket-ORM</h3>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Simple yet powerful ORM with validation, relationships, and automatic timestamps.
              </p>
            </div>
          </div>
          <CodeExample
            code={`<?php

namespace App\\Entities;

use Rocket\\ORM\\Entity;
use Rocket\\Attributes\\Entity as EntityAttr;
use Rocket\\Attributes\\Column;
use Rocket\\Attributes\\Rules\\Required;
use Rocket\\Attributes\\Rules\\Email;
use Rocket\\Attributes\\Rules\\Min;
use Rocket\\Attributes\\Rules\\Unique;

#[EntityAttr(table: 'users')]
class User extends Entity
{
    #[Column(primary: true, autoIncrement: true)]
    public int $id = 0;

    #[Column]
    #[Required]
    #[Email]
    #[Unique]
    public string $email = '';

    #[Column(hidden: true)]
    #[Required]
    #[Min(8)]
    public string $password = '';

    #[Column]
    #[Required]
    public string $firstname = '';

    #[Column]
    #[Required]
    public string $lastname = '';

    #[Column(autoCreate: true)]
    public string $created_at = '';

    #[Column(autoCreate: true, autoUpdate: true)]
    public string $updated_at = '';

    public function getDisplayName(): string
    {
        return trim($this->firstname . ' ' . $this->lastname) ?: $this->email;
    }
}`}
            language="php"
            compact={true}
          />
        </div>

        {/* Expressive Routing - Gray theme */}
        <div className={`p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-white border border-gray-200 shadow-sm"
          }`}>
          <div className="flex items-start gap-3 mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Expressive Routing</h3>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Fluent, action-first routing API with middleware support and parameter validation.
              </p>
            </div>
          </div>
          <CodeExample
            code={`<?php

use App\\Actions\\TodoAction;

route('todos')
    ->get('/todos')
    ->uses(TodoAction::class, 'index')
    ->open();

route('todo.create')
    ->post('/todos')
    ->uses(TodoAction::class, 'store')
    ->auth();`}
            language="php"
            compact={true}
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">How Luxid Works</h2>

      <ArchitectureDiagram showFlow={true} />

      {/* Request Lifecycle - Gray theme */}
      <div className={`my-8 p-6 rounded-xl ${darkMode ? "bg-gray-900 border border-gray-800" : "bg-gray-100 border border-gray-200"
        }`}>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Request Lifecycle</h3>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode
              ? "bg-gray-800 text-gray-300 border border-gray-700"
              : "bg-gray-200 text-gray-600 border border-gray-300"
              }`}>
              1
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white">HTTP Request</h4>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Request arrives at <strong className={`px-1 py-0.5 rounded ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
                  }`}>web/index.php</strong>, bootstraps the Application with configuration and environment variables.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode
              ? "bg-gray-800 text-gray-300 border border-gray-700"
              : "bg-gray-200 text-gray-600 border border-gray-300"
              }`}>
              2
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white">Router Matching</h4>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Router finds matching route, executes middleware, and instantiates the Action class.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode
              ? "bg-gray-800 text-gray-300 border border-gray-700"
              : "bg-gray-200 text-gray-600 border border-gray-300"
              }`}>
              3
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white">Action Processing</h4>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Action processes the request, interacts with Entities via Rocket-ORM, and prepares data for response.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode
              ? "bg-gray-800 text-gray-300 border border-gray-700"
              : "bg-gray-200 text-gray-600 border border-gray-300"
              }`}>
              4
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white">Response Rendering</h4>
              <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Response is rendered as JSON (for APIs) or via Nova templates (for web pages).
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
