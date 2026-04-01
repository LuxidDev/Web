import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import CodeExample from "@/components/CodeExample";
import InlineCodeExample from "@/components/InlineCodeExample";

export default function TestYourAPITutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      {/* Start Server Section */}
      <div
        className={`mb-8 p-6 rounded-2xl ${darkMode
          ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
          : "bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200"
          }`}
      >
        <div className="flex items-start gap-4">
          <div>
            <h3 className="text-2xl font-bold mb-2">Luxid Todo API – Test Endpoints Guide</h3>
            <p className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
              Test your Todo API using curl commands or Postman. Follow this guide to verify all endpoints are working correctly.
            </p>
          </div>
        </div>
      </div>

      {/* Starting the Server */}
      <div className={`mb-8 p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <h3 className="text-xl font-bold mb-4">Starting the Server</h3>
        <p className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
          First, let's start the server. Make sure you're in your Luxid project directory:
        </p>

        <InlineCodeExample
          code={`php juice start`}
          language="bash"
          title="Start Luxid Server"
          description="Starts the development server at http://localhost:8000"
          compact={true}
        />
      </div>

      {/* Postman Test Guide */}
      <div className={`my-8 p-6 rounded-xl ${darkMode ? "bg-zinc-900 border border-zinc-800" : "bg-zinc-100 border border-zinc-300"}`}>
        <h3 className="text-xl font-bold mb-6">Postman Test Guide</h3>

        <div className="space-y-8">
          {/* 1. Create Todo */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold">1. POST /api/todos — Create a new todo</h4>
            <CodeExample
              code={`curl -X POST http://localhost:8000/api/todos \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Learn Luxid Framework",
    "description": "Build a complete Todo API to understand how Luxid works",
    "status": "pending"
  }'`}
              language="bash"
              title="Create Todo Request"
              explanation="Create your first todo item"
            />

            <CodeExample
              code={`{
  "success": true,
  "message": "Success",
  "data": {
    "todo": {
      "id": 1,
      "title": "Learn Luxid Framework",
      "description": "Build a complete Todo API to understand how Luxid works",
      "status": "pending",
      "created_at": "2024-01-15 10:30:00",
      "updated_at": "2024-01-15 10:30:00"
    },
    "message": "Todo created successfully"
  }
}`}
              language="json"
              title="Expected Response (201 Created)"
              explanation="Successful todo creation returns the created todo with auto-generated timestamps"
            />

            <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"} mt-2`}>
              <strong>Create a few more todos for testing:</strong>
            </p>
            <div className="space-y-2">
              <CodeExample
                code={`{
  "title": "Build Todo App",
  "description": "Create a frontend for the Todo API",
  "status": "in_progress"
}`}
                language="json"
                title="Todo 2"
                compact={true}
              />
              <CodeExample
                code={`{
  "title": "Write Documentation",
  "description": "Document the Luxid framework features",
  "status": "pending"
}`}
                language="json"
                title="Todo 3"
                compact={true}
              />
              <CodeExample
                code={`{
  "title": "Add Authentication",
  "description": "Implement JWT auth for the API",
  "status": "completed"
}`}
                language="json"
                title="Todo 4"
                compact={true}
              />
            </div>
          </div>

          {/* 2. Get All Todos */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold">2. GET /api/todos — List all todos</h4>
            <InlineCodeExample
              code={`curl http://localhost:8000/api/todos`}
              language="bash"
              title="Get All Todos"
              description=""
              compact={true}
            />

            <CodeExample
              code={`{
  "success": true,
  "message": "Success",
  "data": {
    "todos": [
      {
        "id": 1,
        "title": "Learn Luxid Framework",
        "description": "Build a complete Todo API...",
        "status": "pending",
        "created_at": "2024-01-15 10:30:00",
        "updated_at": "2024-01-15 10:30:00"
      }
    ],
    "count": 4,
    "total": 4,
    "filters": {
      "status": null,
      "search": null
    },
    "meta": {
      "valid_statuses": ["pending", "in_progress", "completed"]
    }
  }
}`}
              language="json"
              title="Expected Response"
              explanation="Returns all todos with pagination metadata and available filters"
            />

            <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"} mt-2`}>
              <strong>With Query Parameters:</strong>
            </p>
            <div className="space-y-1">
              <InlineCodeExample code={`curl "http://localhost:8000/api/todos?status=pending"`} language="bash" title="" description="Filter by status" compact={true} />
              <InlineCodeExample code={`curl "http://localhost:8000/api/todos?search=learn"`} language="bash" title="" description="Search by keyword" compact={true} />
              <InlineCodeExample code={`curl "http://localhost:8000/api/todos?status=pending&search=documentation"`} language="bash" title="" description="Combine filters" compact={true} />
            </div>
          </div>

          {/* 3. Get Single Todo */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold">3. GET /api/todos/{'{id}'} — Get single todo</h4>
            <InlineCodeExample
              code={`curl http://localhost:8000/api/todos/1`}
              language="bash"
              title="Get Todo by ID"
              description=""
              compact={true}
            />

            <CodeExample
              code={`{
  "success": true,
  "message": "Success",
  "data": {
    "todo": {
      "id": 1,
      "title": "Learn Luxid Framework",
      "description": "Build a complete Todo API to understand how Luxid works",
      "status": "pending",
      "created_at": "2026-01-25 16:24:46",
      "updated_at": "2026-01-25 16:24:46"
    }
  }
}`}
              language="json"
              title="Expected Response"
              explanation="Returns a single todo by ID"
            />

            <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"} mt-2`}>
              <strong>Error Case (Non-existent ID):</strong>
            </p>
            <InlineCodeExample
              code={`curl http://localhost:8000/api/todos/999`}
              language="bash"
              title="Not Found"
              description=""
              compact={true}
            />
            <CodeExample
              code={`{
  "success": false,
  "message": "Todo with ID 999 not found",
  "errors": null
}`}
              language="json"
              title="Expected Response (404 Not Found)"
              explanation="Returns 404 when todo doesn't exist"
            />
          </div>

          {/* 4. Update Todo */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold">4. PUT /api/todos/{'{id}'} — Update todo</h4>
            <CodeExample
              code={`curl -X PUT http://localhost:8000/api/todos/1 \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Learn Luxid Framework - Updated",
    "status": "in_progress"
  }'`}
              language="bash"
              title="Update Todo"
              explanation="Update title and status"
            />

            <CodeExample
              code={`{
  "success": true,
  "message": "Success",
  "data": {
    "todo": {
      "id": 1,
      "title": "Learn Luxid Framework - Updated",
      "description": "Build a complete Todo API to understand how Luxid works",
      "status": "in_progress",
      "created_at": "2024-01-15 10:30:00",
      "updated_at": "2024-01-15 10:35:00"
    },
    "message": "Todo updated successfully"
  }
}`}
              language="json"
              title="Expected Response"
              explanation="Returns the updated todo with refreshed updated_at timestamp"
            />

            <p className={`text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"} mt-2`}>
              <strong>Validation Error Test:</strong>
            </p>
            <CodeExample
              code={`curl -X PUT http://localhost:8000/api/todos/1 \\
  -H "Content-Type: application/json" \\
  -d '{"status": "invalid_status"}'`}
              language="bash"
              title="Invalid Status"
              compact={true}
            />
            <CodeExample
              code={`{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "status": ["Status must be one of: pending, in_progress, completed"]
  }
}`}
              language="json"
              title="Expected Response (422 Validation Error)"
              explanation="Returns validation errors when invalid data is provided"
            />
          </div>

          {/* 5. Delete Todo */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold">5. DELETE /api/todos/{'{id}'} — Delete todo</h4>
            <InlineCodeExample
              code={`curl -X DELETE http://localhost:8000/api/todos/4`}
              language="bash"
              title="Delete Todo"
              description=""
              compact={true}
            />

            <CodeExample
              code={`{
  "success": true,
  "message": "Success",
  "data": {
    "message": "Todo deleted successfully",
    "id": 4
  }
}`}
              language="json"
              title="Expected Response"
              explanation="Confirms successful deletion with the deleted ID"
            />
          </div>

          {/* 6. Bulk Update */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold">6. PATCH /api/todos/bulk-status — Bulk update</h4>
            <CodeExample
              code={`curl -X PATCH http://localhost:8000/api/todos/bulk-status \\
  -H "Content-Type: application/json" \\
  -d '{
    "todo_ids": [1, 2, 3],
    "status": "completed"
  }'`}
              language="bash"
              title="Bulk Update"
              explanation="Update multiple todos at once"
            />

            <CodeExample
              code={`{
  "success": true,
  "message": "Success",
  "data": {
    "message": "Updated 3 todos",
    "updated_count": 3,
    "failed_ids": [],
    "status": "completed"
  }
}`}
              language="json"
              title="Expected Response"
              explanation="Returns statistics about the bulk update operation"
            />
          </div>
        </div>
      </div>

      {/* Advanced Testing Scenarios */}
      <div className={`my-8 p-6 rounded-xl ${darkMode ? 'bg-purple-900/20 border border-purple-800' : 'bg-purple-50 border border-purple-200'}`}>
        <h3 className="text-xl font-bold mb-4">Advanced Testing Scenarios</h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold mb-2">Filtering with Query Parameters</h4>
            <div className="space-y-1">
              <InlineCodeExample code={`curl "http://localhost:8000/api/todos?status=completed"`} language="bash" title="" description="Get completed todos" compact={true} />
              <InlineCodeExample code={`curl "http://localhost:8000/api/todos?search=Luxid"`} language="bash" title="" description="Search for Luxid" compact={true} />
              <InlineCodeExample code={`curl "http://localhost:8000/api/todos?status=pending&search=documentation"`} language="bash" title="" description="Combine filters" compact={true} />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Testing Validation Rules</h4>
            <div className="space-y-3">
              <div>
                <p className={`text-sm mb-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Test 1: Title too short</p>
                <CodeExample code={`{
  "title": "A",
  "description": "Test",
  "status": "pending"
}`} language="json" title="Invalid Title" compact={true} />
              </div>
              <div>
                <p className={`text-sm mb-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Test 2: Missing required field</p>
                <CodeExample code={`{
  "description": "No title provided"
}`} language="json" title="Missing Title" compact={true} />
              </div>
              <div>
                <p className={`text-sm mb-1 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>Test 3: Invalid status value</p>
                <CodeExample code={`{
  "title": "Valid Title",
  "status": "invalid_status"
}`} language="json" title="Invalid Status" compact={true} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Testing Edge Cases</h4>
            <ul className={`space-y-2 text-sm ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              <li>• <strong>Empty Database:</strong> GET /api/todos should return an empty array</li>
              <li>• <strong>Invalid Route:</strong> GET /api/nonexistent should return 404</li>
              <li>• <strong>Wrong Method:</strong> POST to a GET route should return 404</li>
              <li>• <strong>Malformed JSON:</strong> Should be handled gracefully with proper error response</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Postman Collection Setup */}
      <div className={`my-8 p-6 rounded-xl ${darkMode ? 'bg-cyan-900/20 border border-cyan-800' : 'bg-cyan-50 border border-cyan-200'}`}>
        <h3 className="text-xl font-bold mb-4">Postman Collection Setup</h3>

        <p className={`mb-4 ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}>
          Create a new Postman collection called <strong>"Luxid Todo API"</strong> with the following folders:
        </p>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold mb-2">1. Todo CRUD Operations</h4>
            <ul className={`space-y-1 text-sm ml-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              <li>• Create Todo — <code className="font-mono">POST /api/todos</code></li>
              <li>• List Todos — <code className="font-mono">GET /api/todos</code></li>
              <li>• Get Single Todo — <code className="font-mono">GET /api/todos/{'{id}'}</code></li>
              <li>• Update Todo — <code className="font-mono">PUT /api/todos/{'{id}'}</code></li>
              <li>• Delete Todo — <code className="font-mono">DELETE /api/todos/{'{id}'}</code></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">2. Bulk Operations</h4>
            <ul className={`space-y-1 text-sm ml-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              <li>• Bulk Update Status — <code className="font-mono">PATCH /api/todos/bulk-status</code></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">3. Utility Endpoints</h4>
            <ul className={`space-y-1 text-sm ml-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              <li>• Health Check — <code className="font-mono">GET /api/health</code></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">4. Filtering & Search</h4>
            <ul className={`space-y-1 text-sm ml-4 ${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>
              <li>• Filter by Status — <code className="font-mono">GET /api/todos?status=completed</code></li>
              <li>• Search Todos — <code className="font-mono">GET /api/todos?search=learn</code></li>
              <li>• Combined Filter — <code className="font-mono">GET /api/todos?status=pending&search=work</code></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Success Checklist */}
      <div className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'}`}>
        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
          ✅ Success Checklist
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>Server starts successfully</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>Can create a todo (POST)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>Can list todos (GET)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>Can filter todos by status and search</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>Can get a single todo</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>Can update a todo</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>Can delete a todo</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>Bulk update works correctly</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>Validation errors are handled</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span className={`text-sm ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}>404 responses for non-existent resources</span>
          </div>
        </div>
      </div>
    </>
  );
}
