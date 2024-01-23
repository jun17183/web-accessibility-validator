import { useEffect, useState, ReactNode } from 'react';

import HTMLHighlighter from 'highlighter/html';
import CSSHighlighter from 'highlighter/css';
import { CSSNode, HTMLNode, ParsedCode } from 'utils/types';

export default function Highlighter({ parsedCode }: { parsedCode: ParsedCode }) {
  const [highlightedCode, setHighlightedCode] = useState<ReactNode>('');

  const isHTMLNode = (node: ParsedCode): node is HTMLNode => {
    if (!node) return false;
    const values = Object.values(node);

    return (values.length > 0 && (
      values[0].type === 'Element' || values[0].type === 'Text' || values[0].type === 'ProcessingInstruction'
    ));
  }

  const isCSSNode = (node: ParsedCode): node is CSSNode => {
    if (!node) return false;
    const values = Object.values(node);
    if (values.length < 1) return false;    

    return 'name' in values[0] || 'type' in values[0] || 'value' in values[0];
  }

  useEffect(() => {
    try {
      if (isHTMLNode(parsedCode)) {
        const highlightedHTML = HTMLHighlighter(parsedCode);
        setHighlightedCode(highlightedHTML);
      } else if (isCSSNode(parsedCode)) {
        console.log(parsedCode)
        const highlightedCSS = CSSHighlighter(parsedCode);
        setHighlightedCode(highlightedCSS);
      } else {
        setHighlightedCode(<div className='flex justify-center items-center h-full text-3xl text-white'>Your source is empty.</div>);
      }
    } catch (e) {
      console.log(e);
      setHighlightedCode(<div className='flex justify-center items-center h-full text-3xl text-white'>Your source has a problem.</div>);
    }
  }, [parsedCode]);

  return (
    <>
      {highlightedCode}
    </>
  );
}