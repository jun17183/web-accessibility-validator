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
    return 'name' in node || 'type' in node || 'value' in node;
  }

  useEffect(() => {
    if (isHTMLNode(parsedCode)) {
      const highlightedHTML = HTMLHighlighter(parsedCode);
      setHighlightedCode(highlightedHTML);
    } else if (isCSSNode(parsedCode)) {
      const highlightedCSS = CSSHighlighter(parsedCode);
      setHighlightedCode(highlightedCSS);
    } else {
      console.log('hi')
      setHighlightedCode('Your source is empty.');
    }
  }, [parsedCode]);

  return (
    <>
      {highlightedCode}
    </>
  );
}