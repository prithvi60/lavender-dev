import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openDrawer: "",
  employees: [],
  editEmployeeId: null,
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
    updateEmployee: (state, action) => {
      state.employees = state.employees.map(item => {
        return item?.id === action.payload.employee.id ? {...item, ...action.payload.employee} : item;
      })
    },
    removeEmployee: (state, action) => {
      state.employees =  state.employees.filter(item => item?.id !== action.payload.id);
    },
    editEmployee: (state, action) => {
      state.editEmployeeId = action.payload.editEmployeeId;
    },
    reset: (state) => {
      state = {...initialState}
    },
  },
});

export const {
  saveOpenDrawer,
  reset,
  addEmployee,
  updateEmployee,
  editEmployee,
  removeEmployee
} = adminPageSlice.actions;
export default adminPageSlice.reducer;