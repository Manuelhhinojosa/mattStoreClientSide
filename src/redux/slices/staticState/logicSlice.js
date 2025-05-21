import { createSlice } from "@reduxjs/toolkit";

export const logicSlice = createSlice({
  name: "logicSlice",
  initialState: {
    showNavbar: false,
  },
  reducers: {
    toggleNavbar: (state, action) => {
      state.showNavbar = !state.showNavbar;
    },
  },
});

export const { toggleNavbar } = logicSlice.actions;

export default logicSlice.reducer;
