import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  CheckCircle,
} from "lucide-react";

export default function UnderstandingSEATutorial() {
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
                    Understanding the SEA Architecture
                </h3>
                <p
                    className={`text-lg ${darkMode ? "text-zinc-300" : "text-zinc-700"}`}
                >
                    Luxid uses a unique SEA architecture:
                </p>

                 <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3">
                        <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
                        <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
                        <strong>Screens (Views):</strong> Your frontend templates
                        <code className="mx-1">(.nova.php)</code> files
                        </span>
                    </li>

                    <li className="flex items-start gap-3">
                        <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
                        <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
                        <strong>Entities (Models):</strong> Your data models using the Active
                        Record pattern
                        </span>
                    </li>

                    <li className="flex items-start gap-3">
                        <CheckCircle className="mt-1 h-5 w-5 text-cyan-500 flex-shrink-0" />
                        <span className={darkMode ? "text-zinc-300" : "text-zinc-700"}>
                        <strong>Actions (Controllers):</strong> Handle HTTP requests and business
                        logic
                        </span>
                    </li>
                 </ul>

                    <p
                    className={`mt-6 text-base ${
                        darkMode ? "text-zinc-300" : "text-zinc-700"
                    }`}
                    >
                    For our <strong>headless API</strong>, we’ll focus mainly on
                    <strong> Entities</strong> and <strong>Actions</strong>.
                    </p>
                </div>
            </div>
        </div>
    </>
  );
}
