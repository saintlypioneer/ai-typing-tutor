import { configureStore } from '@reduxjs/toolkit';
import typingReducer from './typingSlice';

const preloadedState = localStorage.getItem('typing')
  ? JSON.parse(localStorage.getItem('typing'))
  : {};

const store = configureStore({
  reducer: {
    typing: typingReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  localStorage.setItem('typing', JSON.stringify(store.getState().typing));
});

export default store;
