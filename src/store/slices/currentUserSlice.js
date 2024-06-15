import { createSlice } from '@reduxjs/toolkit';
import { UpdateFilter, resetFilter } from './filterModal';

const initialState = {
    EmailId: '',
    UserName: '',
    UserType:  '',
}

export const currentUserSlice = createSlice({
    name: 'currentUserDetails',
    initialState,
    reducers : {
        updateUser: (state, action) => {
            return{
                ...state,
                EmailId: action.payload.EmailId,
                UserName: action.payload.UserName,
                UserType:  action.payload.UserType,
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
