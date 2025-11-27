import React from "react";

// Axios
import axios from "axios";

//React Router 6
import { Link, useNavigate } from "react-router-dom";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

// redux
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// redux functions in logic slice
import {
  setSignUpState,
  toggleAddress,
  setisLoggedInToTrue,
  setUser,
  setUserToken,
  resetSignupState,
} from "../../redux/slices/staticState/logicSlice";

// herlper functions
import {
  refreshOrdersData,
  refreshUsersData,
  getApiErrorMessage,
  getApiSuccessMessage,
} from "../../utils/helpers";

// signup function compoenent
// signup function compoenent
// signup function compoenent
const Signup = () => {
  // redux and state
  // state in logic slice
  const logic = useSelector((state) => state.logicSlice);
  // redux hooks
  const dispatch = useDispatch();

  // React router hooks
  const navigate = useNavigate();

  // functions
  // functions
  // functions

  // sets entered value in input as signup state (handles input change)
  // sets entered value in input as signup state (handles input change)
  // sets entered value in input as signup state (handles input change)
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setSignUpState({ key: name, value: value }));
  };

  // handle sign up
  // handle sign up
  // handle sign up
  const handleSignup = async (e) => {
    e.preventDefault();

    const {
      name,
      lastname,
      email,
      confirmationEmail,
      password,
      confirmationPassword,
    } = logic.signupState;

    // form validation
    if (
      !name ||
      !lastname ||
      !email ||
      !confirmationEmail ||
      !password ||
      !confirmationPassword
    ) {
      toast(
        "Name, lastname, email, and password are mandatory fields",
        toastStyleObject()
      );
      return;
    }

    // minimum password length
    if (password.length < 6 || confirmationPassword.length < 6) {
      toast("password must be at least 6 characters long", toastStyleObject());
      return;
    }

    // email match
    if (email !== confirmationEmail) {
      toast("email fields must match", toastStyleObject());
      return;
    }

    // password match
    if (password !== confirmationPassword) {
      toast("password fields must match", toastStyleObject());
      return;
    }

    try {
      // API call
      const result = await axios.post(
        `${import.meta.env.VITE_API_USERS_URL}/register`,
        logic.signupState
      );

      getApiSuccessMessage(result);

      const newUser = result.data.user;

      // update store state
      // user status
      dispatch(setisLoggedInToTrue());
      // user state
      dispatch(setUser(newUser));
      // token
      dispatch(setUserToken(result.data.token));
      // reset signup state values
      dispatch(resetSignupState());

      // redirect
      navigate("/profile");

      // success message
      toast(`Welcome ${newUser.name}`, toastStyleObject());
    } catch (error) {
      // error handling
      console.log("Signup error:", error);

      // success message
      toast(getApiErrorMessage(error), toastStyleObject());
    }
  };

  // return
  // return
  // return
  return (
    <section className="relative  w-screen">
      {/* header */}
      <div className="mt-[125px] mb-[25px] text-3xl text-center underline">
        <p>Sign up</p>
      </div>
      {/* form container */}
      <div>
        <form className="flex flex-col items-center">
          <div className="border-[1px] border-black w-[90%] rounded-lg my-[25px] shadow-xl">
            {/* name and lastname */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="name"
                name="name"
                autocomplete="off"
                value={logic.signupState.name}
                onChange={handleChange}
              />
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="lastname"
                name="lastname"
                autocomplete="off"
                value={logic.signupState.lastname}
                onChange={handleChange}
              />
            </div>

            {/* email  */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly ">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="e-mail"
                name="email"
                autocomplete="off"
                value={logic.signupState.email}
                onChange={handleChange}
              />
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="confirm email"
                name="confirmationEmail"
                autocomplete="off"
                value={logic.signupState.confirmationEmail}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="password"
                placeholder="password"
                name="password"
                autocomplete="off"
                value={logic.signupState.password}
                onChange={handleChange}
              />
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="password"
                placeholder="confirm password"
                name="confirmationPassword"
                autocomplete="off"
                value={logic.signupState.confirmationPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* contact info */}
          <div className="border-[1px] border-black w-[90%] rounded-lg my-[25px] shadow-xl">
            <div className="flex items-center justify-center">
              <p className="text-xl">Contact info (optional)</p>
            </div>
            {/* contact phone number */}
            <div className="flex items-center justify-center">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="contact phone number"
                name="contactPhoneNumber"
                autocomplete="off"
                value={logic.signupState.contactPhoneNumber}
                onChange={handleChange}
              />
            </div>

            {/* contact address and unit */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="address"
                name="contactAddress"
                autocomplete="off"
                value={logic.signupState.contactAddress}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="unit"
                name="contactUnit"
                autocomplete="off"
                value={logic.signupState.contactUnit}
                onChange={handleChange}
              />
            </div>

            {/* contact country, provice or state, city, postal code */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="country"
                name="contactCountry"
                autocomplete="off"
                value={logic.signupState.contactCountry}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="province or state"
                name="contactProvinceOrState"
                autocomplete="off"
                value={logic.signupState.contactProvinceOrState}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="city"
                name="contactCity"
                autocomplete="off"
                value={logic.signupState.contactCity}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="postal code"
                name="contactPostalCode"
                autocomplete="off"
                value={logic.signupState.contactPostalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* shipping info */}
          <div className="border-[1px] border-black w-[90%] rounded-lg my-[25px] shadow-xl">
            <div className="flex items-center justify-center">
              <p className="text-xl">Shipping info (optional)</p>
            </div>
            {/* shipping phone number */}
            <div className="my-[20px] flex justify-evenly md:flex-col md:items-center md:h-[50px]">
              <label htmlFor="contactSameShipping">same as contact info</label>
              <input
                id="contactSameShipping"
                type="checkbox"
                name="shippingSameAsContactInfo"
                className="accent-blue-500 w-5 h-5 rounded focus:outline-none"
                value={logic.signupState.contactPostalCode}
                onChange={() => dispatch(toggleAddress())}
              />
            </div>

            <div className="flex items-center justify-center">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="shipping phone number"
                name="shippingPhoneNumber"
                autocomplete="off"
                value={logic.signupState.shippingPhoneNumber}
                onChange={handleChange}
              />
            </div>

            {/* ahipping address and unit */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="shipping address"
                name="shippingAddress"
                autocomplete="off"
                value={logic.signupState.shippingAddress}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="shipping unit"
                name="shippingUnit"
                autocomplete="off"
                value={logic.signupState.shippingUnit}
                onChange={handleChange}
              />
            </div>

            {/* contact country, provice or state, city, postal code */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="shipping country"
                name="shippingCountry"
                autocomplete="off"
                value={logic.signupState.shippingCountry}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="shipping province or state"
                name="shippingProvinceOrState"
                autocomplete="off"
                value={logic.signupState.shippingProvinceOrState}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="shipping city"
                name="shippingCity"
                autocomplete="off"
                value={logic.signupState.shippingCity}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder="shipping postal code"
                name="shippingPostalCode"
                autocomplete="off"
                value={logic.signupState.shippingPostalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* sign up button */}
          <button
            onClick={handleSignup}
            className=" hover:text-blue-500 mt-10 text-lg duration-500"
          >
            Sign up
          </button>
        </form>
      </div>

      {/* cancel sing up request button */}
      <div className="flex items-center justify-center my-8 hover:text-blue-500 text-lg duration-500">
        <Link to="/store">Cancel</Link>
      </div>
    </section>
  );
};

export default Signup;
