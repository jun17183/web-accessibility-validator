import { ReactNode, useEffect } from 'react';

import { CSSNode, CSSToken } from 'utils/types';

const splitSeletor = (selector: string) => {
  const tokens: CSSToken[] = [];
  let token: CSSToken | null = null;
  let type;

  for (let i = 0; i < selector.length; i++) {
    let c = selector[i];
    
    if (!token) {
      token = new CSSToken('element');

      if (c === '#' || c === '.') {
        token.type = 'element';  
      } else if (c === ':') {
        token.type = 'pseudo';
      }
    } else {
      
    }

    if (/[\s>\[\]\(\)"|=+~],/.test(c)) {
      
    }
    
  }
}

export default function CSSHighlighter(parsedCSSObj: CSSNode): ReactNode {
    if (parsedCSSObj) {

    }


  return <></>
}