import { Element, HTMLNode, HTMLSuggestion, HTMLType, Text } from 'utils/types';
import { isElement, isText } from 'utils/util';
import { imgValidator } from 'validator/html/img';
import { aValidator } from 'validator/html/a';
import { tableValidator } from 'validator/html/table';
import { videoAndAudioValidator } from 'validator/html/videoAndAudio';
import { xssValidator } from 'validator/html/xss';
import { htmlValidator } from 'validator/html/html';
import { headValidator } from 'validator/html/head';
import { frameValidator } from 'validator/html/frame';

export const HTMLValidator = (parsedHTMLCode: HTMLNode): HTMLNode => {                                                       
  Object.values(parsedHTMLCode).forEach(node => {
    if (isText(node)) TextValidator(node);
    if (isElement(node)) ElementValidator(node);
  });
  return parsedHTMLCode;
}

const getSuggestion = (node: HTMLType): HTMLSuggestion => {
  if (node.suggestion !== undefined) return node.suggestion;
  const suggestion = new HTMLSuggestion(node);
  node.suggestion = suggestion;
  return suggestion;
}

const TextValidator = (node: Text) => {
  const suggestion = getSuggestion(node);
  xssValidator(suggestion);
}

const ElementValidator = (node: Element) => {
  const suggestion = getSuggestion(node);
  htmlValidator(suggestion);
  headValidator(suggestion);
  aValidator(suggestion);
  tableValidator(suggestion);
  imgValidator(suggestion);
  videoAndAudioValidator(suggestion);
  frameValidator(suggestion);

  if (node.children !== undefined) {
    HTMLValidator(node.children);
  }
}

