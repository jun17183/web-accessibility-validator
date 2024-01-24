import { Element, HTMLSuggestion } from 'utils/types'

export const tableValidator = (suggestion: HTMLSuggestion) => {
  const node = suggestion.getNode() as Element;
  const suggestionNode = suggestion.getSuggestionNode() as Element;

  if (node.name !== 'table') return;

  // table 태그에 caption이나 summary 속성이 존재하지 않는 경우
  if (!hasCaptionOrSummary(node)) {
    suggestionNode.attribs['caption'] = 'my table';
    suggestion.addDescription(`
      The <table> tag should always include a 'caption' or 'summary' attribute.
      In addition, the 'capture' attribute is recommended because the summary attribute from html5 is non-standard.
    `);
  }
}

const hasCaptionOrSummary = (node: Element): boolean => {
  if (!node.attribs.hasOwnProperty('caption') && !node.attribs.hasOwnProperty('summary')) return false;
  return true;
}
