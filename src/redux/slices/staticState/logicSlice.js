import { createSlice } from "@reduxjs/toolkit";
// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../../tostifyStyle";

export const logicSlice = createSlice({
  name: "logicSlice",
  initialState: {
    // user initial state
    user: {},
    userToken: "",
    enteredUserUsername: "",
    enteredUserPassword: "",
    // for dev (mock users: admin / non admin)
    adminUser: {
      isAdmin: true,
      isActive: true,
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
      shippingPhoneNumber: "6472874494",
      shippingAddress: "000 Address Test Avenue",
      shippingAddressUnit: "",
      shippingCountry: "Canada",
      shippingProviceOrState: "Ontario",
      shippingCity: "Toronto",
      shippingPostalCode: "M6R3C2",
      orders: [],
    },
    // end for dev
    //
    // logic
    isLoggedIn: false,
    showNavbar: false,

    // profile page
    showPassword: false,

    // admin page
    showAllProducts: true,
    showAddProduct: false,
    showViewOrders: false,
    showMembersInfo: false,

    // edit profile page
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
      state.showMembersInfo = false;
    },
    setShowAddProduct: (state, action) => {
      state.showAllProducts = false;
      state.showAddProduct = true;
      state.showViewOrders = false;
      state.showMembersInfo = false;
    },
    setShowViewOrders: (state, action) => {
      state.showAllProducts = false;
      state.showAddProduct = false;
      state.showViewOrders = true;
      state.showMembersInfo = false;
    },
    setShowMembersInfo: (state, action) => {
      state.showAllProducts = false;
      state.showAddProduct = false;
      state.showViewOrders = false;
      state.showMembersInfo = true;
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setuserToNone: (state, action) => {
      state.user = {};
    },
    // set token
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setUserTokenEmpty: (state, action) => {
      state.userToken = "";
    },
    // set user username
    setEnteredUsername: (state, action) => {
      state.enteredUserUsername = action.payload;
    },

    setEnteredUsernameEmpty: (state, action) => {
      state.enteredUserUsername = "";
    },

    // set user userpassword
    setEnteredUserpassword: (state, action) => {
      state.enteredUserPassword = action.payload;
    },

    setEnteredUserpasswordEmpty: (state, action) => {
      state.enteredUserPassword = "";
    },

    // edit profile component logic
    // edit password page
    setShowEditPasswordToTrue: (state, action) => {
      state.showEditPassword = true;
      state.showEditContactInfo = false;
      state.showEditShippingInfo = false;
    },
    setShowEditPasswordTofalse: (state, action) => {
      state.showEditPassword = false;
    },
    // edit contact info page
    setShowEditContactInfoToTrue: (state, action) => {
      state.showEditPassword = false;
      state.showEditContactInfo = true;
      state.showEditShippingInfo = false;
    },
    setShowEditContactInfoTofalse: (state, action) => {
      state.showEditContactInfo = false;
    },
    // edit shipping info page
    setShowEditShippingInfoToTrue: (state, action) => {
      state.showEditPassword = false;
      state.showEditContactInfo = false;
      state.showEditShippingInfo = true;
    },
    setShowEditShippingInfoTofalse: (state, action) => {
      state.showEditShippingInfo = false;
    },
    // logic for showing / hiding password in profile page
    toggleShowPassword: (state, action) => {
      state.showPassword = !state.showPassword;
    },
  },
});

export const {
  toggleNavbar,
  setShowNavbarToFalse,
  setShowAllProducts,
  setShowAddProduct,
  setShowViewOrders,
  setShowMembersInfo,
  setisLoggedInToTrue,
  setisLoggedInToFalse,
  setUser,
  setuserToNone,
  setUserToken,
  setUserTokenEmpty,
  setEnteredUsername,
  setEnteredUsernameEmpty,
  setEnteredUserpassword,
  setEnteredUserpasswordEmpty,
  setShowEditPasswordToTrue,
  setShowEditPasswordTofalse,
  setShowEditContactInfoToTrue,
  setShowEditContactInfoTofalse,
  setShowEditShippingInfoToTrue,
  setShowEditShippingInfoTofalse,
  toggleShowPassword,
} = logicSlice.actions;

export default logicSlice.reducer;
