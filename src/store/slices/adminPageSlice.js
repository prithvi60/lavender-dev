import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openDrawer: "",
};

export const adminPageSlice = createSlice({
  name: 'searchPage',
  initialState,
  reducers: {
    saveOpenDrawer: (state, action) => {
        state.openDrawer = action.payload.openDrawer
    },
    reset: (state) => {
      state = {...initialState}
    },
  },
});

export const { saveOpenDrawer, reset } = adminPageSlice.actions;
export default adminPageSlice.reducer;