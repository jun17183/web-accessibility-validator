import { parseDOM } from 'htmlparser2';
import { Node, Text, Element, ProcessingInstruction } from 'domhandler';

import { Code } from 'utils/types';
import Box from 'components/result/Box';
import BoxTitle from 'components/result/BoxTitle';
import CodeBlock from './CodeBlock';
import Highlighter from 'validator/Highlighter';

interface LeftProps extends Code {
  func?: Function;
}

export default function Left({ code, language, func }: LeftProps) {
  //const dom = parseDOM(code);

  return (
    <Box>
      <>
        <BoxTitle>Your Code</BoxTitle>
        <CodeBlock><Highlighter dom={dom} /></CodeBlock>
      </>
    </Box>
  );
}