import React from "react";

//React Router v6
// react router hooks
import { Link, useNavigate } from "react-router-dom";

// framer motion
import { motion } from "framer-motion";

// Axios
import axios from "axios";

// react icons
import { FaTimes } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

// redux
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// functions in store slice
import {
  removeProdShoppingCart,
  emptyShoppingCart,
  setOrders,
  setUsers,
} from "../../redux/slices/state/storeSlice";
// functions in logic slice
import {
  setShowEditPasswordToTrue,
  setShowEditContactInfoToTrue,
  setShowEditShippingInfoToTrue,
  toggleShowPassword,
  setisLoggedInToFalse,
  setuserToNone,
  setUserTokenEmpty,
  setUser,
} from "../../redux/slices/staticState/logicSlice";

// utils functions
import {
  getApiErrorMessage,
  getApiSuccessMessage,
  refreshUsersData,
  refreshOrdersData,
  refreshUserData,
} from "../../utils/helpers";

// helper vars
// headers config
import { getHeadersConfig } from "../../utils/vars";

// profile function component
// profile function component
// profile function component
const Profile = () => {
  // redux & state
  // state in logic slice
  const logic = useSelector((state) => state.logicSlice);
  // state in store slice
  const storeState = useSelector((state) => state.storeSlice);
  // redux hooks
  const dispatch = useDispatch();

  // react router hooks
  const navigate = useNavigate();

  // functions
  // functions
  // functions

  // go to edit password page
  // go to edit password page
  // go to edit password page
  const navigateToEditPassword = () => {
    dispatch(setShowEditPasswordToTrue());
  };

  // go to edit contact info page
  // go to edit contact info page
  // go to edit contact info page
  const navigateToEditContactInfo = () => {
    dispatch(setShowEditContactInfoToTrue());
  };

  // go to edit shipping info page
  // go to edit shipping info page
  // go to edit shipping info page
  const navigateToEditShippingInfo = () => {
    dispatch(setShowEditShippingInfoToTrue());
  };

  // handle inactivation account
  // handle inactivation account
  // handle inactivation account
  const handleAccInactivation = async (id) => {
    try {
      // API call – inactivate user
      const result = await axios.patch(
        `${import.meta.env.VITE_API_USERS_URL}/inactivateprofile`,
        { _id: id },
        getHeadersConfig()
      );

      // after success api call

      // console.log result
      getApiSuccessMessage(result);

      // success message
      toast("User successfully inactivated", toastStyleObject());

      // empty user cart if there are items
      if (storeState.shoppingCart.length > 0) {
        storeState.shoppingCart.forEach((prod) => {
          dispatch(removeProdShoppingCart(prod._id));
        });
      }
      dispatch(emptyShoppingCart());

      // reset state
      // user status, user state, token
      dispatch(setisLoggedInToFalse());
      dispatch(setuserToNone());
      dispatch(setUserTokenEmpty());
    } catch (error) {
      // error handling
      console.log("Error:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());
    }
  };

  // handle reactivation acc
  // handle reactivation acc
  // handle reactivation acc
  const handleAccReactivation = async (id) => {
    try {
      // reactivate user API call
      const result = await axios.patch(
        `${import.meta.env.VITE_API_USERS_URL}/reactivateprofile`,
        { _id: id },
        getHeadersConfig()
      );

      // after success api call

      // console result
      getApiSuccessMessage(result);

      // refresh the logged-in user
      await refreshUserData(id, logic.userToken, dispatch, setUser);

      // admin-only refreshes
      if (logic.user.role === "admin") {
        await refreshOrdersData(logic.userToken, dispatch, setOrders);
        await refreshUsersData(logic.userToken, dispatch, setUsers);
      }

      // redirect user
      navigate("/profile");

      // success message
      toast("User successfully reactivated", toastStyleObject());
    } catch (error) {
      // error handling
      console.log("Error reactivating user:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());
    }
  };

  // return
  // return
  // return
  // Renders if profile is not active
  // Renders if profile is not active
  // Renders if profile is not active
  if (!logic.user.isActive) {
    return (
      <section className="relative h-screen w-screen flex items-center justify-center">
        <div className="mt-[125px]  flex flex-col justify-center items-center">
          <p className="text-2xl mb-10">This account has been inactivated.</p>
          <button
            className="rounded-lg  w-1/2 p-2 bg-black text-white hover:bg-blue-500 duration-500"
            onClick={() => handleAccReactivation(logic.user._id)}
          >
            Reactivate my account
          </button>
        </div>
      </section>
    );
  }

  // return
  // return
  // return
  // renders if profile is active
  // renders if profile is active
  // renders if profile is active
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-screen flex flex-col items-center"
    >
      {/* Headding */}
      <div className="mt-[175px] ">
        <p className="text-3xl underline">Profile</p>
      </div>
      {/* profile info container */}
      <div className="p-2 w-full lg:w-2/3 mt-[25px]">
        {/* User & password */}
        <div className="p-3 border-[1px] border-black rounded-md shadow">
          <div className="lg:flex justify-between mb-2">
            <p>{`Full name: ${logic.user.name} ${logic.user.lastname}`}</p>
            <p>{`Email: ${logic.user.email}`}</p>
          </div>

          <div className="flex justify-end text-sm ">
            <Link
              to="/editprofile"
              className="underline hover:text-blue-500 duration-500"
              onClick={navigateToEditPassword}
            >
              edit password
            </Link>
          </div>
        </div>

        {/* Contact info */}
        <div className="p-2 mt-10 border-[1px] border-black rounded-md text-sm shadow">
          <div className="mb-2">
            <p className="text-center text-xl">Contact info:</p>
          </div>
          <div>
            <p>Address: {`${logic.user.contactAddress}`}</p>
            <p>Unit: {`${logic.user.contactUnit}`}</p>
            <p>Country: {`${logic.user.contactCountry}`}</p>
            <p>Province or State: {`${logic.user.contactProvinceOrState}`}</p>
            <p>City: {`${logic.user.contactCity}`}</p>
            <p>Postal Code: {`${logic.user.contactPostalCode}`}</p>
            <div className="flex justify-between">
              <p>{`Phone: ${logic.user.contactPhoneNumber}`}</p>
              <Link
                to="/editProfile"
                className="underline hover:text-blue-500 duration-500"
                onClick={navigateToEditContactInfo}
              >
                update contact info
              </Link>
            </div>
          </div>
        </div>
        {/* Shipping info */}
        <div className="p-2 mt-3 border-[1px] border-black rounded-md text-sm shadow">
          <div className="mb-2">
            <p className="text-center text-xl">Shipping info:</p>
          </div>
          {logic.user.shippingSameAsContactInfo ? (
            <div className="flex justify-between">
              <p className="text-center ">Same as contact info</p>
              <Link
                to="/editprofile"
                className="underline hover:text-blue-500"
                onClick={navigateToEditShippingInfo}
              >
                update shipping info
              </Link>
            </div>
          ) : (
            <div>
              <p>Address: {`${logic.user.shippingAddress}`}</p>
              <p>Unit: {`${logic.user.shippingUnit}`}</p>
              <p>Country: {`${logic.user.shippingCountry}`}</p>
              <p>
                Province or State: {`${logic.user.shippingProvinceOrState}`}
              </p>
              <p>City: {`${logic.user.shippingCity}.`}</p>
              <p>Postal Code: {`${logic.user.shippingPostalCode}`}</p>
              <div className="flex justify-between">
                <p>{`Phone: ${logic.user.shippingPhoneNumber}`}</p>
                <Link
                  to="/editprofile"
                  className="underline hover:text-blue-500 duration-500"
                  onClick={navigateToEditShippingInfo}
                >
                  update shipping info
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* Past orders */}
        <div className="p-2 mt-10  text-sm  ">
          <div className="mb-2">
            <p className="text-center text-xl underline">Orders</p>
          </div>
          <div>
            {logic.user?.orders?.length > 0 ? (
              logic.user.orders.map((order) => (
                <div className="my-10 flex flex-col items-center border-[1px] border-black rounded-xl  h-[350px] overflow-hidden overflow-y-scroll p-3 shadow-lg">
                  <p className="pt-5 text-center">{`Date of purcharse: ${order.createdAt.slice(
                    0,
                    10
                  )}`}</p>
                  <p className="text-sm">Order ID: {order._id}</p>
                  <p className="text-sm">
                    Total items: {order.products.length}
                  </p>
                  <p className="text-sm">Status: {order.status}</p>
                  <p className="text-sm">
                    Shipped to: Shipping address at the time of purchase
                  </p>
                  <p className="text-sm">Total amount paid: 123 CAD</p>
                  <br />
                  <p className="underline">Items:</p>
                  {order.products.map((product) => (
                    <div className="w-[90%] flex flex-col items-center md:flex-row md:justify-between p-2 border-b border-black">
                      <img
                        src={product.media.url}
                        alt="productImg"
                        className="max-w-[125px] max-h-[150px] my-5"
                      />

                      <div>
                        <p className="text-sm py-1 text-center">{`${product.title}`}</p>
                        <p className="text-sm py-1 text-center">{`${product.shortDesc}`}</p>
                        <p className="text-sm py-1 text-center">{`Amount paid: ${
                          (product.cost + product.nationwideDelivery) * 0.13 +
                          product.cost +
                          product.nationwideDelivery
                        } CAD`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p
                className="flex items-center justify-center border-[1px] border-black rounded-lg h-[70px] text-xl
              "
              >
                There aren't past orders
              </p>
            )}
          </div>
        </div>
        {/* Shopping cart */}
        <div className="border-[1px] border-black rounded-md my-8 shadow">
          <div>
            <p className="text-center text-xl m-2">Shopping Cart</p>
          </div>

          {storeState.shoppingCart.length > 0 ? (
            storeState.shoppingCart.map((prod) => (
              <div
                key={prod.id}
                className="m-5 p-2 mb-8 border-b-[1px] border-b-black"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Link to={`/store/${prod._id}`}>
                      <img
                        src={prod.media.url}
                        alt="prod img"
                        className="max-h-[150px] max-w-[175px] p-2 rounded-xl"
                      />
                    </Link>
                  </div>
                  <div className="p-2 w-1/3">
                    <p className="text-center">{prod.title}</p>
                  </div>
                  <div className="p-2">{`${prod.cost} CAD`}</div>
                  <div className="p-2">
                    <button
                      onClick={() => dispatch(removeProdShoppingCart(prod._id))}
                      className="hover:text-blue-500 duration-500"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-between p-5 text-center mt-3 ">
              <p className="text-sm">Your shopping cart is empty</p>

              <Link
                className="text-sm underline hover:text-blue-500 duration-500"
                to="/store"
              >
                shop
              </Link>
            </div>
          )}
        </div>
        <div className="border-[1px] border-black rounded-md my-8 shadow">
          <div>
            <p className="text-center text-xl m-2">Danger zone</p>
          </div>
          <div className="flex items-center justify-center h-[50px]">
            <button
              className="hover:text-red-500 underline duration-500"
              onClick={() => handleAccInactivation(logic.user._id)}
            >
              Inactivate account
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Profile;
