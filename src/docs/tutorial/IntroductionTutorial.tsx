import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import CodeExample from "@/components/CodeExample";

export default function IntroductionTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
        <div
        className={`mb-8 p-6 rounded-2xl ${
            darkMode
            ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
            : "bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200"
        }`}
        >
        <div className="flex items-start gap-4">
            <div>
            <h3 className="text-2xl font-bold mb-2">
                Build a Todo API with Luxid Framework
            </h3>
            <p
                className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
            >
                This tutorial walks you through creating a complete Todo API using Luxid's SEA architecture
                (Screens-Entities-Actions). We'll build a RESTful API with full CRUD operations, filtering,
                and bulk operations.
            </p>
            </div>
        </div>
        </div>

        <div
            className={`my-8 p-6 rounded-xl ${
            darkMode
                ? "bg-zinc-900 border border-zinc-800"
                : "bg-zinc-100 border border-zinc-300"
            }`}
        >
            {/* Step 1: Project Setup */}
            <h4 className="text-xl font-bold mb-4">Project Setup</h4>
            <div className="space-y-4">
            <div className="flex items-start gap-3">
                <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    darkMode
                    ? "bg-blue-500 text-white"
                    : "bg-blue-100 text-blue-600"
                }`}
                >
                1
                </div>
                <div>
                <h5 className="font-bold">Create a new Luxid Project</h5>
                <p
                    className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
                >
                    You can use
                    <code
                    className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}
                    >
                    luxid installer
                    </code>{" "}
                    to create and install a new luxid application. <br></br>
                    You can also use
                    <code
                    className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}
                    >
                    composer
                    </code>{" "}
                    For this tutorial, let's use composer.
                </p>
                <CodeExample
                    code={` $ composer create-project luxid/framework todo_api`}
                    language="bash"
                    explanation=""
                    compact={true}
                />
                </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3">
                <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    darkMode
                    ? "bg-green-500 text-white"
                    : "bg-green-100 text-green-600"
                }`}
                >
                2
                </div>
                <div>
                <h5 className="font-bold">Configure your database in .env</h5>
                <p
                    className={`text-sm mt-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}
                >
                    Create a
                    <code
                    className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}
                    >
                    .env
                    </code>{" "}
                    file and copy the contents of
                    <code
                    className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}
                    >
                    .env.example
                    </code>{" "}
                    into it.
                </p>
                <CodeExample
                    code={` $ cp .env .env.example`}
                    language="bash"
                    explanation="Edit .env witht your database credentials. Luxid only supports MySQL 'FOR NOW'"
                    compact={true}
                />
                </div>
            </div>
            </div>
        </div>
    </>
  );
}
