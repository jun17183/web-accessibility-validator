import { ChildNode, Text, Element, ProcessingInstruction } from 'domhandler';
import { Suggestion } from 'utils/types';
import { hasAlt, hasSrc } from 'validator/html/img';

export default function HTMLValidator(node: ChildNode): Suggestion {
  let suggestion: Suggestion = {
    node: [node],
    description: [],
  }

  if (node instanceof ProcessingInstruction) {

  }
  
  if (node instanceof Text) {

  }

  if (node instanceof Element) {
    hasSrc(suggestion);
    hasAlt(suggestion);
  }

  return suggestion;
}