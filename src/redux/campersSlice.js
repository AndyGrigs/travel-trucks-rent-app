import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async () => {
    const res = await axios.get(API_URL);
    return res.data.items
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    list: [],
    favorites: [],
    filters: {},
    loading: false,
    error: null
    
  },
  reducers: {
    setCampers: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCampers.pending, (state) =>{
      state.loading = true;
    })
    .addCase(fetchCampers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
    .addCase(fetchCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const { setCampers } = campersSlice.actions;
export default campersSlice.reducer;
