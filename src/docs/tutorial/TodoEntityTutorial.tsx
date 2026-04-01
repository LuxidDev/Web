import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle, Rocket, Database, Shield, Clock, Code, Zap
} from "lucide-react";
import CodeExample from "@/components/CodeExample";

export default function TodoEntityTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      <div
        className={`mb-8 p-6 rounded-2xl ${darkMode
          ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
          : "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200"
          }`}
      >
        <div className="flex items-start gap-4">
          <div>
            <p className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
              Entities in Luxid extend Rocket's <strong className="font-mono">Entity</strong> class for modern,
              attribute-based Active Record functionality. Create
              <code className={`font-mono px-2 py-1 rounded mx-1 ${darkMode ? "bg-zinc-800/50 text-purple-300" : "bg-purple-50 text-purple-700"}`}>
                app/Entities/Todo.php
              </code>
            </p>
          </div>
        </div>
      </div>

      <CodeExample
        code={`<?php
namespace App\Entities;

use Rocket\ORM\Entity;
use Rocket\Attributes\Entity as EntityAttr;
use Rocket\Attributes\Column;
use Rocket\Attributes\Rules\Required;
use Rocket\Attributes\Rules\Min;
use Rocket\Attributes\Rules\Max;
use Rocket\Attributes\Rules\In;

/**
 * Todo Entity
 * 
 * Represents a todo item in the database.
 * 
 * This entity demonstrates:
 * - Rocket ORM attributes for database mapping
 * - Validation rules using PHP 8 attributes
 * - Automatic timestamp management
 * - Computed properties
 * - Lifecycle hooks
 * 
 * @package App\Entities
 */
#[EntityAttr(table: 'todos')]
class Todo extends Entity
{
  /**
   * Primary key - auto-incrementing ID
   * 
   * @var int
   */
  #[Column(primary: true, autoIncrement: true)]
  public int $id = 0;

  /**
   * Todo title
   * Required, minimum 3 characters, maximum 255 characters
   * 
   * @var string
   */
  #[Column]
  #[Required]
  #[Min(3)]
  #[Max(255)]
  public string $title = '';

  /**
   * Todo description
   * Optional, maximum 1000 characters
   * 
   * @var string
   */
  #[Column]
  #[Max(1000)]
  public string $description = '';

  /**
   * Todo status
   * Must be one of: pending, in_progress, completed
   * Defaults to 'pending'
   * 
   * @var string
   */
  #[Column(default: 'pending')]
  #[Required]
  #[In(['pending', 'in_progress', 'completed'])]
  public string $status = 'pending';

  /**
   * Creation timestamp
   * Automatically set when todo is created
   * 
   * @var string
   */
  #[Column(autoCreate: true)]
  public string $created_at = '';

  /**
   * Last update timestamp
   * Automatically set when todo is created or updated
   * 
   * @var string
   */
  #[Column(autoCreate: true, autoUpdate: true)]
  public string $updated_at = '';

  /**
   * Get a human-readable summary of the todo
   * 
   * This is a computed property - not stored in the database,
   * but available as $todo->summary
   * 
   * @return string
   */
  public function getSummary(): string
  {
    $statusEmoji = match ($this->status) {
      'pending' => '⏳',
      'in_progress' => '🔄',
      'completed' => '✅',
      default => '📝'
    };

    $truncated = strlen($this->description) > 50
      ? substr($this->description, 0, 50) . '...'
      : $this->description;

    return "{$statusEmoji} {$this->title}" . ($truncated ? ": {$truncated}" : "");
  }

  /**
   * Check if the todo is completed
   * 
   * @return bool
   */
  public function isCompleted(): bool
  {
    return $this->status === 'completed';
  }

  /**
   * Check if the todo is in progress
   * 
   * @return bool
   */
  public function isInProgress(): bool
  {
    return $this->status === 'in_progress';
  }

  /**
   * Check if the todo is pending
   * 
   * @return bool
   */
  public function isPending(): bool
  {
    return $this->status === 'pending';
  }

  /**
   * Lifecycle hook - called before saving the entity
   * 
   * This is where we can add custom logic that should run
   * before any save operation (both insert and update)
   */
  protected function beforeSave(): void
  {
    // Auto-capitalize the first letter of the title
    $this->title = ucfirst($this->title);

    // Ensure description is never null
    if ($this->description === null) {
      $this->description = '';
    }

    // For new records, set created_at if not already set
    if ($this->isNew && empty($this->created_at)) {
      $this->created_at = date('Y-m-d H:i:s');
    }

    // Always update updated_at
    $this->updated_at = date('Y-m-d H:i:s');
  }

  /**
   * Lifecycle hook - called after successfully saving the entity
   */
  protected function afterSave(): void
  {
    // Could be used for:
    // - Clearing cache
    // - Dispatching events
    // - Logging changes
  }

  /**
   * Convert the entity to an array for JSON responses
   * 
   * @return array
   */
  public function toArray(): array
  {
    return [
      'id' => $this->id,
      'title' => $this->title,
      'description' => $this->description,
      'status' => $this->status,
      'summary' => $this->summary, // Computed property
      'is_completed' => $this->isCompleted(),
      'created_at' => $this->created_at,
      'updated_at' => $this->updated_at,
    ];
  }
}`}
        title="app/Entities/Todo.php"
        explanation="A complete Todo entity demonstrating Rocket ORM features: PHP 8 attributes for mapping, validation rules, computed properties, and lifecycle hooks."
      />

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5" />
          Key Rocket ORM Concepts
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-blue-400" : "text-blue-700"}>#[EntityAttr(table: 'todos')]</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                PHP 8 attribute that defines which database table this entity maps to. No need for a separate
                <code className="font-mono">tableName()</code> method - the attribute keeps the declaration close to the class.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-green-400" : "text-green-700"}>#[Column(...)] Attributes</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Properties are mapped to database columns using the <code className="font-mono">#[Column]</code> attribute.
                No need for an <code className="font-mono">attributes()</code> method - the mapping is declared directly on the property.
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                <p>• <code className="font-mono">#[Column(primary: true, autoIncrement: true)]</code> - Primary key with auto-increment</p>
                <p>• <code className="font-mono">#[Column(hidden: true)]</code> - Exclude from JSON serialization</p>
                <p>• <code className="font-mono">#[Column(autoCreate: true)]</code> - Automatically set on create</p>
                <p>• <code className="font-mono">#[Column(autoUpdate: true)]</code> - Automatically update on every save</p>
                <p>• <code className="font-mono">#[Column(default: 'value')]</code> - Set default value</p>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-purple-400" : "text-purple-700"}>Validation Rules as Attributes</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Validation rules are applied directly to properties using PHP 8 attributes. No separate
                <code className="font-mono">rules()</code> method needed - validation is declared where it belongs.
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                <p>• <code className="font-mono">#[Required]</code> - Field cannot be empty</p>
                <p>• <code className="font-mono">#[Min(3)]</code> - Minimum length or value</p>
                <p>• <code className="font-mono">#[Max(255)]</code> - Maximum length or value</p>
                <p>• <code className="font-mono">#[Email]</code> - Must be valid email format</p>
                <p>• <code className="font-mono">#[Unique]</code> - Must be unique in table</p>
                <p>• <code className="font-mono">#[In(['pending', 'completed'])]</code> - Must be in allowed values</p>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-yellow-400" : "text-yellow-700"}>Computed Properties (get* methods)</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Methods prefixed with <code className="font-mono">get</code> become readable properties.
                <code className="font-mono">getSummary()</code> is accessed as <code className="font-mono">{'$todo->summary'}</code>.
                These are not stored in the database but are available when working with the entity.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-orange-400" : "text-orange-700"}>Lifecycle Hooks</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Override <code className="font-mono">beforeSave()</code> and <code className="font-mono">afterSave()</code>
                to add custom logic at specific points. No need to manually handle timestamps - use
                <code className="font-mono">autoCreate</code> and <code className="font-mono">autoUpdate</code> column attributes.
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                <p>• <code className="font-mono">beforeSave()</code> - Runs before any save operation</p>
                <p>• <code className="font-mono">afterSave()</code> - Runs after successful save</p>
                <p>• <code className="font-mono">beforeDelete()</code> - Runs before deletion</p>
                <p>• <code className="font-mono">afterDelete()</code> - Runs after deletion</p>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-green-400" : "text-green-700"}>Active Record Operations</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Rocket provides a full Active Record implementation with intuitive methods:
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-zinc-500" : "text-zinc-500"}`}>
                <p>• <code className="font-mono">{'$todo->save()'}</code> - Insert or update the record</p>
                <p>• <code className="font-mono">{'Todo::find(1)'}</code> - Find by primary key</p>
                <p>• <code className="font-mono">{`Todo::findOne(['status' => 'pending'])`}</code> - Find one record</p>
                <p>• <code className="font-mono">{'Todo::findAll()'}</code> - Find multiple records</p>
                <p>• <code className="font-mono">{'$todo->delete()'}</code> - Delete the record</p>
                <p>• <code className="font-mono">{'Todo::query()'}</code> - Access the query builder for complex queries</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          What Makes Rocket Different?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
            <h4 className="font-bold mb-2">Declarative Syntax</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              PHP 8 attributes replace separate methods. Everything is declared where it belongs -
              table mapping on the class, column mapping on properties, validation rules on properties.
            </p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
            <h4 className="font-bold mb-2">Type Safety</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Typed properties ensure data integrity. Rocket respects your PHP types and provides
              proper type hints throughout.
            </p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
            <h4 className="font-bold mb-2">Automatic Timestamps</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Use <code className="font-mono">autoCreate</code> and <code className="font-mono">autoUpdate</code>
              column attributes instead of manually setting timestamps in lifecycle hooks.
            </p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
            <h4 className="font-bold mb-2">Better IDE Support</h4>
            <p className={`text-sm ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
              Attributes are first-class PHP features. Your IDE understands them, providing better
              autocomplete, refactoring, and documentation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
