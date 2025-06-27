import { createSlice } from "@reduxjs/toolkit";
// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../../tostifyStyle";

export const logicSlice = createSlice({
  name: "logicSlice",
  initialState: {
    user: {},
    // for dev
    adminUser: {
      isAdmin: true,
      name: "Matt",
      lastname: "Marotti",
      username: "matt.marotti@gmail.com",
      password: "adminPassword",
      contactPhoneNumber: "6472874494",
      address: "000 Address Test Avenue",
      addressUnit: "301",
      country: "Canada",
      provinceOrState: "Ontario",
      city: "Toronto",
      postalCode: "M6R3C2",
      contactEqualShipping: true,
      shippingtPhoneNumber: "6472874494",
      shippingAddress: "Address test Avenue",
      shippingAddressUnit: "301",
      shippingCountry: "Canada",
      shippingProviceOrState: "Ontario",
      shippingCity: "Toronto",
      shippingPostalCode: "M6R3C2",
      // pastOrders: [{}],
      pastOrders: [],
    },
    nonAdminUser: {
      isAdmin: false,
      name: "TestName",
      lastname: "TestLastName",
      username: "testname.testlastname@gmail.com",
      password: "userPassword",
      contactPhoneNumber: "6472874494",
      address: "87 Address test Avenue",
      addressUnit: "",
      country: "Canada",
      provinceOrState: "Ontario",
      city: "Toronto",
      postalCode: "M6R3C2",
      contactEqualShipping: false,
      shippingtPhoneNumber: "6472874494",
      shippingAddress: "Address test Road",
      shippingAddressUnit: "498",
      shippingCountry: "USA",
      shippingProviceOrState: "California",
      shippingCity: "San Francisco",
      shippingPostalCode: "123456",
      // pastOrders: [{}],
      pastOrders: [],
    },
    // end for dev
    isLoggedIn: false,
    showNavbar: false,
    showAllProducts: true,
    showAddProduct: false,
    showViewOrders: false,
    showEditPassword: false,
    showEditContactInfo: false,
    showEditShippingInfo: false,
  },
  reducers: {
    // navbar
    toggleNavbar: (state, action) => {
      state.showNavbar = !state.showNavbar;
    },

    setShowNavbarToFalse: (state, action) => {
      state.showNavbar = false;
    },
    // admin
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
    // setting logged in status
    setisLoggedInToTrue: (state, action) => {
      state.isLoggedIn = true;
    },
    setisLoggedInToFalse: (state, action) => {
      state.isLoggedIn = false;
      toast(`Goodbye ${state.user.name} :)`, toastStyleObject());
    },
    // set user for dev
    setAdminUser: (state, action) => {
      state.user = state.adminUser;
    },
    setNonAdminUser: (state, action) => {
      state.user = state.nonAdminUser;
    },
    setuserToNone: (state, action) => {
      state.user = {};
    },
    setShowEditPasswordToTrue: (state, action) => {
      state.showEditPassword = true;
    },
    setShowEditPasswordTofalse: (state, action) => {
      state.showEditPassword = false;
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
  setAdminUser,
  setNonAdminUser,
  setuserToNone,
  setShowEditPasswordToTrue,
  setShowEditPasswordTofalse,
} = logicSlice.actions;

export default logicSlice.reducer;
