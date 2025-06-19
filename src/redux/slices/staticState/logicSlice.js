import { createSlice } from "@reduxjs/toolkit";
// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../../tostifyStyle";

export const logicSlice = createSlice({
  name: "logicSlice",
  initialState: {
    isLoggedIn: false,
    showNavbar: false,
    showAllProducts: true,
    showAddProduct: false,
    showViewOrders: false,
  },
  reducers: {
    toggleNavbar: (state, action) => {
      state.showNavbar = !state.showNavbar;
    },

    setShowNavbarToFalse: (state, action) => {
      state.showNavbar = false;
    },
    setShowAllProducts: (state, action) => {
      state.showAllProducts = true;
      state.showAddProduct = false;
      state.showViewOrders = false;
    },

    setShowAddProduct: (state, action) => {
      state.showAllProducts = false;
      state.showAddProduct = true;
      state.showViewOrders = false;
    },

    setShowViewOrders: (state, action) => {
      state.showAllProducts = false;
      state.showAddProduct = false;
      state.showViewOrders = true;
    },
    setisLoggedInToTrue: (state, action) => {
      state.isLoggedIn = true;
    },
    setisLoggedInToFalse: (state, action) => {
      state.isLoggedIn = false;
      toast("Goodbye Matt :)", toastStyleObject());
    },
  },
});

export const {
  toggleNavbar,
  setShowNavbarToFalse,
  setShowAllProducts,
  setShowAddProduct,
  setShowViewOrders,
  setisLoggedInToTrue,
  setisLoggedInToFalse,
} = logicSlice.actions;

export default logicSlice.reducer;
