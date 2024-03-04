import { configureStore } from '@reduxjs/toolkit';
import searchPageReducer from './slices/searchPageSlice';

const store = configureStore({
  reducer: {
    searchPage: searchPageReducer
  },
});

export default store;