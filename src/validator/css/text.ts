import { CSSNode, CSSNodeValue, CSSSuggestion } from 'utils/types';

export const textValidator = (suggestion: CSSSuggestion) => {
  const node = suggestion.getNode();
  const suggestionNode = suggestion.getSuggestionNode();
  const rules = Object.values(node.value) as CSSNodeValue[];

  const pxToEm = (px: number) => {
    let em;
    if (px % 16 !== 0) {
      em = (px / 16).toFixed(1);
    } else {
      em = px / 16;
    }
    return em;
  }

  let flag = false;

  rules.forEach(({name, value}) => {
    value = value as string;  // 선택자 { string: string } 라는 전제
    
    if (name === 'font-size') {
      const valueTokens = value.split('px');
  
      if (valueTokens.length > 1) {
        const suggestionValue = suggestionNode.value as CSSNode;
        let num = Object.keys(suggestionValue).length;
  
        suggestionValue['rule_' + num++] = { 
          name: name, 
          type: 'attr',
          value: pxToEm(Number(valueTokens[0])) + 'em', 
        };

        suggestion.addDescription(`
          You should use 'em' or 'rem' units for font size instead of 'px'.
        `);
      }
    }

    if (name === 'line-height' || name === 'letter-spacing' || name === 'word-spacing') {
      const valueTokens = value.split('px');

      if (valueTokens.length > 1) {
        const suggestionValue = suggestionNode.value as CSSNode;
        let num = Object.keys(suggestionValue).length;

        suggestionValue['rule_' + num++] = { 
          name: name, 
          type: 'attr',
          value: pxToEm(Number(valueTokens[0])) + 'em', 
        };

        if (flag) {
          suggestion.addDescription(`
            For line-height, letter-spacing, and word-spacing, you should use 'em' or 'rem' units instead of 'px'.
          `);
        }
      }
    }
  });
}