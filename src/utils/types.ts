export type Language = 'html' | 'css';

export type Code = {
  language: Language;
  code: string;
}

export type ProcessingInstruction = {
  type: 'directive';
  data: string;
}

export type Element = {
  type: 'tag';
  name: string;
  attribs: Object;
  children?: Array<Element | TextNode>
}
export type TextNode = {
  type: 'text';
  data: string;
}
