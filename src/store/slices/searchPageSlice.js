import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  selectedBox: "", // Add form field for selected box
  showOptionContainer: false, // Add form field for show option container
  treatmentList: [],
  locationList: [],
  selectedDate: "",
  SelectedTime: { from: "", to: "" },
  choseFromOptions: false,
};

export const searchPageSlice = createSlice({
  name: "searchPage",
  initialState,
  reducers: {
    saveSearchInputs: (state, action) => {
      state.treatmentList = action.payload.treatment;
      state.locationList = action.payload.locationList;
      state.selectedDate = action.payload?.selectedDate;
      state.SelectedTime = action.payload?.SelectedTime;
    },
    updateSearchTreatment: (state, action) => {
      state.treatmentList = action.payload.treatment;
    },
    updateSearchDate: (state, action) => {
      state.selectedDate = action.payload.selectedDate;
    },
    updateSearchTimeFrom: (state, action) => {
      state.SelectedTime.from = action.payload.SelectedTimeFrom;
    },
    updateSearchTimeTo: (state, action) => {
      state.SelectedTime.to = action.payload.SelectedTimeTo;
    },
    updateSearchTime: (state, action) => {
      state.SelectedTime.from = action.payload.SelectedTimeFrom;
      state.SelectedTime.to = action.payload.SelectedTimeTo;
    },
    updateSearchSelectedBox: (state, action) => {
      state.selectedBox = action.payload.selectedBox;
      state.showOptionContainer = action.payload.showOptionContainer;
    },
    updateSearchLocationList: (state, action) => {
      // state.locationList = action.payload.locationList;
      // state.locationList = action.payload.locationList;
      state.locationList = action.payload;
      state.locationList = action.payload;
    },

    updateChooseFromOptions: (state, action) => {
      state.choseFromOptions = action.payload.choseFromOptions;
    },
    closeSearchModal: (state) => {
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
  updateSearchTime,
  updateChooseFromOptions,
} = searchPageSlice.actions;
export default searchPageSlice.reducer;
