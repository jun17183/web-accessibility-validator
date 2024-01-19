import { createSlice } from '@reduxjs/toolkit';

const codeSlice = createSlice({
  name: 'code',
  initialState: {
    language: 'html',
    code: '',
    parsedCode: null,
    selectedCode: null,
    description: [],
  },
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
    setSelectedCode: (state, action) => {
      state.selectedCode = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
  }
});

export default codeSlice;
export const { setLanguage, setCode, setParsedCode, setSelectedCode, setDescription } = codeSlice.actions;