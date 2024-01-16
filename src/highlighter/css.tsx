import { ReactNode, useEffect } from 'react';

import { CSSNode, CSSToken, SelectorType } from 'utils/types';

const getHighlightedSeletor = (selector: string): ReactNode[] => {
  const color: Record<SelectorType, string> = {
    'key': 'text-sky-300',
    'value': 'text-orange-400',
    'attrib': 'text-gold',
    'pseudo': 'text-sky-200',
    'idAndClass': 'text-light-gold',
    'element': 'text-blue-400',
    'combinator': 'text-white',
  }

  const reg = /(\>|#|\[|\]|\(|\)|\.|\+|~|\||=|:|::|\s|[^\s\>\#\[\]\(\)\.\+\~\|\=::]+)/g;
  const tokens = selector.match(reg);
  const highlightedSelector: ReactNode[] = [];

  let type: SelectorType | null = 'element';

  tokens?.forEach((token, i) => {
    if (token === ' ' || token === '>' || token === '|' || token === '+' || token === '~') {
      type = null;
      return highlightedSelector.push(<span key={i} className={color.combinator}>{token}</span>);
    }

    if (token === '[' || token === '(') {
      type = 'key';
      return highlightedSelector.push(<span key={i} className={color.attrib}>{token}</span>);
    }

    if (token === '=') {
      type = 'value';
      return highlightedSelector.push(<span key={i}  className={color.combinator}>{token}</span>);
    }

    if (token === ']' || token === ')') {
      type = null;
      return highlightedSelector.push(<span key={i} className={color.attrib}>{token}</span>);
    }

    if (type === 'key') {
      type = null;
      return highlightedSelector.push(<span key={i} className={color.key}>{token}</span>);
    }

    if (type === 'value') {
      type = null;
      return highlightedSelector.push(<span key={i} className={color.value}>{token}</span>);
    }

    if (token === ':') {
      type = 'pseudo';
      return highlightedSelector.push(<span key={i} className={color.pseudo}>{token}</span>);
    }

    if (token === '#' || token === '.') {
      type = 'idAndClass';
      return highlightedSelector.push(<span key={i} className={color.idAndClass}>{token}</span>);
    }

    highlightedSelector.push(<span key={i} className={type ? color[type] : color.element}>{token}</span>);
  });

  return highlightedSelector;
}

export default function CSSHighlighter(parsedCSSObj: CSSNode): ReactNode {
    let arr;
    if (parsedCSSObj) {
      arr = Object.keys(parsedCSSObj.children).map((item, i) => {
        return <div key={i}>{getHighlightedSeletor(item)}</div>;
      })
    }
  return <>{arr}</>
}