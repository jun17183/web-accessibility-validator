import { ReactNode } from 'react';
import { ChildNode, Text, Element, ProcessingInstruction } from 'domhandler';

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
            <span key={i}>
              <span className='attribs-key'>{` ${key}`}</span>
              <span className='text'>=</span>
              {i === 0 && <span className='attribs-value'>'</span>}
              <span className='attribs-value'>{`${value}`}</span>
              {<span className='attribs-value'>{i === attribsArr.length - 1 ? `'` : ` `}</span>}
            </span>
          );
        })
      }
      <span className='lt-gt'>{`>`}</span>
    </>
  );
}

const DOCTYPE = () => {
  return (
    <div>
      <span className='lt-gt'>{`<!`}</span>
      <span className='tag-name'>DOCTYPE</span>
      <span className='attribs-key'>{` `}html</span>
      <span className='lt-gt'>{`>`}</span>
    </div>
  );
}

const TextNode = ({ data }: { data: string }) => {
  return <span className='text'>{data}</span>
}

const ElementNode = ({ name, attribs, children, tabStack }: { name: string, attribs: Object, children?: ChildNode[], tabStack: number }) => {
  const MyTab = <span>{'\u00A0\u00A0'.repeat(tabStack - 1)}</span>;
  const ChildrenTab = <span>{'\u00A0\u00A0'.repeat(name !== 'html' ? tabStack++ : tabStack - 1)}</span>;
  let hasTag = false;

  return (
    <>
      <OpeningTag name={name} />
      <Attribs attribs={attribs} />
      {children && (
        <>
          {children.map((item, i) => { 
            const isTag = item instanceof Element;
            if (isTag && !hasTag) hasTag = true;
            return isTag ? (
              <div key={i}>{ChildrenTab}{getHighlightedNode(item, tabStack)}</div>
            ) : (
              <span key={i}>{getHighlightedNode(item, tabStack)}</span>
            );
          })}
          {hasTag && MyTab}<ClosingTag name={name} />
        </>
      )}
    </>
  );
}

const getHighlightedNode = (item: ChildNode, tabStack: number = 1) => {
  if (item instanceof ProcessingInstruction) {
    return <DOCTYPE />
  }
  
  if (item instanceof Text) {
    return <TextNode data={item.data} />
  }

  if (item instanceof Element) {
    return <ElementNode name={item.name} attribs={item.attribs} children={item?.children} tabStack={tabStack} />
  }

  return <span>Error</span>
}

export default function HTMLHighlighter(parsedHtmlDom: ChildNode[]): ReactNode {
  return parsedHtmlDom.map((item, i) => <span key={i}>{getHighlightedNode(item)}</span>);
}