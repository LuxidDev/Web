import Prism from 'prismjs';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-markup';

// Define Nova as a custom language for PrismJS
if (typeof Prism !== 'undefined') {
  (Prism.languages as any).nova = {
    'comment': /\{\{--[\s\S]*?--\}\}/,
    'keyword': /@\w+/,
    'variable': {
      pattern: /\{\{[^}]*\}\}/,
      inside: {
        'punctuation': /\{\{|\}\}/
      }
    },
    'string': /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    'boolean': /\b(?:true|false)\b/,
    'number': /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    'operator': /[=!<>]=?|[+*/%-]|\b(?:and|or)\b/,
    'punctuation': /[{}[\];(),.:]/
  };
}

export { Prism };
