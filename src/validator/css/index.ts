import { CSSNode, CSSNodeValue } from 'utils/types';

export const CSSValidator = (parsedCSSCode: CSSNode): CSSNode => {
  Object.values(parsedCSSCode).forEach((node: CSSNodeValue | string) => {
    if (typeof node === 'string') return;
    // css는 자식이 없다는 전제이지만 한 번 확인해보기
  });
  return parsedCSSCode;
}