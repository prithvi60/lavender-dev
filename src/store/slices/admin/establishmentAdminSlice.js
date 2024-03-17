import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  establishments: [],
  editEstablishmentId: null,
};

export const establishmentAdminSlice = createSlice({
  name: 'establishmentAdmin',
  initialState,
  reducers: {
    addEstablishment: (state, action) => {
      state.establishments.push(action.payload.establishment)
    },
    updateEstablishment: (state, action) => {
      state.establishments = state.establishments.map(item => {
        return item?.id === action.payload.Establishment.id ? {...item, ...action.payload.establishment} : item;
      })
    },
    removeEstablishment: (state, action) => {
      state.establishments =  state.establishments.filter(item => item?.id !== action.payload.id);
    },
    editEstablishment: (state, action) => {
      state.editEstablishmentId = action.payload.editEstablishmentId;
    },
    reset: (state) => {
      state = {...initialState}
    },
  },
});

export const {
  reset,
  addEstablishment,
  updateEstablishment,
  editEstablishment,
  removeEstablishment
} = establishmentAdminSlice.actions;
export default establishmentAdminSlice.reducer;