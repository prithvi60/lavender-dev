import { createSlice } from "@reduxjs/toolkit";

const initialState = { checkOut: [] };

const checkOutPageSlice = createSlice({
  name: "checkOutPageSlice",
  initialState,
  reducers: {
    updateCheckOut: (state, action) => {
      console.log("action", action.payload);
      const { serviceId, optionId, serviceDuration } = action.payload;
      const existingIndex = state.checkOut.findIndex(
        (item) => item.serviceId === serviceId && item.optionId === optionId
      );
      if (existingIndex === -1) {
        state.checkOut.push({
          ...action.payload,
          serviceDuration: serviceDuration || 0,
        });
      }
    },
    resetCheckOut: (state, action) => {
      const { serviceId, optionId } = action.payload;
      state.checkOut = state.checkOut.filter(
        (item) => !(item.serviceId === serviceId && item.optionId === optionId)
      );
    },
    removeCheckOutDetails: () => {
      return initialState;
    },
  },
});

export const { updateCheckOut, resetCheckOut, removeCheckOutDetails } =
  checkOutPageSlice.actions;

export default checkOutPageSlice.reducer;
