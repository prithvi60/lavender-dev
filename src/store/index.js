import { configureStore } from '@reduxjs/toolkit';
import searchPageReducer from './slices/searchPageSlice';
import adminPageReducer from './slices/adminPageSlice';

const store = configureStore({
  reducer: {
    searchPage: searchPageReducer,
    adminPage: adminPageReducer
  },
});

window.store = store;

export default store;