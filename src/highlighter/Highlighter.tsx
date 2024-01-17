import { useEffect, useState, ReactNode } from 'react';

import HTMLHighlighter from 'highlighter/html';
import CSSHighlighter from 'highlighter/css';
import { ParsedCode } from 'utils/types';

export default function Highlighter({ parsedCode, validateAt = false }: { parsedCode: ParsedCode, validateAt?: boolean }) {
  const [highlightedCode, setHighlightedCode] = useState<ReactNode>('');

  useEffect(() => {
    if (!parsedCode) {  // parsedCode === null
      setHighlightedCode('Your source is empty.');

    } else if (Array.isArray(parsedCode)) { // html
      const highlightedHTML = <HTMLHighlighter parsedHtmlDom={parsedCode} validateAt={validateAt} />;
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