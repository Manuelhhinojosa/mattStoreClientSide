// redux
import { createSlice } from "@reduxjs/toolkit";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastStyleObject } from "../../../tostifyStyle";

// logic slice
export const logicSlice = createSlice({
  name: "logicSlice",
  initialState: {
    // user initial state
    // user state
    user: {},
    userToken: "",

    // sgning user in state
    enteredUserUsername: "",
    enteredUserPassword: "",

    // signing user up state
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

    // updating user state
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

    // navbar logic
    showNavbar: false,

    // profile page logic
    showPassword: false,

    // admin page logic
    showAllProducts: true,
    showAddProduct: false,
    showViewOrders: false,
    showMembersInfo: false,

    // edit profile page logic
    showEditPassword: false,
    showEditContactInfo: false,
    showEditShippingInfo: false,
  },
  // functions
  // functions
  // functions
  reducers: {
    // navbar
    // hide show navbar
    toggleNavbar: (state, action) => {
      state.showNavbar = !state.showNavbar;
    },

    // hide navbar
    setShowNavbarToFalse: (state, action) => {
      state.showNavbar = false;
    },

    // admin page logic
    // show all products page
    setShowAllProducts: (state, action) => {
      state.showAllProducts = true;
      state.showAddProduct = false;
      state.showViewOrders = false;
      state.showMembersInfo = false;
    },

    // show add a product page
    setShowAddProduct: (state, action) => {
      state.showAllProducts = false;
      state.showAddProduct = true;
      state.showViewOrders = false;
      state.showMembersInfo = false;
    },

    // show view orders page
    setShowViewOrders: (state, action) => {
      state.showAllProducts = false;
      state.showAddProduct = false;
      state.showViewOrders = true;
      state.showMembersInfo = false;
    },

    // show members info page
    setShowMembersInfo: (state, action) => {
      state.showAllProducts = false;
      state.showAddProduct = false;
      state.showViewOrders = false;
      state.showMembersInfo = true;
    },

    // login logic
    // setting logged in status to true
    setisLoggedInToTrue: (state, action) => {
      state.isLoggedIn = true;
    },

    // setting loging satus to false
    setisLoggedInToFalse: (state, action) => {
      state.isLoggedIn = false;
      toast(`Goodbye ${state.user.name} :)`, toastStyleObject());
    },

    // set user state
    setUser: (state, action) => {
      state.user = action.payload;
    },

    // reset user (empty user state)
    setuserToNone: (state, action) => {
      state.user = {};
    },

    // set token
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },

    // reset token (empty token state)
    setUserTokenEmpty: (state, action) => {
      state.userToken = "";
    },

    // login state managment
    // set user username
    setEnteredUsername: (state, action) => {
      state.enteredUserUsername = action.payload;
    },

    // empty entered user name
    setEnteredUsernameEmpty: (state, action) => {
      state.enteredUserUsername = "";
    },

    // set user userpassword
    setEnteredUserpassword: (state, action) => {
      state.enteredUserPassword = action.payload;
    },

    // empty entred password
    setEnteredUserpasswordEmpty: (state, action) => {
      state.enteredUserPassword = "";
    },

    // edit profile component logic
    // show edit password page
    setShowEditPasswordToTrue: (state, action) => {
      state.showEditPassword = true;
      state.showEditContactInfo = false;
      state.showEditShippingInfo = false;
    },

    // hide edit password page
    setShowEditPasswordTofalse: (state, action) => {
      state.showEditPassword = false;
    },

    // show edit contact info page
    setShowEditContactInfoToTrue: (state, action) => {
      state.showEditPassword = false;
      state.showEditContactInfo = true;
      state.showEditShippingInfo = false;
    },

    // hide edit contact info page
    setShowEditContactInfoTofalse: (state, action) => {
      state.showEditContactInfo = false;
    },

    // show edit shipping info page
    setShowEditShippingInfoToTrue: (state, action) => {
      state.showEditPassword = false;
      state.showEditContactInfo = false;
      state.showEditShippingInfo = true;
    },

    // hide edit shipping info page
    setShowEditShippingInfoTofalse: (state, action) => {
      state.showEditShippingInfo = false;
    },

    // show / hide password
    toggleShowPassword: (state, action) => {
      state.showPassword = !state.showPassword;
    },

    // sign up page logic
    // handling sign up state
    setSignUpState: (state, action) => {
      state.signupState = {
        ...state.signupState,
        [action.payload.key]: action.payload.value,
      };
    },

    // edit user page logic
    // handling editing user state state
    setEditUserState: (state, action) => {
      state.editUserState = {
        ...state.editUserState,
        [action.payload.key]: action.payload.value,
      };
    },

    // toggle address and handling same/different shipping info from contact info
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

    // reset sign up state (emtpy sign up state)
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

    // edit user page logic
    // toggle address & handle shipping same as contact info
    toggleEditUserContactAddress: (state, action) => {
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

    // toggle address & handle contact same as shipping info
    toggleEditUsershippingAddress: (state, action) => {
      state.editUserState.shippingSameAsContactInfo =
        !state.editUserState.shippingSameAsContactInfo;

      if (state.editUserState.shippingSameAsContactInfo === true) {
        state.editUserState.contactPhoneNumber =
          state.editUserState.shippingPhoneNumber;
        state.editUserState.contactAddress =
          state.editUserState.shippingAddress;
        state.editUserState.contactUnit = state.editUserState.shippingUnit;
        state.editUserState.contactCountry =
          state.editUserState.shippingCountry;
        state.editUserState.contactProvinceOrState =
          state.editUserState.shippingProvinceOrState;
        state.editUserState.contactCity = state.editUserState.shippingCity;
        state.editUserState.contactPostalCode =
          state.editUserState.shippingPostalCode;
      }

      if (state.editUserState.shippingSameAsContactInfo === false) {
        state.editUserState.contactPhoneNumber = "";
        state.editUserState.contactAddress = "";
        state.editUserState.contactUnit = "";
        state.editUserState.contactCountry = "";
        state.editUserState.contactProvinceOrState = "";
        state.editUserState.contactCity = "";
        state.editUserState.contactPostalCode = "";
      }
    },

    // reseting edit user state (empty edit user state)
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

// functions exports
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
  toggleEditUserContactAddress,
  toggleEditUsershippingAddress,
  resetEditUserState,
} = logicSlice.actions;

export default logicSlice.reducer;
