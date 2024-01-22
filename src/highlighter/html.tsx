import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { setDescription, setSelectedCode } from 'reducers/codeSlice';
import { HTMLNode, HTMLType, Text, Element, HTMLSuggestion } from 'utils/types';

const useDispatchSuggestion = (suggestion: HTMLSuggestion | undefined ) => {
  const dispatch = useDispatch();

  const dispatchSuggestion = () => {
    if (suggestion) {
      dispatch(setSelectedCode({ node_1: suggestion.getSuggestionNode()}));
      dispatch(setDescription(suggestion.getDescription()));
    }
  }
  return dispatchSuggestion;
}

const OpeningTag = ({ name, suggestion }: { name: string, suggestion: HTMLSuggestion | undefined }) => {
  const dispatchSuggestion = useDispatchSuggestion(suggestion);

  return (
    <>
      <span className='lt-gt'>{`<`}</span>
      <span 
        className={`tag-name${(suggestion && suggestion.hasProblem()) ? ' suggestion' : ''}`}
        onClick={dispatchSuggestion}
      >
        {`${name}`}
      </span>
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
              <span className='attribs-value'>"</span>
              <span className='attribs-value'>{`${value}`}</span>
              <span className='attribs-value'>"</span>
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

const TextNode = ({ data, suggestion }: { data: string, suggestion: HTMLSuggestion | undefined}) => {
  const dispatchSuggestion = useDispatchSuggestion(suggestion);

  return (
    <span 
      className={`text${(suggestion && suggestion.hasProblem()) ? ' suggestion' : ''}`}
      onClick={dispatchSuggestion}
    >
      {data}
    </span>
  );
}

const ElementNode = ({ name, attribs, children, tabStack, suggestion }: { name: string, attribs: Object, children?: HTMLNode, tabStack: number, suggestion: HTMLSuggestion | undefined }) => {
  const MyTab = <span>{'\u00A0\u00A0'.repeat(tabStack - 1)}</span>;
  const ChildrenTab = <span>{'\u00A0\u00A0'.repeat(name !== 'html' ? tabStack++ : tabStack - 1)}</span>;
  let hasTag = false;

  return (
    <>
      <OpeningTag name={name} suggestion={suggestion} />
      <Attribs attribs={attribs} />
      {children && (
        <>
          {Object.values(children).map((item, i) => { 
            const isTag = ((item as Element).name !== undefined && (item as Element).attribs !== undefined);
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

const getHighlightedNode = (item: HTMLType, tabStack: number = 1) => {
  if (item.type === 'ProcessingInstruction') {
    return <DOCTYPE />
  }
  
  if (item.type === 'Text') {
    return <TextNode data={(item as Text).data} suggestion={item.suggestion} />
  }

  if (item.type === 'Element') {
    return (
      <ElementNode 
        name={(item as Element).name} 
        attribs={(item as Element).attribs} 
        children={(item as Element)?.children} 
        tabStack={tabStack} 
        suggestion={item?.suggestion}
      />
    );
  }

  return <span>Error</span>
}

export default function HTMLHighlighter(parsedHtmlDom: HTMLNode): ReactNode {
  console.log(parsedHtmlDom)
  return Object.values(parsedHtmlDom).map((item, i) => <span key={i}>{getHighlightedNode(item)}</span>);
}