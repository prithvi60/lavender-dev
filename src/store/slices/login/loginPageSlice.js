import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newAccount: false,
  accountCreated: false,
};

export const loginPageSlice = createSlice({
  name: 'loginPage',
  initialState,
  reducers: {
    isNewAccount: (state, action) => {
      state.newAccount = action.payload.newAccount
    },
    accountCreated: (state, action) => {
      state.accountCreated = action.payload.accountCreated
    },
    reset: (state) => {
      state = {...initialState}
    },
  },
});

export const {
  isNewAccount,
  accountCreated,
  reset,
} = loginPageSlice.actions;
export default loginPageSlice.reducer;