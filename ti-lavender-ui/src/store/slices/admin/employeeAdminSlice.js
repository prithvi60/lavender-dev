import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  employees: [],
  editEmployeeId: null,
};

export const employeeAdminSlice = createSlice({
  name: 'employeeAdmin',
  initialState,
  reducers: {
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
  reset,
  addEmployee,
  updateEmployee,
  editEmployee,
  removeEmployee
} = employeeAdminSlice.actions;
export default employeeAdminSlice.reducer;