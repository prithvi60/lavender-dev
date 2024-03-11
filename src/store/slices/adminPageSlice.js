import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openDrawer: "",
  employees: [],
};

export const adminPageSlice = createSlice({
  name: 'adminPage',
  initialState,
  reducers: {
    saveOpenDrawer: (state, action) => {
        state.openDrawer = action.payload.openDrawer
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload.employee)
    },
    reset: (state) => {
      state = {...initialState}
    },
  },
});

export const { saveOpenDrawer, reset, addEmployee } = adminPageSlice.actions;
export default adminPageSlice.reducer;