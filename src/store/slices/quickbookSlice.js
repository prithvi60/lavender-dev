import { createSlice } from '@reduxjs/toolkit';


const initialState = {quickBook:{
    selectDate: "",
    selectedTime: "",
    selectedServiceId: "",
    selectedServiceName: ""
}}

const quickbookSlice = createSlice({
    
    name: 'quickbookSlice',
    initialState,
    reducers: {
        updatequickBook: (state, action) => {
            state.selectDate= action.payload.selectDate;
            state.selectedTime= action.payload.selectedTime;
            state.selectedServiceId= action.payload.selectedServiceId;
            state.selectedServiceName= action.payload.selectedServiceName;
        },
        resetquickBook: (state) => {
            state = {...initialState};
        },
        // removequickBookDetails: () => {
        //     return initialState;
        // }
    }
})

export const {updatequickBook, resetquickBook} = quickbookSlice.actions

export default quickbookSlice.reducer