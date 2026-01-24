import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Code, Layout, FileText, Layers } from 'lucide-react';
import CodeExample from '../components/CodeExample';

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

      <CodeExample
        code={`{{-- screens/frames/app.nova.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'My App')</title>
    <link rel="stylesheet" href="/css/app.css">
</head>
<body>
    <nav>
        <!-- Navigation -->
    </nav>

    <main class="container">
        || content ||
    </main>

    <footer>
        <!-- Footer -->
    </footer>

    <script src="/js/app.js"></script>
</body>
</html>`}
        title="Layout Frame"
        explanation="Frames are layouts that wrap around screen content. The || content || placeholder is where individual screens are injected."
      />

      <CodeExample
        code={`{{-- screens/home/index.nova.php --}}
@extends('frames.app')

@section('title', 'Home Page')

@section('content')
<div class="hero">
    <h1 class="text-4xl font-bold">{{ $pageTitle }}</h1>
    <p class="mt-4">{{ $welcomeMessage }}</p>

    @if($users)
        <div class="mt-8 grid gap-4">
            @foreach($users as $user)
                <div class="card">
                    <h3>{{ $user->name }}</h3>
                    <p>{{ $user->email }}</p>
                </div>
            @endforeach
        </div>
    @else
        <p class="mt-8 text-gray-500">No users found</p>
    @endif
</div>
@endsection`}
        title="Individual Screen"
        explanation="Screens extend layouts and define content sections. Data is passed from Actions to Screens."
      />

      <div className={`mb-8 p-6 rounded-xl ${
        darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
      }`}>
        <h3 className="text-xl font-bold mb-4">Nova Template Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">Directives</h4>
            <CodeExample
              code={`@extends('layouts.app')        {{-- Extend layout --}}
@section('title', 'Page Title')  {{-- Define section --}}
@yield('content')              {{-- Output section --}}
@include('components.header')  {{-- Include component --}}
@if($condition) ... @endif     {{-- Conditional --}}
@foreach($items as $item) ... @endforeach  {{-- Loop --}}`}
              language="html"
              title="Template Directives"
              compact
            />
          </div>
          <div>
            <h4 className="font-bold mb-2">Escaping & Helpers</h4>
            <CodeExample
              code={`{{ $variable }}           {{-- Escaped output --}}
{!! $html !!}            {{-- Unescaped HTML --}}
@php echo time(); @endphp {{-- PHP code --}}
{{ count($items) }}      {{-- Function calls --}}
{{ $user->name ?? 'Guest' }} {{-- Null coalescing --}}`}
              language="html"
              title="Output & Helpers"
              compact
            />
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Screen Components</h3>
      <div className={`mb-8 p-6 rounded-xl ${
        darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5" />
              <h4 className="font-bold">Frames</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Layout templates in <code>screens/frames/</code>. Define the overall page structure.
            </p>
          </div>
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-green-900/20' : 'bg-green-50'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5" />
              <h4 className="font-bold">Components</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Reusable UI elements in <code>screens/components/</code>. Use with <code>@include()</code>.
            </p>
          </div>
          <div className={`p-4 rounded-lg ${
            darkMode ? 'bg-purple-900/20' : 'bg-purple-50'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-5 h-5" />
              <h4 className="font-bold">Screens</h4>
            </div>
            <p className={`text-sm ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Page templates in <code>screens/</code>. Handle specific page content and logic.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-4">Rendering Screens from Actions</h3>
      <CodeExample
        code={`<?php
namespace App\\Actions;

class HomeAction extends \\Luxid\\Foundation\\Action
{
    public function index()
    {
        $data = [
            'pageTitle' => 'Welcome to Luxid',
            'welcomeMessage' => 'Build amazing applications with SEA architecture.',
            'users' => User::findAll()
        ];

        // Render screen with data
        return $this->nova('home.index', $data);

        // For JSON API:
        // return $this->success($data);
    }
}`}
        title="Action Rendering Screen"
        explanation="Actions pass data to Screens using the nova() helper method."
      />

      <div className={`mt-8 p-6 rounded-xl ${
        darkMode
          ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'
          : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
      }`}>
        <h3 className="text-xl font-bold mb-4">Best Practices for Screens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold mb-2">✅ Do These</h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li>• Keep templates focused on presentation</li>
              <li>• Use components for reusable UI</li>
              <li>• Separate layout from content</li>
              <li>• Use CSS frameworks or Tailwind</li>
              <li>• Keep logic minimal in templates</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">❌ Avoid These</h4>
            <ul className={`space-y-2 ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              <li>• Complex business logic in templates</li>
              <li>• Database queries in Screens</li>
              <li>• Mixing API and template responses</li>
              <li>• Unescaped user input</li>
              <li>• Deeply nested conditionals</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
