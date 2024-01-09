import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CustomSyntaxHighlighterProps {
  language: 'html' | 'css';
  code: string;
  customStyle?: Object;
  func?: Function;
}

export default function CustomSyntaxHighlighter({ language, code, customStyle, func }: CustomSyntaxHighlighterProps) {
  const style = {
    ...oneLight,
    'code[class*="language-"]': {
      ...oneLight['code[class*="language-"]'],
      fontSize: '17px',
    },
    'pre[class*="language-"]': {
      ...oneLight['pre[class*="language-"]'],
      fontSize: '17px',
    },
  }
  
  return (
    <SyntaxHighlighter
      language={language}
      wrapLines={false} 
      style={style}
      customStyle={{
        height: '98%',
        borderRadius: '6px',
        overflow: 'auto',
        ...customStyle
      }}
      className='syntax-highlighter'
    >
      {code}
    </SyntaxHighlighter>
  );
}
