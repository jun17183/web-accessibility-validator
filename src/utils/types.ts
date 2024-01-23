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

export interface HTMLNode {
  [key: string]: Element | Text | ProcessingInstruction;
};

export class HTMLSuggestion {
  private node: HTMLType;
  private suggestionNode: HTMLType;
  private description: string[];
  
  constructor(node: HTMLType) {
    this.node = node;
    this.suggestionNode = JSON.parse(JSON.stringify(node));
    this.description = [];
  }

  hasProblem() {
    return this.description.length > 0 ? true : false;
  }

  getSuggestion() {
    return {
      node: this.node,
      suggestionNode: this.suggestionNode,
      description: this.description,
    }
  }

  getNode(): HTMLType {
    return this.node;
  }

  getSuggestionNode(): HTMLType {
    return this.suggestionNode;
  }

  getDescription(): string[] {
    return this.description;
  }

  addDescription(description: string) {
    this.description.push(description);
  }
}
/* ============================================================  */


/* ============================ CSS ============================  */
export interface CSSNodeValue { 
  name: string; 
  type: string;
  value: CSSNode | string;
  suggestion?: CSSSuggestion;
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

export class CSSSuggestion {
  private node: CSSNodeValue;
  private suggestionNode: CSSNodeValue;
  private description: string[];
  
  constructor(node: CSSNodeValue) {
    this.node = node;
    this.suggestionNode = {
      name: node.name,
      type: node.type,
      value: {}
    };
    this.description = [];
  }

  hasProblem() {
    return this.description.length > 0 ? true : false;
  }

  getSuggestion() {
    return {
      node: this.node,
      suggestionNode: this.suggestionNode,
      description: this.description,
    }
  }

  getNode(): CSSNodeValue {
    return this.node;
  }

  getSuggestionNode(): CSSNodeValue {
    return this.suggestionNode;
  }

  getDescription(): string[] {
    return this.description;
  }

  addDescription(description: string) {
    this.description.push(description);
  }
}
/* =============================================================  */
