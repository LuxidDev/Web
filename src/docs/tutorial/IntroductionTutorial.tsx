import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Sparkles,
  Layers,
  Zap,
  Database,
  Terminal,
  Brain,
  Rocket,
  CheckCircle,
} from "lucide-react";
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
    </>
  );
}
