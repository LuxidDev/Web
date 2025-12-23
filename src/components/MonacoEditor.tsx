// src/components/MonacoEditor.tsx
import React from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

interface MonacoEditorProps {
  code: string;
  language: 'php' | 'html' | 'javascript' | 'nova';
  darkMode?: boolean;
  height?: string;
  readOnly?: boolean;
  className?: string;
  showLineNumbers?: boolean;
  minimap?: boolean;
}

export default function MonacoEditor({
  code,
  language,
  darkMode = false,
  height = '400px',
  readOnly = true,
  className = '',
  showLineNumbers = true,
  minimap = false
}: MonacoEditorProps) {
  // Map custom language to Monaco language
  const monacoLanguage = language === 'nova' ? 'html' : language;

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Add PHP language configuration if needed
    if (monacoLanguage === 'php') {
      // Register PHP language features
      monaco.languages.register({ id: 'php' });

      // Set PHP-specific options
      editor.updateOptions({
        tabSize: 4,
        insertSpaces: true,
      });
    }

    // Add custom styling
    editor.updateOptions({
      padding: { top: 16, bottom: 16 },
      scrollbar: {
        vertical: 'hidden',
        horizontal: 'hidden',
        useShadows: false,
        verticalScrollbarSize: 0,
        horizontalScrollbarSize: 0
      },
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,
      glyphMargin: false,
      renderWhitespace: 'none',
      wordWrap: 'on',
      lineNumbers: showLineNumbers ? 'on' : 'off',
      lineNumbersMinChars: 3,
      renderLineHighlight: darkMode ? 'line' : 'all',
      folding: true,
      minimap: { enabled: minimap },
      scrollBeyondLastLine: false,
      fontSize: 14,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Menlo', 'Monaco', 'Courier New', monospace",
      automaticLayout: true,
    });

    // Customize theme colors for better PHP syntax highlighting
    monaco.editor.defineTheme('custom-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'keyword.php', foreground: '#0000FF' },
        { token: 'string.php', foreground: '#A31515' },
        { token: 'comment.php', foreground: '#008000', fontStyle: 'italic' },
        { token: 'variable.php', foreground: '#001080' },
        { token: 'type.php', foreground: '#267F99' },
        { token: 'number.php', foreground: '#098658' },
        { token: 'delimiter.php', foreground: '#000000' },
      ],
      colors: {
        'editor.background': '#fffffe',
        'editor.foreground': '#000000',
        'editor.lineHighlightBackground': '#f8f9fa',
        'editorLineNumber.foreground': '#999',
        'editorLineNumber.activeForeground': '#666',
      }
    });

    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword.php', foreground: '#569CD6' },
        { token: 'string.php', foreground: '#CE9178' },
        { token: 'comment.php', foreground: '#6A9955', fontStyle: 'italic' },
        { token: 'variable.php', foreground: '#9CDCFE' },
        { token: 'type.php', foreground: '#4EC9B0' },
        { token: 'number.php', foreground: '#B5CEA8' },
        { token: 'delimiter.php', foreground: '#D4D4D4' },
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2d2e',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6',
      }
    });

    // Set the custom theme
    monaco.editor.setTheme(darkMode ? 'custom-dark' : 'custom-light');
  };

  return (
    <div className={`rounded-lg overflow-hidden ${className}`}>
      <Editor
        height={height}
        language={monacoLanguage}
        value={code}
        theme={darkMode ? 'custom-dark' : 'custom-light'}
        onMount={handleEditorDidMount}
        options={{
          readOnly,
          minimap: { enabled: minimap },
          scrollBeyondLastLine: false,
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Menlo', 'Monaco', 'Courier New', monospace",
          wordWrap: 'on',
          lineNumbers: showLineNumbers ? 'on' : 'off',
          folding: true,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 3,
          renderLineHighlight: darkMode ? 'line' : 'all',
          automaticLayout: true,
          scrollbar: {
            vertical: 'hidden',
            horizontal: 'hidden',
            verticalScrollbarSize: 0,
            horizontalScrollbarSize: 0
          },
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
          glyphMargin: false,
          renderWhitespace: 'none',
          suggestOnTriggerCharacters: false,
          acceptSuggestionOnEnter: 'off',
          tabCompletion: 'off',
          wordBasedSuggestions: false,
          parameterHints: { enabled: false },
          quickSuggestions: false,
          suggest: { showProperties: false },
          links: false,
          contextmenu: false,
          formatOnPaste: false,
          formatOnType: false,
          selectionHighlight: false,
          occurrencesHighlight: false,
        }}
      />
    </div>
  );
}
