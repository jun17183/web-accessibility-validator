import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'html',
  code: '',
  parsedCode: null,
  selectedCode: null,
  description: [],
  hasProblem: false,
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
    setSelectedCode: (state, action) => {
      state.selectedCode = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setHasProblem: (state, action) => {
      state.hasProblem = action.payload;
    },
    resetState: () => initialState,
  }
});

export default codeSlice;
export const { 
  setLanguage, 
  setCode, 
  setParsedCode, 
  setSelectedCode, 
  setDescription, 
  setHasProblem, 
  resetState 
} = codeSlice.actions;