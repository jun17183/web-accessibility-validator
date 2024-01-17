import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'reducers/store';
import { setParsedCode } from 'reducers/codeSlice';

import { Parser } from 'htmlparser2';
import { DomHandler } from 'domhandler';
import { cssToJson } from 'utils/cssjson';

import Box from 'components/result/Box';
import BoxTitle from 'components/result/BoxTitle';
import CodeBlock from 'components/result/CodeBlock';
import Highlighter from 'highlighter/Highlighter';

export default function Left() {
  const dispatch = useDispatch();

  const language = useSelector((state: RootState) => state.codeReducer.language);
  const code = useSelector((state: RootState) => state.codeReducer.code);
  const parsedCode = useSelector((state: RootState) => state.codeReducer.parsedCode);

  useEffect(() => {
    if (language === 'html') {
      const handler = new DomHandler((error, result) => {
        if (error) {
          alert(error);
        } else {
          console.log(result)
          if (result.length) {
            dispatch(setParsedCode(result));
          }
        }
      });
      const parser = new Parser(handler);
      parser.write(code);
      parser.end();

    } else if (language === 'css') {
      dispatch(setParsedCode(cssToJson(code))); 
    }
  }, [code]);

  return (
    <Box>
      <>
        <BoxTitle>Your Code</BoxTitle>
        <CodeBlock><Highlighter parsedCode={parsedCode} validateAt={true} /></CodeBlock>
      </>
    </Box>
  );
}