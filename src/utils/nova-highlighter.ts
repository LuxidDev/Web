export const highlightNova = (code: string, darkMode: boolean): string => {
  const colors = {
    comment: darkMode ? '#6A9955' : '#008000',
    directive: darkMode ? '#c586c0' : '#0000ff',
    variable: darkMode ? '#9cdcfe' : '#001080',
    string: darkMode ? '#ce9178' : '#a31515',
    punctuation: darkMode ? '#d4d4d4' : '#393a34',
    tag: darkMode ? '#569cd6' : '#800000',
    attribute: darkMode ? '#9cdcfe' : '#ff0000',
    text: darkMode ? '#d4d4d4' : '#1e1e1e',
  };

  return code
    // Handle comments {{-- --}}
    .replace(/(\{\{--[\s\S]*?--\}\})/g, `<span style="color: ${colors.comment}; font-style: italic">$1</span>`)

    // Handle directives @extend, @section, etc.
    .replace(/(@\w+)/g, `<span style="color: ${colors.directive}">$1</span>`)

    // Handle variables {{ $var }}
    .replace(/(\{\{[\s\S]*?\}\})/g, `<span style="color: ${colors.variable}">$1</span>`)

    // Handle HTML tags <div>, etc.
    .replace(/(&lt;\/?)(\w+)/g, `$1<span style="color: ${colors.tag}">$2</span>`)

    // Handle attributes class="something"
    .replace(/(\s+\w+)=/g, ` <span style="color: ${colors.attribute}">$1</span>=`)

    // Handle attribute values
    .replace(/="([^"]*)"/g, `="<span style="color: ${colors.string}">$1</span>"`);
};
