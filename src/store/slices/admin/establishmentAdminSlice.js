import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  establishmentError: false,
  establishments: [],
  editEstablishmentId: null,
  addEst: false,
  businessHours: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]?.reduce((acc, day) => {
    acc[day] = {
      isOpen: true,
      openTime: '',
      closeTime: '',
    };
    return acc;
  }, {}),
  currentEstablishmentId: null
};

export const establishmentAdminSlice = createSlice({
  name: 'establishmentAdmin',
  initialState,
  reducers: {
    setEstablishmentError: (state, action) => {
      state.establishmentError = action.payload.establishmentError
    },
    setAddEstablishment: (state, action) => {
      state.addEst = action.payload.addEst
    },
    addEstablishment: (state, action) => {
      state.establishments.push(action.payload.establishment)
      state.currentEstablishmentId = action.payload.establishment.id
    },
    updateEstablishment: (state, action) => {
      state.establishments = state.establishments.map(item => {
        return item?.id === action.payload.establishment.id ? {...item, ...action.payload.establishment} : item;
      })
    },
    removeEstablishment: (state, action) => {
      state.establishments =  state.establishments.filter(item => item?.id !== action.payload.id);
    },
    editEstablishment: (state, action) => {
      state.editEstablishmentId = action.payload.editEstablishmentId;
    },
    updateBusinessHours: (state, action) => {
      state.businessHours = action.payload.businessHours
    },
    reset: (state) => {
      state = {...initialState}
    },
  },
});

export const {
  setEstablishmentError,
  reset,
  setAddEstablishment,
  addEstablishment,
  updateEstablishment,
  editEstablishment,
  removeEstablishment,
  updateBusinessHours
} = establishmentAdminSlice.actions;
export default establishmentAdminSlice.reducer;