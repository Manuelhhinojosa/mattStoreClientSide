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

    setShowNavbarToFalse: (state, action) => {
      state.showNavbar = false;
    },
  },
});

export const { toggleNavbar, setShowNavbarToFalse } = logicSlice.actions;

export default logicSlice.reducer;
