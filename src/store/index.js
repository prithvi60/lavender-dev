import { configureStore } from '@reduxjs/toolkit';
import searchPageReducer from './slices/searchPageSlice';
import adminPageReducer from './slices/adminPageSlice';
import employeeAdminReducer from './slices/admin/employeeAdminSlice';

const store = configureStore({
  reducer: {
    searchPage: searchPageReducer,
    adminPage: adminPageReducer,
    employeeAdmin: employeeAdminReducer
  },
});

window.store = store;

export default store;