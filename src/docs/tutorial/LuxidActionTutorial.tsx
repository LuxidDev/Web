import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle, ArrowRight,
} from "lucide-react";
import CodeExample from "@/components/CodeExample";

export default function LuxidActionTutorial() {
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
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">LuxidAction: Your Base Action Class</h3>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Every action in your app will extend this class. It provides automatic filtering, pagination,
              and sorting for all your API endpoints.
            </p>
          </div>
        </div>
      </div>

      <div className={`mb-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          What is LuxidAction?
        </h3>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          It gives you powerful query filtering, pagination, and sorting capabilities out of the box.
        </p>
        <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          <strong className="text-gray-900 dark:text-white">Why use it?</strong> Instead of writing the same filtering and pagination logic for every endpoint,
          you define your filters once and they're automatically applied. This keeps your actions clean and focused
          on business logic.
        </p>
        <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <strong className="text-gray-900 dark:text-white">This file is already created</strong> for you in <strong className="font-mono text-gray-900 dark:text-white">app/Actions/LuxidAction.php</strong>,
            then all your resource actions (like <code className="font-mono text-gray-900 dark:text-white">TodoAction</code>) will extend it.
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
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          <CheckCircle className="w-5 h-5 text-green-500" />
          How to Use LuxidAction
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-bold mt-0.5">1</div>
            <div>
              <strong className="text-gray-900 dark:text-white">Create the Base Class</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Save the code above as <code className="font-mono">app/Actions/LuxidAction.php</code>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-bold mt-0.5">2</div>
            <div>
              <strong className="text-gray-900 dark:text-white">Extend It in Your Resource Actions</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                In your <code className="font-mono">TodoAction.php</code>, extend <code className="font-mono">LuxidAction</code> instead of the base <code className="font-mono">Action</code>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-bold mt-0.5">3</div>
            <div>
              <strong className="text-gray-900 dark:text-white">Use the API with Filters</strong>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Now your API automatically supports filtering via URL parameters:
              </p>
              <div className="space-y-1 mt-2 text-sm">
                <strong className={darkMode ? "text-white font-mono block p-2" : "font-mono block p-2"}>GET /api/todos?status=pending</strong>
                <strong className={darkMode ? "text-white font-mono block p-2" : "font-mono block p-2"}>GET /api/todos?search=work</strong>
                <strong className={darkMode ? "text-white font-mono block p-2" : "font-mono block p-2"}>GET /api/todos?status=in_progress&search=project</strong>
                <strong className={darkMode ? "text-white font-mono block p-2" : "font-mono block p-2"}>GET /api/todos?limit=20&offset=0</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Methods Explained */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          Key Methods You'll Use
        </h3>

        <div className="grid grid-cols-1 gap-3">
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className={darkMode ? "text-white font-mono" : "font-mono"}>getEntityClass()</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Override this to tell LuxidAction which Entity to use.
            </p>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className={darkMode ? "text-white font-mono" : "font-mono"}>$filters</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Define what filters your API supports. These map URL parameters to database columns.
            </p>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className={darkMode ? "text-white font-mono" : "font-mono"}>$defaultOrder</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Set the default sorting for your results.
            </p>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className={darkMode ? "text-white font-mono" : "font-mono"}>getFilteredResults()</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Returns filtered, sorted, and paginated results. Use this in your <strong className={darkMode ? "text-white font-mono" : "font-mono"}>index()</strong> method.
            </p>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className={darkMode ? "text-white font-mono" : "font-mono"}>getFilteredCount()</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Returns total count of records matching filters (useful for pagination metadata).
            </p>
          </div>

          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <strong className={darkMode ? "text-white font-mono" : "font-mono"}>getQueryParams()</strong>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Returns current filter parameters being used (great for debugging or API responses).
            </p>
          </div>
        </div>
      </div>

      {/* Filter Configuration Examples */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          Filter Configuration Examples
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Simple Status Filter</h4>
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

          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Search Across Columns</h4>
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

          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Range Filter</h4>
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

          <div className={`p-3 rounded-lg ${darkMode ? "bg-gray-800/30 border border-gray-700" : "bg-gray-100 border border-gray-200"}`}>
            <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Date Filter</h4>
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
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
          <CheckCircle className="w-5 h-5 text-green-500" />
          Benefits
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Less boilerplate code</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Consistent API across endpoints</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Automatic validation of filter values</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Built-in pagination and sorting</span>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className={`mt-6 p-5 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
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
