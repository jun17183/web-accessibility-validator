import { ChildNode, Element } from 'domhandler';
import { ParsedCode, Suggestion } from 'utils/types';

const getImgElement = (node: ParsedCode): Element | null => {
  if (!Array.isArray(node)) return null;
  const childNode = node[0];
  if (!(childNode instanceof Element)) return null;
  if (childNode.name !== 'img') return null;
  return childNode;
}

export const hasSrc = (suggestion: Suggestion): Suggestion => {
  const imgElement = getImgElement(suggestion.node);
  if (!imgElement) return suggestion;
  
  if (!imgElement.attribs.hasOwnProperty('src')) {
    imgElement.attribs = { ...imgElement.attribs, 'src': './img.png' }
    suggestion.description.push(
      `please add attribute 'src' to tag 'img'`
    );
  }
  
  return suggestion;
}

export const hasAlt = (suggestion: Suggestion): Suggestion => {
  const imgElement = getImgElement(suggestion.node);
  if (!imgElement) return suggestion;
  
  if (!imgElement.attribs.hasOwnProperty('alt')) {
    imgElement.attribs = { ...imgElement.attribs, 'alt': 'my image' }
    suggestion.description.push(
        `please add attribute 'alt' to tag 'img'`
    );
  }

  return suggestion;
}


