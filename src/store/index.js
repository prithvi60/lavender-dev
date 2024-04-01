import { configureStore } from '@reduxjs/toolkit';
import searchPageReducer from './slices/searchPageSlice';
import adminPageReducer from './slices/adminPageSlice';
import employeeAdminReducer from './slices/admin/employeeAdminSlice';
import serviceAdminReducer from './slices/admin/serviceAdminSlice';
import establishmentAdminReducer from './slices/admin/establishmentAdminSlice';
import loginPageReducer from './slices/login/loginPageSlice';
import userAdminReducer from './slices/admin/userAdminSlice';
import filterModalSlice from './slices/filterModal';

const store = configureStore({
  reducer: {
    searchPage: searchPageReducer,
    adminPage: adminPageReducer,
    employeeAdmin: employeeAdminReducer,
    serviceAdmin: serviceAdminReducer,
    establishmentAdmin: establishmentAdminReducer,
    userAdmin: userAdminReducer,
    loginPage: loginPageReducer,
    filterModal : filterModalSlice
  },
});

window.store = store;

export default store;