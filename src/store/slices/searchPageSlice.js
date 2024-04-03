import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBox: "", // Add form field for selected box
  showOptionContainer: false, // Add form field for show option container
  treatmentList: [],
  locationList: [],
  selectedDate: "",
  SelectedTime: { from: "12 am", to: "11 pm" },
};

export const searchPageSlice = createSlice({
  name: "searchPage",
  initialState,
  reducers: {
    saveSearchInputs: (state, action) => {
      debugger;
      state.treatmentList = action.payload.treatment;
      state.locationList = action.payload.locationList;
      state.selectedDate = action.payload?.selectedDate;
      state.SelectedTime = action.payload?.SelectedTime;
    },
    updateSearchTreatment: (state, action) => {
      debugger;
      state.treatmentList = action.payload.treatment;
    },
    updateSearchDate: (state, action) => {
      debugger;
      state.selectedDate = action.payload.selectedDate;
    },
    updateSearchTimeFrom: (state, action) => {
      debugger;
      state.SelectedTime.from = action.payload.SelectedTimeFrom;
    },
    updateSearchTimeTo: (state, action) => {
      debugger;
      state.SelectedTime.to = action.payload.SelectedTimeTo;
    },
    updateSearchSelectedBox: (state, action) => {
      debugger;
      state.selectedBox = action.payload.selectedBox;
      state.showOptionContainer = action.payload.showOptionContainer;
    },
    updateSearchLocationList: (state, action) => {
      debugger;
      state.locationList = action.payload.locationList;
    },
    closeSearchModal: (state) => {
      debugger;
      state.showOptionContainer = false;
    },
    reset: (state) => {
      state = { ...initialState };
    },
  },
});

export const {
  saveSearchInputs,
  updateSearchTimeTo,
  closeSearchModal,
  updateSearchLocationList,
  updateSearchTimeFrom,
  reset,
  updateSearchSelectedBox,
  updateSearchTreatment,
  updateSearchDate,
} = searchPageSlice.actions;
export default searchPageSlice.reducer;
