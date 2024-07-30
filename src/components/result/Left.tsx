import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setHasProblem, setParsedCode } from 'reducers/codeSlice';
import { RootState } from 'reducers/store';

import { ChildNode, DomHandler, Text, isComment, isDirective, isTag } from 'domhandler';
import { Parser } from 'htmlparser2';
import { cssToJson } from 'utils/cssjson';

import { Comment as CustomComment, Element as CustomElement, ProcessingInstruction as CustomProcessingInstruction, Text as CustomText, HTMLNode } from 'utils/types';

import Box from 'components/result/Box';
import BoxTitle from 'components/result/BoxTitle';
import Highlighter from 'highlighter/Highlighter';
import { CSSValidator } from 'validator/css';
import { HTMLValidator } from 'validator/html';
import CodeBlock from './CodeBlock';

export default function Left() {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.codeReducer.language);
  const code = useSelector((state: RootState) => state.codeReducer.code);
  const parsedCode = useSelector((state: RootState) => state.codeReducer.parsedCode);

  const covertChildNodeToHtmlNode = (childNode: ChildNode | ChildNode[]): HTMLNode => {
    const _covertChildNodeToHtmlNode = (childNode: ChildNode): CustomElement | CustomText | CustomProcessingInstruction | CustomComment => {
      // Tag
      if (isTag(childNode)) {
        const element: CustomElement = {
          type: 'Element',
          name: childNode.name,
          attribs: childNode.attribs,
        }
        if (childNode.children !== undefined && childNode.children.length > 0) {
          element.children = covertChildNodeToHtmlNode(childNode.children);
        }
        return element;
      }
      // ProcessingInstruction
      if (isDirective(childNode)) {
        const processingInstruction: CustomProcessingInstruction = {
          type: 'ProcessingInstruction',
          name: '!doctype',
          data: '!DOCTYPE html',
        }
        return processingInstruction;
      }
      // Comment
      if (isComment(childNode)) {
        const comment: CustomComment = {
          type: 'Comment',
          data: childNode.data,
          comment: true,
        }
        return comment;
      }
      // Text
      const text: CustomText = {
        type: 'Text',
        data: (childNode as Text).data,
      }
      return text;
    }

    const HTMLNode: HTMLNode = {}

    if (Array.isArray(childNode)) {
      childNode.forEach((node: ChildNode, i) => {
        HTMLNode['node_' + i] = _covertChildNodeToHtmlNode(node);
      });
    } else {
      HTMLNode['node_1'] = _covertChildNodeToHtmlNode(childNode);
    }
    return HTMLNode;
  }

  // css도 exception 추가. 에러나는 css 파일 올리면 무한로딩 걸림
  useEffect(() => {
    if (language === 'html') {
      const handler = new DomHandler((error, result) => {
        if (error) {
          alert(error);
        } else {
          const parsedHtmlCode: HTMLNode = covertChildNodeToHtmlNode(result);

          dispatch(setHasProblem(HTMLValidator(parsedHtmlCode)));
          dispatch(setParsedCode(parsedHtmlCode));
        }
      });
      const parser = new Parser(handler);
      parser.write(code);
      parser.end();

    } else if (language === 'css') {
      const parsedCSSCode = cssToJson(code);

      if (parsedCSSCode['result'] === 'syntax error') {
        dispatch(setParsedCode('error'));
      } else {
        dispatch(setHasProblem(CSSValidator(parsedCSSCode)));
        dispatch(setParsedCode(parsedCSSCode));
      }
    }
  }, [code]);

  return (
    <Box>
      <>
        <BoxTitle>Your Code</BoxTitle>
        <CodeBlock><Highlighter parsedCode={parsedCode} /></CodeBlock>
      </>
    </Box>
  );
}