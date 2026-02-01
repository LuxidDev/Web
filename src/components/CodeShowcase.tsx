import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import MonacoEditor from '@/components/MonacoEditor';

const codeExamples = {
  action: {
    title: 'Actions (Controllers)',
    code: `<?php

namespace App\\Actions;

use Luxid\\Foundation\\Action;
use Luxid\\Http\\Request;
use Luxid\\Http\\Response;

class UserAction extends Action
{
    public function index(Request $request, Response $response): string
    {
        $id = $request->query('id');
        $user = User::find($id);

        if (!$users) {
            return $response->error('No users found', null, 404);
        }

        return $response->success('[
            'users' => $user
        ]);
    }
}`
  },
  entity: {
    title: 'Entities (Models)',
    code: `<?php

namespace App\\Entities;

use Luxid\\Database\\Entity;

class User extends UserEntity
{
    public int $id = 0;
    public string $email = '';
    public string $password = '';

    public function attributes(): array
    {
        return ['email', 'password'];
    }

    public function tableName(): string
    {
        return 'users';
    }

    public function primaryKey(): string
    {
        return 'id';
    }

    public function rules(): array
    {
        return [
            'email' => [
                self::RULE_REQUIRED,
                self::RULE_EMAIL,
            ],
            'password' => [
                self::RULE_REQUIRED,
                [self::RULE_MIN, 'min' => 8]
            ]
        ];
    }
}`,
  },
  screen: {
    title: 'Screens (Views)',
    code: `{{-- Nova Templating --}}

@extend('layouts.app')

@section('content')
<div class="container">
    <h1>{{ $title }}</h1>

    @foreach($users as $user)
        <div class="card">
            <h2>{{ $user->name }}</h2>
            <p>{{ $user->email }}</p>

            @if($user->isAdmin())
                <span class="badge">Admin</span>
            @endif
        </div>
    @endforeach
</div>
@endsection`
  }
};

export default function CodeShowcase() {
  const [active, setActive] = useState<'action' | 'entity' | 'screen'>('action');
  const { darkMode } = useTheme();

  const getLanguage = (key: string) => {
    return key === 'screen' ? 'nova' : 'php';
  };

  return (
    <section className={`py-32 ${darkMode ? 'bg-zinc-950' : 'bg-zinc-100'}`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-black'
          }`}>Beautiful, expressive syntax</h2>
          <p className={`text-xl ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Write PHP that feels modern and elegant</p>
        </div>
        <div className="flex justify-center gap-2 mb-8">
          {Object.entries(codeExamples).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActive(key as any)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                active === key
                  ? darkMode
                    ? 'bg-white text-black'
                    : 'bg-black text-white'
                  : darkMode
                    ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                    : 'bg-zinc-200 text-zinc-600 hover:bg-zinc-300'
              }`}
            >
              {val.title}
            </button>
          ))}
        </div>
        <div className={`border rounded-xl overflow-hidden ${
          darkMode
            ? 'bg-[#1e1e1e] border-zinc-700'
            : 'bg-[#fffffe] border-zinc-300'
        }`}>
          <div className={`flex items-center gap-2 px-4 py-3 border-b ${
            darkMode ? 'border-zinc-700' : 'border-zinc-300'
          }`}>
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
            <span className={`ml-2 text-sm font-medium ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {codeExamples[active].title}
            </span>
          </div>
          <div className="p-2">
            <MonacoEditor
              code={codeExamples[active].code}
              language={getLanguage(active)}
              darkMode={darkMode}
              height="auto"
              readOnly={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
