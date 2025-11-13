import React from "react";

// Axios
import axios from "axios";

// redux
import { useSelector, useDispatch } from "react-redux";
// redux reducers
import {
  setSignUpState,
  toggleAddress,
  setisLoggedInToTrue,
  setUser,
  setUserToken,
  resetSignupState,
} from "../../redux/slices/staticState/logicSlice";

//React Router 6
import { Link, useNavigate } from "react-router-dom";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

const Signup = () => {
  // redux and state
  const logic = useSelector((state) => state.logicSlice);
  const dispatch = useDispatch();
  // React router V6
  const navigate = useNavigate();

  // functions
  // sets entered value in input as signup state (handles input change)
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setSignUpState({ key: name, value: value }));
  };

  // handle signup
  const handleSignup = (e) => {
    // form validation
    e.preventDefault();

    // checking for filled mandatory fields
    if (
      logic.signupState.name === "" ||
      logic.signupState.lastname === "" ||
      logic.signupState.email === "" ||
      logic.signupState.confirmationEmail === "" ||
      logic.signupState.password === "" ||
      logic.signupState.confirmationPassword === ""
    ) {
      toast(
        "name, lastname, email and password are mandatory fields",
        toastStyleObject()
      );
      return;
    }

    // checking for matching email addresses
    if (logic.signupState.email !== logic.signupState.confirmationEmail) {
      toast("email fields must match", toastStyleObject());
      return;
    }

    // checking for matching passwords
    if (logic.signupState.password !== logic.signupState.confirmationPassword) {
      toast("password fields must match", toastStyleObject());
      return;
    }
    // api call
    axios
      .post("http://localhost:3000/users/register", logic.signupState)
      .then((res) => {
        const newUser = res.data.user;
        dispatch(setisLoggedInToTrue());
        dispatch(setUser(newUser));
        dispatch(setUserToken(res.data.token));
        dispatch(resetSignupState());
        navigate("/profile");
        toast(`Welcome ${newUser.name}`, toastStyleObject());
      })
      .catch((error) => {
        console.log("this is the error", error);
      });
  };

  // return
  return (
    <section className="relative  w-screen">
      <div className="mt-[125px] mb-[25px] text-3xl text-center">
        <p>Sign up</p>
      </div>
      <div>
        <form className="flex flex-col items-center">
          <div className="border-[1px] border-black w-[90%] rounded-lg my-[25px] shadow-xl">
            {/* name and lastname */}
            <div className="flex flex-col items-center md:flex-row md:justify-evenly">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="name"
                name="name"
                autocomplete="off"
                value={logic.signupState.name}
                onChange={handleChange}
              />
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
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
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="e-mail"
                name="email"
                autocomplete="off"
                value={logic.signupState.email}
                onChange={handleChange}
              />
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
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
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="password"
                placeholder="password"
                name="password"
                autocomplete="off"
                value={logic.signupState.password}
                onChange={handleChange}
              />
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
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
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
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
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="address"
                name="contactAddress"
                autocomplete="off"
                value={logic.signupState.contactAddress}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
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
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="country"
                name="contactCountry"
                autocomplete="off"
                value={logic.signupState.contactCountry}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="province or state"
                name="contactProvinceOrState"
                autocomplete="off"
                value={logic.signupState.contactProvinceOrState}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="city"
                name="contactCity"
                autocomplete="off"
                value={logic.signupState.contactCity}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
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
                className="accent-black w-5 h-5 rounded focus:outline-none"
                value={logic.signupState.contactPostalCode}
                // onChange={dispatch(toggleAddress())}
                onChange={() => dispatch(toggleAddress())}
              />
            </div>

            <div className="flex items-center justify-center">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
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
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="shipping address"
                name="shippingAddress"
                autocomplete="off"
                value={logic.signupState.shippingAddress}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
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
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="shipping country"
                name="shippingCountry"
                autocomplete="off"
                value={logic.signupState.shippingCountry}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="shipping province or state"
                name="shippingProvinceOrState"
                autocomplete="off"
                value={logic.signupState.shippingProvinceOrState}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder="shipping city"
                name="shippingCity"
                autocomplete="off"
                value={logic.signupState.shippingCity}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-[150px] text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
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
            className="text-lg hover:text-slate-600 mt-10"
          >
            sign up
          </button>
        </form>
      </div>

      {/* cancel sing up request button */}
      <div className="flex items-center justify-center my-8 hover:text-slate-600">
        <Link to="/store">Cancel</Link>
      </div>
    </section>
  );
};

export default Signup;
