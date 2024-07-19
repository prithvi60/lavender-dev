import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  editUserId: null,
  addUser: false
};

export const userAdminSlice = createSlice({
  name: 'userAdmin',
  initialState,
  reducers: {
    setAddUser: (state, action) => {
      state.addUser = action.payload.addUser
    },
    addUser: (state, action) => {
      state.users.push(action.payload.user)
    },
    updateUser: (state, action) => {
      state.users = state.users.map(item => {
        return item?.id === action.payload.user.id ? {...item, ...action.payload.user} : item;
      })
    },
    removeUser: (state, action) => {
      state.users =  state.users.filter(item => item?.id !== action.payload.id);
    },
    editUser: (state, action) => {
      state.editUserId = action.payload.editUserId;
    },
    reset: (state) => {
      state = {...initialState}
    },
  },
});

export const {
  reset,
  setAddUser,
  addUser,
  updateUser,
  editUser,
  removeUser
} = userAdminSlice.actions;
export default userAdminSlice.reducer;