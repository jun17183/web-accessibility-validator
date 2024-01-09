import CustomSyntaxHighlighter from 'components/result/CustomSyntaxHighlighter';
import Box from './Box';
import BoxTitle from './BoxTitle';

interface LeftProps {
  code: string;
  language: 'html' | 'css';
  func?: Function;
}

export default function Left({ code, language, func }: LeftProps) {
  return (
    <Box>
      <>
        <BoxTitle>Your Code</BoxTitle>
        <CustomSyntaxHighlighter language={language} code={code} func={func} />
      </>
    </Box>
  );
}