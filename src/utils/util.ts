import { Comment, Element, HTMLType, ProcessingInstruction, Text } from 'utils/types';

export const isText = (node: HTMLType): node is Text => node.type === 'Text';
export const isElement = (node: HTMLType): node is Element => node.type === 'Element';
export const isProcessingInstruction = (node: HTMLType): node is ProcessingInstruction => node.type === 'ProcessingInstruction';
export const isComment = (node: HTMLType): node is Comment => node.type === 'Comment';