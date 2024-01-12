import { ChildNode } from 'domhandler';

export type Language = 'html' | 'css';

export type Code = {
  language: Language;
  code: string;
}

export type CssNode = {
    attributes: { [key: string]: any };
    children: { [key: string]: any };
    [key: number]: any;
}

export type ParsedCode = ChildNode[] | CssNode | null;