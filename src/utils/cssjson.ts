import { CSSNode, CSSNodeValue } from 'utils/types';

interface Args {
  ordered: boolean;
  comments: boolean;
  stripComments: boolean;
  split: boolean;
}

/* interface Obj {
  name?: string;
  value?: CSSNode | string;
  type?: string;
} */

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

let openBraces = 0;  // 열린 중괄호 `{`의 개수
let closeBraces = 0;  // 닫힌 중괄호 `}`의 개수

function isEmpty (x: any) {
  return typeof x === 'undefined' || x.length === 0 || x === null;
};

function trim(str: string) {
  return str.replace(/^\s+|\s+$/g, '');
}

export function cssToJson(cssString: string, args: Args = { ordered: true, comments: true, stripComments: true, split: true }): CSSNode {
  const node: CSSNode = {}
  
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
    if (!isEmpty(match[capSelector])) {
    // 새로운 CSS 규칙의 시작을 발견했습니다
    openBraces++;

      if (openBraces >= 2) {
        console.error('Syntax error: Unexpected start of CSS rule');
        return { result: 'syntax error' }
        break;
      }
    } else if (!isEmpty(match[capEnd])) {
      openBraces = 0;
    }

    if (!isEmpty(match[capComment]) && args.comments) {
      // Comment
      let add = trim(match[capComment]);
      node['rule_' + count++] = add;
    } else if (!isEmpty(match[capSelector])) {
      // New node, we recurse
      let name = match[capSelector].trim();
      // This will return when we encounter a closing brace
      let newNode = cssToJson(cssString, args);
      if (args.ordered) {
        let obj: CSSNodeValue = { 
          name: name, 
          value: newNode, 
          type: 'rule' 
        };
        // Since we must use key as index to keep order and not
        // name, this will differentiate between a Rule Node and an
        // Attribute, since both contain a name and value pair.
        node['rule_' + count++] = obj;
      } else {
        /* let bits;
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
        } */
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
          let obj: CSSNodeValue = { 
            name: name, 
            value: value, 
            type: 'attr' 
          };
          node['rule_' + count++] = obj;
        } else {
          /* if (name in node.attributes) {
            let currVal = node.attributes[name];
            if (!(currVal instanceof Array)) {
              node.attributes[name] = [currVal];
            } else {
              currVal.push(value);
            }
          } else {
            node.attributes[name] = value;
          } */
        }
      } else {
        // Semicolon terminated line
        node['rule_' + count++] = line;
      }
    }
  }
  return node;
}

