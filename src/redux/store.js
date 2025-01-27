import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './themeReducer';
import userReducer from './userReducer';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});