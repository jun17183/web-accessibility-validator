import { createSlice } from '@reduxjs/toolkit';
import { CodeState, Language, ParsedCode, Suggestion } from 'utils/types';

const initialState: CodeState = {
  language: 'html',
  code: '',
  parsedCode: null,
  suggestion: { node: null, description: [] },
}

const codeSlice = createSlice({
  name: 'code',
  initialState: initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setParsedCode: (state, action) => {
      state.parsedCode = action.payload;
    },
    setSuggestion: (state, action) => {
      state.suggestion = action.payload;
    },
  }
});

export default codeSlice;
export const { setLanguage, setCode, setParsedCode, setSuggestion } = codeSlice.actions;