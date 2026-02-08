import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import CodeExample from "@/components/CodeExample";

export default function TestYourAPITutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Start Server Section */}
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
              Start the development server:
            </h3>
          </div>
        </div>
        <CodeExample
          code={`$ php juice start`}
          language="bash"
          explanation=""
          compact={true}
        />
      </div>

      {/* API Testing Section */}
      <div
        className={`my-8 p-6 rounded-xl ${
          darkMode
            ? "bg-zinc-900 border border-zinc-800"
            : "bg-zinc-100 border border-zinc-300"
        }`}
      >
        <h4 className="text-xl font-bold mb-6">
          Test endpoints using curl or Postman:
        </h4>

        <div className="space-y-6">
          {/* 1. Create Todo */}
          <div className="flex items-start gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"
              }`}
            >
              1
            </div>
            <div className="flex-1">
              <h5 className="font-bold mb-2">Create a Todo</h5>
              <CodeExample
                code={`curl -X POST http://localhost:8000/api/todos \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Learn Luxid Framework",
    "description": "Build a complete API with SEA architecture",
    "status": "in_progress"
  }'`}
                language="bash"
                explanation=""
              />
            </div>
          </div>

          {/* 2. Get All Todos */}
          <div className="flex items-start gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"
              }`}
            >
              2
            </div>
            <div className="flex-1">
              <h5 className="font-bold mb-2">Get All Todos</h5>
              <CodeExample
                code={`curl http://localhost:8000/api/todos`}
                language="bash"
                explanation=""
                compact
              />
            </div>
          </div>

          {/* 3. Filter Todos */}
          <div className="flex items-start gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"
              }`}
            >
              3
            </div>
            <div className="flex-1">
              <h5 className="font-bold mb-2">Filter Todos</h5>
              <CodeExample
                code={`curl "http://localhost:8000/api/todos?status=pending&search=important"`}
                language="bash"
                explanation=""
                compact
              />
            </div>
          </div>

          {/* 4. Update Todo */}
          <div className="flex items-start gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"
              }`}
            >
              4
            </div>
            <div className="flex-1">
              <h5 className="font-bold mb-2">Update a Todo</h5>
              <CodeExample
                code={`curl -X PUT http://localhost:8000/api/todos/1 \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Updated Todo",
    "status": "completed"
  }'`}
                language="bash"
                explanation=""
              />
            </div>
          </div>

          {/* 5. Bulk Update */}
          <div className="flex items-start gap-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                darkMode ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-600"
              }`}
            >
              5
            </div>
            <div className="flex-1">
              <h5 className="font-bold mb-2">Bulk Update Todos</h5>
              <CodeExample
                code={`curl -X PATCH http://localhost:8000/api/todos/bulk-status \\
  -H "Content-Type: application/json" \\
  -d '{
    "todo_ids": [1, 2, 3],
    "status": "completed"
  }'`}
                language="bash"
                explanation=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
