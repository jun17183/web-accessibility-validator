import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDescription, setSelectedCode } from 'reducers/codeSlice';
import { AttribValueType, CSSNode, CSSNodeValue, CSSSuggestion, SelectorType } from 'utils/types';

const getHighlightedSeletor = (selector: string): ReactNode[] => {
  const color: Record<SelectorType, string> = {
    'key': 'text-sky-300',
    'value': 'text-orange-400',
    'attrib': 'text-gold',
    'pseudo': 'text-sky-200',
    'idAndClass': 'text-light-gold',
    'element': 'text-blue-400',
    'combinator': 'text-white',
    'annotation': 'text-pink',
  }

  const reg = /(\>|#|,|\[|\]|\(|\)|\.|\+|~|\||=|:|::|\s|[^\s\>\#\,\[\]\(\)\.\+\~\|\=::]+)/g;
  const tokens = selector.match(reg);
  const highlightedSelector: ReactNode[] = [];
  let type: SelectorType | null = null;

  tokens?.forEach((token, i) => {
    if (token === ' ' || token === '>' || token === '|' || token === '+' || token === '~' || token === ',') {
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
    if (token === '@') {
      type = 'annotation';
      return highlightedSelector.push(<span key={i} className={color.annotation}>{token}</span>);
    }
    highlightedSelector.push(<span key={i} className={type ? color[type] : color.element}>{token}</span>);
  });
  return highlightedSelector;
}

const getHighlightedAttributes = (attributes: CSSNode): ReactNode[] => {
  const highlightedAttributed: ReactNode[] = [];
  const attribKeyColor: string = 'text-sky-200';
  const attribValueColor: Record<AttribValueType, string> = {
    'string': 'text-orange-400',
    'number': 'text-grass',
    'pseudo': 'text-sky-200',
    'attrib': 'text-pink',
    'important': 'text-blue-400',
    'annotation': 'text-pink'
  }

  const reg = /(!important|\(|\)|\[|\]|@|:|\s|[^\s@:!()\[\]]+)/g;

  Object.values(attributes).map((item, i) => {
    if (typeof item === 'string') {
      return highlightedAttributed.push(
        <div key={i}>
          {'\u00A0\u00A0'}
          <span className='text-green-700'>{item}</span>
        </div>
      );
    }
    const key = item.name;
    const value = item.value;

    if (typeof value !== 'string') return;

    const tokens = value.match(reg);
    const highlightedAttribValue: ReactNode[] = [];
    let type: AttribValueType | null = null;
    
    tokens?.forEach((token, i) => {
      if (token === ' ') {
        type = null;
        return highlightedAttribValue.push(<span key={i}>{token}</span>);
      }
      if (token === '@') {
        type = 'annotation';
        return highlightedAttribValue.push(<span key={i} className={attribValueColor.annotation}>{token}</span>);
      }
      if (token === ':') {
        type = 'pseudo';
        return highlightedAttribValue.push(<span key={i} className={attribValueColor.pseudo}>{token}</span>);
      }
      if (token === '(' || token === ')' || token === '[' || token === ']') {
        type = null;
        return highlightedAttribValue.push(<span key={i} className={attribValueColor.attrib}>{token}</span>);
      }
      if (token === '!important') {
        type = null;
        return highlightedAttribValue.push(<span key={i} className={attribValueColor.important}>{token}</span>);
      }
      if (!type && !isNaN(Number(token[0]))) {
        type = 'number';
        return highlightedAttribValue.push(<span key={i} className={attribValueColor.number}>{token}</span>);
      }
      if (!type && typeof token[0] === 'string') {
        type = 'string';
        return highlightedAttribValue.push(<span key={i} className={attribValueColor.string}>{token}</span>);
      }
    });

    highlightedAttributed.push(
      <div key={i}>
        {'\u00A0\u00A0'}
        <span className={attribKeyColor}>{key}</span>
        <span className='text-white'>{`: `}</span>
        {highlightedAttribValue}
        <span className='text-white'>;</span>
      </div>
    );
  });
  return highlightedAttributed;
}

const useDispatchSuggestion = () => {
  const dispatch = useDispatch();

  const dispatchSuggestion = (suggestion: CSSSuggestion | undefined ) => {
    if (suggestion) {
      dispatch(setSelectedCode({ node_1: suggestion.getSuggestionNode()}));
      dispatch(setDescription(suggestion.getDescription()));
    }
  }
  return dispatchSuggestion;
}

export default function CSSHighlighter(parsedCSSObj: CSSNode): ReactNode {
  const _CSSHighlighter = ({ parsedCSSObj }: { parsedCSSObj: CSSNode }) => {
    const dispatchSuggestion = useDispatchSuggestion();

    return <>{
      Object.values(parsedCSSObj).map((rule, i) => {
        rule = rule as CSSNodeValue;
        const hasProblem = rule.suggestion && rule.suggestion.hasProblem();
  
        return (
          <div key={i}>
            <span 
              className={`${hasProblem ? 'suggestion' : ''}`}
              onClick={hasProblem ? () => dispatchSuggestion((rule as CSSNodeValue).suggestion) : undefined}
            >
              {getHighlightedSeletor(rule.name)}
            </span>
            {` `}<span className='text-gold'>{`{`}</span>
            {getHighlightedAttributes(rule.value as CSSNode)}
            <span className='text-gold'>{`}`}</span>
          </div>
        );
      })
    }</>
  }
  return <_CSSHighlighter parsedCSSObj={parsedCSSObj} />
}