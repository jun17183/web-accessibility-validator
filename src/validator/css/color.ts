import tinycolor from "tinycolor2";
import colorNames from 'color-name-list';
import { CSSNode, CSSNodeValue, CSSSuggestion } from 'utils/types';

export const colorValidator = (suggestion: CSSSuggestion) => {
  const node = suggestion.getNode();
  const suggestionNode = suggestion.getSuggestionNode();
  const rules = Object.values(node.value) as CSSNodeValue[];
  
  const colorNameArray = colorNames.map(color => color.name);
  const colorNameString = '\\b(' + colorNameArray.join('|') + ')\\b';

  const hexReg = /#([0-9a-f]{3}){1,2}\b/i;
  const rgbReg = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/i;
  const colorNameReg = new RegExp(colorNameString, 'i');

  let backgroundColor;
  let borderColor;
  let textColor;

  // 색상 추출
  rules.forEach(({name, value}) => {
    value = value as string;  // 선택자 { string: string } 라는 전제

    if (name === 'background-color') return backgroundColor = value;
    if (name === 'background') {
      let hex = value.match(hexReg);
      if (hex !== null) return backgroundColor = hex[0];

      let rgb = value.match(rgbReg);
      if (rgb !== null) return backgroundColor = rgb[0];
      
      let colorName = value.match(colorNameReg);
      if (colorName !== null) return backgroundColor = colorName[0];
    }
    if (name === 'border') {
      let borderToken = value.split(" ");
      if (borderToken.length > 2) {
        return borderColor = value.split(" ")[2];
      }
    }
    if (name === 'color') return textColor = value;
  });

  // 배경색이 없으면 검사 종료
  if (!backgroundColor) return;

  // suggestionNode value에 이미 background-color 추가했는지 여부
  let isBackgroundColorInSuggestionNode = false;

  // 추가할 value obj & 추가할 rule 넘버링 len
  const value = suggestionNode.value as CSSNode;
  let num = Object.keys(value).length;

  // 테두리 검사
  if (borderColor && !isValidContrastRatio(backgroundColor, borderColor)) {

    if (!isBackgroundColorInSuggestionNode) {
      value['rule_' + num++] = { 
        name: 'background-color', 
        type: 'attr',
        value: backgroundColor, 
      };
      isBackgroundColorInSuggestionNode = true;
    }

    value['rule_' + num++] = { 
      name: 'border', 
      type: 'attr',
      value: getRecommendColor(backgroundColor, borderColor), 
    };

    suggestion.addDescription(`
      The color contrast ratio between the background and the border should be at least 4.5.
    `);
  }
  
  // 텍스트 검사
  if (textColor && !isValidContrastRatio(backgroundColor, textColor)) {
    const value = suggestionNode.value as CSSNode;

    if (!isBackgroundColorInSuggestionNode) {
      value['rule_' + num++] = { 
        name: 'background-color', 
        type: 'attr',
        value: backgroundColor, 
      };
      isBackgroundColorInSuggestionNode = true;
    }

    value['rule_' + num++] = { 
      name: 'color', 
      type: 'attr',
      value: getRecommendColor(backgroundColor, textColor), 
    };

    suggestion.addDescription(`
      The color contrast ratio between the background and the text should be at least 4.5.
    `);
  }
}

const isValidContrastRatio = (color1: string, color2: string) => {
  let c1 = tinycolor(color1);
  let c2 = tinycolor(color2);

  const contrastRatio = tinycolor.readability(c1, c2);

  if (contrastRatio < 4.5) return false;
  return true;
}

const getRecommendColor = (color1: string, color2: string) => {
  let contrastRatio = tinycolor.readability(color1, color2);

  if (contrastRatio < 4.5) {
    let brightness = tinycolor(color1).getBrightness();
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }
  return color2;
}