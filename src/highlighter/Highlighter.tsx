import { useEffect, useState, ReactNode } from 'react';

import { useSelector } from 'react-redux'
import { RootState } from 'redux/store';

import HTMLHighlighter from 'highlighter/html';
import CSSHighlighter from 'highlighter/css';

export default function Highlighter() {
  const parsedCode = useSelector((state: RootState) => state.codeReducer.parsedCode);
  const [highlightedCode, setHighlightedCode] = useState<ReactNode>('');

  useEffect(() => {
    if (!parsedCode) {  // parsedCode === null
      setHighlightedCode('Your source is empty.');

    } else if (Array.isArray(parsedCode)) { // html
      const highlightedHTML = HTMLHighlighter(parsedCode);
      setHighlightedCode(highlightedHTML);
      
    } else {  // css
      const highlightedCSS = CSSHighlighter(parsedCode);
      setHighlightedCode(highlightedCSS);
    }
  }, [parsedCode]);

  return (
    <>
      {highlightedCode}
    </>
  );
}