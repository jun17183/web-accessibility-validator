import { ReactNode } from 'react';
import { CssNode } from 'utils/types';

type SelectorType = 'element' | 'idAndClass' | 'attrib' | 'pseudo' | 'comibator';

const splitSeletor = (selector: string) => {
  let temp;
  // 1. 띄워쓰기로 분리
  // 2. > 로 분리
  // 3. id or class / element 로 분리
  // 4. 가상 선택자와 속성 선택자 부분과 아닌 부분 분리
  // 5. 아닌 부분에 색깔 적용
  // 6. 가상 선택자와 속성 선택자 분리
  // 7. 가상 선택자에 색깔 적용
  // 8. 속성 선택자 [key=value] 색깔 적용

  // >> 고민 더 해보기
  
  // 1.
  temp = selector.split(" ");

}

export default function CSSHighlighter(parsedCSSObj: CssNode): ReactNode {
  const selectors = parsedCSSObj.children;


  return <></>
}