import { createSlice } from '@reduxjs/toolkit';
import { UpdateFilter, resetFilter } from './filterModal';

const initialState = {
    userName: "",
    userId: "",
    userType: "",
    establishmentId: "",
    emailAddress: "",
    fullName: "",
}

export const currentUserSlice = createSlice({
    name: 'currentUserDetails',
    initialState,
    reducers : {
        updateUser: (state, action) => {
            return{
                ...state,
                userName: action.payload.userName,
                userId: action.payload.userId,
                userType: action.payload.userType,
                establishmentId: action.payload.establishmentId,
                emailAddress: action.payload.emailAddress,
                fullName: action.payload.fullName,
            }
        },
        resetUser: () => {
            return initialState;
        }
    }
})

export const {
    updateUser,
    resetUser,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
