import { ReactElement } from 'react';

interface BoxProps {
  children: ReactElement
}

export default function Box({ children }: BoxProps) {
  return (
    <div className='flex flex-col w-full h-full p-5 bg-white rounded-lg shadow-md shadow-slate-200'>
      {children}
    </div>
  );
}
