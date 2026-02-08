import React from "react";
import { BookOpen, Copy, Check, ExternalLink } from "lucide-react";
import { docsChapters } from "../content";

interface SidebarNavProps {
  currentDoc: any;
  currentSection?: any;
  darkMode: boolean;
  copiedCommand: string | null;
  onCopyCommand: (command: string) => void;
}

export default function SidebarNav({
  currentDoc,
  currentSection,
  darkMode,
  copiedCommand,
  onCopyCommand,
}: SidebarNavProps) {
  return (
    <div
      className={`sticky top-32 rounded-2xl p-6 ${
        darkMode
          ? "bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl"
          : "bg-zinc-100/80 border border-zinc-300 backdrop-blur-xl"
      }`}
    >
      <h3
        className={`text-lg font-bold mb-6 flex items-center gap-2 ${
          darkMode ? "text-white" : "text-black"
        }`}
      >
        <BookOpen className="w-5 h-5" />
        Chapters
      </h3>

      <div className="space-y-6">
        {docsChapters.map((section) => (
          <div key={section.id}>
            <div className="flex items-center gap-2 mb-3">
              <div
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${section.color}`}
              />
              <h4
                className={`text-sm font-semibold ${
                  darkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                {section.title}
              </h4>
            </div>

            <div className="space-y-1 pl-4">
              {section.chapters.map((chapter) => {
                const isActive = window.location.pathname === chapter.path;

                return (
                  <a
                    key={chapter.id}
                    href={chapter.path}
                    className={`block py-2 px-3 rounded-lg text-sm transition-all ${
                      isActive
                        ? darkMode
                          ? "bg-white/10 text-white"
                          : "bg-zinc-200 text-black"
                        : darkMode
                          ? "text-zinc-500 hover:text-white hover:bg-white/5"
                          : "text-zinc-600 hover:text-black hover:bg-zinc-100"
                    }`}
                  >
                    {chapter.title}

                    {chapter.quickStart && (
                      <span
                        className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                          darkMode
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        Start
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicator */}
      <div
        className={`mt-6 pt-6 border-t ${
          darkMode ? "border-zinc-800" : "border-zinc-300"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-sm ${
              darkMode ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            Progress
          </span>
          <span className="text-sm font-medium">25%</span>
        </div>

        <div
          className={`h-2 rounded-full ${
            darkMode ? "bg-zinc-800" : "bg-zinc-300"
          }`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
            style={{ width: "25%" }}
          />
        </div>

        <p
          className={`text-xs mt-2 ${
            darkMode ? "text-zinc-500" : "text-zinc-600"
          }`}
        >
          {currentSection?.title} • {currentDoc?.title}
        </p>
      </div>

      {/* Popular Topics */}
      <div
        className={`mt-4 pt-4 border-t ${
          darkMode ? "border-zinc-800" : "border-zinc-300"
        }`}
      >
        <h4
          className={`text-sm font-semibold mb-2 ${
            darkMode ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          Popular Topics
        </h4>

        <div className="space-y-1">
          <a
            href="/docs/first-app"
            className="block text-sm text-blue-500 hover:text-blue-400"
          >
            → Build Todo API
          </a>
          <a
            href="/docs/make-commands"
            className="block text-sm text-blue-500 hover:text-blue-400"
          >
            → Code Generation
          </a>
          <a
            href="/docs/authentication"
            className="block text-sm text-blue-500 hover:text-blue-400"
          >
            → User Authentication
          </a>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        className={`mt-6 pt-6 border-t ${
          darkMode ? "border-zinc-800" : "border-zinc-300"
        }`}
      >
        <h4
          className={`text-sm font-semibold mb-3 ${
            darkMode ? "text-zinc-400" : "text-zinc-600"
          }`}
        >
          Quick Actions
        </h4>

        <div className="space-y-2">
          <button
            onClick={() =>
              onCopyCommand("composer create-project luxid/framework myapp")
            }
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
              darkMode
                ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
                : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700 hover:text-black"
            }`}
          >
            <span className="font-mono">composer create-project...</span>
            {copiedCommand ===
            "composer create-project luxid/framework myapp" ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>

          <a
            href="https://github.com/luxid/framework"
            target="_blank"
            className={`w-full flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
              darkMode
                ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white"
                : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700 hover:text-black"
            }`}
          >
            <span>Star on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
