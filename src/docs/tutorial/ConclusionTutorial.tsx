import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { CheckCircle } from "lucide-react";

export default function ConclusionTutorial() {
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
            <p
              className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              You've now built a complete Todo API with Luxid Framework! <br />
              The AVE architecture provides a clean separation of concerns:
            </p>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
            <strong className="text-gray-900 dark:text-white">Entities: </strong>
            handle data and business logic
          </span>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
            <strong className="text-gray-900 dark:text-white">Actions: </strong>
            manage HTTP requests and responses
          </span>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
            <strong className="text-gray-900 dark:text-white">LuxidAction: </strong>
            custom app-specific methods
          </span>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
            <strong className="text-gray-900 dark:text-white">Routes: </strong>
            define your API endpoints
          </span>
        </li>

        <li className="flex items-start gap-3">
          <CheckCircle className="mt-1 h-5 w-5 text-green-500 flex-shrink-0" />
          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
            <strong className="text-gray-900 dark:text-white">Migrations: </strong>
            manage database schema changes
          </span>
        </li>
      </ul>

      <div className="flex items-start gap-4 mt-6">
        <div>
          <p
            className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            This pattern scales well for larger applications while keeping your code organized and maintainable.
          </p>
        </div>
      </div>
    </>
  );
}
