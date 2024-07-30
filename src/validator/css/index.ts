import { CSSNode, CSSNodeValue, CSSSuggestion } from 'utils/types';
import { colorValidator } from './color';
import { textValidator } from './text';

export const CSSValidator = (parsedCSSCode: CSSNode): boolean => {
  if (!parsedCSSCode) return false;

  let hasProblem = false;

  for (const node of Object.values(parsedCSSCode)) {
    if (typeof node === 'string') continue;
    if (node.type !== 'rule') continue;
    
    const suggestion = getSuggestion(node);

    colorValidator(suggestion);
    textValidator(suggestion);

    if (suggestion?.getDescription().length > 0) {
      hasProblem = true;
    }
  }
  return hasProblem;
}

const getSuggestion = (node: CSSNodeValue): CSSSuggestion => {
  if (node.suggestion !== undefined) return node.suggestion;
  const suggestion = new CSSSuggestion(node);
  node.suggestion = suggestion;
  return suggestion;
}
