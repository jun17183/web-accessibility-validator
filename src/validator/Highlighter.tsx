import { Text, Element, ProcessingInstruction } from 'domhandler';

const OpeningTag = ({ name }: { name: string }) => {
  return (
    <>
      <span className='lt-gt'>{`<`}</span>
      <span className='tag-name'>{`${name}`}</span>
    </>
  );
}

const ClosingTag = ({ name }: { name: string }) => {
  return (
    <>
      <span className='lt-gt'>{`</`}</span>
      <span className='tag-name'>{name}</span>
      <span className='lt-gt'>{`>`}</span>
    </>
  );
}

const Attribs = ({ attribs }: { attribs: Object }) => {
  const attribsArr = Object.entries(attribs);
  return (
    <>
      {
        attribsArr.map(([key, value], i) => {
          return (
            <>
              <span className='attribs-key'>{` ${key}`}</span>
              <span className='text'>=</span>
              {i === 0 && <span className='attribs-value'>'</span>}
              <span className='attribs-value'>{`${value}`}</span>
              {<span className='attribs-value'>{i === attribsArr.length - 1 ? `'` : ` `}</span>}
            </>
          );
        })
      }
      <span className='lt-gt'>{`>`}</span>
    </>
  );
}

const DOCTYPE = () => {
  return (
    <>
      <span className='lt-gt'>{`<!`}</span>
      <span className='tag-name'>DOCTYPE</span>
      <span className='attribs-key'>{` `}html</span>
      <span className='lt-gt'>{`>`}</span>
    </>
  );
}

const TextNode = ({ data }: { data: string }) => {
  return <span className='text'>{data}</span>
}

const ElementNode = ({ name, attribs, children }: { name: string, attribs: Object, children?: ChildNode[] }) => {
  
  return (
    <>
      <OpeningTag name={name} />
      <Attribs attribs={attribs} />
      {children && (
        <>
          {children.map(item => getHighlightedNode(item))}
          <ClosingTag name={name} />
        </>
      )}
    </>
  );
}

const getHighlightedNode = (item : Node) => {
  if (item instanceof ProcessingInstruction) {
    return <DOCTYPE />
  }
  
  if (item instanceof Text) {
    return <TextNode data={item.data} />
  }

  if (item instanceof Element) {
    return <ElementNode name={item.name} attribs={item.attribs} children={item?.children} />
  }
}

export default function Highlighter({ dom }: { dom: ChildNode[] }) {

  const highlightedCode = dom.map((item, i) => {
    return getHighlightedNode(item);
  });

  return (
    <>
      {highlightedCode}
    </>
  );
}