import { Element, HTMLSuggestion } from 'utils/types'

export const htmlValidator = (suggestion: HTMLSuggestion) => {
  let hasProblem = false;
  const node = suggestion.getNode() as Element;
  const suggestionNode = suggestion.getSuggestionNode() as Element;

  if (node.name !== 'html') return;

  // html 태그에 lang 속성이 존재하지 않는 경우
  if (!hasLang(node)) {
    hasProblem = true;
    suggestionNode.attribs['lang'] = 'en';
    suggestionNode.children = undefined;
    suggestion.addDescription(`
      The <html> tag should always include a 'lang' attribute.
    `);
  }
}

const hasLang = (node: Element): boolean => {
  if (!node.attribs.hasOwnProperty('lang')) return false;
  return true;
}
