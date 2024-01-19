import { Element, HTMLSuggestion } from 'utils/types'

export const imgValidator = (suggestion: HTMLSuggestion) => {
  let hasProblem = false;
  const node = suggestion.getNode() as Element;

  if (node.name !== 'img') return;

  // img 태그에 src 속성이 존재하지 않는 경우
  if (!hasSrc(node)) {
    hasProblem = true;
    node.attribs['src'] = './img.png';
    suggestion.addDescription('img 태그에 src 속성이 없습니다.')
  }

  // img 태그에 alt 속성이 존재하지 않는 경우
  if (!hasAlt(node)) {
    hasProblem = true;
    node.attribs['alt'] = 'my image';
    suggestion.addDescription('img 태그에 alt 속성이 없습니다.')
  }

  // img 태그에 title 속성이 존재하는 경우
  if (hasTitle(node)) {
    hasProblem = true;
    delete node.attribs['title'];
    suggestion.addDescription('img 태그에는 title 속성 대신 alt 속성이 있어야 합니다.')
  }
}

const hasSrc = (node: Element): boolean => {
  if (!node.attribs.hasOwnProperty('src')) return false;
  return true;
}

const hasAlt = (node: Element): boolean => {
  if (!node.attribs.hasOwnProperty('alt')) return false;
  return true;
}

const hasTitle = (node: Element): boolean => {
  if (!node.attribs.hasOwnProperty('title')) return false;
  return true;
} 
