import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import CodeExample from "@/components/CodeExample";

export default function QuickReferenceCommands() {
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
              Use Juice CLI for rapid development:
            </h3>
          </div>
        </div>
        <CodeExample
          code={`# Create everything automatically
php juice make:todo

# Or create components individually
php juice make:action TodoAction
php juice make:entity Todo
php juice make:migration create_todos_table

# Database operations
php juice db:migrate
php juice db:status

# Development
php juice start
php juice routes
        `}
          language="bash"
          explanation=""
          compact={true}
        />
      </div>
    </>
  );
}
