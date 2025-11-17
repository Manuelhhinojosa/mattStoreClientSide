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
    // for signing in
    enteredUserUsername: "",
    enteredUserPassword: "",

    // for signing up
    signupState: {
      name: "",
      lastname: "",
      email: "",
      confirmationEmail: "",
      password: "",
      confirmationPassword: "",
      contactPhoneNumber: "",
      contactAddress: "",
      contactUnit: "",
      contactCountry: "",
      contactProvinceOrState: "",
      contactCity: "",
      contactPostalCode: "",
      shippingSameAsContactInfo: false,
      shippingPhoneNumber: "",
      shippingAddress: "",
      shippingUnit: "",
      shippingCountry: "",
      shippingProvinceOrState: "",
      shippingCity: "",
      shippingPostalCode: "",
    },

    // for user update
    editUserState: {
      // password
      oldPassword: "",
      newPassword: "",
      confirmationNewPassword: "",
      // contact info
      contactPhoneNumber: "",
      contactAddress: "",
      contactUnit: "",
      contactCountry: "",
      contactProvinceOrState: "",
      contactCity: "",
      contactPostalCode: "",
      // shipping info
      shippingPhoneNumber: "",
      shippingAddress: "",
      shippingUnit: "",
      shippingCountry: "",
      shippingProvinceOrState: "",
      shippingCity: "",
      shippingPostalCode: "",
      // same shipping as contact
      shippingSameAsContactInfo: false,
    },

    // login logic
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
      state.userToken = action.payload;
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
    setSignUpState: (state, action) => {
      state.signupState = {
        ...state.signupState,
        [action.payload.key]: action.payload.value,
      };
    },
    setEditUserState: (state, action) => {
      state.editUserState = {
        ...state.editUserState,
        [action.payload.key]: action.payload.value,
      };
    },
    toggleAddress: (state, action) => {
      state.signupState.shippingSameAsContactInfo =
        !state.signupState.shippingSameAsContactInfo;

      if (state.signupState.shippingSameAsContactInfo === true) {
        state.signupState.shippingPhoneNumber =
          state.signupState.contactPhoneNumber;
        state.signupState.shippingAddress = state.signupState.contactAddress;
        state.signupState.shippingUnit = state.signupState.contactUnit;
        state.signupState.shippingCountry = state.signupState.contactCountry;
        state.signupState.shippingProvinceOrState =
          state.signupState.contactProvinceOrState;
        state.signupState.shippingCity = state.signupState.contactCity;
        state.signupState.shippingPostalCode =
          state.signupState.contactPostalCode;
      }

      if (state.signupState.shippingSameAsContactInfo === false) {
        state.signupState.shippingPhoneNumber = "";
        state.signupState.shippingAddress = "";
        state.signupState.shippingUnit = "";
        state.signupState.shippingCountry = "";
        state.signupState.shippingProvinceOrState = "";
        state.signupState.shippingCity = "";
        state.signupState.shippingPostalCode = "";
      }
    },
    resetSignupState: (state) => {
      state.signupState = {
        name: "",
        lastname: "",
        email: "",
        confirmationEmail: "",
        password: "",
        confirmationPassword: "",
        contactPhoneNumber: "",
        contactAddress: "",
        contactUnit: "",
        contactCountry: "",
        contactProvinceOrState: "",
        contactCity: "",
        contactPostalCode: "",
        shippingSameAsContactInfo: false,
        shippingPhoneNumber: "",
        shippingAddress: "",
        shippingUnit: "",
        shippingCountry: "",
        shippingProvinceOrState: "",
        shippingCity: "",
        shippingPostalCode: "",
      };
    },
    toggleEditUserAddress: (state, action) => {
      state.editUserState.shippingSameAsContactInfo =
        !state.editUserState.shippingSameAsContactInfo;

      if (state.editUserState.shippingSameAsContactInfo === true) {
        state.editUserState.shippingPhoneNumber =
          state.editUserState.contactPhoneNumber;
        state.editUserState.shippingAddress =
          state.editUserState.contactAddress;
        state.editUserState.shippingUnit = state.editUserState.contactUnit;
        state.editUserState.shippingCountry =
          state.editUserState.contactCountry;
        state.editUserState.shippingProvinceOrState =
          state.editUserState.contactProvinceOrState;
        state.editUserState.shippingCity = state.editUserState.contactCity;
        state.editUserState.shippingPostalCode =
          state.editUserState.contactPostalCode;
      }

      if (state.editUserState.shippingSameAsContactInfo === false) {
        state.editUserState.shippingPhoneNumber = "";
        state.editUserState.shippingAddress = "";
        state.editUserState.shippingUnit = "";
        state.editUserState.shippingCountry = "";
        state.editUserState.shippingProvinceOrState = "";
        state.editUserState.shippingCity = "";
        state.editUserState.shippingPostalCode = "";
      }
    },
    resetEditUserState: (state) => {
      state.editUserState = {
        // password
        oldPassword: "",
        newPassword: "",
        confirmationNewPassword: "",
        // contact info
        contactPhoneNumber: "",
        contactAddress: "",
        contactUnit: "",
        contactCountry: "",
        contactProvinceOrState: "",
        contactCity: "",
        contactPostalCode: "",
        // shipping info
        shippingPhoneNumber: "",
        shippingAddress: "",
        shippingUnit: "",
        shippingCountry: "",
        shippingProvinceOrState: "",
        shippingCity: "",
        shippingPostalCode: "",
        // same shipping as contact
        shippingSameAsContactInfo: false,
      };
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
  setSignUpState,
  toggleAddress,
  resetSignupState,
  setEditUserState,
  toggleEditUserAddress,
  resetEditUserState,
} = logicSlice.actions;

export default logicSlice.reducer;
