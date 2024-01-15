import { useState, useEffect } from 'react';

import { Parser } from 'htmlparser2';
import { DomHandler } from 'domhandler';

import { cssToJson } from 'utils/cssjson';
import { Code, ParsedCode } from 'utils/types';

import Box from 'components/result/Box';
import BoxTitle from 'components/result/BoxTitle';
import CodeBlock from './CodeBlock';
import Highlighter from 'highlighter/Highlighter';

interface LeftProps extends Code {
  func?: Function;
}

export default function Left({ code, language, func }: LeftProps) {
  const [parsedCode, setParsedCode] = useState<ParsedCode>(null);

  useEffect(() => {
    if (language === 'html') {
      const handler = new DomHandler((error, result) => {
        if (error) {
            alert(error);
        } else {
            setParsedCode(result);
        }
      });
      const parser = new Parser(handler);
      parser.write(code);
      parser.end();

    } else if (language === 'css') {
      setParsedCode(cssToJson(code)); 
    }
  }, [code]);

  return (
    <Box>
      <>
        <BoxTitle>Your Code</BoxTitle>
        <CodeBlock><Highlighter parsedCode={parsedCode} /></CodeBlock>
      </>
    </Box>
  );
}