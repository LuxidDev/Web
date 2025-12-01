export const highlightCode = (code: string, language: string): { __html: string } => {
  try {
    if (language === 'php') {
      return { __html: highlightPHP(code) };
    } else if (language === 'nova') {
      return { __html: highlightNova(code) };
    } else {
      return { __html: escapeHtml(code) };
    }
  } catch (error) {
    console.error(`Error highlighting ${language} code:`, error);
    return { __html: escapeHtml(code) };
  }
};

function highlightPHP(code: string): string {
  // First escape the HTML
  let highlighted = escapeHtml(code);

  // Apply highlighting in order of specificity
  highlighted = highlighted
    // Multi-line comments (do this first)
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token comment">$1</span>')
    // Single line comments
    .replace(/(\/\/.*$)/gm, '<span class="token comment">$1</span>')
    // PHP tags
    .replace(/(&lt;\?php|&lt;\?|\?&gt;)/g, '<span class="token keyword">$1</span>')
    // Strings (single and double quoted)
    .replace(/('([^'\\]|\\.)*'|"([^"\\]|\\.)*")/g, '<span class="token string">$1</span>')
    // Keywords
    .replace(/\b(namespace|use|class|function|public|private|protected|return|if|else|foreach|as|new|extends|implements|interface|abstract|final|static|const)\b/g, '<span class="token keyword">$1</span>')
    // Classes (capitalized words)
    .replace(/\b([A-Z][a-zA-Z0-9_]*)\b/g, '<span class="token class-name">$1</span>')
    // Functions (words before parentheses)
    .replace(/([a-zA-Z_][a-zA-Z0-9_]*)\(/g, '<span class="token function">$1</span>(')
    // Variables
    .replace(/(\$[a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="token variable">$1</span>')
    // Numbers
    .replace(/\b(\d+)\b/g, '<span class="token number">$1</span>')
    // Constants
    .replace(/\b(true|false|null)\b/g, '<span class="token constant">$1</span>');

  return highlighted;
}

function highlightNova(code: string): string {
  // First escape the HTML
  let highlighted = escapeHtml(code);

  // Apply highlighting in order of specificity
  highlighted = highlighted
    // Comments {{-- --}} (do this first)
    .replace(/(\{\{--[\s\S]*?--\}\})/g, '<span class="token comment">$1</span>')
    // Directives @
    .replace(/(@[a-zA-Z_][a-zA-Z0-9_]*)/g, '<span class="token directive">$1</span>')
    // Variables {{ }}
    .replace(/(\{\{[^}]*\}\})/g, '<span class="token variable">$1</span>')
    // HTML tags - simplified approach
    .replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9-]*)(?:\s|&gt;)/g, '$1<span class="token tag">$2</span>')
    // Self-closing tags
    .replace(/(&lt;\/?[a-zA-Z][a-zA-Z0-9-]*\s*\/?&gt;)/g, '<span class="token tag">$1</span>')
    // Simple attribute highlighting
    .replace(/(\s)([a-zA-Z-]+)=/g, '$1<span class="token attr-name">$2</span>=')
    // Attribute values
    .replace(/="([^"]*)"/g, '="<span class="token string">$1</span>"');

  return highlighted;
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
