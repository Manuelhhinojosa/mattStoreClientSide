import React from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  setShowEditPasswordTofalse,
  setShowEditContactInfoTofalse,
  setShowEditShippingInfoTofalse,
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
  //   for edit password page
  const handleEditPassword = (e) => {
    e.preventDefault();
    dispatch(setShowEditPasswordTofalse());
    navigate("/profile");
    toast(`Password updated`, toastStyleObject());
  };

  const handleCancelEditPassword = (e) => {
    e.preventDefault();
    dispatch(setShowEditPasswordTofalse());
    navigate("/profile");
  };

  //   for edit contact info page
  const handleEditContactInfo = (e) => {
    e.preventDefault();
    dispatch(setShowEditContactInfoTofalse());
    navigate("/profile");
    toast(`Contact info updated`, toastStyleObject());
  };

  const handleCancelEditContactInfo = (e) => {
    e.preventDefault();
    dispatch(setShowEditContactInfoTofalse());
    navigate("/profile");
  };

  // for edit shipping info page

  const handleEditShippingInfo = (e) => {
    e.preventDefault();
    dispatch(setShowEditShippingInfoTofalse());
    navigate("/profile");
    toast(`Shipping info updated`, toastStyleObject());
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
            <form
              action=""
              className="h-full flex flex-col items-center justify-center"
            >
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="password"
                placeholder="Enter old password"
                name="password"
                autoComplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="password"
                placeholder="Enter new password"
                name="password"
                autoComplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="password"
                placeholder="Confirm new password"
                name="password"
                autoComplete="off"
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
            <form
              action=""
              className="h-full flex flex-col items-center justify-center"
            >
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.contactPhoneNumber}
                name="contactPhoneNumber"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.address}
                name="address"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.addressUnit}
                name="addressUnit"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.country}
                name="country"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.provinceOrState}
                name="provinceOrState"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.city}
                name="city"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.postalCode}
                name="postalCode"
                autocomplete="off"
              />

              <label htmlFor="contactSameShipping" className="mt-5">
                Edit shipping info to match the new contact info?
              </label>
              <input
                id="contactSameShipping"
                type="checkbox"
                name="contactEqualShipping"
                className="accent-black w-5 h-5 rounded focus:outline-none mt-3"
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
            <form
              action=""
              className="h-full flex flex-col items-center justify-center"
            >
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingPhoneNumber}
                name="shippingPhoneNumber"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingAddress}
                name="shippingAddress"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingAddressUnit}
                name="shippingAddressUnit"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingCountry}
                name="shippingCountry"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingProviceOrState}
                name="shippingProviceOrState"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingCity}
                name="shippingCity"
                autocomplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="text"
                placeholder={logic.user.shippingPostalCode}
                name="shippingPostalCode"
                autocomplete="off"
              />

              <label htmlFor="contactSameShipping" className="mt-5">
                Edit contact info to match the new shipping info?
              </label>
              <input
                id="contactSameShipping"
                type="checkbox"
                name="contactEqualShipping"
                className="accent-black w-5 h-5 rounded focus:outline-none mt-3"
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
