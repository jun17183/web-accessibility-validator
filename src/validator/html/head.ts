import { Element, HTMLNode, HTMLSuggestion } from 'utils/types'
import { isElement } from 'utils/util';

export const headValidator = (suggestion: HTMLSuggestion) => {
  let hasProblem = false;
  const node = suggestion.getNode() as Element;
  const suggestionNode = suggestion.getSuggestionNode() as Element;

  if (node.name !== 'head') return;

  const meta_UTF8: Element = {
    type: 'Element',
    name: 'meta',
    attribs: {
      charset: 'UTF-8',
    },
  }

  const meta_viewport: Element = {
    type: 'Element',
    name: 'meta',
    attribs: {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    },
  }

  // head 태그에 자식 태그가 없는 경우
  if (!hasChildNode(node)) {
    hasProblem = true;
    suggestionNode.children = { 
      node_1: meta_UTF8,
      node_2: meta_viewport,
    }
    suggestion.addDescription(`
      The <head> tag should always include child tags.
    `);
  }

  // head 태그에 <meta name='viewport'>가 없는 경우
  if (!hasMetaViewport(node)) {
    hasProblem = true;
    const children = suggestionNode.children as HTMLNode;
    const keys = Object.keys(children);
    const nodeNum = Number(keys[keys.length - 1].split("_")[1]) + 1;

    children['node_' + nodeNum] = meta_viewport;
    
    suggestion.addDescription(`
      The <head> tag should always include a <meta name="viewport"> tag.
    `);
  }
}

const hasChildNode = (node: Element): boolean => {
  if (!node.children) return false;
  return true;
}

const hasMetaViewport = (node: Element): boolean => {
  if (!node.children) return false;
  let flag = false;
  Object.values(node.children).map(item => {
    if (!isElement(item)) return;
    if (item.name !== 'meta') return;
    if (item.attribs['name'] === 'viewport') flag = true;
  });
  return flag;
}