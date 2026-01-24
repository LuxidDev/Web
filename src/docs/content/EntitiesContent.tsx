import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Database } from 'lucide-react';
import CodeExample from '../components/CodeExample';

export default function EntitiesContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Header */}
      <div
        className={`mb-8 p-6 rounded-2xl ${
          darkMode
            ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20'
            : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'
        }`}
      >
        <div className="flex items-start gap-4">
          <Database
            className={`w-12 h-12 ${
              darkMode ? 'text-green-400' : 'text-green-600'
            }`}
          />
          <div>
            <h3 className="text-2xl font-bold mb-2">
              Entities: The Data Layer
            </h3>
            <p
              className={`text-lg ${
                darkMode ? 'text-zinc-300' : 'text-zinc-700'
              }`}
            >
              Entities represent your data models and handle all database
              operations with L ORM.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <h2 className="text-3xl font-bold mb-6">What Are Entities?</h2>
      <p
        className={`text-lg mb-6 ${
          darkMode ? 'text-zinc-300' : 'text-zinc-700'
        }`}
      >
        Entities are Luxid&apos;s implementation of the Active Record pattern.
        Each Entity class represents a database table, and each instance
        represents a row in that table. Entities handle data validation, business
        rules, and database operations.
      </p>

      {/* Entity Example */}
      <CodeExample
        title="app/Entities/User.php - Basic Entity Example"
        explanation="Entities extend DbEntity and define table structure, validation, and custom business logic."
        code={`<?php
namespace App\\Entities;

use Luxid\\Database\\DbEntity;

class User extends DbEntity
{
    public int $id = 0;
    public string $email = '';
    public string $password = '';
    public string $firstname = '';
    public string $lastname = '';
    public string $created_at = '';

    public static function tableName(): string
    {
        return 'users';
    }

    public static function primaryKey(): string
    {
        return 'id';
    }

    public function attributes(): array
    {
        return ['email', 'password', 'firstname', 'lastname', 'created_at'];
    }

    public function rules(): array
    {
        return [
            'email' => [self::RULE_REQUIRED, self::RULE_EMAIL],
            'password' => [self::RULE_REQUIRED, [self::RULE_MIN, 'min' => 8]],
            'firstname' => [self::RULE_REQUIRED],
            'lastname' => [self::RULE_REQUIRED],
        ];
    }

    public function save(): bool
    {
        if ($this->id === 0) {
            $this->created_at = date('Y-m-d H:i:s');
            $this->password = password_hash($this->password, PASSWORD_DEFAULT);
        }

        return parent::save();
    }
}`}
      />

      {/* Usage */}
      <h3 className="text-2xl font-bold mb-4 mt-8">
        Entity Methods and Usage
      </h3>

      <div
        className={`mb-8 p-6 rounded-xl ${
          darkMode
            ? 'bg-zinc-900/50 border border-zinc-800'
            : 'bg-zinc-50 border border-zinc-200'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CRUD */}
          <div>
            <h4 className="font-bold mb-2">CRUD Operations</h4>
            <CodeExample
              title="Basic CRUD Operations"
              language="php"
              compact
              code={`// Create
$user = new User();
$user->email = 'test@example.com';
$user->save();

// Read
$user = User::find(1);
$user = User::findOne(['email' => 'test@example.com']);
$users = User::findAll(['active' => true], 'created_at DESC');

// Update
$user = User::find(1);
$user->email = 'new@example.com';
$user->save();

// Delete
$user = User::find(1);
$user->delete();`}
            />
          </div>

          {/* Validation */}
          <div>
            <h4 className="font-bold mb-2">Validation & Errors</h4>
            <CodeExample
              title="Validation Example"
              language="php"
              compact
              code={`$user = new User();
$user->loadData($_POST);

if ($user->validate()) {
    $user->save();
    echo "User saved!";
} else {
    $errors = $user->errors;

    if ($user->hasError('email')) {
        echo $user->getFirstError('email');
    }
}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
