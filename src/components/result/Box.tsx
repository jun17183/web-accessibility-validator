import { ReactElement } from 'react';

interface BoxProps {
  children: ReactElement
}

export default function Box({ children }: BoxProps) {
  return (
    <div className='flex flex-col lg:w-6/12 h-full p-5 overflow-hidden bg-white rounded-lg shadow-md shadow-slate-200'>
      {children}
    </div>
  );
}
