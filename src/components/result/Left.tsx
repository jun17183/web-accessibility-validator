import { useEffect } from 'react';

import { useSelector } from 'react-redux'
import { RootState } from 'redux/store';
import { setParsedCode } from 'redux/codeSlice';

import { Parser } from 'htmlparser2';
import { DomHandler } from 'domhandler';
import { cssToJson } from 'utils/cssjson';

import Box from 'components/result/Box';
import BoxTitle from 'components/result/BoxTitle';
import CodeBlock from './CodeBlock';
import Highlighter from 'highlighter/Highlighter';

export default function Left() {
  const language = useSelector((state: RootState) => state.codeReducer.language);
  const code = useSelector((state: RootState) => state.codeReducer.code);

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
        <CodeBlock><Highlighter /></CodeBlock>
      </>
    </Box>
  );
}