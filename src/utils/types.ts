import { ChildNode } from 'domhandler';

export type Language = 'html' | 'css';

export interface CSSNode {
    attributes: { [key: string]: string | string[] };
    children: { [key: string]: CSSNode };
    [key: number]: any;
}

export type SelectorType = 'element' | 'idAndClass' | 'attrib' | 'pseudo' | 'key' | 'value' | 'combinator' | 'annotation';
export type AttribValueType = 'string' | 'number' | 'pseudo' | 'attrib' | 'important' | 'annotation';

export type ParsedCode = ChildNode[] | CSSNode | null;

export interface CodeState {
  language: Language;
  code: string;
  parsedCode: ParsedCode;
  suggestion: Suggestion;
}

export interface Suggestion {
  node: ParsedCode;
  description: string[];
}