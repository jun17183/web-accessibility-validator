import { Element, HTMLSuggestion } from 'utils/types'

export const aValidator = (suggestion: HTMLSuggestion) => {
  let hasProblem = false;
  const node = suggestion.getNode() as Element;
  const suggestionNode = suggestion.getSuggestionNode() as Element;

  if (node.name !== 'a') return;

  // a 태그에 href 속성이 존재하지 않는 경우
  if (!hasHref(node)) {
    hasProblem = true;
    suggestionNode.attribs['href'] = '#';
    suggestion.addDescription(`
      The <a> tag should always include a 'href' attribute.
    `);
  }
}

const hasHref = (node: Element): boolean => {
  if (!node.attribs.hasOwnProperty('href')) return false;
  return true;
}
