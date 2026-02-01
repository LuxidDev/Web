import React, { useState, useEffect, useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

interface MonacoEditorProps {
  code: string;
  language: "php" | "html" | "javascript" | "nova" | "bash";
  darkMode?: boolean;
  height?: string | "auto";
  readOnly?: boolean;
  className?: string;
  minimap?: boolean;
  maxHeight?: string;
}

export default function MonacoEditor({
  code,
  language,
  darkMode = false,
  height = "auto",
  readOnly = true,
  className = "",
  minimap = false,
  maxHeight = "600px",
}: MonacoEditorProps) {
  const [calculatedHeight, setCalculatedHeight] = useState("400px");
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Map custom language to Monaco language
  const monacoLanguage = language === "nova" ? "html" :
                         language === "bash" ? "shell" :
                         language;

  // Calculate height based on lines
  useEffect(() => {
    if (height === "auto") {
      const lines = code.split("\n").length;
      const lineHeight = 19;
      const padding = 32;
      const minHeight = 200;
      const calculated = Math.max(minHeight, lines * lineHeight + padding);
      const finalHeight = Math.min(calculated, parseInt(maxHeight));
      setCalculatedHeight(`${finalHeight}px`);
    } else {
      setCalculatedHeight(height);
    }
  }, [code, height, maxHeight]);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Add PHP language configuration if needed
    if (monacoLanguage === "php") {
      monaco.languages.register({ id: "php" });
      editor.updateOptions({
        tabSize: 4,
        insertSpaces: true,
      });
    }

    // Configure bash/shell language
    if (monacoLanguage === "shell") {
      monaco.languages.register({ id: "shell" });
      editor.updateOptions({
        tabSize: 2,
        insertSpaces: true,
      });
    }

    // Add custom styling with minimal, modern look
    editor.updateOptions({
      padding: { top: 16, bottom: 16 },
      scrollbar: {
        vertical: "hidden",
        horizontal: "hidden",
        useShadows: false,
        verticalScrollbarSize: 0,
        horizontalScrollbarSize: 0,
      },
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,
      glyphMargin: false,
      renderWhitespace: "none",
      wordWrap: "on",
      lineNumbers: "off",
      lineNumbersMinChars: 3,
      renderLineHighlight: "none",
      folding: false,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      fontSize: 14,
      fontFamily:
        "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Menlo', 'Monaco', 'Courier New', monospace",
      automaticLayout: true,
      guides: {
        indentation: false, // This controls indent guides
        bracketPairs: false,
        highlightActiveIndentation: false,
      },
      occurrencesHighlight: "off",
      selectionHighlight: false,
    });

    // Customize theme colors for minimal, modern look
    monaco.editor.defineTheme("custom-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "keyword.php", foreground: "#0000FF" },
        { token: "string.php", foreground: "#A31515" },
        { token: "comment.php", foreground: "#008000", fontStyle: "italic" },
        { token: "variable.php", foreground: "#001080" },
        { token: "type.php", foreground: "#267F99" },
        { token: "number.php", foreground: "#098658" },
        { token: "delimiter.php", foreground: "#000000" },
        // Bash/shell rules
        { token: "keyword.shell", foreground: "#0000FF" },
        { token: "string.shell", foreground: "#A31515" },
        { token: "comment.shell", foreground: "#008000", fontStyle: "italic" },
        { token: "variable.shell", foreground: "#001080" },
        { token: "number.shell", foreground: "#098658" },
      ],
      colors: {
        "editor.background": "#fffffe",
        "editor.foreground": "#000000",
        "editor.lineHighlightBackground": "#f8f9fa",
        "editor.lineHighlightBorder": "#f8f9fa",
        "editorLineNumber.foreground": "#999",
        "editorLineNumber.activeForeground": "#666",
        "editorIndentGuide.background": "#f8f9fa", // Hide indent guides in theme
        "editorIndentGuide.activeBackground": "#f8f9fa", // Hide active indent guides in theme
        "editorCursor.foreground": "#000000",
        "editor.selectionBackground": "#e5e7eb",
        "editor.selectionHighlightBackground": "#f3f4f6",
        "editor.wordHighlightBackground": "#f3f4f6",
        "editor.wordHighlightStrongBackground": "#f3f4f6",
        "editorBracketMatch.background": "#f3f4f6",
        "editorBracketMatch.border": "#f3f4f6",
      },
    });

    monaco.editor.defineTheme("custom-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword.php", foreground: "#569CD6" },
        { token: "string.php", foreground: "#CE9178" },
        { token: "comment.php", foreground: "#6A9955", fontStyle: "italic" },
        { token: "variable.php", foreground: "#9CDCFE" },
        { token: "type.php", foreground: "#4EC9B0" },
        { token: "number.php", foreground: "#B5CEA8" },
        { token: "delimiter.php", foreground: "#D4D4D4" },
        // Bash/shell rules
        { token: "keyword.shell", foreground: "#569CD6" },
        { token: "string.shell", foreground: "#CE9178" },
        { token: "comment.shell", foreground: "#6A9955", fontStyle: "italic" },
        { token: "variable.shell", foreground: "#9CDCFE" },
        { token: "number.shell", foreground: "#B5CEA8" },
      ],
      colors: {
        "editor.background": "#1e1e1e",
        "editor.foreground": "#d4d4d4",
        "editor.lineHighlightBackground": "#2a2d2e",
        "editor.lineHighlightBorder": "#2a2d2e",
        "editorLineNumber.foreground": "#858585",
        "editorLineNumber.activeForeground": "#c6c6c6",
        "editorIndentGuide.background": "#2a2d2e", // Hide indent guides in theme
        "editorIndentGuide.activeBackground": "#2a2d2e", // Hide active indent guides in theme
        "editorCursor.foreground": "#d4d4d4",
        "editor.selectionBackground": "#3c3c3c",
        "editor.selectionHighlightBackground": "#2a2d2e",
        "editor.wordHighlightBackground": "#2a2d2e",
        "editor.wordHighlightStrongBackground": "#2a2d2e",
        "editorBracketMatch.background": "#2a2d2e",
        "editorBracketMatch.border": "#2a2d2e",
      },
    });

    // Set the custom theme
    monaco.editor.setTheme(darkMode ? "custom-dark" : "custom-light");
  };

  return (
    <div
      ref={containerRef}
      className={`rounded-lg overflow-hidden ${className}`}
    >
      <Editor
        height={calculatedHeight}
        language={monacoLanguage}
        value={code}
        theme={darkMode ? "custom-dark" : "custom-light"}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
          fontFamily:
            "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Menlo', 'Monaco', 'Courier New', monospace",
          wordWrap: "on",
          lineNumbers: "off",
          folding: false,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 3,
          renderLineHighlight: "none",
          automaticLayout: true,
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
            verticalScrollbarSize: 0,
            horizontalScrollbarSize: 0,
            alwaysConsumeMouseWheel: false,
          },
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
          glyphMargin: false,
          renderWhitespace: "none",
          suggestOnTriggerCharacters: false,
          acceptSuggestionOnEnter: "off",
          tabCompletion: "off",
          wordBasedSuggestions: "off",
          parameterHints: { enabled: false },
          quickSuggestions: false,
          suggest: { showProperties: false },
          links: false,
          contextmenu: false,
          formatOnPaste: false,
          formatOnType: false,
          selectionHighlight: false,
          occurrencesHighlight: "off",
          guides: {
            indentation: false,
            bracketPairs: false,
            highlightActiveIndentation: false,
          },
          bracketPairColorization: {
            enabled: false,
          },
        }}
      />
    </div>
  );
}
