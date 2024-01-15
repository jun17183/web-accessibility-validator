import { CssNode } from 'utils/types';

interface Args {
    ordered: boolean;
    comments: boolean;
    stripComments: boolean;
    split: boolean;
}

interface Obj {
    name?: string;
    value?: CssNode | string;
    type?: string;
}

// const selX = /([^\s\;\{\}][^\;\{\}]*)\{/g;
// const endX = /\}/g;
// const lineX = /([^\;\{\}]*)\;/g;
const commentX = /\/\*[\s\S]*?\*\//g;
const lineAttrX = /([^\:]+):([^\;]*);/;

// This is used, a concatenation of all above. We use alternation to
// capture.
const altX = /(\/\*[\s\S]*?\*\/)|([^\s\;\{\}][^\;\{\}]*(?=\{))|(\})|([^\;\{\}]+\;(?!\s*\*\/))/gmi;

// Capture groups
let capComment = 1;
let capSelector = 2;
let capEnd = 3;
let capAttr = 4;

function isEmpty (x: any) {
    return typeof x === 'undefined' || x.length === 0 || x === null;
};

function trim(str: string) {
    return str.replace(/^\s+|\s+$/g, '');
}

export function cssToJson(cssString: string, args?: Args): CssNode {
    const node: CssNode = {
        children: {},
        attributes: {},
    };
    let match = null;
    let count = 0;

    if (typeof args === 'undefined') {
        args = {
            ordered: false,
            comments: false,
            stripComments: false,
            split: false
        };
    }

    if (args.stripComments) {
        args.comments = false;
        cssString = cssString.replace(commentX, '');
    }

    while ((match = altX.exec(cssString)) != null) {
        if (!isEmpty(match[capComment]) && args.comments) {
            // Comment
            let add = trim(match[capComment]);
            node[count++] = add;
        } else if (!isEmpty(match[capSelector])) {
            // New node, we recurse
            let name = match[capSelector].trim();
            // This will return when we encounter a closing brace
            let newNode = cssToJson(cssString, args);
            if (args.ordered) {
              let obj: Obj = {};
              obj['name'] = name;
              obj['value'] = newNode;
              // Since we must use key as index to keep order and not
              // name, this will differentiate between a Rule Node and an
              // Attribute, since both contain a name and value pair.
              obj['type'] = 'rule';
              node[count++] = obj;
            } else {
              let bits;
              if (args.split) {
                bits = name.split(',');
              } else {
                bits = [name];
              }
              for (let i in bits) {
                let sel = trim(bits[i]);
                if (sel in node.children) {
                  for (let att in newNode?.attributes) {
                    node.children[sel].attributes[att] = newNode.attributes[att];
                  }
                } else {
                  node.children[sel] = newNode;
                }
              }
            }
          } else if (!isEmpty(match[capEnd])) {
            // Node has finished
            return node;
          } else if (!isEmpty(match[capAttr])) {
            let line = trim(match[capAttr]);
            let attr = lineAttrX.exec(line);
            if (attr) {
              // Attribute
              let name = trim(attr[1]);
              let value = trim(attr[2]);
              if (args.ordered) {
                let obj: Obj = {};
                obj['name'] = name;
                obj['value'] = value;
                obj['type'] = 'attr';
                node[count++] = obj;
              } else {
                if (name in node.attributes) {
                  let currVal = node.attributes[name];
                  if (!(currVal instanceof Array)) {
                    node.attributes[name] = [currVal];
                  } else {
                    currVal.push(value);
                  }
                } else {
                  node.attributes[name] = value;
                }
              }
            } else {
              // Semicolon terminated line
              node[count++] = line;
            }
          }
    }
    return node;
}

