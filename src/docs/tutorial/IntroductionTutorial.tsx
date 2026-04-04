import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import TerminalCommand from "@/components/TerminalCommand";

export default function IntroductionTutorial() {
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
            <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              Build a Todo API with Luxid Framework
            </h3>
            <p
              className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              This tutorial walks you through creating a complete Todo API using Luxid's SEA architecture
              (Screens-Entities-Actions). We'll build a RESTful API with full CRUD operations, filtering,
              and bulk operations.
            </p>
          </div>
        </div>
      </div>

      <div
        className={`my-8 p-6 rounded-xl ${darkMode
          ? "bg-gray-900 border border-gray-800"
          : "bg-gray-100 border border-gray-200"
          }`}
      >
        {/* Step 1: Project Setup */}
        <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Project Setup</h4>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode
                ? "bg-gray-800 text-gray-300 border border-gray-700"
                : "bg-gray-200 text-gray-600 border border-gray-300"
                }`}
            >
              1
            </div>
            <div>
              <h5 className="font-bold text-gray-900 dark:text-white">Create a new Luxid Project</h5>
              <p
                className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                You can use{' '}
                <strong
                  className={darkMode ? "text-white font-mono" : "font-mono"}
                >
                  luxid installer
                </strong>{' '}
                to create and install a new luxid application. <br />
                You can also use{' '}
                <strong
                  className={darkMode ? "text-white font-mono" : "font-mono"}
                >
                  composer
                </strong>{' '}
                For this tutorial, let's use composer.
              </p>
              <TerminalCommand
                command="composer create-project luxid/framework todo_api"
                description="Create a new luxid project."
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode
                ? "bg-gray-800 text-gray-300 border border-gray-700"
                : "bg-gray-200 text-gray-600 border border-gray-300"
                }`}
            >
              2
            </div>
            <div>
              <h5 className="font-bold text-gray-900 dark:text-white">Configure your database in .env</h5>
              <p
                className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Create a{' '}
                <strong
                  className={darkMode ? "text-white font-mono" : "font-mono"}
                >
                  .env
                </strong>{' '}
                file and copy the contents of{' '}
                <strong
                  className={darkMode ? "text-white font-mono" : "font-mono"}
                >
                  .env.example
                </strong>{' '}
                into it.
              </p>
              <TerminalCommand
                command="cp .env.example .env"
                description="Edit .env with your database credentials. Luxid only supports MySQL 'FOR NOW'"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
