import { duration } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {checkOut:[]}

const checkOutPageSlice = createSlice({
    
    name: 'checkOutPageSlice',
    initialState,
    reducers: {
        updateCheckOut: (state, action) => {
            debugger;
            let serviceDetails =  {
                serviceId: action.payload.serviceId,
                optionId: action.payload.optionId,
                serviceName: action.payload.serviceName,
                finalPrice: action.payload.finalPrice,
                duration: action.payload.serviceDuration,
                };
            state.checkOut.push(serviceDetails)
        },
        resetCheckOut: (state, action) => {
            const { serviceId, optionId } = action.payload;
            // Filter out the item to be removed
            state.checkOut = state.checkOut.filter(item => !(item.serviceId === serviceId && item.optionId === optionId));
          }
    }
})

export const {updateCheckOut, resetCheckOut} = checkOutPageSlice.actions

export default checkOutPageSlice.reducer