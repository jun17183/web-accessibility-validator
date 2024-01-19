import { Element, HTMLNode, HTMLSuggestion, HTMLType, ProcessingInstruction, Text } from 'utils/types';
import { imgValidator } from 'validator/html/img';

export const HTMLValidator = (parsedHTMLCode: HTMLNode): HTMLNode => {                                                       
  Object.values(parsedHTMLCode).forEach(node => {
    if (isText(node)) TextValidator(node);
    if (isElement(node)) ElementValidator(node);
  });
  return parsedHTMLCode;
}

const isText = (node: HTMLType): node is Text => node.type === 'Text';
const isElement = (node: HTMLType): node is Element => node.type === 'Element';
const isProcessingInstruction = (node: HTMLType): node is ProcessingInstruction => node.type === 'ProcessingInstruction';

const getSuggestion = (node: HTMLType): HTMLSuggestion => {
  if (node.suggestion !== undefined) return node.suggestion;
  const suggestion = new HTMLSuggestion(node);
  node.suggestion = suggestion;
  return suggestion;
}

const TextValidator = (node: Text) => {
  // 스크립트(xss) 검사 추가
}

const ElementValidator = (node: Element) => {
  const suggestion = getSuggestion(node);
  
  imgValidator(suggestion);

  if (node.children !== undefined) {
    HTMLValidator(node.children);
  }
}