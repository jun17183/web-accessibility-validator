import { ChildNode } from 'domhandler';

export type Language = 'html' | 'css';

export type Code = {
  language: Language;
  code: string;
}

export type ParsedCode = ChildNode[] | CSSNode | null;

export interface CSSNode {
    attributes: { [key: string]: string | string[] };
    children: { [key: string]: CSSNode };
    [key: number]: any;
}

export type SelectorType = 'element' | 'idAndClass' | 'attrib' | 'pseudo' | 'key' | 'value' | 'combinator';

export class CSSToken {
  type;
  data;
  constructor(type: SelectorType) {
    this.type = type;
    this.data = '';
  }
}