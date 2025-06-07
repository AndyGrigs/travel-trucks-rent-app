import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

const apiOptionKeys = {
  AC: "AC",
  TV: "TV",
  Automatic: "automatic",
  Kitchen: "kitchen",
  Bathroom: "bathroom",
  Petrol: "petrol",
};

export const fetchCampersByPage = createAsyncThunk(
  "campers/fetchCampersByPage",
  async (page, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}?page=${page}&limit=4`);
      return res.data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCampersByFilters = createAsyncThunk(
  "campers/fetchCampersByFilters",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { filters } = getState().campers;

      const params = new URLSearchParams({
        page: 1,
        limit: 4,
        ...(filters.location && { location: filters.location }),
        ...(filters.type && { form: filters.type }),
        ...(filters.options || []).reduce((acc, opt) => {
          const key = apiOptionKeys[opt];
          if (key) acc[key] = true;
          return acc;
        }, {}),
      });

      const res = await axios.get(`${API_URL}?${params.toString()}`);
      return res.data.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    list: [],
    page: 1,
    favorites: [],
    filters: {
      location: "",
      bodyType: "",
      amenities: [],
    },
    loading: false,
    error: null,
    hasMore: true,
    currentPage: 1
  },
  reducers: {
    setCampers: (state, action) => {
      state.list = action.payload;
    },
    resetPage: (state) => {
      state.page = 1;
      state.hasMore = true;
    },

    setFilters: (state, action) => {
      state.filters = action.payload;
      state.page = 1;
      state.hasMore = true;
      state.isFiltered = true;
    },

    clearFilters: (state) => {
      state.filters = {};
      state.page = 1;
      state.list = [];
      state.hasMore = true;
      state.isFiltered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampersByPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCampersByPage.fulfilled, (state, action) => {
        if (!state.isFiltered) {
          state.loading = false;
          if (action.payload.length === 0) {
            state.hasMore = false;
          } else {
            state.page += 1;
            state.list.push(...action.payload);
          }
        }
      })

      .addCase(fetchCampersByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCampersByFilters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampersByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.page = 2;
        state.list = action.payload;
        state.hasMore = action.payload.length === 4;
      })
      .addCase(fetchCampersByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCampers, resetPage, setFilters, clearFilters } =
  campersSlice.actions;
export default campersSlice.reducer;
