import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle,
} from "lucide-react";
import CodeExample from "@/components/CodeExample";

export default function TodoEntityTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      <div
        className={`mb-8 p-6 rounded-2xl ${
          darkMode
            ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
            : "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200"
        }`}
      >
        <div className="flex items-start gap-4">
          <div>
            <p
              className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}
            >
              Entities in Luxid extend DbEntity for Active Record functionality. <br />
              Create
            <code
            className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}
            >
            app/Entities/Todo.php
            </code>{" "}
            </p>
          </div>
        </div>
      </div>

      <CodeExample
        code={`<?php
namespace App\Entities;

use Luxid\Database\DbEntity;

class Todo extends DbEntity
{
    public int $id = 0;
    public string $title = '';
    public string $description = '';
    public string $status = 'pending';  // pending, in_progress, completed
    public string $created_at = '';
    public string $updated_at = '';

    public static function tableName(): string
    {
        return 'todos';
    }

    public static function primaryKey(): string
    {
        return 'id';
    }

    public function attributes(): array
    {
        return [
            'title',
            'description',
            'status',
            'created_at',
            'updated_at'
        ];
    }

    public function rules(): array
    {
        return [
           'title' => [
                self::RULE_REQUIRED,
                [self::RULE_MIN, 'min' => 3],
                [self::RULE_MAX, 'max' => 255]
           ],
           'description' => [
                [self::RULE_MAX, 'max' => 255]
           ],
           'status' => [
                self::RULE_REQUIRED
           ]
        ];
    }

    public function save(): bool
    {
        if ($this->id === 0) {
            $this->created_at = date('Y-m-d H:i:s');
        }
        $this->updated_at = date('Y-m-d H:i:s');
        return parent::save();
    }

    public function validate(): bool
    {
        $statusOptions = ['pending', 'in_progress', 'completed'];

        if (!in_array($this->status, $statusOptions)) {
            $this->addError('status', 'Status must be one of: ' . implode(', ', $statusOptions));
        }

        return parent::validate();
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}`}
        title="app/Entities/Todo.php"
        explanation=""
      />

    <ul className="mt-4 space-y-3">
        <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>DbEntity: </strong>
            Provides Active Record pattern - your model represents a database table
            </span>
        </li>

        <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>tableName(): </strong>
            Tells Luxid which table to use
            </span>
        </li>

        <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>attributes(): </strong>
            Defines which columns map to object properties
            </span>
        </li>

        <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>rules(): </strong>
            Provides validation rules using built-in constants
            </span>
        </li>

        <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>save(): </strong>
            Automatically handles timestamps before saving
            </span>
        </li>
       </ul>
    </>
  );
}
