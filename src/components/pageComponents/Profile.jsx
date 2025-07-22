import React from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { removeProdShoppingCart } from "../../redux/slices/state/storeSlice";
import {
  setShowEditPasswordToTrue,
  setShowEditContactInfoToTrue,
  setShowEditShippingInfoToTrue,
  toggleShowPassword,
} from "../../redux/slices/staticState/logicSlice";

//React Router 6
import { Link } from "react-router-dom";

// react icons
import { FaTimes } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { MdOutlinePassword } from "react-icons/md";

const Profile = () => {
  // redux & state
  const logic = useSelector((state) => state.logicSlice);
  const storeState = useSelector((state) => state.storeSlice);
  const dispatch = useDispatch();

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

  return (
    <section className="relative  h-screen w-screen flex flex-col items-center">
      {/* Headding */}
      <div className="mt-[125px]">
        <p className="text-3xl">Profile</p>
      </div>
      {/* profile info container */}
      <div className="p-2 w-full lg:w-2/3 mt-[25px]">
        {/* User & password */}
        <div className="p-3 border-[1px] border-black rounded-md ">
          <div className="lg:flex justify-between mb-2">
            <p>{`Full name: ${logic.user.name} ${logic.user.lastname}`}</p>
            <p>{`User: ${logic.user.username}`}</p>
          </div>

          <div className="flex justify-between text-sm">
            <div className="flex">
              {logic.showPassword ? (
                <p className="mr-5">password: {logic.user.password}</p>
              ) : (
                <p className="mr-5">password: *****</p>
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
        <div className="p-2 mt-3 border-[1px] border-black rounded-md text-sm">
          <div className="mb-2">
            <p className="text-center text-xl">Contact info:</p>
          </div>
          <div>
            <p>{`Address: ${logic.user.address}.  ${
              logic.user.addressUnit ? `Unit ${logic.user.addressUnit}.` : ""
            } ${logic.user.city}, ${logic.user.provinceOrState}, ${
              logic.user.country
            }. ${logic.user.postalCode}`}</p>
            <div className="flex justify-between">
              <p>{`Phone: ${logic.user.contactPhoneNumber}`}</p>
              <Link
                to="/editProfile"
                className="border-b-[1px] border-b-black"
                onClick={navigateToEditContactInfo}
              >
                edit
              </Link>
            </div>
          </div>
        </div>
        {/* Shipping info */}
        <div className="p-2 mt-3 border-[1px] border-black rounded-md text-sm">
          <div className="mb-2">
            <p className="text-center text-xl">Shipping info:</p>
          </div>
          {logic.user.contactEqualShipping ? (
            <div className="flex justify-between">
              <p>Same as contact info</p>
              <Link
                to="/editprofile"
                className="border-b-[1px] border-b-black"
                onClick={navigateToEditShippingInfo}
              >
                edit
              </Link>
            </div>
          ) : (
            <div>
              <p>{`Address: ${logic.user.shippingAddress}. ${
                logic.user.shippingAddressUnit
                  ? `Unit ${logic.user.shippingAddressUnit}.`
                  : ""
              } ${logic.user.shippingCity}, ${
                logic.user.shippingProviceOrState
              }, ${logic.user.shippingCountry}. ${
                logic.user.shippingPostalCode
              }`}</p>
              <div className="flex justify-between">
                <p>{`Phone: ${logic.user.shippingPhoneNumber}`}</p>
                <Link
                  to="/editprofile"
                  className="border-b-[1px] border-b-black"
                  onClick={navigateToEditShippingInfo}
                >
                  edit
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* Past orders */}
        <div className="p-2 mt-3 border-[2px] border-black rounded-md text-sm">
          <div className="mb-2">
            <p className="text-center text-xl">Past orders:</p>
          </div>
          <div>
            {logic.user.pastOrders.length > 0 ? (
              logic.user.pastOrders.map((order) => (
                <div className="border-[1px] border-black rounded-lg my-10 flex flex-col">
                  <p className="pt-5 text-center">{`Date of purcharse: ${order.date}`}</p>
                  <div className="flex flex-col items-center md:flex-row md:justify-between p-5">
                    <img
                      src={order.imgSrcHref}
                      alt="productImg"
                      className="w-[125px] my-5"
                    />

                    <div>
                      <p className="text-sm py-1 text-center">{`${order.title}`}</p>
                      <p className="text-sm py-1 text-center">{`${order.shortDesc}`}</p>
                      <p className="text-sm py-1 text-center">{`Total amount paid: $${
                        (order.cost + order.nationwideDelivery) * 0.13 +
                        order.cost +
                        order.nationwideDelivery
                      } CAD`}</p>
                    </div>
                  </div>
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
        <div className="border-[1px] border-black rounded-md my-8">
          <div>
            <p className="text-center text-xl m-2">Shopping Cart:</p>
          </div>

          {storeState.shoppingCart.length > 0 ? (
            storeState.shoppingCart.map((prod) => (
              <div key={prod.id} className="mt-5 mb-8 ">
                <div className="flex items-center justify-between">
                  <div>
                    <Link to={`/store/${prod.id}`}>
                      <img
                        src={prod.imgSrcHref}
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
                      onClick={() => dispatch(removeProdShoppingCart(prod.id))}
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
                Store
              </Link>
            </div>
          )}
        </div>
        <div className="border-[1px] border-black rounded-md my-8">
          <div>
            <p className="text-center text-xl m-2">Danger zone:</p>
          </div>
          <div className="flex items-center justify-center h-[50px]">
            <button className="text-red-900 hover:font-semibold">
              Delete account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
