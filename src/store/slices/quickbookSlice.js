import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    selectDate: "",
    selectedTime: "",
    selectedServiceId: "",
    selectedServiceName: "",
}

const quickbookSlice = createSlice({
    
    name: 'quickbookSlice',
    initialState,
    reducers: {
        updatequickBook: (state, action) => {
            return{
            ...state,
            selectDate: action.payload.selectDate,
            selectedTime: action.payload.selectedTime,
            selectedServiceId: action.payload.selectedServiceId,
            selectedServiceName: action.payload.selectedServiceName,
            }
        },
        resetquickBook: () => {
            return initialState;
        }
        // removequickBookDetails: () => {
        //     return initialState;
        // }
    }
})

export const {updatequickBook, resetquickBook} = quickbookSlice.actions

export default quickbookSlice.reducer