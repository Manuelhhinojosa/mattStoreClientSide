import React from "react";

//React Router v6
// react router hooks
import { Link } from "react-router-dom";

// redux
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// functions from redux / logic slice
import {
  toggleNavbar,
  setShowNavbarToFalse,
  setisLoggedInToFalse,
  setuserToNone,
  setUserTokenEmpty,
  resetEditUserState,
} from "../../redux/slices/staticState/logicSlice";
// functions from redux / store slice
import {
  emptyShoppingCart,
  removeProdShoppingCart,
} from "../../redux/slices/state/storeSlice";

// react icons
import { FaTimes, FaBars } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

//
//
// Navbar function component
// Navbar function component
// Navbar function component
const Navbar = () => {
  // redux & state
  // hooks
  const dispatch = useDispatch();
  // state
  const staticText = useSelector((state) => state.staticTextSlice);
  const storeState = useSelector((state) => state.storeSlice);
  const logic = useSelector((state) => state.logicSlice);

  // functions:
  // functions:
  // functions:

  // handle sign out
  // handle sign out
  // handle sign out
  const handleSignOut = () => {
    // empty shopping cart
    if (storeState.shoppingCart.length > 0) {
      storeState.shoppingCart.map((prod) => {
        dispatch(removeProdShoppingCart(prod._id));
      });
    }
    dispatch(emptyShoppingCart());

    // resetting
    dispatch(setisLoggedInToFalse());
    dispatch(setuserToNone());
    dispatch(setUserTokenEmpty());
    dispatch(resetEditUserState());
  };

  // return
  // return
  // return
  return (
    <nav className="fixed top-4 z-50 w-full flex flex-col items-center">
      {/* big screen navbar */}
      {/* big screen navbar */}
      {/* big screen navbar */}
      <div className="flex w-full my-1 items-center justify-between overflow-hidden p-4 backdrop-blur-lg lg:m-2 lg:w-[60rem] lg:rounded-full lg:shadow-lg ">
        <Link to="/">
          <img
            src={staticText.navbar.logoSrcHref}
            alt="logo"
            width={45}
            className="rounded-lg"
          />
        </Link>
        <div className="hidden  space-x-6 lg:flex">
          {staticText.links.map((link, index) => (
            <Link
              key={index}
              className={`text-sm ${
                index !== 0 ? "border-l-2 border-neutral-300/20 pl-2" : ""
              } hover:opacity-50`}
              onClick={() => dispatch(setShowNavbarToFalse())}
              to={link.to}
            >
              {link.id === 6 ? (
                <p className="text-xl font-light flex">
                  <CiShoppingCart />
                  <sub>{storeState.shoppingCart.length}</sub>
                </p>
              ) : link.id === 7 ? (
                <div className="text-sm">
                  {logic.isLoggedIn ? (
                    <p onClick={handleSignOut}>logout</p>
                  ) : (
                    <p>login</p>
                  )}
                </div>
              ) : link.id === 8 ? (
                <div>
                  {logic.isLoggedIn && logic.user.role === "admin"
                    ? link.text
                    : null}
                </div>
              ) : (
                link.text
              )}
            </Link>
          ))}
        </div>
        <div className="lg:hidden">
          <button onClick={() => dispatch(toggleNavbar())}>
            {logic.showNavbar ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* dynamic navbar */}
      {/* dynamic navbar */}
      {/* dynamic navbar */}
      {logic.showNavbar && (
        <div className="w-full backdrop-blur-lg lg:hidden ">
          {staticText.links.map((link, index) => (
            <Link
              key={index}
              className="block p-4 uppercase tracking-tighter text-center hover:opacity-50"
              onClick={() => dispatch(toggleNavbar())}
              to={link.to}
            >
              {link.id === 6 ? (
                <p className="text-xl font-light flex justify-center">
                  <CiShoppingCart />
                  <sub>{storeState.shoppingCart.length}</sub>
                </p>
              ) : link.id === 7 ? (
                <div>
                  {logic.isLoggedIn ? (
                    <p onClick={handleSignOut}>logout</p>
                  ) : (
                    <p>login</p>
                  )}
                </div>
              ) : link.id === 8 ? (
                <div>
                  {logic.isLoggedIn && logic.user.role === "admin"
                    ? link.text
                    : null}
                </div>
              ) : (
                link.text
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
