import { Code } from 'utils/types';
import Box from 'components/result/Box';
import BoxTitle from 'components/result/BoxTitle';
import CodeBlock from './CodeBlock';

interface LeftProps extends Code {
  func?: Function;
}

export default function Left({ code, language, func }: LeftProps) {
  return (
    <Box>
      <>
        <BoxTitle>Your Code</BoxTitle>
        <CodeBlock><>{code}</></CodeBlock>
      </>
    </Box>
  );
}