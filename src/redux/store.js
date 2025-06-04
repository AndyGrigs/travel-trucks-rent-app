import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campersSlice';

export default configureStore({
  reducer: {
    campers: campersReducer,
  },
});
