import React from "react";

//React Router 6
import { Link } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  toggleNavbar,
  setShowNavbarToFalse,
  setisLoggedInToFalse,
  setuserToNone,
  setUserTokenEmpty,
  resetEditUserState,
} from "../../redux/slices/staticState/logicSlice";
import {
  emptyShoppingCart,
  removeProdShoppingCart,
} from "../../redux/slices/state/storeSlice";

// react icons
import { FaTimes, FaBars } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

const Navbar = () => {
  // redux & state
  const dispatch = useDispatch();
  const staticText = useSelector((state) => state.staticTextSlice);
  const storeState = useSelector((state) => state.storeSlice);
  const logic = useSelector((state) => state.logicSlice);

  // functions:
  // handle sign out
  const handleSignOut = () => {
    if (storeState.shoppingCart.length > 0) {
      storeState.shoppingCart.map((prod) => {
        dispatch(removeProdShoppingCart(prod._id));
      });
    }
    dispatch(emptyShoppingCart());
    dispatch(setisLoggedInToFalse());
    dispatch(setuserToNone());
    dispatch(setUserTokenEmpty());
    dispatch(resetEditUserState());
  };

  return (
    <nav className="fixed top-4 z-50 w-full flex flex-col items-center">
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
