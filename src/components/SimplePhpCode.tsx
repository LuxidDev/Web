import React from 'react';
import { Copy, Check } from 'lucide-react';

interface SimplePhpCodeProps {
  code: string;
  darkMode?: boolean;
}

export default function SimplePhpCode({ code, darkMode = false }: SimplePhpCodeProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format the code with proper syntax highlighting classes
  const formatCode = (code: string) => {
    return code
      .replace(/\$/g, '<span class="php-variable">$</span>')
      .replace(/(\/\/.*$)/gm, '<span class="php-comment">$1</span>')
      .replace(/\b(User|Post|Profile)\b/g, '<span class="php-class">$1</span>')
      .replace(/\b(all|find|where|get|with|query|whereHas|orderBy|paginate)\b/g, '<span class="php-method">$1</span>')
      .replace(/\b(active|published|created_at|role|admin)\b/g, '<span class="php-property">$1</span>');
  };

  return (
    <div className={`relative rounded-lg overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`flex items-center justify-between px-4 py-3 border-b ${
        darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-300 bg-gray-100'
      }`}>
        <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          PHP
        </span>
        <button
          onClick={handleCopy}
          className={`p-1.5 rounded-md transition-colors ${
            darkMode
              ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
              : 'hover:bg-gray-200 text-gray-600 hover:text-black'
          }`}
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className={`m-0 font-mono text-sm leading-relaxed ${
          darkMode ? 'text-gray-300' : 'text-gray-800'
        }`}>
          <code
            className="block"
            dangerouslySetInnerHTML={{ __html: formatCode(code) }}
          />
        </pre>
      </div>
    </div>
  );
}
