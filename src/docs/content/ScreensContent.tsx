import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Code, Layout, FileText, Layers, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import CodeExample from '@/components/CodeExample';
import InlineCodeExample from '@/components/InlineCodeExample';

export default function ScreensContent() {
  const { darkMode } = useTheme();

  return (
    <>
      <div className={`mb-8 p-6 rounded-2xl ${
        darkMode
          ? 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20'
          : 'bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200'
      }`}>
        <div className="flex items-start gap-4">
          <Layout className={`w-12 h-12 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <h3 className="text-2xl font-bold mb-2">Screens: The Presentation Layer</h3>
            <p className={`text-lg ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Screens are Nova templates that render HTML for web pages and components.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">What Are Screens?</h2>
      <p className={`text-lg mb-6 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
        Screens are Luxid's templating system using Nova Engine. They handle the presentation
        layer, rendering HTML from data provided by Actions. Screens support layouts, components,
        and Blade-inspired syntax.
      </p>

      <h3 className="text-2xl font-bold mb-4">Basic Screen Structure</h3>

      <div className="space-y-6">
        <CodeExample
          code={`{{-- screens/frames/app.nova.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'My App')</title>
    <link rel="stylesheet" href="/css/app.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center h-16">
                <a href="/" class="text-xl font-bold">My App</a>
                <div class="space-x-4">
                    <a href="/" class="text-gray-700 hover:text-gray-900">Home</a>
                    <a href="/about" class="text-gray-700 hover:text-gray-900">About</a>
                    <a href="/contact" class="text-gray-700 hover:text-gray-900">Contact</a>
                </div>
            </div>
        </div>
    </nav>

    <main class="container mx-auto px-4 py-8">
        || content ||
    </main>

    <footer class="bg-gray-800 text-white py-6">
        <div class="container mx-auto px-4 text-center">
            <p>&copy; {{ date('Y') }} My App. All rights reserved.</p>
        </div>
    </footer>

    <script src="/js/app.js"></script>
</body>
</html>`}
          language="html"
          title="Layout Frame (app.nova.php)"
          explanation="Frames are layouts that wrap around screen content. The || content || placeholder is where individual screens are injected."
        />

        <CodeExample
          code={`{{-- screens/home/index.nova.php --}}
@extends('frames.app')

@section('title', 'Home Page')

@section('content')
<div class="max-w-7xl mx-auto">
    <div class="text-center py-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ $pageTitle }}</h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">{{ $welcomeMessage }}</p>
    </div>

    @if($users && count($users) > 0)
        <div class="mt-12">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Our Users</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach($users as $user)
                    <div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $user->name }}</h3>
                        <p class="text-gray-600 mb-3">{{ $user->email }}</p>
                        <div class="flex items-center text-sm text-gray-500">
                            <span>Member since {{ date('M Y', strtotime($user->created_at)) }}</span>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @else
        <div class="mt-12 text-center py-8">
            <p class="text-gray-500 text-lg">No users found</p>
            <p class="text-gray-400 mt-2">Be the first to join!</p>
        </div>
    @endif

    <!-- Include a component -->
    @include('components.newsletter')
</div>
@endsection`}
          language="html"
          title="Individual Screen (home/index.nova.php)"
          explanation="Screens extend layouts and define content sections. Data is passed from Actions to Screens."
        />
      </div>

      <h3 className="text-2xl font-bold mb-4 mt-8">Nova Template Features</h3>

      <div className={`mb-8 p-6 rounded-xl ${
        darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <div className={`p-1.5 rounded ${darkMode ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
                <Code className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              Template Directives
            </h4>
            <InlineCodeExample
              code={`@extends('layouts.app')        {{-- Extend layout --}}
@section('title', 'Page Title')  {{-- Define section --}}
@yield('content')              {{-- Output section --}}
@include('components.header')  {{-- Include component --}}
@if($condition) ... @endif     {{-- Conditional --}}
@foreach($items as $item) ... @endforeach  {{-- Loop --}}
@auth ... @endauth             {{-- Authentication check --}}
@guest ... @endguest           {{-- Guest check --}}`}
              title="Template Directives"
              description="Blade-inspired directives for template control flow and structure"
              icon={Code}
              color="blue"
              language="html"
              compact={true}
            />
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <div className={`p-1.5 rounded ${darkMode ? 'bg-green-500/10' : 'bg-green-100'}`}>
                <Zap className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              Output & Helpers
            </h4>
            <InlineCodeExample
              code={`{{ $variable }}           {{-- Escaped output --}}
{!! $html !!}            {{-- Unescaped HTML (use with caution!) --}}
@php echo time(); @endphp {{-- Raw PHP code --}}
{{ count($items) }}      {{-- Function calls --}}
{{ $user->name ?? 'Guest' }} {{-- Null coalescing --}}
{{ old('email', $user->email) }} {{-- Form data preservation --}}
{{ route('user.profile', ['id' => $user->id]) }} {{-- URL generation --}}`}
              title="Output & Helpers"
              description="Output variables, helpers, and safe/unsafe output methods"
              icon={Zap}
              color="green"
              language="html"
              compact={true}
            />
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Screen Components</h3>
      <div className={`mb-8 p-6 rounded-xl ${
        darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-5 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
                <FileText className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h4 className="font-bold">Frames</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Layout templates in <code className="font-mono">screens/frames/</code>. Define the overall page structure with headers, footers, and navigation.
            </p>
            <div className={`mt-3 p-2 rounded text-xs ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100/80'}`}>
              <code className="font-mono">{'@extends(\'frames.app\')'}</code>
            </div>
          </div>
          <div className={`p-5 rounded-lg ${darkMode ? 'bg-green-900/20' : 'bg-green-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-500/10' : 'bg-green-100'}`}>
                <Layers className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <h4 className="font-bold">Components</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Reusable UI elements in <code className="font-mono">screens/components/</code>. Use with <code className="font-mono">{'@include()'}</code> directive.
            </p>
            <div className={`mt-3 p-2 rounded text-xs ${darkMode ? 'bg-green-900/30' : 'bg-green-100/80'}`}>
              <code className="font-mono">{'@include(\'components.button\', [\'text\' => \'Click me\'])'}</code>
            </div>
          </div>
          <div className={`p-5 rounded-lg ${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
                <Layout className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
              </div>
              <h4 className="font-bold">Screens</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Page templates in <code className="font-mono">screens/</code>. Handle specific page content and business logic presentation.
            </p>
            <div className={`mt-3 p-2 rounded text-xs ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100/80'}`}>
              <code className="font-mono">{"$this->nova('home.index', $data)"}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Component Example */}
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <h4 className="font-bold mb-2 flex items-center gap-2">
          <Layers className="w-5 h-5" />
          Component Example
        </h4>
        <CodeExample
          code={`{{-- screens/components/alert.nova.php --}}
@props([
    'type' => 'info',
    'message' => '',
    'dismissible' => false
])

@php
    $colors = [
        'info' => 'bg-blue-100 border-blue-400 text-blue-700',
        'success' => 'bg-green-100 border-green-400 text-green-700',
        'warning' => 'bg-yellow-100 border-yellow-400 text-yellow-700',
        'error' => 'bg-red-100 border-red-400 text-red-700',
    ];
    $colorClass = $colors[$type] ?? $colors['info'];
@endphp

<div class="{{ $colorClass }} border rounded px-4 py-3 mb-4" role="alert">
    <div class="flex justify-between items-start">
        <div class="flex-1">
            @if($type === 'info')
                <strong class="font-bold">Info!</strong>
            @elseif($type === 'success')
                <strong class="font-bold">Success!</strong>
            @elseif($type === 'warning')
                <strong class="font-bold">Warning!</strong>
            @elseif($type === 'error')
                <strong class="font-bold">Error!</strong>
            @endif
            <span class="block sm:inline ml-2">{{ $message }}</span>
        </div>

        @if($dismissible)
            <button type="button" class="ml-4 text-2xl leading-none" onclick="this.parentElement.parentElement.style.display='none'">
                <span class="text-gray-500 hover:text-gray-700">&times;</span>
            </button>
        @endif
    </div>
</div>

{{-- Usage in a screen --}}
@include('components.alert', [
    'type' => 'success',
    'message' => 'Your changes have been saved!',
    'dismissible' => true
])`}
          language="html"
          title="Reusable Alert Component"
          explanation="Components accept props and can be included anywhere in your templates for reusable UI elements."
        />
      </div>

      <h3 className="text-2xl font-bold mb-4">Rendering Screens from Actions</h3>
      <div className="space-y-6">
        <CodeExample
          code={`<?php
namespace App\\Actions;

use App\\Entities\\User;

class HomeAction extends \\Luxid\\Foundation\\Action
{
    public function index()
    {
        $data = [
            'pageTitle' => 'Welcome to Luxid',
            'welcomeMessage' => 'Build amazing applications with SEA architecture.',
            'users' => User::findAll([], 'created_at DESC', 10)
        ];

        // Render screen with data
        return $this->nova('home.index', $data);

        // For JSON API (alternative):
        // return $this->success($data);
    }

    public function profile($id)
    {
        $user = User::find($id);

        if (!$user) {
            // Render error screen
            return $this->nova('errors.404', [], 404);
        }

        return $this->nova('users.profile', [
            'user' => $user,
            'pageTitle' => $user->name . "'s Profile"
        ]);
    }
}`}
          language="php"
          title="Action Rendering Screens"
          explanation="Actions pass data to Screens using the nova() helper method. You can also handle errors and render different screens conditionally."
        />

        <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
          <h5 className="font-bold mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Multiple Layouts Support
          </h5>
          <InlineCodeExample
            code={`<?php
// In your Action:
public function dashboard()
{
    // Use admin layout
    $this->frame = 'admin';
    return $this->nova('dashboard.index', $data);
}

public function apiDocs()
{
    // Use minimal layout for API docs
    $this->frame = 'minimal';
    return $this->nova('docs.api', $data);
}

// screens/frames/admin.nova.php
// screens/frames/minimal.nova.php
// screens/frames/app.nova.php (default)`}
            title="Multiple Layouts"
            description="You can use different layouts by setting the frame property in your Action"
            icon={Zap}
            color="blue"
            language="php"
            compact={true}
          />
        </div>
      </div>

      <div className={`mt-8 p-6 rounded-xl ${
        darkMode
          ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'
          : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
      }`}>
        <h3 className="text-xl font-bold mb-4">Best Practices for Screens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Do These
            </h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Keep templates focused on presentation only
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Use components for reusable UI patterns
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Separate layout structure from page content
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Use CSS frameworks (Tailwind recommended)
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                Escape all user data with <code>{'{ }'}</code>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <span className="text-red-500 text-xl">×</span>
              Avoid These
            </h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Complex business logic in templates
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Database queries or API calls in Screens
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Unescaped user input (<code>{'{!! !!}'}</code> without sanitization)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Deeply nested conditionals and loops
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 text-xl">×</span>
                Inline CSS and JavaScript (use external files)
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <h3 className="text-xl font-bold mb-4">Quick Reference</h3>
        <div className="overflow-x-auto">
          <table className={`w-full ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            <thead>
              <tr className={`border-b ${darkMode ? 'border-zinc-700' : 'border-zinc-300'}`}>
                <th className="py-2 px-4 text-left">Directive</th>
                <th className="py-2 px-4 text-left">Purpose</th>
                <th className="py-2 px-4 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <td className="py-2 px-4 font-mono">{'@extends'}</td>
                <td className="py-2 px-4">Inherit from a layout</td>
                <td className="py-2 px-4 font-mono text-sm">{'@extends(\'frames.app\')'}</td>
              </tr>
              <tr className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <td className="py-2 px-4 font-mono">{'@section/@yield'}</td>
                <td className="py-2 px-4">Define/use content sections</td>
                <td className="py-2 px-4 font-mono text-sm">{'@section(\'title\', \'Page\')'}</td>
              </tr>
              <tr className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <td className="py-2 px-4 font-mono">{'@include'}</td>
                <td className="py-2 px-4">Include another template</td>
                <td className="py-2 px-4 font-mono text-sm">{'@include(\'components.header\')'}</td>
              </tr>
              <tr className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <td className="py-2 px-4 font-mono">{'@if/@else'}</td>
                <td className="py-2 px-4">Conditional rendering</td>
                <td className="py-2 px-4 font-mono text-sm">{'@if($user) ... @endif'}</td>
              </tr>
              <tr className={`border-b ${darkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                <td className="py-2 px-4 font-mono">{'@foreach'}</td>
                <td className="py-2 px-4">Loop through arrays</td>
                <td className="py-2 px-4 font-mono text-sm">{'@foreach($users as $user)'}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono">{'{ } vs {!! !!}'}</td>
                <td className="py-2 px-4">Escaped vs unescaped output</td>
                <td className="py-2 px-4 font-mono text-sm">{'{ $var } vs {!! $html !!}'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
