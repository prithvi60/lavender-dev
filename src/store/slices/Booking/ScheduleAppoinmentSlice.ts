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
  payAtVenue: boolean;
  tncAgree: boolean;
  promotionAgree: boolean;
  serviceNotes: string;
  selectedTimeSlot: string;
}

const initialState: IScheduleAppoinment = {
  selectedDate: new Date(),
  timeOfDay: null,
  startTime: "",
  endTime: "",
  id :'',
  totalPrice:'',
  totalDuration: '',
  payAtVenue: false,
  tncAgree: false,
  promotionAgree: false,
  serviceNotes: "",
  selectedTimeSlot: null,
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
      
    },
    UpdateEmployeeId: (state, action) => {
      state.id = action.payload.id;
    },

    UpdateCheckoutInfo: (state, action) => {
      state.totalPrice= action.payload.totalPrice;
      state.totalDuration= action.payload.totalDuration;
    },
    UpdateTermsNConditions: (state, action) => {
      state.payAtVenue = action.payload.payAtVenue;
      state.tncAgree = action.payload.tncAgree;
      state.promotionAgree = action.payload.promotionAgree;
      state.serviceNotes = action.payload.serviceNotes;
    },
    resetFilter: () => {
      return initialState;
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setSelectedTimeSlot: (state, action) => {
      state.selectedTimeSlot = action.payload;
    },
  },
});

export const { UpdateSelectedDate, UpdateTimeOfDayAndTime,UpdateEmployeeId, UpdateCheckoutInfo, UpdateTermsNConditions, resetFilter } =
  ScheduleAppoinmentSlice.actions;

export default ScheduleAppoinmentSlice.reducer;
