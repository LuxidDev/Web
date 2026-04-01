import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle, ArrowRight, Code, Rocket
} from "lucide-react";
import CodeExample from "@/components/CodeExample";

export default function LuxidActionTutorial() {
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
            <h3 className="text-2xl font-bold mb-2">LuxidAction: Your Base Action Class</h3>
            <p className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
              Every action in your app will extend this class. It provides automatic filtering, pagination,
              and sorting for all your API endpoints.
            </p>
          </div>
        </div>
      </div>

      <div className={`mb-6 p-5 rounded-xl ${darkMode ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          What is LuxidAction?
        </h3>
        <p className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
          It gives you powerful query filtering, pagination, and sorting capabilities out of the box.
        </p>
        <p className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
          <strong>Why use it?</strong> Instead of writing the same filtering and pagination logic for every endpoint,
          you define your filters once and they're automatically applied. This keeps your actions clean and focused
          on business logic.
        </p>
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
          <p className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>
            <strong>This file is already created</strong> for you in <strong className="font-mono">app/Actions/LuxidAction.php</strong>,
            then all your resource actions (like <code className="font-mono">TodoAction</code>) will extend it.
          </p>
        </div>
      </div>

      <CodeExample
        code={`<?php

namespace App\Actions;

use Luxid\Foundation\Action;
use Rocket\Query\QueryFilter;

abstract class LuxidAction extends Action
{
  /**
   * Filter configuration for the current action
   * Override this in your action class to define filters
   * 
   * Example:
   * protected array $filters = [
   *     'status' => ['column' => 'status', 'values' => ['pending', 'completed']],
   *     'search' => ['column' => ['title', 'description'], 'operator' => 'LIKE'],
   * ];
   */
  protected array $filters = [];

  /**
   * Default order by for queries
   */
  protected array $defaultOrder = ['created_at' => 'DESC'];

  /**
   * Get the entity class for this action
   * Override this in your action class
   * 
   * @return string
   */
  protected function getEntityClass(): string
  {
    return '';
  }

  /**
   * Get all query parameters from the request
   * 
   * @return array
   */
  protected function getParams(): array
  {
    $params = [];

    foreach ($this->filters as $param => $config) {
      $params[$param] = $this->request()->query($param);
    }

    $params['limit'] = $this->request()->query('limit', 0);
    $params['offset'] = $this->request()->query('offset', 0);

    return $params;
  }

  /**
   * Get filtered results with pagination
   * 
   * @param string|null $entityClass Override the entity class
   * @return array
   */
  protected function getFilteredResults(?string $entityClass = null): array
  {
    $entityClass = $entityClass ?? $this->getEntityClass();

    if (empty($entityClass)) {
      throw new \\RuntimeException('Entity class not defined for this action');
    }

    $params = $this->getParams();
    $query = $entityClass::query();

    // Apply filters
    $query = QueryFilter::apply($query, $this->filters, $params);

    // Apply ordering
    $query = QueryFilter::orderBy($query, $this->defaultOrder);

    // Apply pagination
    $query = QueryFilter::paginate($query, $params);

    return $query->all();
  }

  /**
   * Get the total count of filtered results
   * 
   * @param string|null $entityClass Override the entity class
   * @return int
   */
  protected function getFilteredCount(?string $entityClass = null): int
  {
    $entityClass = $entityClass ?? $this->getEntityClass();

    if (empty($entityClass)) {
      throw new \\RuntimeException('Entity class not defined for this action');
    }

    $params = $this->getParams();
    $query = $entityClass::query();

    // Apply filters (no pagination or ordering needed for count)
    $query = QueryFilter::apply($query, $this->filters, $params);

    return $query->count();
  }

  /**
   * Get the current query parameters
   * 
   * @return array
   */
  protected function getQueryParams(): array
  {
    return QueryFilter::getParams($this->filters, $this->getParams());
  }
}`}
        title="app/Actions/LuxidAction.php"
        explanation="Your base action class. Every resource action in your app will extend this."
      />

      {/* How to Use Section */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          How to Use LuxidAction
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mt-0.5">1</div>
            <div>
              <strong className={darkMode ? "text-green-400" : "text-green-700"}>Create the Base Class</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Save the code above as <code className="font-mono">app/Actions/LuxidAction.php</code>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mt-0.5">2</div>
            <div>
              <strong className={darkMode ? "text-green-400" : "text-green-700"}>Extend It in Your Resource Actions</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                In your <code className="font-mono">TodoAction.php</code>, extend <code className="font-mono">LuxidAction</code> instead of the base <code className="font-mono">Action</code>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold mt-0.5">3</div>
            <div>
              <strong className={darkMode ? "text-green-400" : "text-green-700"}>Use the API with Filters</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
                Now your API automatically supports filtering via URL parameters:
              </p>
              <div className="space-y-1 mt-2 text-sm">
                <code className="block p-2 rounded bg-black/10 font-mono text-xs">GET /api/todos?status=pending</code>
                <code className="block p-2 rounded bg-black/10 font-mono text-xs">GET /api/todos?search=work</code>
                <code className="block p-2 rounded bg-black/10 font-mono text-xs">GET /api/todos?status=in_progress&search=project</code>
                <code className="block p-2 rounded bg-black/10 font-mono text-xs">GET /api/todos?limit=20&offset=0</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Methods Explained */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          Key Methods You'll Use
        </h3>

        <div className="grid grid-cols-1 gap-3">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <code className="font-mono text-purple-600">getEntityClass()</code>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Override this to tell LuxidAction which Entity to use.
            </p>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <code className="font-mono text-purple-600">$filters</code>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Define what filters your API supports. These map URL parameters to database columns.
            </p>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <code className="font-mono text-purple-600">$defaultOrder</code>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Set the default sorting for your results.
            </p>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <code className="font-mono text-purple-600">getFilteredResults()</code>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Returns filtered, sorted, and paginated results. Use this in your <code className="font-mono">index()</code> method.
            </p>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <code className="font-mono text-purple-600">getFilteredCount()</code>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Returns total count of records matching filters (useful for pagination metadata).
            </p>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
            <code className="font-mono text-purple-600">getQueryParams()</code>
            <p className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              Returns current filter parameters being used (great for debugging or API responses).
            </p>
          </div>
        </div>
      </div>

      {/* Filter Configuration Examples */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-cyan-900/20 border border-cyan-800' : 'bg-cyan-50 border border-cyan-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          Filter Configuration Examples
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-100'}`}>
            <h4 className="font-bold mb-2">Simple Status Filter</h4>
            <CodeExample
              code={`'status' => [
    'column' => 'status',
    'values' => ['pending', 'completed']
]`}
              language="php"
              title="Status Filter"
              explanation="Filters by exact status value. Use ?status=pending in URL."
              compact={true}
            />
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-100'}`}>
            <h4 className="font-bold mb-2">Search Across Columns</h4>
            <CodeExample
              code={`'search' => [
    'column' => ['title', 'description'],
    'operator' => 'LIKE'
]`}
              language="php"
              title="Text Search"
              explanation="Searches across multiple columns. Use ?search=keyword in URL."
              compact={true}
            />
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-100'}`}>
            <h4 className="font-bold mb-2">Range Filter</h4>
            <CodeExample
              code={`'price' => [
    'column' => 'price',
    'operator' => 'BETWEEN'
]`}
              language="php"
              title="Price Range"
              explanation="Filters by range. Use ?price_min=10&price_max=100 in URL."
              compact={true}
            />
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? 'bg-cyan-900/30' : 'bg-cyan-100'}`}>
            <h4 className="font-bold mb-2">Date Filter</h4>
            <CodeExample
              code={`'created_at' => [
    'column' => 'created_at',
    'operator' => 'DATE'
]`}
              language="php"
              title="Date Range"
              explanation="Filters by date. Use ?created_from=2024-01-01&created_to=2024-12-31 in URL."
              compact={true}
            />
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Benefits
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Less boilerplate code</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Consistent API across endpoints</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Automatic validation of filter values</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Built-in pagination and sorting</span>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-zinc-50 border border-zinc-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Best Practices
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Always override <code className="font-mono">getEntityClass()</code> in your child actions</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Use <code className="font-mono">$filters</code> to define all filterable fields</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Set <code className="font-mono">$defaultOrder</code> to a sensible default</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Return both results and total count for proper pagination</span>
          </li>
          <li className="flex items-start gap-2">
            <ArrowRight className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Add database indexes for columns you filter on</span>
          </li>
        </ul>
      </div>
    </>
  );
}
