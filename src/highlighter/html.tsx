import { ReactNode } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'reducers/store';
import { setSuggestion } from 'reducers/codeSlice';

import { ChildNode, Text, Element, ProcessingInstruction } from 'domhandler';

import HTMLValidator from 'validator/html/validator';
import { Suggestion } from 'utils/types';

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
              <span className='attribs-key'>{` ${key}`}</span>{/* 태그 네임에서 한 칸 띄우고 key */}
              <span className='text'>=</span>
              {i === 0 && <span className='attribs-value'>'</span>}{/* 첫번째 속성 => ' */}
              <span className='attribs-value'>{`${value}`}</span>
              {<span className='attribs-value'>{i === attribsArr.length - 1 ? `'` : ` `}</span>}{/* 마지막 속성 => ' , 아니면 띄워쓰기 */}
            </span>
          );
        })
      }
      <span className='lt-gt'>{`>`}</span>
    </>
  );
}

const DOCTYPE = () => {
  return (  // <!DOCTYPE html>
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

export const getHighlightedNode = (item: ChildNode, tabStack: number = 1) => {
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

export default function HTMLHighlighter({ parsedHtmlDom, validateAt = false }: { parsedHtmlDom: ChildNode[], validateAt: boolean }) {
  const dispatch = useDispatch();

  const handleClickNode = (item: ChildNode) => {
    const suggestion = HTMLValidator(item);
    dispatch(setSuggestion(suggestion))
  }

  return (
    <>
      {parsedHtmlDom.map((item, i) => {
        if (validateAt) {
          return <div key={i} onClick={() => handleClickNode(item)}>{getHighlightedNode(item)}</div>
        }
        return <div key={i}>{getHighlightedNode(item)}</div>
      })}
    </>
  );
}