import { configureStore } from '@reduxjs/toolkit';
import codeSlice from 'reducers/codeSlice';

const store = configureStore({
  reducer: {
    codeReducer: codeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;