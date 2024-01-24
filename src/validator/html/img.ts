import { Element, HTMLSuggestion } from 'utils/types'

export const imgValidator = (suggestion: HTMLSuggestion) => {
  const node = suggestion.getNode() as Element;
  const suggestionNode = suggestion.getSuggestionNode() as Element;

  if (node.name !== 'img') return;

  // img 태그에 src 속성이 존재하지 않는 경우
  if (!hasSrc(node)) {
    suggestionNode.attribs['src'] = './img.png';
    suggestion.addDescription(`
      The <img> tag should always include a 'src' attribute.
    `);
  }

  // img 태그에 alt 속성이 존재하지 않는 경우
  if (!hasAlt(node)) {
    suggestionNode.attribs['alt'] = 'my image';
    suggestion.addDescription(`
      The <img> tag should always include an 'alt' attribute.
    `);
  }

  // img 태그에 title 속성이 존재하는 경우
  if (hasTitle(node)) {
    delete suggestionNode.attribs['title'];
    suggestion.addDescription(`
      The <img> tag should have an 'alt' attribute, not just a 'title' attribute.
    `);
  }
}

const hasSrc = (node: Element): boolean => {
  if (!node.attribs.hasOwnProperty('src')) return false;
  return true;
}

const hasAlt = (node: Element): boolean => {
  if (!node.attribs.hasOwnProperty('alt')) return false;
  return true;
}

const hasTitle = (node: Element): boolean => {
  if (!node.attribs.hasOwnProperty('title')) return false;
  return true;
} 
