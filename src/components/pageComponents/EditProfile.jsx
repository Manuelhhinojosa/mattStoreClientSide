import React from "react";

// Axios
import axios from "axios";

// redux
import { useSelector, useDispatch } from "react-redux";
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
import { useNavigate } from "react-router-dom";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

const EditProfile = () => {
  // redux & state
  const dispatch = useDispatch();
  const logic = useSelector((state) => state.logicSlice);

  // react router v6
  const navigate = useNavigate();

  // functions
  // functions
  // functions

  // handle edit user state object in redux store
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditUserState({ key: name, value: value }));
  };
  //   for edit password page
  const handleEditPassword = (e) => {
    e.preventDefault();

    // afet edit call
    dispatch(setShowEditPasswordTofalse());
    navigate("/profile");
    toast(`Password updated`, toastStyleObject());
  };

  //   for edit contact info
  const handleEditContactInfo = (e) => {
    e.preventDefault();
    const userNewData = logic.editUserState;

    if (
      logic.editUserState.contactPhoneNumber === "" ||
      logic.editUserState.contactAddress === "" ||
      logic.editUserState.contactCountry === "" ||
      logic.editUserState.contactProvinceOrState === "" ||
      logic.editUserState.contactCity === "" ||
      logic.editUserState.contactPostalCode === ""
    ) {
      toast(
        "Phone number, Address, Country, Province or State, City, and Postal code are required fields",
        toastStyleObject()
      );
      return;
    }

    axios
      .put(
        `http://localhost:3000/users/editcontact/${logic.user._id}`,
        logic.editUserState,
        {
          headers: {
            Authorization: `Bearer ${logic.userToken}`,
          },
        }
      )
      .then((result) => {
        const newUserInfo = result.data;
        console.log("here", newUserInfo);

        axios
          .get(`http://localhost:3000/users/${logic.user._id}`, {
            headers: {
              Authorization: `Bearer ${logic.userToken}`,
            },
          })
          .then((res) => {
            const updatedUser = res.data;
            dispatch(setUser(updatedUser));
          });
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch(setShowEditContactInfoTofalse());
    navigate("/profile");
    toast(`Profile info updated`, toastStyleObject());
    dispatch(resetEditUserState());
  };

  const handleEditShippingInfo = (e) => {
    e.preventDefault();
    const userNewData = logic.editUserState;

    if (
      logic.editUserState.shippingPhoneNumber === "" ||
      logic.editUserState.shippingAddress === "" ||
      logic.editUserState.shippingCountry === "" ||
      logic.editUserState.shippingProvinceOrState === "" ||
      logic.editUserState.shippingCity === "" ||
      logic.editUserState.shippingPostalCode === ""
    ) {
      toast(
        "Phone number, Address, Country, Province or State, City, and Postal code are required fields",
        toastStyleObject()
      );
      return;
    }

    axios
      .put(
        `http://localhost:3000/users/editshipping/${logic.user._id}`,
        logic.editUserState,
        {
          headers: {
            Authorization: `Bearer ${logic.userToken}`,
          },
        }
      )
      .then((result) => {
        const newUserInfo = result.data;
        console.log("here", newUserInfo);

        axios
          .get(`http://localhost:3000/users/${logic.user._id}`, {
            headers: {
              Authorization: `Bearer ${logic.userToken}`,
            },
          })
          .then((res) => {
            const updatedUser = res.data;
            dispatch(setUser(updatedUser));
          });
      })
      .catch((error) => {
        console.log(error);
      });

    dispatch(setShowEditContactInfoTofalse());
    navigate("/profile");
    toast(`Profile info updated`, toastStyleObject());
    dispatch(resetEditUserState());
  };

  // fix repeated functions
  const handleCancelEditPassword = (e) => {
    e.preventDefault();
    dispatch(setShowEditPasswordTofalse());
    navigate("/profile");
  };

  const handleCancelEditContactInfo = (e) => {
    e.preventDefault();
    dispatch(setShowEditContactInfoTofalse());
    navigate("/profile");
  };

  const handleCancelEditShippingInfo = (e) => {
    e.preventDefault();
    dispatch(setShowEditShippingInfoTofalse());
    navigate("/profile");
  };

  return (
    <section className="container mx-auto h-auto mt-32">
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
