import { Element, HTMLSuggestion } from 'utils/types'

export const frameValidator = (suggestion: HTMLSuggestion) => {
  let hasProblem = false;
  const node = suggestion.getNode() as Element;
  const suggestionNode = suggestion.getSuggestionNode() as Element;

  if (node.name !== 'frame' && node.name !== 'iframe') return;

  // frame, iframe 태그에 title 속성이 존재하지 않는 경우
  if (!hasTitle(node)) {
    hasProblem = true;
    suggestionNode.attribs['title'] = 'my frame';
    suggestion.addDescription(`
      The <frame> and <iframe> tag should always include a 'title' attribute.
    `);
  }
}

const hasTitle = (node: Element): boolean => {
  if (!node.attribs.hasOwnProperty('title')) return false;
  return true;
}              
