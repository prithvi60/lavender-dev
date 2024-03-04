import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  treatment: "",
  location: "",
  salonName: "",
};

export const searchPageSlice = createSlice({
  name: 'searchPage',
  initialState,
  reducers: {
    saveSearchInputs: (state, action) => {
        state.treatment = action.payload.treatment
        state.location = action.payload.location
        state.salonName = action.payload?.salonName
    },
    reset: (state) => {
      state = {...initialState}
    },
  },
});

export const { saveSearchInputs, reset } = searchPageSlice.actions;
export default searchPageSlice.reducer;