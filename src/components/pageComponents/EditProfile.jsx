import React from "react";

// Axios
import axios from "axios";

// framer motion
import { motion } from "framer-motion";

// redux
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// functions from redux / logic slice
import {
  setShowEditPasswordTofalse,
  setShowEditContactInfoTofalse,
  setShowEditShippingInfoTofalse,
  setEditUserState,
  toggleEditUserContactAddress,
  toggleEditUsershippingAddress,
  resetEditUserState,
  setUser,
} from "../../redux/slices/staticState/logicSlice";

// helper functions
import {
  refreshUserData,
  // success and error console log handleingssss
  getApiErrorMessage,
  getApiSuccessMessage,
} from "../../utils/helpers";

// helper vars
// headers config
import { getHeadersConfig } from "../../utils/vars";

// React router V6
// react router hooks
import { useNavigate } from "react-router-dom";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

// Edit profile function component
// Edit profile function component
// Edit profile function component
const EditProfile = () => {
  // redux hooks & state
  // hooks
  const dispatch = useDispatch();
  // state in logic slice
  const logic = useSelector((state) => state.logicSlice);

  // react router hooks
  const navigate = useNavigate();

  // functions
  // functions
  // functions

  // handle edit user state object in redux logic slice
  // handle edit user state object in redux logic slice
  // handle edit user state object in redux logic slice
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditUserState({ key: name, value: value }));
  };

  // edit user's password
  // edit user's password
  // edit user's password
  const handleEditPassword = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmationNewPassword } =
      logic.editUserState;

    // form validation
    if (!oldPassword || !newPassword || !confirmationNewPassword) {
      toast("All fields are mandatory.", toastStyleObject());
      return;
    }

    // new password validation (length)
    if (newPassword.length < 6) {
      toast(
        "New password must be at least 6 characters long.",
        toastStyleObject()
      );
      return;
    }

    // matching new password validation
    if (newPassword !== confirmationNewPassword) {
      toast("New passwords do not match.", toastStyleObject());
      return;
    }

    try {
      // update user's password api call
      const result = await axios.patch(
        `${import.meta.env.VITE_API_USERS_URL}/editpassword/${logic.user._id}`,
        logic.editUserState,
        getHeadersConfig()
      );

      // success after updating user's password api call

      // console log result
      getApiSuccessMessage(result);

      // get updated user api call / setting user to updated user
      await refreshUserData(logic.user._id, logic.userToken, dispatch, setUser);

      // resetting
      dispatch(setShowEditPasswordTofalse());
      dispatch(resetEditUserState());

      // navigate to profile page
      navigate("/profile");

      // success message
      toast("Password updated", toastStyleObject());
    } catch (error) {
      // error hadling
      console.log("Password update error:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());

      // resetting fields and editUserState object
      dispatch(resetEditUserState());
      return;
    }
  };

  // edit user's contact info
  // edit user's contact info
  // edit user's contact info
  const handleEditContactInfo = async (e) => {
    e.preventDefault();

    const {
      contactPhoneNumber,
      contactAddress,
      contactCountry,
      contactProvinceOrState,
      contactCity,
      contactPostalCode,
    } = logic.editUserState;

    // form validation
    if (
      !contactPhoneNumber ||
      !contactAddress ||
      !contactCountry ||
      !contactProvinceOrState ||
      !contactCity ||
      !contactPostalCode
    ) {
      toast(
        "Phone number, Address, Country, Province or State, City, and Postal code are required fields",
        toastStyleObject()
      );
      return;
    }

    try {
      // update user's contact info api call
      const result = await axios.put(
        `${import.meta.env.VITE_API_USERS_URL}/editcontact/${logic.user._id}`,
        logic.editUserState,
        getHeadersConfig()
      );

      // success after editing user's contact info api call

      // console log result
      getApiSuccessMessage(result);

      // get updated user api call / setting user to updated user
      await refreshUserData(logic.user._id, logic.userToken, dispatch, setUser);

      // resetting
      dispatch(setShowEditContactInfoTofalse());
      dispatch(resetEditUserState());

      // navigate to profile page
      navigate("/profile");

      // success message
      toast("Profile info updated", toastStyleObject());
    } catch (error) {
      // error handling
      console.log("Contact info update error:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());

      // resetting fields and editUserState object
      dispatch(resetEditUserState());
      return;
    }
  };

  // edit user's shipping info
  // edit user's shipping info
  // edit user's shipping info
  const handleEditShippingInfo = async (e) => {
    e.preventDefault();

    const {
      shippingPhoneNumber,
      shippingAddress,
      shippingCountry,
      shippingProvinceOrState,
      shippingCity,
      shippingPostalCode,
    } = logic.editUserState;

    // form validation
    if (
      !shippingPhoneNumber ||
      !shippingAddress ||
      !shippingCountry ||
      !shippingProvinceOrState ||
      !shippingCity ||
      !shippingPostalCode
    ) {
      toast(
        "Phone number, Address, Country, Province or State, City, and Postal code are required fields",
        toastStyleObject()
      );
      return;
    }

    try {
      // update user's shipping info api call
      const result = await axios.put(
        `${import.meta.env.VITE_API_USERS_URL}/editshipping/${logic.user._id}`,
        logic.editUserState,
        getHeadersConfig()
      );

      // success after editing shipping info api call

      // console log result
      getApiSuccessMessage(result);

      // get updated user api call / setting user to updated user
      await refreshUserData(logic.user._id, logic.userToken, dispatch, setUser);

      // resetting
      dispatch(setShowEditShippingInfoTofalse());
      dispatch(resetEditUserState());

      // navigate to profile page
      navigate("/profile");

      // success message
      toast("Profile info updated", toastStyleObject());
    } catch (error) {
      // error handling
      console.log("Shipping info update error:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());

      // resetting fields and editUserState object
      dispatch(resetEditUserState());
      return;
    }
  };

  // go back to profile page from edit profile page
  // go back to profile page from edit profile page
  // go back to profile page from edit profile page

  const handleCancel = (setter) => {
    dispatch(setter());
    dispatch(resetEditUserState());
    navigate("/profile");
  };

  // return
  // return
  // return
  return (
    // main container
    <section className="container mx-auto h-auto mt-32">
      {/* Edit password page */}
      {/* Edit password page */}
      {/* Edit password page */}
      {logic.showEditPassword ? (
        // main section
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* header container */}
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-center text-3xl underline">Edit password</p>
          </div>

          {/* form container */}
          <div className="h-[600px] w-full">
            <form className="h-full flex flex-col items-center justify-center">
              {/* old password */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="password"
                placeholder="Enter old password"
                name="oldPassword"
                autoComplete="off"
                value={logic.editUserState.oldPassword}
                onChange={handleChange}
              />

              {/* new password */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="password"
                placeholder="Enter new password"
                name="newPassword"
                autoComplete="off"
                value={logic.editUserState.newPassword}
                onChange={handleChange}
              />

              {/* confirm new password */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="password"
                placeholder="Confirm new password"
                name="confirmationNewPassword"
                autoComplete="off"
                value={logic.editUserState.confirmationNewPassword}
                onChange={handleChange}
              />

              {/* edit button */}
              <button
                className="mt-5 hover:text-blue-500 duration-500"
                onClick={handleEditPassword}
              >
                Edit Password
              </button>

              {/* cancel button */}
              <button
                className="mt-5 hover:text-blue-500 duration-500"
                onClick={() => handleCancel(setShowEditPasswordTofalse)}
              >
                Cancel
              </button>
            </form>
          </div>
        </motion.section>
      ) : null}

      {/* Edit contact info page */}
      {/* Edit contact info page */}
      {/* Edit contact info page */}
      {logic.showEditContactInfo ? (
        // main container
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* header container */}
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-center text-3xl underline">Edit contact info</p>
          </div>

          {/* form container */}
          <div className="h-[600px] w-full">
            <form className="h-full flex flex-col items-center justify-center">
              {/* phone number */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`contact phone number: ${logic.user.contactPhoneNumber}`}
                name="contactPhoneNumber"
                autoComplete="off"
                value={logic.editUserState.contactPhoneNumber}
                onChange={handleChange}
              />

              {/* contact address */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`contact address: ${logic.user.contactAddress}`}
                name="contactAddress"
                autoComplete="off"
                value={logic.editUserState.contactAddress}
                onChange={handleChange}
              />

              {/* contact unit */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`contact unit: ${logic.user.contactUnit}`}
                name="contactUnit"
                autoComplete="off"
                value={logic.editUserState.contactUnit}
                onChange={handleChange}
              />

              {/* contact country */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`contact country: ${logic.user.contactCountry}`}
                name="contactCountry"
                autoComplete="off"
                value={logic.editUserState.contactCountry}
                onChange={handleChange}
              />

              {/* contact province or state */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`contact provice or state: ${logic.user.contactProvinceOrState}`}
                name="contactProvinceOrState"
                autoComplete="off"
                value={logic.editUserState.contactProvinceOrState}
                onChange={handleChange}
              />

              {/* contact city */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`contact city: ${logic.user.contactCity}`}
                name="contactCity"
                autoComplete="off"
                value={logic.editUserState.contactCity}
                onChange={handleChange}
              />

              {/* comtact postal code */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`contact postal code: ${logic.user.contactPostalCode}`}
                name="contactPostalCode"
                autoComplete="off"
                value={logic.editUserState.contactPostalCode}
                onChange={handleChange}
              />

              {/* shipping same as contact */}
              <label htmlFor="contactSameShipping" className="mt-5">
                Edit shipping info to match the new contact info?
              </label>
              <input
                id="contactSameShipping"
                type="checkbox"
                name="shippingSameAsContactInfo"
                className="accent-blue-500 w-5 h-5 rounded focus:outline-none mt-3"
                value={logic.editUserState.shippingSameAsContactInfo}
                onChange={() => dispatch(toggleEditUserContactAddress())}
              />

              {/* edit button */}
              <button
                className="mt-5 hover:text-blue-500 duration-500"
                onClick={handleEditContactInfo}
              >
                Edit contact info
              </button>

              {/* cancel button */}
              <button
                className="mt-5 hover:text-blue-500 duration-500"
                onClick={() => handleCancel(setShowEditContactInfoTofalse)}
              >
                Cancel
              </button>
            </form>
          </div>
        </motion.section>
      ) : null}

      {/* Edit shipping info page */}
      {/* Edit shipping info page */}
      {/* Edit shipping info page */}
      {logic.showEditShippingInfo ? (
        // main conatiner
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* header container */}
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-center text-3xl underline">Edit Shipping info</p>
          </div>

          {/* form conatiner */}
          <div className="h-[600px] w-full">
            <form className="h-full flex flex-col items-center justify-center">
              {/* shipping phone number */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`shipping phone number: ${logic.user.shippingPhoneNumber}`}
                name="shippingPhoneNumber"
                autoComplete="off"
                value={logic.editUserState.shippingPhoneNumber}
                onChange={handleChange}
              />

              {/* shipping address */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`shipping address: ${logic.user.shippingAddress}`}
                name="shippingAddress"
                autoComplete="off"
                value={logic.editUserState.shippingAddress}
                onChange={handleChange}
              />

              {/* shipping  unit*/}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`shipping unit: ${logic.user.shippingUnit}`}
                name="shippingUnit"
                autoComplete="off"
                value={logic.editUserState.shippingUnit}
                onChange={handleChange}
              />

              {/* shipping country*/}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`shipping country: ${logic.user.shippingCountry}`}
                name="shippingCountry"
                autoComplete="off"
                value={logic.editUserState.shippingCountry}
                onChange={handleChange}
              />

              {/* shipping province or state */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none durtion-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`shipping province or state: ${logic.user.shippingProvinceOrState}`}
                name="shippingProvinceOrState"
                autoComplete="off"
                value={logic.editUserState.shippingProvinceOrState}
                onChange={handleChange}
              />

              {/* shipping city */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`shipping city: ${logic.user.shippingCity}`}
                name="shippingCity"
                autoComplete="off"
                value={logic.editUserState.shippingCity}
                onChange={handleChange}
              />

              {/* shipping postal code */}
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
                type="text"
                placeholder={`shipping postal code: ${logic.user.shippingPostalCode}`}
                name="shippingPostalCode"
                autoComplete="off"
                value={logic.editUserState.shippingPostalCode}
                onChange={handleChange}
              />

              {/* conatct same as shipping info */}
              <label htmlFor="contactSameShipping" className="mt-5">
                Edit contact info to match the new shipping info?
              </label>
              <input
                id="contactSameShipping"
                type="checkbox"
                name="contactEqualShipping"
                className="accent-blue-500 w-5 h-5 rounded focus:outline-none mt-3"
                value={logic.editUserState.shippingSameAsContactInfo}
                onChange={() => dispatch(toggleEditUsershippingAddress())}
              />

              {/* edit button */}
              <button
                className="mt-5 hover:text-blue-500 duration-500"
                onClick={handleEditShippingInfo}
              >
                Edit shipping info
              </button>

              {/* cancel button */}
              <button
                className="mt-5 hover:text-blue-500 duration-500"
                onClick={() => handleCancel(setShowEditShippingInfoTofalse)}
              >
                Cancel
              </button>
            </form>
          </div>
        </motion.section>
      ) : null}
    </section>
  );
};

export default EditProfile;
