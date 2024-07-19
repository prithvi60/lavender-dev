import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  establishmentData: {}
};

export const businessSlice = createSlice({
  name: 'businessEstablishment',
  initialState,
  reducers: {
    setEstablishmentData: (state, action) => {
      state.establishmentData = action.payload
    },
    getEstablishmentData: (state, action) => {
        return state.establishmentData
    },
    reset: (state) => {
      state = {...initialState}
    },
  },
});

export const {
    setEstablishmentData,
    getEstablishmentData,
    reset,
} = businessSlice.actions;

export default businessSlice.reducer;