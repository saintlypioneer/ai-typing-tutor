import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wpm: 0,
  accuracy: 100,
  keyCount: 0,
};

const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setWpm: (state, action) => {
      state.wpm = action.payload;
    },
    setAccuracy: (state, action) => {
      state.accuracy = action.payload;
    },
    setKeyCount: (state, action) => {
      state.keyCount = action.payload;
    },
  },
});

export const { setWpm, setAccuracy, setKeyCount } = typingSlice.actions;

export default typingSlice.reducer;
