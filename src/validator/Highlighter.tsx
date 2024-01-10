import { Element, ProcessingInstruction, TextNode } from 'utils/types';

const OpeningTag = ({ name }: { name: string }) => {
  return (
    <>
      <span className='text-gray-500'>{`<`}</span>
      <span className='text-blue-500'>{`${name} `}</span>
    </>
  );
}

const ClosingTag = ({ name }: { name: string }) => {
  return (
    <>
      <span className='text-blue-500'>{name}</span>
      <span className='text-gray-500'>{`/>`}</span>
    </>
  );
}

const Attribs = ({ attribs }: { attribs: Map<string, string> }) => {
  const attribsArr = Object.entries(attribs);
  return (
    <>
      {
        attribsArr.map(([key, value], i) => {
          return (
            <>
              <span className='text-sky-400'>{key}</span>
              <span className='text-white'>=</span>
              {i === 0 && <span className='text-orange-500'>'</span>}
              <span className='text-orange-500'>{`'${value} `}</span>
              {i === attribsArr.length - 1 && <span className='text-orange-500'>'</span>}
            </>
          );
        })
      }
    </>
  );
}

export default function Highlighter({ dom }: { dom: Array<Element | TextNode | ProcessingInstruction> }) {

  return (
    <>
    </>
  );
}