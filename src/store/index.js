import { configureStore } from '@reduxjs/toolkit';
import searchPageReducer from './slices/searchPageSlice';
import adminPageReducer from './slices/adminPageSlice';
import employeeAdminReducer from './slices/admin/employeeAdminSlice';
import serviceAdminReducer from './slices/admin/serviceAdminSlice';
import establishmentAdminReducer from './slices/admin/establishmentAdminSlice';
import loginPageReducer from './slices/login/loginPageSlice';
import userAdminReducer from './slices/admin/userAdminSlice';
import filterModalSlice from './slices/filterModal';
import currentUserSlice from './slices/currentUserSlice';
import checkOutPageSlice from './slices/checkOutPageSlice';
import ScheduleAppoinmentSlice from './slices/Booking/ScheduleAppoinmentSlice';
import businessSlice from './slices/businessSlice';
import quickbookSlice from './slices/quickbookSlice';

const store = configureStore({
  reducer: {
    searchPage: searchPageReducer,
    adminPage: adminPageReducer,
    employeeAdmin: employeeAdminReducer,
    serviceAdmin: serviceAdminReducer,
    establishmentAdmin: establishmentAdminReducer,
    userAdmin: userAdminReducer,
    loginPage: loginPageReducer,
    currentUserDetails: currentUserSlice,
    filterModal : filterModalSlice,
    checkOutPage: checkOutPageSlice,
    ScheduleAppoinment: ScheduleAppoinmentSlice,
    businessEstablishment: businessSlice,
    quickBook: quickbookSlice,
  },
});

window.store = store;

export default store;