import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openDrawer: "",
  employees: [],
  editEmployeeId: {},
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
      state.employees.map(item => {
        return item?.id === action.payload.id ? {...item, ...action.payload} : item;
      })
    },
    editEmployee: (state, action) => {
      state.editEmployeeId = action.payload.editEmployeeId;
    },
    reset: (state) => {
      state = {...initialState}
    },
  },
});

export const { saveOpenDrawer, reset, addEmployee, updateEmployee, editEmployee } = adminPageSlice.actions;
export default adminPageSlice.reducer;