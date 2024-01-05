import { useState, useEffect } from 'react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface BoxProps {
  title: string;
  codeStr?: string;
}

export default function Box({ codeStr, title }: BoxProps) {
  const [target, setTarget] = useState('');

  return (
    <div className='flex flex-col w-full h-full bg-white p-5 rounded-lg shadow-md shadow-slate-200'>
      <span className='text-xl pl-2 pb-2'>{title}</span>
      {
        codeStr ? (
          <SyntaxHighlighter 
            language="html" 
            style={{
              ...oneLight,
              'code[class*="language-"]': {
                ...oneLight['code[class*="language-"]'],
                fontSize: '17px',
              },
              'pre[class*="language-"]': {
                ...oneLight['pre[class*="language-"]'],
                fontSize: '17px',
              }
            }}
            customStyle={{
              height: '98%',
              borderRadius: '5px',
              overflowY: 'auto',
            }}
            className='syntax-highlighter'
          >
            {codeStr}
          </SyntaxHighlighter>
        ) : (
          <div className='p-1em my-2 h-98p bg-one-light rounded-md'>
            {
              target ? (
                <div></div>
              ) : (
                <div className='flex flex-row items-center justify-center h-full text-2xl text-center'>
                  <span>Please <span className='font-bold text-red-500'>click on a code</span> to see <br/> how it can be improved.</span>
                </div>
              )
            }
          </div>
        )
      }
      
    </div>
  );
}