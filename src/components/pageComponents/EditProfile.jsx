import React from "react";

// Axios
import axios from "axios";

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

// React router V6
// react router hooks
import { useNavigate } from "react-router-dom";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

//
//
// Edit profile function component
// Edit profile function component
// Edit profile function component
const EditProfile = () => {
  // redux hooks & state
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
        {
          headers: { Authorization: `Bearer ${logic.userToken}` },
        }
      );

      // success after updating user's password api call
      console.log("Password updated successfully", result.data);

      // get updated user api call
      const response = await axios.get(
        `${import.meta.env.VITE_API_USERS_URL}/${logic.user._id}`,
        {
          headers: { Authorization: `Bearer ${logic.userToken}` },
        }
      );

      // success after getting updated user api call
      const updatedUser = response.data;
      dispatch(setUser(updatedUser));

      // resetting
      dispatch(setShowEditPasswordTofalse());
      dispatch(resetEditUserState());
      navigate("/profile");

      // success message
      toast("Password updated", toastStyleObject());
    } catch (error) {
      // error hadling
      console.log("Password update error:", error);

      // error message variable
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong.";

      // faliure message
      toast(msg, toastStyleObject());

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
        {
          headers: { Authorization: `Bearer ${logic.userToken}` },
        }
      );

      // success after editing user's contact info api call
      console.log("Contact info updated successfully", result.data);

      // get updated user api call
      const response = await axios.get(
        `${import.meta.env.VITE_API_USERS_URL}/${logic.user._id}`,
        {
          headers: { Authorization: `Bearer ${logic.userToken}` },
        }
      );

      // success after getting updated user api call
      const updatedUser = response.data;
      dispatch(setUser(updatedUser));

      // resetting
      dispatch(setShowEditContactInfoTofalse());
      dispatch(resetEditUserState());
      navigate("/profile");

      // success message
      toast("Profile info updated", toastStyleObject());
    } catch (error) {
      // error handling
      console.log("Contact info update error:", error);

      // error message variable
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong.";

      // faliure message
      toast(msg, toastStyleObject());

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
        {
          headers: { Authorization: `Bearer ${logic.userToken}` },
        }
      );

      // success after editing shipping info api call
      console.log("Shipping info updated successfully", result.data);

      // get updated user api call
      const response = await axios.get(
        `${import.meta.env.VITE_API_USERS_URL}/${logic.user._id}`,
        {
          headers: { Authorization: `Bearer ${logic.userToken}` },
        }
      );

      // success after getting updated user api call
      const updatedUser = response.data;
      dispatch(setUser(updatedUser));

      // resetting
      dispatch(setShowEditShippingInfoTofalse());
      dispatch(resetEditUserState());
      navigate("/profile");

      // success message
      toast("Profile info updated", toastStyleObject());
    } catch (error) {
      // error handling
      console.log("Shipping info update error:", error);

      // error message variable
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong.";

      // failure message
      toast(msg, toastStyleObject());

      // resetting fields and editUserState object
      dispatch(resetEditUserState());
      return;
    }
  };

  // go back to profile page from edit profile page
  // go back to profile page from edit profile page
  // go back to profile page from edit profile page
  const handleCancelEditPassword = (e) => {
    e.preventDefault();
    dispatch(setShowEditPasswordTofalse());
    dispatch(resetEditUserState());
    navigate("/profile");
  };

  const handleCancelEditContactInfo = (e) => {
    e.preventDefault();
    dispatch(setShowEditContactInfoTofalse());
    dispatch(resetEditUserState());
    navigate("/profile");
  };

  const handleCancelEditShippingInfo = (e) => {
    e.preventDefault();
    dispatch(setShowEditShippingInfoTofalse());
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
        <>
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-center text-3xl">Edit password</p>
          </div>
          <div className="h-[600px] w-full">
            <form className="h-full flex flex-col items-center justify-center">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="password"
                placeholder="Enter old password"
                name="oldPassword"
                autoComplete="off"
                value={logic.editUserState.oldPassword}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="password"
                placeholder="Enter new password"
                name="newPassword"
                autoComplete="off"
                value={logic.editUserState.newPassword}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="password"
                placeholder="Confirm new password"
                name="confirmationNewPassword"
                autoComplete="off"
                value={logic.editUserState.confirmationNewPassword}
                onChange={handleChange}
              />

              <button
                className="mt-5 hover:text-slate-600"
                onClick={handleEditPassword}
              >
                Edit Password
              </button>
              <button
                className="mt-5 hover:text-slate-600"
                onClick={handleCancelEditPassword}
              >
                Cancel
              </button>
            </form>
          </div>
        </>
      ) : null}

      {/* Edit contact info page */}
      {/* Edit contact info page */}
      {/* Edit contact info page */}
      {logic.showEditContactInfo ? (
        <>
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-center text-3xl">Edit contact info</p>
          </div>
          <div className="h-[600px] w-full">
            <form className="h-full flex flex-col items-center justify-center">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.contactPhoneNumber}
                name="contactPhoneNumber"
                autocomplete="off"
                value={logic.editUserState.contactPhoneNumber}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.contactAddress}
                name="contactAddress"
                autocomplete="off"
                value={logic.editUserState.contactAddress}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.contactUnit}
                name="contactUnit"
                autocomplete="off"
                value={logic.editUserState.contactUnit}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.contactCountry}
                name="contactCountry"
                autocomplete="off"
                value={logic.editUserState.contactCountry}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.contactProvinceOrState}
                name="contactProvinceOrState"
                autocomplete="off"
                value={logic.editUserState.contactProvinceOrState}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.contactCity}
                name="contactCity"
                autocomplete="off"
                value={logic.editUserState.contactCity}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.contactPostalCode}
                name="contactPostalCode"
                autocomplete="off"
                value={logic.editUserState.contactPostalCode}
                onChange={handleChange}
              />

              <label htmlFor="contactSameShipping" className="mt-5">
                Edit shipping info to match the new contact info?
              </label>
              <input
                id="contactSameShipping"
                type="checkbox"
                name="shippingSameAsContactInfo"
                className="accent-black w-5 h-5 rounded focus:outline-none mt-3"
                value={logic.editUserState.shippinSameAsContactInfo}
                onChange={() => dispatch(toggleEditUserContactAddress())}
              />

              <button
                className="mt-5 hover:text-slate-600"
                onClick={handleEditContactInfo}
              >
                Edit contact info
              </button>
              <button
                className="mt-5 hover:text-slate-600"
                onClick={handleCancelEditContactInfo}
              >
                Cancel
              </button>
            </form>
          </div>
        </>
      ) : null}

      {/* Edit shipping info page */}
      {/* Edit shipping info page */}
      {/* Edit shipping info page */}
      {logic.showEditShippingInfo ? (
        <>
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-center text-3xl">Edit Shipping info</p>
          </div>
          <div className="h-[600px] w-full">
            <form className="h-full flex flex-col items-center justify-center">
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingPhoneNumber}
                name="shippingPhoneNumber"
                autocomplete="off"
                value={logic.editUserState.shippingPhoneNumber}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingAddress}
                name="shippingAddress"
                autocomplete="off"
                value={logic.editUserState.shippingAddress}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingUnit}
                name="shippingUnit"
                autocomplete="off"
                value={logic.editUserState.shippingUnit}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingCountry}
                name="shippingCountry"
                autocomplete="off"
                value={logic.editUserState.shippingCountry}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingProvinceOrState}
                name="shippingProvinceOrState"
                autocomplete="off"
                value={logic.editUserState.shippingProvinceOrState}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingCity}
                name="shippingCity"
                autocomplete="off"
                value={logic.editUserState.shippingCity}
                onChange={handleChange}
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingPostalCode}
                name="shippingPostalCode"
                autocomplete="off"
                value={logic.editUserState.shippingPostalCode}
                onChange={handleChange}
              />

              <label htmlFor="contactSameShipping" className="mt-5">
                Edit contact info to match the new shipping info?
              </label>
              <input
                id="contactSameShipping"
                type="checkbox"
                name="contactEqualShipping"
                className="accent-black w-5 h-5 rounded focus:outline-none mt-3"
                value={logic.editUserState.shippinSameAsContactInfo}
                onChange={() => dispatch(toggleEditUsershippingAddress())}
              />

              <button
                className="mt-5 hover:text-slate-600"
                onClick={handleEditShippingInfo}
              >
                Edit shipping info
              </button>
              <button
                className="mt-5 hover:text-slate-600"
                onClick={handleCancelEditShippingInfo}
              >
                Cancel
              </button>
            </form>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default EditProfile;
