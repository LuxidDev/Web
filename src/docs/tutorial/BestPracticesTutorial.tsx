import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Zap,
  Code,
  ArrowRight,
  CheckCircle,
  Terminal,
  Server,
} from "lucide-react";
import CodeExample from "@/components/CodeExample";

export default function BestPracticesTutorial() {
  const { darkMode } = useTheme();

  return (
    <>
        <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
                <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
                <strong>Validation: </strong>
                Always validate input data in your Entity's
                <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                rules()
                </code>{" "}
                  method
                </span>
            </li>

            <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
                <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
                <strong>Error Handling: </strong>
                Use
                <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                response(){"->"}error()
                </code>{" "}
                  for consistent error responses
                </span>
            </li>

            <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
                <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
                <strong>Status Codes: </strong>
                Return appropriate HTTP status codes
                <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                (200, 201, 400, 404, 422, 500)
                </code>{" "}
                </span>
            </li>

            <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
                <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
                <strong>Security: </strong>
                Never trust user input - always sanitize through validation
                </span>
            </li>

            <li className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
                <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
                <strong>API Responses: </strong>
                Keep responses consistent with
                <code className={`font-mono px-2 py-1 rounded ${darkMode ? "bg-zinc-800/50 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                success()
                </code>{" "}
                  helper
                </span>
            </li>
        </ul>
    </>
  );
}

