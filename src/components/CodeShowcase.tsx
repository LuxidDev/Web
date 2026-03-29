import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import MonacoEditor from '@/components/MonacoEditor';

const codeExamples = {
  action: {
    title: 'Actions (Controllers)',
    code: `<?php

namespace App\\Actions;

use Luxid\\Nodes\\Response;

class UserAction extends LuxidAction
{
    public function index(): string
    {
        $id = $this->request()->query('id');
        $user = User::find($id);

        if (!$users) {
            return $response->error('No users found', null, 404);
        }

        return Response::success('[
            'users' => $user,
            'message' => 'User found'
        ], 200);
    }
}`
  },
  entity: {
    title: 'Entities (Models)',
    code: `<?php

use Luxid\ORM\UserEntity;
use Rocket\Attributes\Entity as EntityAttr;
use Rocket\Attributes\Column;
use Rocket\Attributes\Rules\Required;
use Rocket\Attributes\Rules\Email;
use Rocket\Attributes\Rules\Min;
use Rocket\Attributes\Rules\Unique;

#[EntityAttr(table: 'users')]
class User extends UserEntity
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
}`,
  },
  screen: {
    title: 'Nova (Views)',
    code: `<?php

component('components/Card', function ($c) {
  $c->state(function () {
    return [
      'title' => 'Tailwind Demo',
      'content' => 'This card demonstrates Tailwind CSS styling!',
      'color' => 'blue'
    ];
  });

  $c->view(function ($state) {
    $colorClasses = [
      'blue' => 'bg-blue-500 hover:bg-blue-600',
      'green' => 'bg-green-500 hover:bg-green-600',
      'purple' => 'bg-purple-500 hover:bg-purple-600',
      'red' => 'bg-red-500 hover:bg-red-600'
    ];

    $buttonClass = $colorClasses[$state->color] ?? 'bg-gray-500 hover:bg-gray-600';
?>
    <div class="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm border border-white/20">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2 text-white">@echo($state->title)</div>
        <p class="text-gray-300 text-base">@echo($state->content)</p>
      </div>
    </div>
<?php
  });
});`
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
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'
            }`}>Beautiful, expressive syntax</h2>
          <p className={`text-xl ${darkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Write PHP that feels modern and elegant</p>
        </div>
        <div className="flex justify-center gap-2 mb-8">
          {Object.entries(codeExamples).map(([key, val]) => (
            <button
              key={key}
              onClick={() => setActive(key as any)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${active === key
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
        <div className={`border rounded-xl overflow-hidden ${darkMode
          ? 'bg-[#1e1e1e] border-zinc-700'
          : 'bg-[#fffffe] border-zinc-300'
          }`}>
          <div className={`flex items-center gap-2 px-4 py-3 border-b ${darkMode ? 'border-zinc-700' : 'border-zinc-300'
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
