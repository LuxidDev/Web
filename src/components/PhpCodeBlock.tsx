import React from 'react';
import MonacoEditor from './MonacoEditor';

interface PhpCodeBlockProps {
  code: string;
  darkMode?: boolean;
  height?: string;
}

export default function PhpCodeBlock({ code, darkMode = false, height = '300px' }: PhpCodeBlockProps) {
  // Escape the PHP code properly
  const escapedCode = code.replace(/\\\$/g, '\\\\$').replace(/\$/g, '\\$');

  return (
    <MonacoEditor
      code={escapedCode}
      language="php"
      darkMode={darkMode}
      height={height}
      readOnly={true}
      showLineNumbers={true}
      minimap={false}
    />
  );
}
