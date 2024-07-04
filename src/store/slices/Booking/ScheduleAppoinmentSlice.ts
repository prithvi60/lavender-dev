import { createSlice } from "@reduxjs/toolkit";
import { TimeOfDay } from "../../../api/type";

interface IScheduleAppoinment {
  selectedDate: Date;
  timeOfDay: TimeOfDay;
  startTime: string;
  endTime: string;
  id:string;
}

const initialState: IScheduleAppoinment = {
  selectedDate: new Date(),
  timeOfDay: null,
  startTime: "",
  endTime: "",
  id :''
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
    resetFilter: () => {
      return initialState;
    },
  },
});

export const { UpdateSelectedDate, UpdateTimeOfDayAndTime, resetFilter } =
  ScheduleAppoinmentSlice.actions;

export default ScheduleAppoinmentSlice.reducer;
