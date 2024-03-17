import { configureStore } from '@reduxjs/toolkit';
import searchPageReducer from './slices/searchPageSlice';
import adminPageReducer from './slices/adminPageSlice';
import employeeAdminReducer from './slices/admin/employeeAdminSlice';
import serviceAdminReducer from './slices/admin/serviceAdminSlice';
import establishmentAdminReducer from './slices/admin/establishmentAdminSlice';

const store = configureStore({
  reducer: {
    searchPage: searchPageReducer,
    adminPage: adminPageReducer,
    employeeAdmin: employeeAdminReducer,
    serviceAdmin: serviceAdminReducer,
    establishmentAdmin: establishmentAdminReducer,
  },
});

window.store = store;

export default store;