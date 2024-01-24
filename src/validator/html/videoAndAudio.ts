import { Element, HTMLNode, HTMLSuggestion } from 'utils/types'
import { isElement } from 'utils/util';

export const videoAndAudioValidator = (suggestion: HTMLSuggestion) => {
  const node = suggestion.getNode() as Element;
  const suggestionNode = suggestion.getSuggestionNode() as Element;

  if (node.name !== 'video' && node.name !== 'audio') return;

  const track_en: Element = {
    type: 'Element',
    name: 'track',
    attribs: {
      src: 'caption_en.vtt',
      kind: 'captions',
      srclang: 'en',
      label: 'English',
    },
  }

  const track_kr: Element = {
    type: 'Element',
    name: 'track',
    attribs: {
      src: 'caption_kr.vtt',
      kind: 'captions',
      srclang: 'kr',
      label: 'Korean',
    },
  }

  // video, audio 태그에 autoplay 속성이 존재하는 경우
  if (!hasAutoplay(node)) {
    delete suggestionNode.attribs['autoplay'];
    suggestion.addDescription(`
      The <video> or <audio> tag should not include a 'autoplay' attribute.
    `);
  }

  // head 태그에 <meta name='viewport'>가 없는 경우
  if (!hasTrack(node)) {
    let children = suggestionNode.children;
    if (children) {
      const keys = Object.keys(children);
      const nodeNum = Number(keys[keys.length - 1].split("_")[1]) + 1;
  
      children['node_' + nodeNum] = track_en;
      children['node_' + (nodeNum + 1)] = track_kr;
    } else {
      suggestionNode.children = {
        node_1: track_en,
        node_2: track_kr,
      }
    }
    
    suggestion.addDescription(`
      The <video> or <audio> tag should always include <track> tags.
    `);
  }
}

const hasAutoplay = (node: Element): boolean => {
  if (!node.attribs.hasOwnProperty('autoplay')) return false;
  return true;
}

const hasTrack = (node: Element): boolean => {
  if (!node.children) return false;
  let flag = false;
  Object.values(node.children).map(item => {
    if (!isElement(item)) return;
    if (item.name === 'track') flag = true;
  });
  return flag;
}