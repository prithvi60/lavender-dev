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
    setAccountCreated: (state, action) => {
      state.accountCreated = action.payload.accountCreated
    },
    reset: (state) => {
      state = {...initialState}
    },
  },
});

export const {
  isNewAccount,
  setAccountCreated,
  reset,
} = loginPageSlice.actions;
export default loginPageSlice.reducer;