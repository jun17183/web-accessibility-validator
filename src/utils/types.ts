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
  attribs: Object;
  children?: HTMLNode;
}

export interface ProcessingInstruction extends HTMLType {
  name: '!doctype';
  data: '!DOCTYPE html';
}

export interface HTMLType {
  type: 'Element' | 'Text' | 'ProcessingInstruction'
  suggestion?: {
    code: HTMLNode;
    description: string;
  }
}

export interface HTMLNode {
  [key: string]: Element | Text | ProcessingInstruction;
};
/* ============================================================  */


/* ============================ CSS ============================  */
export interface CSSNodeValue { 
  name: string; 
  type: string;
  value: CSSNode | string;
  suggestion?: {
    code: CSSNodeValue;
    description: string;
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
