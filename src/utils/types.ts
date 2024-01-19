export type Language = 'html' | 'css';

export type Code = {
  language: Language;
  code: string;
}

export type ParsedCode = HTMLNode | CSSNode | null;

/* =========================== HTML ===========================  */
export interface Text extends HTMLType {
  data: string;
}

export interface Element extends HTMLType {
  name: string;
  attribs: { [name: string]: string };
  children?: HTMLNode;
}

export interface ProcessingInstruction extends HTMLType {
  name: '!doctype';
  data: '!DOCTYPE html';
}

export interface HTMLType {
  type: 'Element' | 'Text' | 'ProcessingInstruction'
  suggestion?: HTMLSuggestion
}

type HeadTag = '' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HTMLNode {
  [key: string]: Element | Text | ProcessingInstruction;
};

export class HTMLSuggestion {
  private node: HTMLType;
  private description: string[];
  private headTag: HeadTag;
  
  constructor(node: HTMLType) {
    this.node = node;
    this.description = [];
    this.headTag = '';
  }

  hasProblem() {
    return this.description.length > 0 ? true : false;
  }

  set(node: HTMLType, description: string[]) {
    this.node = node;
    this.description = [...this.description, ...description];
  }

  getNode(): HTMLType {
    return this.node;
  }

  getDescription(): string[] {
    return this.description;
  }

  addDescription(description: string) {
    this.description.push(description);
  }

  getHead() {
    return this.headTag;
  }

  setHead(headTag: HeadTag) {
    this.headTag = headTag;
  }
}
/* ============================================================  */


/* ============================ CSS ============================  */
export interface CSSNodeValue { 
  name: string; 
  type: string;
  value: CSSNode | string;
  suggestion?: {
    node: CSSNodeValue;
    description: string[];
  }
}

export interface CSSNode {
  [key: string]: CSSNodeValue | string;
}

export type SelectorType = 
  'element'
  | 'idAndClass'
  | 'attrib'
  | 'pseudo' 
  | 'key' 
  | 'value' 
  | 'combinator' 
  | 'annotation'
;
export type AttribValueType = 
  'string' 
  | 'number' 
  | 'pseudo' 
  | 'attrib' 
  | 'important' 
  |'annotation'
;
/* =============================================================  */
