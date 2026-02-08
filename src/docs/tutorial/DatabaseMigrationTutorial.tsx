import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle,
} from "lucide-react";
import CodeExample from "@/components/CodeExample";

export default function DatabaseMigrationTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
      <div
        className={`mb-8 p-6 rounded-2xl ${
          darkMode
            ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
            : "bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200"
        }`}
      >
        <div className="flex items-start gap-4">
          <div>
            <p
              className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-600"}`}
            >
              Use Juice CLI to create a migration:
            </p>
          </div>
        </div>

        <CodeExample
            code={` $ php juice make:migration create_todos_table`}
            language="bash"
            explanation=""
            compact={true}
        />
      </div>

      <CodeExample
        code={`<?php
use Luxid\Database\Database;

class m00002_create_todos_table
{
    public function apply(): void
    {
        $db = \Luxid\Foundation\Application::$app->db;

        $sql = "CREATE TABLE IF NOT EXISTS \`todos\` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_status (status),
            INDEX idx_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";

        try {
            $db->pdo->exec($sql);
            echo "Table 'todos' created successfully\n";
        } catch (\Exception $e) {
            throw new \Exception("Migration failed: " . $e->getMessage());
        }
    }

    public function down(): void
    {
        $db = \Luxid\Foundation\Application::$app->db;

        $sql = "DROP TABLE IF EXISTS \`todos\`";

        try {
            $db->pdo->exec($sql);
            echo "Table 'todos' dropped successfully\n";
        } catch (\Exception $e) {
            throw new \Exception("Rollback failed: " . $e->getMessage());
        }
    }
}`}
        title="migrations/m00002_create_todos_table.php"
        explanation=""
      />

    <ul className="mt-4 space-y-3">
        <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>apply():</strong>{" "}
            Defines the changes to apply to the database schema.
            This method is executed when you run
            <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                php juice db:migrate
            </code>{" "}
            and is typically used to create or modify tables.
            </span>
        </li>

        <li className="flex items-start gap-3">
            <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
            <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
            <strong>down():</strong>{" "}
            Defines how to reverse the migration.
            This method is executed during a rollback and should undo
            whatever was done in <strong>apply()</strong>
            (for example, dropping a table).
            </span>
        </li>
    </ul>

    <CodeExample
        code={` $ php juice db:migrate`}
        language="bash"
        explanation="Run the migration"
        compact={true}
    />
    </>
  );
}

