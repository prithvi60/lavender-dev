import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  SortBy: "Recommended",
  price: {min : 0 , max:100},
  selectedTags: [],
};

export const filterModalSlice = createSlice({
  name: 'filterModal',
  initialState,
  reducers: {
    UpdateFilter: (state, action) => {
      
      return {
        ...state,
        SortBy: action.payload.SortBy,
        price: { min: action.payload.price[0], max: action.payload.price[1] },
        selectedTags: action.payload.selectedTags,
      };
    },
    resetFilter: () => {
      return initialState},
  },
});

export const {
  UpdateFilter,
  resetFilter,
} = filterModalSlice.actions;

export default filterModalSlice.reducer;