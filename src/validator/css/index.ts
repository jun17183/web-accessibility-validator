import { CSSNode, CSSNodeValue, CSSSuggestion } from 'utils/types';
import { colorValidator } from './color';

export const CSSValidator = (parsedCSSCode: CSSNode): CSSNode => {
  if (!parsedCSSCode) return parsedCSSCode;

  Object.values(parsedCSSCode).forEach((node: CSSNodeValue | string) => {
    if (typeof node === 'string') return;
    if (node.type !== 'rule') return;
    
    const suggestion = getSuggestion(node);

    colorValidator(suggestion);
  });
  return parsedCSSCode;
}

const getSuggestion = (node: CSSNodeValue): CSSSuggestion => {
  if (node.suggestion !== undefined) return node.suggestion;
  const suggestion = new CSSSuggestion(node);
  node.suggestion = suggestion;
  return suggestion;
}
