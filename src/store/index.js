import { configureStore } from '@reduxjs/toolkit';
import searchPageReducer from './slices/searchPageSlice';

const store = configureStore({
  reducer: {
    searchPage: searchPageReducer
  },
});

window.store = store;

export default store;