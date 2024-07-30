import { Element, HTMLNode, HTMLSuggestion, HTMLType, Text } from 'utils/types';
import { isElement, isText } from 'utils/util';
import { aValidator } from 'validator/html/a';
import { frameValidator } from 'validator/html/frame';
import { headValidator } from 'validator/html/head';
import { htmlValidator } from 'validator/html/html';
import { imgValidator } from 'validator/html/img';
import { tableValidator } from 'validator/html/table';
import { videoAndAudioValidator } from 'validator/html/videoAndAudio';
import { xssValidator } from 'validator/html/xss';

export const HTMLValidator = (parsedHTMLCode: HTMLNode): boolean => {
  let hasProblem = false;

  for (const node of Object.values(parsedHTMLCode)) {
    if (isText(node) && TextValidator(node)) hasProblem = true;
    if (isElement(node) && ElementValidator(node)) hasProblem = true;
  }
  return hasProblem;
}

const getSuggestion = (node: HTMLType): HTMLSuggestion => {
  if (node.suggestion !== undefined) return node.suggestion;
  const suggestion = new HTMLSuggestion(node);
  node.suggestion = suggestion;
  return suggestion;
}

const TextValidator = (node: Text): boolean => {
  const suggestion = getSuggestion(node);
  xssValidator(suggestion);

  if (suggestion && suggestion.getDescription().length > 0) {
    return true;
  }
  return false;
}

const ElementValidator = (node: Element): boolean => {
  const suggestion = getSuggestion(node);
  htmlValidator(suggestion);
  headValidator(suggestion);
  aValidator(suggestion);
  tableValidator(suggestion);
  imgValidator(suggestion);
  videoAndAudioValidator(suggestion);
  frameValidator(suggestion);

  let hasProblem = false;

  if (node.children !== undefined && node.name !== 'script') {
    hasProblem = HTMLValidator(node.children);
  }

  if (suggestion && suggestion.getDescription().length > 0) {
    hasProblem = true;
  }

  return hasProblem;
}

