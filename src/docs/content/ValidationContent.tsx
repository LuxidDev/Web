import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import {
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function ValidationContent() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Hero Section */}
      <div className={`mb-8 p-6 rounded-2xl ${darkMode
        ? "bg-gray-900/50 border border-gray-800"
        : "bg-gray-50 border border-gray-200"
        }`}>
        <div className="flex items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Rocket ORM Validation</h1>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Rocket ORM provides powerful validation capabilities using PHP 8 attributes. Validate your entity data before saving to ensure data integrity.
            </p>
          </div>
        </div>
      </div>

      {/* How Validation Works */}
      <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-900 dark:text-white">How Validation Works in Rocket</h2>

      <div className="flex flex-col gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Attribute-Based Validation
          </h4>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Validation rules are defined directly on entity properties using PHP 8 attributes.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Built-in rules include Required, Email, Min, Max, Unique, and In.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Validation runs automatically when calling the `save()` method.
            </li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="font-bold mb-3 flex items-center gap-2 text-gray-900 dark:text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Validation Rules Examples
          </h4>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Required]</strong> - Field cannot be empty
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Email]</strong> - Must be valid email format
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Min(8)]</strong> - Minimum length or value
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Max(255)]</strong> - Maximum length or value
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[Unique]</strong> - Must be unique in database
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              <strong className={darkMode ? "text-white font-mono" : "font-mono"}>#[In(['a', 'b'])]</strong> - Must be in allowed values
            </li>
          </ul>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? "bg-gray-900/50 border border-gray-800" : "bg-gray-50 border border-gray-200"}`}>
          <h4 className="font-bold mb-3 flex-items-center gap-2 text-gray-900 dark:text-white">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Manual Validation
          </h4>
          <ul className={`space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Call <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'$entity->validate()'}</strong> to validate without saving.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Access validation errors with <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{'$entity->getErrors()'}</strong>.
            </li>
            <li className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-green-500" />
              Check specific fields with <strong className={darkMode ? "text-white font-mono" : "font-mono"}>{`$entity->hasError('field')`}</strong>.
            </li>
          </ul>
        </div>
      </div >
    </>
  );
}
