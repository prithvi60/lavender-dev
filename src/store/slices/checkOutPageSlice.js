import { duration } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {checkOut:[]}

const checkOutPageSlice = createSlice({
    name: 'checkOutPageSlice',
    initialState,
    reducers: {
        updateCheckOut: (state, action) => {
            let serviceDetails =  {
                serviceName: action.payload.serviceName,
                finalPrice: action.payload.finalPrice,
                duration: action.payload.serviceDuration,
                };
            state.checkOut.push(serviceDetails)
        },
        resetCheckOut: (state, action) => {
            state.checkOut = state.checkOut.filter((item)=> item.serviceName != action.payload.serviceName)
        }
    }
})

export const {updateCheckOut, resetCheckOut} = checkOutPageSlice.actions

export default checkOutPageSlice.reducer