import { createSlice } from "@reduxjs/toolkit";
import { TimeOfDay } from "../../../api/type";

interface IScheduleAppoinment {
  selectedDate: Date;
  timeOfDay: TimeOfDay;
  startTime: string;
  endTime: string;
  id:string;
  totalPrice: string;
  totalDuration: string;
}

const initialState: IScheduleAppoinment = {
  selectedDate: new Date(),
  timeOfDay: null,
  startTime: "",
  endTime: "",
  id :'',
  totalPrice:'',
  totalDuration: ''
};

export const ScheduleAppoinmentSlice = createSlice({
  name: "ScheduleAppoinment",
  initialState,
  reducers: {
    UpdateSelectedDate: (state, action) => {
      
      state.selectedDate = action.payload.selectedDate;
    },
    UpdateTimeOfDayAndTime: (state, action) => {
      state.timeOfDay = action.payload.TimeOfDay;
      state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
      state.id = action.payload.id;
    },
    UpdateCheckoutInfo: (state, action) => {
      state.totalPrice= action.payload.totalPrice;
      state.totalDuration= action.payload.totalDuration;
    },
    resetFilter: () => {
      return initialState;
    },
  },
});

export const { UpdateSelectedDate, UpdateTimeOfDayAndTime, UpdateCheckoutInfo, resetFilter } =
  ScheduleAppoinmentSlice.actions;

export default ScheduleAppoinmentSlice.reducer;
