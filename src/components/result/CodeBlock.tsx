import { ReactElement } from 'react';

interface CodeBlockProps {
  children: ReactElement
}

export default function CodeBlock({ children }: CodeBlockProps) {
  return (
    <div className='code-block my-2 p-8 h-full bg-one-light rounded-md text-wrap overflow-auto box-border'>
      {children}
    </div>
  );
}