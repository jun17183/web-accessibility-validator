import { HTMLSuggestion, Text } from 'utils/types'

export const xssValidator = (suggestion: HTMLSuggestion) => {
  let hasProblem = false;
  const node = suggestion.getNode() as Text;
  const suggestionNode = suggestion.getSuggestionNode() as Text;

  // text에 '<'나 '>'가 존재할 경우
  if (hasLtGt(node)) {
    hasProblem = true;
    suggestionNode.data = suggestionNode.data.replaceAll('<', '&lt;');
    suggestionNode.data = suggestionNode.data.replaceAll('>', '&gt;');
    suggestion.addDescription(`
      To prevent XSS (Cross-Site Scripting) attacks, use '&lt;' and '&gt;' instead of '<' and '>' in text.
    `);
  }
}

const hasLtGt = (node: Text): boolean => {
  if (!node.data.includes('<') && !node.data.includes('>')) return false;
  return true;
}
