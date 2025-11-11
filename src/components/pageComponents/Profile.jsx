import React from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
// functions
import {
  removeProdShoppingCart,
  emptyShoppingCart,
} from "../../redux/slices/state/storeSlice";
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

//React Router 6
import { Link, useNavigate } from "react-router-dom";

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

const Profile = () => {
  // redux & state
  const logic = useSelector((state) => state.logicSlice);
  const storeState = useSelector((state) => state.storeSlice);
  const dispatch = useDispatch();
  // react router hooks
  const navigate = useNavigate();

  // functions
  // go to edit password page
  const navigateToEditPassword = () => {
    dispatch(setShowEditPasswordToTrue());
  };

  // go to edit contact info page
  const navigateToEditContactInfo = () => {
    dispatch(setShowEditContactInfoToTrue());
  };

  // go to edit shipping info page
  const navigateToEditShippingInfo = () => {
    dispatch(setShowEditShippingInfoToTrue());
  };

  // handle inactivation account
  const handleAccInactivation = async (id) => {
    try {
      const res = await axios.patch(
        "http://localhost:3000/users/inactivateprofile",
        { _id: id },
        {
          headers: {
            Authorization: `Bearer ${logic.userToken}`,
          },
        }
      );
      console.log("User inactivated:", res.data);
      toast("User successfully inactivated", toastStyleObject());

      if (storeState.shoppingCart.length > 0) {
        storeState.shoppingCart.map((prod) => {
          dispatch(removeProdShoppingCart(prod._id));
        });
      }
      dispatch(emptyShoppingCart());
      dispatch(setisLoggedInToFalse());
      dispatch(setuserToNone());
      dispatch(setUserTokenEmpty());
    } catch (error) {
      console.error("Error inactivating user:", error);
      toast("Error inactivating user", toastStyleObject());
    }
  };

  // handle reactivation acc
  const handleAccReactivation = async (id) => {
    try {
      const res = await axios.patch(
        "http://localhost:3000/users/reactivateprofile",
        { _id: id },
        {
          headers: {
            Authorization: `Bearer ${logic.userToken}`,
          },
        }
      );
      console.log("User reactivated:", res.data);
      toast("User successfully reactivated", toastStyleObject());

      const refreshedUserRes = await axios.get(
        `http://localhost:3000/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${logic.userToken}`,
          },
        }
      );

      dispatch(setUser(refreshedUserRes.data));
      navigate("/profile");
    } catch (error) {
      console.error("Error inactivating user:", error);
      toast("Error inactivating user", toastStyleObject());
    }
  };

  // Renders if profile is not active
  if (!logic.user.isActive) {
    return (
      <section className="relative h-screen w-screen flex items-center justify-center">
        <div className="mt-[125px]  flex flex-col justify-center items-center">
          <p className="text-2xl mb-10">This account has been inactivated.</p>
          <button
            className="rounded-lg  w-1/2 p-2 bg-black text-white hover:bg-gray-500 hover:text-black"
            onClick={() => handleAccReactivation(logic.user._id)}
          >
            Reactivate my account
          </button>
        </div>
      </section>
    );
  }

  // renders if profile is active
  return (
    <section className="relative  h-screen w-screen flex flex-col items-center">
      {/* Headding */}
      <div className="mt-[125px] ">
        <p className="text-3xl">Profile</p>
      </div>
      {/* profile info container */}
      <div className="p-2 w-full lg:w-2/3 mt-[25px]">
        {/* User & password */}
        <div className="p-3 border-[1px] border-black rounded-md shadow">
          <div className="lg:flex justify-between mb-2">
            <p>{`Full name: ${logic.user.name} ${logic.user.lastname}`}</p>
            <p>{`Email: ${logic.user.email}`}</p>
          </div>

          <div className="flex justify-between text-sm ">
            <div className="flex">
              {logic.showPassword ? (
                <p className="mr-5">Password: {logic.user.password}</p>
              ) : (
                <p className="mr-5">Password: *****</p>
              )}

              {logic.showPassword ? (
                <GoEyeClosed
                  className="text-xl hover:cursor-pointer"
                  onClick={() => dispatch(toggleShowPassword())}
                />
              ) : (
                <RxEyeOpen
                  className="text-xl hover:cursor-pointer"
                  onClick={() => dispatch(toggleShowPassword())}
                />
              )}
            </div>

            <Link
              to="/editprofile"
              className="border-b-[1px] border-b-black"
              onClick={navigateToEditPassword}
            >
              edit
            </Link>
          </div>
        </div>

        {/* Contact info */}
        <div className="p-2 mt-10 border-[1px] border-black rounded-md text-sm shadow">
          <div className="mb-2">
            <p className="text-center text-xl">Contact info:</p>
          </div>
          <div>
            <p>Address: {`${logic.user.contactAddress}.`}</p>
            <p>Unit: {`${logic.user.contactUnit}.`}</p>
            <p>Country: {`${logic.user.contactCountry}.`}</p>
            <p>Province or State: {`${logic.user.contactProvinceOrState}.`}</p>
            <p>City: {`${logic.user.contactCity}.`}</p>
            <p>Postal Code: {`${logic.user.contactPostalCode}.`}</p>
            <div className="flex justify-between">
              <p>{`Phone: ${logic.user.contactPhoneNumber}`}</p>
              <Link
                to="/editProfile"
                className="border-b-[1px] border-b-black"
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
                className="border-b-[1px] border-b-black"
                onClick={navigateToEditShippingInfo}
              >
                update shipping info
              </Link>
            </div>
          ) : (
            <div>
              <p>Address: {`${logic.user.shippingAddress}.`}</p>
              <p>Unit: {`${logic.user.shippingUnit}.`}</p>
              <p>Country: {`${logic.user.shippingCountry}.`}</p>
              <p>
                Province or State: {`${logic.user.shippingProvinceOrState}.`}
              </p>
              <p>City: {`${logic.user.shippingCity}.`}</p>
              <p>Postal Code: {`${logic.user.shippingPostalCode}.`}</p>
              <div className="flex justify-between">
                <p>{`Phone: ${logic.user.shippingPhoneNumber}`}</p>
                <Link
                  to="/editprofile"
                  className="border-b-[1px] border-b-black"
                  onClick={navigateToEditShippingInfo}
                >
                  update shipping info
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* Past orders */}
        <div className="p-2 mt-10 border-[2px] border-black rounded-md text-sm shadow ">
          <div className="mb-2">
            <p className="text-center text-xl">Orders:</p>
          </div>
          <div>
            {logic.user?.orders?.length > 0 ? (
              logic.user.orders.map((order) => (
                <div className="my-10 flex flex-col items-center border-[1px] border-black rounded-xl  h-[350px] overflow-hidden overflow-y-scroll p-3">
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
                    <div className="w-[90%] flex flex-col items-center md:flex-row md:justify-between p-5 border-b border-black">
                      <img
                        src={product.media.url}
                        alt="productImg"
                        className="w-[125px] my-5"
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
            <p className="text-center text-xl m-2">Shopping Cart:</p>
          </div>

          {storeState.shoppingCart.length > 0 ? (
            storeState.shoppingCart.map((prod) => (
              <div
                key={prod.id}
                className="m-5 mb-8 border-b-[1px] border-b-black"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <Link to={`/store/${prod.id}`}>
                      <img
                        src={prod.media.url}
                        alt="prod img"
                        className="h-[150px] p-2 rounded-xl"
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
                className="text-sm border-b-[1px] border-b-black hover:text-slate-600 hover:border-slate-600"
                to="/store"
              >
                shop
              </Link>
            </div>
          )}
        </div>
        <div className="border-[1px] border-black rounded-md my-8 shadow">
          <div>
            <p className="text-center text-xl m-2">Danger zone:</p>
          </div>
          <div className="flex items-center justify-center h-[50px]">
            <button
              className="text-red-900 hover:font-semibold"
              onClick={() => handleAccInactivation(logic.user._id)}
            >
              Inactivate account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
