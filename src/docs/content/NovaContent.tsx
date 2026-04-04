import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  ArrowRight,
} from 'lucide-react';
import CodeExample from '@/components/CodeExample';

export default function NovaContent() {
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
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Nova: Luxid's Component-Based Templating Engine</h3>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Nova is Luxid's modern templating system that works like React but with PHP on the server.
              It combines reactive components, state management, and Blade-inspired syntax to build dynamic web interfaces.
            </p>
          </div>
        </div>
      </div>

      {/* Understanding Nova: React-like but Server-Side */}
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="flex items-start gap-4">
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">How Nova Works: Like React, but on the Server</h3>
            <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              If you've used React, you'll find Nova very familiar. The key difference is that Nova components
              render on the server (PHP) while React renders in the browser (JavaScript).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                <h4 className="font-bold mb-2 text-gray-900 dark:text-white">React (Client-side)</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• State is stored in the browser</li>
                  <li>• Components re-render on the client</li>
                  <li>• Uses JSX for templating</li>
                  <li>• Uses `useState` and `useEffect`</li>
                </ul>
              </div>
              <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
                <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Nova (Server-side)</h4>
                <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                  <li>• State is stored on the server (session)</li>
                  <li>• Components re-render on the server</li>
                  <li>• Uses @echo, @if, @foreach directives</li>
                  <li>• Uses `state()` and `actions()`</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nova Directory Structure */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Nova Directory Structure</h2>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Nova templates are organized in the <strong className="font-mono text-gray-900 dark:text-white">nova/</strong> directory. This structure is similar to how React apps organize components in a <strong className="font-mono text-gray-900 dark:text-white">components/</strong> folder:
        </p>
        <CodeExample
          code={`nova/
├── nova.json                # Nova configuration (like package.json)
├── layouts/                 # Layout templates (like React layout components)
│   └── AppLayout.nova.php   # Main layout that wraps all pages
├── pages/                   # Page components (like React Router pages)
│   └── Welcome.nova.php     # Welcome page component
├── components/              # Reusable UI components (like React components)
│   ├── Button.nova.php      # Button component
│   └── Card.nova.php        # Card component
└── helpers/                 # Helper functions (like utility functions)
    └── nova_helpers.php     # Global Nova helpers`}
          language="bash"
          title="Nova Directory Structure"
          explanation="Think of this like a React app: components/ for reusable pieces, pages/ for routes, layouts/ for page wrappers"
        />

        <div className={`mt-4 p-4 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <h4 className="font-bold mb-2 text-gray-900 dark:text-white">nova.json: The Component Configuration</h4>
          <p className={`text-sm mb-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            This is like <strong className="font-mono text-gray-900 dark:text-white">package.json</strong> for your Nova components:
          </p>
          <CodeExample
            code={`{
  "compiler": {
    "cache": {
      "enabled": true,      // Cache compiled templates for performance
      "path": "storage/framework/nova"
    },
    "debug": false          // Set to true to see compilation errors
  },
  "default_layout": "AppLayout",  // Default layout wrapper for all pages
  "component_paths": [
    "nova/components",      // Where to find reusable components
    "nova/pages",          // Where to find page components
    "nova/layouts"         // Where to find layout components
  ]
}`}
            language="json"
            title="Nova Configuration (like package.json)"
            explanation="Configures caching, default layout, and where to find your components"
          />
        </div>
      </div>

      {/* Understanding Nova Components: The Three Parts */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Understanding Nova Components</h2>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Every Nova component has three parts, similar to React hooks:
        </p>
        <div className="grid grid-cols-1 gap-4 mb-6">
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">1. State (like useState)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Data that can change and cause re-renders</p>
            <strong className="text-xs block mt-2 text-gray-700 dark:text-gray-300">state() -- {`{ count: 0 }`}</strong>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">2. Actions (like event handlers)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Functions that update state</p>
            <strong className="text-xs block mt-2 text-gray-700 dark:text-gray-300">actions() -- increment()</strong>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">3. View (like JSX)</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">HTML template with directives</p>
            <strong className="text-xs block mt-2 text-gray-700 dark:text-gray-300">view() -- HTML + @echo</strong>
          </div>
        </div>
      </div>

      {/* Real-World Component Example: Button */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Real-World Example 1: Button Component</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Here's a Button component. Notice how it mirrors React's component pattern:
        </p>
        <CodeExample
          code={`<?php
// nova/components/Button.nova.php
// This is like React's Button.jsx component

component('components/Button', function ($c) {
    // 📦 STATE: Like React's useState
    // These are the component's props/state
    $c->state(function () {
        return [
            'label' => 'Click Me',      // Like React's default props
            'type' => 'button',          // HTML button type
            'variant' => 'primary',      // Visual style variant
            'disabled' => false          // Disabled state
        ];
    });

    // 🎯 ACTIONS: Like React's event handlers
    // These are functions that can be called from the template
    $c->actions([
        'click' => function (&$state) {
            // Like React's onClick handler
            // This runs on the server when the button is clicked
            // You can update state here
            $state['clicked'] = true;
        }
    ]);

    // 🎨 VIEW: Like React's JSX
    // This renders the HTML
    $c->view(function ($state) {
        // Dynamic class selection (like conditional className in React)
        $variantClasses = [
            'primary' => 'btn-primary',
            'secondary' => 'btn-secondary',
            'danger' => 'bg-red-600 hover:bg-red-700 text-white'
        ];

        $class = $variantClasses[$state->variant] ?? 'btn-primary';
        $disabled = $state->disabled ? 'disabled' : '';

        ?>
        <!-- This is like JSX but with @echo for variables -->
        <button type="@echo($state->type)"
            class="@echo($class) px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            @click="click"
            @echo($disabled)>
            @echo($state->label)
        </button>
        <?php
    });
});`}
          language="php"
          title="Button Component (like React Button.jsx)"
          explanation="A reusable button component. Notice the similarity to React: state (useState), actions (event handlers), view (JSX)"
        />

        <div className={`mt-4 p-3 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <div className="flex items-start gap-2">
            <div>
              <h4 className="font-bold mb-1 text-gray-900 dark:text-white">How This Compares to React</h4>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>React Version:</strong> <span className="font-mono">const [label, setLabel] = useState('Click Me')</span><br />
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>Nova Version:</strong> <span className="font-mono">$state['label'] = 'Click Me'</span><br />
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>React Event:</strong> <span className="font-mono">{`onClick={handleClick}`}</span><br />
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>Nova Event:</strong> <span className="font-mono">@click="click"</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Component Example */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Real-World Example 2: Card Component with Tailwind</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Cards are reusable containers that can display any content. This is similar to React's Card component pattern:
        </p>
        <CodeExample
          code={`<?php
// nova/components/Card.nova.php
// Like React's Card component that accepts children

component('components/Card', function ($c) {
    $c->state(function () {
        return [
            'title' => 'Tailwind Demo',
            'content' => 'This card demonstrates Tailwind CSS styling!',
            'color' => 'blue'        // Like a variant prop in React
        ];
    });

    $c->view(function ($state) {
        // Dynamic classes based on state (like className templates in React)
        $colorClasses = [
            'blue' => 'bg-blue-500 hover:bg-blue-600',
            'green' => 'bg-green-500 hover:bg-green-600',
            'purple' => 'bg-purple-500 hover:bg-purple-600',
            'red' => 'bg-red-500 hover:bg-red-600'
        ];

        $buttonClass = $colorClasses[$state->color] ?? 'bg-gray-500 hover:bg-gray-600';
        ?>
        <!-- Tailwind classes work just like in React -->
        <div class="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm border border-white/20">
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2 text-white">@echo($state->title)</div>
                <p class="text-gray-300 text-base">@echo($state->content)</p>
            </div>
        </div>
        <?php
    });
});`}
          language="php"
          title="Card Component with Tailwind CSS"
          explanation="Card component demonstrates how Tailwind CSS works seamlessly with Nova, just like in React"
        />
      </div>

      {/* Layout Template with Slots */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Layouts: Like React Router Layouts</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Layouts are like React's layout components that wrap pages. They use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>slots</strong> - which work like React's <strong className="font-mono text-gray-900 dark:text-white">children</strong> prop:
        </p>
        <CodeExample
          code={`<?php
// nova/layouts/AppLayout.nova.php
// Like React's Layout component with {children}

component('layouts/AppLayout', function ($c) {
    $c->state(function () {
        return [
            'title' => 'Luxid Framework',
            'description' => 'Modern PHP framework with reactive Nova components'
        ];
    });

    $c->view(function ($state) {
        ?>
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>@echo($state->title)</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>
        <body class="bg-black text-white">
            <!-- 
                This is like {children} in React!
                @slot('content') defines where page content will be injected
            -->
            <?php echo \\Luxid\\Nova\\Slot::render('content', '<div class="min-h-screen flex items-center justify-center"><div class="text-center"><h1 class="text-4xl">Default Content</h1></div></div>'); ?>
        </body>
        </html>
        <?php
    });
});`}
          language="php"
          title="AppLayout Component (like React Layout)"
          explanation="Layouts use slots (like React's children) to inject page content. The default layout wraps all pages."
        />
      </div>

      {/* Page Component with State & Actions */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Pages: Like React Router Pages with Hooks</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Pages are like React Router pages. They can have their own state and actions, just like React components with hooks:
        </p>
        <CodeExample
          code={`<?php
// nova/pages/Welcome.nova.php
// Like React's Home page component with useState

component('pages/Welcome', function ($c) {
    // 📦 STATE: Like React's useState
    $c->state(function () {
        return [
            'version' => 'v0.6.1',
            'title' => 'Build with',
            'showBadge' => true,          // Like a boolean state
            'ctaLinks' => [                // Like an array state
                ['text' => 'Get Started', 'href' => '/docs', 'primary' => true],
                ['text' => 'Documentation', 'href' => '/docs', 'primary' => false],
            ]
        ];
    });

    // 🎯 ACTIONS: Like React's event handlers that update state
    $c->actions([
        'toggleBadge' => function (&$state) {
            // This is like React's setShowBadge(!showBadge)
            $state['showBadge'] = !$state['showBadge'];
        }
    ]);

    $c->view(function ($state) {
        ?>
        <div class="min-h-screen flex items-center justify-center">
            <div class="text-center">
                <!-- Conditional rendering: like React's {showBadge && <div>...</div>} -->
                @if($state->showBadge)
                <div class="inline-flex items-center px-4 py-2 rounded-full">
                    <span>Luxid Framework @echo($state->version)</span>
                </div>
                @endif

                <h1 class="text-5xl font-black">
                    @echo($state->title)
                    <br>
                    <span class="gradient-text">Elegance</span>
                </h1>

                <!-- Looping: like React's .map() -->
                <div class="flex gap-4 justify-center mt-8">
                    @foreach($state->ctaLinks as $link)
                    <a href="@echo($link['href'])"
                        class="@if($link['primary']) bg-blue-600 @else bg-gray-600 @endif px-6 py-3 rounded-lg">
                        @echo($link['text'])
                    </a>
                    @endforeach
                </div>

                <!-- Event handler: like React's onClick -->
                <div class="mt-8">
                    <button @click="toggleBadge">
                        @if($state->showBadge) Hide @else Show @endif Badge
                    </button>
                </div>

                <!-- Nest other components: like React's <Card /> -->
                <div class="mt-16">
                    @component('components/Card', [
                        'title' => 'Tailwind CSS Demo',
                        'content' => 'Works just like React!',
                        'color' => 'purple'
                    ])
                </div>
            </div>
        </div>
        <?php
    });
});`}
          language="php"
          title="Welcome Page (like React Home Component)"
          explanation="Pages combine everything: state (useState), actions (event handlers), conditional rendering, loops, and nested components"
        />
      </div>

      {/* Nova Directives Reference */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Nova Directives: Your JSX Alternative</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          Nova directives work like JSX but are easier to read for PHP developers. Here's how they compare to React:
        </p>

        <div className="overflow-x-auto">
          <table className={`w-full text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <thead>
              <tr className={`border-b ${darkMode ? "border-gray-700" : "border-gray-300"}`}>
                <th className="py-2 px-3 text-left">What it does</th>
                <th className="py-2 px-3 text-left">React (JSX)</th>
                <th className="py-2 px-3 text-left">Nova (Directives)</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <td className="py-2 px-3">Output variable</td>
                <td className="py-2 px-3 font-mono text-xs">{'{variable}'}</td>
                <td className="py-2 px-3 font-mono text-xs">@echo($variable)</td>
              </tr>
              <tr className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <td className="py-2 px-3">Raw HTML</td>
                <td className="py-2 px-3 font-mono text-xs">{'{dangerouslySetInnerHTML}'}</td>
                <td className="py-2 px-3 font-mono text-xs">@raw($html)</td>
              </tr>
              <tr className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <td className="py-2 px-3">Conditional</td>
                <td className="py-2 px-3 font-mono text-xs">{`{condition && <div>...}`}</td>
                <td className="py-2 px-3 font-mono text-xs">@if($condition) ... @endif</td>
              </tr>
              <tr className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <td className="py-2 px-3">Loop</td>
                <td className="py-2 px-3 font-mono text-xs">{'items.map(item => ...)'}</td>
                <td className="py-2 px-3 font-mono text-xs">@foreach($items as $item) ... @endforeach</td>
              </tr>
              <tr className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <td className="py-2 px-3">Event handler</td>
                <td className="py-2 px-3 font-mono text-xs">{`onClick={handleClick}`}</td>
                <td className="py-2 px-3 font-mono text-xs">@click="actionName"</td>
              </tr>
              <tr className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <td className="py-2 px-3">Render component</td>
                <td className="py-2 px-3 font-mono text-xs">{'<Card title="Hello" />'}</td>
                <td className="py-2 px-3 font-mono text-xs">{`@component('components/Card', ['title' => 'Hello'])`}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={`mt-4 p-3 rounded-lg ${darkMode ? "bg-gray-800/50 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <div className="flex items-start gap-2">
            <div>
              <h4 className="font-bold mb-1 text-gray-900 dark:text-white">Key Difference: Server vs Client</h4>
              <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                <strong className={darkMode ? "text-white" : ""}>React:</strong> JavaScript runs in the browser. State is client-side. Components re-render in the browser.<br />
                <strong className={darkMode ? "text-white" : ""}>Nova:</strong> PHP runs on the server. State is stored in the session. Components re-render on the server and send HTML to the browser.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rendering Nova from Actions */}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Using Nova in Actions (like React Router)</h3>
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
          In your Actions, you render Nova components - similar to how React Router renders components for routes:
        </p>
        <CodeExample
          code={`<?php
namespace App\\Actions;

use Luxid\\Foundation\\Action;

class HomeAction extends Action
{
    public function index()
    {
        // Like returning a React component from a route
        // Each component gets a unique _instance ID (like React's key)
        return $this->nova('pages/Welcome', [
            '_instance' => 'welcome_' . uniqid(),
            'title' => 'Custom Title',  // Pass props like React
            'showBadge' => true
        ]);
    }

    public function dashboard()
    {
        // Different page with different layout
        return $this->nova('pages/Dashboard', [
            '_instance' => 'dashboard_' . uniqid(),
            'user' => auth()->user()  // Pass data from the server
        ]);
    }
}`}
          language="php"
          title="Rendering Nova from Actions (like React Router)"
          explanation="Actions act like route handlers in React Router, rendering the appropriate page component and passing props"
        />
      </div>

      {/* Best Practices */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Nova Best Practices (Same as React!)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">Do These (like React best practices)</h4>
            <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                Keep components small and focused (one responsibility)
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                Use slots for flexible content (like React's children)
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                Always escape output with @echo (like {`{variable}`} in React)
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                Give components unique instance IDs (like React keys)
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
                Use Tailwind CSS for styling (just like in React)
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2 text-gray-900 dark:text-white">Avoid These (same as React anti-patterns)</h4>
            <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Complex logic in views (keep in actions - like keeping logic out of JSX)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Database queries directly in components (use actions as data providers)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Hardcoded URLs (use route helpers - like React Router's Link)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Deep nesting of components (keep component trees shallow)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <div className="flex items-start gap-3">
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Summary: Nova = React for PHP</h3>
            <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              If you know React, you already understand Nova! Both share the same component-based philosophy:
            </p>
            <ul className={`mt-3 space-y-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <li>✓ Components with state, props, and lifecycle</li>
              <li>✓ Conditional rendering and loops</li>
              <li>✓ Event handlers that update state</li>
              <li>✓ Composition through nesting and slots (children)</li>
              <li>✓ Layouts that wrap pages</li>
            </ul>
            <p className={`mt-3 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              The main difference? Nova runs on the server (PHP), giving you access to databases, sessions, and all PHP features,
              while delivering HTML to the browser. It's the best of both worlds!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
