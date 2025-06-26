import React from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
// import { removeProdShoppingCart } from "../../redux/slices/state/storeSlice";
import { removeProdShoppingCart } from "../../redux/slices/state/storeSlice";

//React Router 6
import { Link } from "react-router-dom";

// react icons
import { FaTimes } from "react-icons/fa";

const Profile = () => {
  // redux & state
  const logic = useSelector((state) => state.logicSlice);
  const storeState = useSelector((state) => state.storeSlice);
  const dispatch = useDispatch();

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
            <p>{`E-mail/Username: ${logic.user.username}`}</p>
          </div>

          <div className="flex justify-between text-sm">
            <p>password: ******</p>

            <Link
              to="/changepassword"
              className="border-b-[1px] border-b-black"
            >
              edit password
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
              <Link to="/editProfile" className="border-b-[1px] border-b-black">
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
              <p>Same as contact address</p>
              <Link to="/editprofile" className="border-b-[1px] border-b-black">
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
                <p>{`Phone: ${logic.user.shippingtPhoneNumber}`}</p>
                <Link
                  to="/editprofile"
                  className="border-b-[1px] border-b-black"
                >
                  edit
                </Link>
              </div>
            </div>
          )}
        </div>
        {/* Past orders */}
        <div className="p-2 mt-3 border-[1px] border-black rounded-md text-sm">
          <div className="mb-2">
            <p className="text-center text-xl">Past orders:</p>
          </div>
          <div>
            {logic.user.pastOrders.length === 0 ? (
              <p className="text-center">No past orders</p>
            ) : (
              <p>There are past orders</p>
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
                className="text-sm border-b-[1px] border-b-black"
                to="/store"
              >
                Continue shopping
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
