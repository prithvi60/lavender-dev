import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  services: [],
  editServiceId: null,
};

export const serviceAdminSlice = createSlice({
  name: 'serviceAdmin',
  initialState,
  reducers: {
    addService: (state, action) => {
      state.services.push(action.payload.service)
    },
    updateService: (state, action) => {
      state.services = state.services.map(item => {
        return item?.id === action.payload.service.id ? {...item, ...action.payload.service} : item;
      })
    },
    removeService: (state, action) => {
      state.services =  state.services.filter(item => item?.id !== action.payload.id);
    },
    editService: (state, action) => {
      state.editServiceId = action.payload.editServiceId;
    },
    reset: (state) => {
      state = {...initialState}
    },
  },
});

export const {
  reset,
  addService,
  updateService,
  editService,
  removeService
} = serviceAdminSlice.actions;
export default serviceAdminSlice.reducer;