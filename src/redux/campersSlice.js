import { createSlice } from '@reduxjs/toolkit';

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    list: [],
    favorites: [],
    filters: {}
  },
  reducers: {
    setCampers: (state, action) => {
      state.list = action.payload;
    },
    // решта буде пізніше
  },
});

export const { setCampers } = campersSlice.actions;
export default campersSlice.reducer;
