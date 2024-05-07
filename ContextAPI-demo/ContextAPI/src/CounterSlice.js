import { createSlice } from "@reduxjs/toolkit";

// Define the initial state using a JavaScript object
const initialState = {
  count: 0
};

// Create a slice of the state managed by Redux Toolkit
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    }
  }
});

// Export the auto-generated action creators
export const { increment, decrement } = counterSlice.actions;

// Export the reducer, automatically created by createSlice
export default counterSlice.reducer;
