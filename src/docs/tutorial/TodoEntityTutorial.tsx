import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle, Rocket,
} from "lucide-react";
import CodeExample from "@/components/CodeExample";

export default function TodoEntityTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      <div
        className={`mb-8 p-6 rounded-2xl ${darkMode
          ? "bg-gray-900/50 border border-gray-800"
          : "bg-gray-50 border border-gray-200"
          }`}
      >
        <div className="flex items-start gap-4">
          <div>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Entities in Luxid extend Rocket's <strong className="font-mono text-gray-900 dark:text-white">Entity</strong> class for modern,
              attribute-based Active Record functionality. Create
              <strong className={`font-mono px-2 py-1 rounded mx-1 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"}`}>
                app/Entities/Todo.php
              </strong>
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

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <Rocket className="w-5 h-5" />
          Key Rocket ORM Concepts
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[EntityAttr(table: 'todos')]</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                PHP 8 attribute that defines which database table this entity maps to. No need for a separate <strong className={darkMode ? "text-white font-mono" : "font-mono"}>tableName()</strong> method - the attribute keeps the declaration close to the class.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Column(...)] Attributes</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Properties are mapped to database columns using the <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Column]</strong> attribute.
                No need for an <strong className={darkMode ? "text-white font-mono" : "font-mono"}>attributes()</strong> method - the mapping is declared directly on the property.
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Column(primary: true, autoIncrement: true)]</strong> - Primary key with auto-increment</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Column(hidden: true)]</strong> - Exclude from JSON serialization</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Column(autoCreate: true)]</strong> - Automatically set on create</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Column(autoUpdate: true)]</strong> - Automatically update on every save</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Column(default: 'value')]</strong> - Set default value</p>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>Validation Rules as Attributes</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Validation rules are applied directly to properties using PHP 8 attributes. No separate <strong className={darkMode ? "text-white font-mono" : "font-mono"}>rules()</strong> method needed - validation is declared where it belongs.
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Required]</strong> - Field cannot be empty</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Min(3)]</strong> - Minimum length or value</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Max(255)]</strong> - Maximum length or value</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Email]</strong> - Must be valid email format</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Unique]</strong> - Must be unique in table</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[In(['pending', 'completed'])]</strong> - Must be in allowed values</p>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>Computed Properties (get* methods)</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Methods prefixed with <strong className={darkMode ? "text-white font-mono" : "font-mono"}>get</strong> become readable properties.
                <strong className={darkMode ? "text-white font-mono" : "font-mono"}>getSummary()</strong> is accessed as <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'$todo->summary'}</strong>.
                These are not stored in the database but are available when working with the entity.
              </p>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>Lifecycle Hooks</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Override <strong className={darkMode ? "text-white font-mono" : "font-mono"}>beforeSave()</strong> and <strong className={darkMode ? "text-white font-mono" : "font-mono"}>afterSave()</strong> to add custom logic at specific points. No need to manually handle timestamps - use <strong className={darkMode ? "text-white font-mono" : "font-mono"}>autoCreate</strong> and <strong className={darkMode ? "text-white font-mono" : "font-mono"}>autoUpdate</strong> column attributes.
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>beforeSave()</strong> - Runs before any save operation</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>afterSave()</strong> - Runs after successful save</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>beforeDelete()</strong> - Runs before deletion</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>afterDelete()</strong> - Runs after deletion</p>
              </div>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div>
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>Active Record Operations</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Rocket provides a full Active Record implementation with intuitive methods:
              </p>
              <div className={`mt-2 text-xs space-y-1 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'$todo->save()'}</strong> - Insert or update the record</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'Todo::find(1)'}</strong> - Find by primary key</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{`Todo::findOne(['status' => 'pending'])`}</strong> - Find one record</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'Todo::findAll()'}</strong> - Find multiple records</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'$todo->delete()'}</strong> - Delete the record</p>
                <p>• <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'Todo::query()'}</strong> - Access the query builder for complex queries</p>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          <CheckCircle className="w-5 h-5 text-green-500" />
          What Makes Rocket Different?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Declarative Syntax</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              PHP 8 attributes replace separate methods. Everything is declared where it belongs -
              table mapping on the class, column mapping on properties, validation rules on properties.
            </p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Type Safety</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Typed properties ensure data integrity. Rocket respects your PHP types and provides
              proper type hints throughout.
            </p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Automatic Timestamps</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Use <strong className={darkMode ? "text-white font-mono" : "font-mono"}> autoCreate</strong> and <strong className={darkMode ? "text-white font-mono" : "font-mono"}>autoUpdate</strong>
              column attributes instead of manually setting timestamps in lifecycle hooks.
            </p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Better IDE Support</h4>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Attributes are first-class PHP features. Your IDE understands them, providing better
              autocomplete, refactoring, and documentation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
