import React from "react";

import { motion, AnimatePresence } from "framer-motion";

const mobileContainerVariants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      when: "beforeChildren",
      staggerChildren: 0.04,
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: { type: "spring", stiffness: 300, damping: 32 },
  },
};

const mobileItemVariants = {
  hidden: { y: -8, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.18 } },
  exit: { y: -6, opacity: 0, transition: { duration: 0.12 } },
};

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

// Navbar function component
// Navbar function component
// Navbar function component
const Navbar = () => {
  // redux & state
  // redux hooks
  const dispatch = useDispatch();
  // state
  // state in stati text slice
  const staticText = useSelector((state) => state.staticTextSlice);
  // state in store slice
  const storeState = useSelector((state) => state.storeSlice);
  // state in logic slice
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

    // resetting user, uster status, token and edit state
    dispatch(setisLoggedInToFalse());
    dispatch(setuserToNone());
    dispatch(setUserTokenEmpty());
    dispatch(resetEditUserState());

    localStorage.removeItem("token");
    localStorage.removeItem("shoppingCart");
  };

  // return
  // return
  // return
  return (
    <nav className="fixed top-4 z-50 w-full flex flex-col items-center ">
      {/* big screen navbar */}
      <div className="flex w-[95%] my-1 items-center justify-between overflow-hidden p-4 backdrop-blur-lg lg:m-2 lg:w-[60rem] lg:rounded-full lg:shadow-lg rounded-2xl ">
        <Link to="/">
          <img
            src={staticText.navbar.logoSrcHref}
            alt="logo"
            width={45}
            className="rounded-lg"
          />
        </Link>
        <div className="hidden   space-x-6 lg:flex">
          {staticText.links.map((link, index) => (
            <Link
              key={index}
              className={`text-sm   ${
                index !== 0 ? "border-l-2 border-neutral-300/20 pl-2  " : ""
              } hover:text-blue-500 duration-500  `}
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
          <button
            onClick={() => dispatch(toggleNavbar())}
            aria-label="Toggle menu"
          >
            {logic.showNavbar ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* mobile navbar with drop animation */}
      <AnimatePresence initial={false}>
        {logic.showNavbar && (
          <motion.div
            className="w-[95%] backdrop-blur-lg lg:hidden origin-top rounded-2xl  "
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 30,
              when: "beforeChildren",
              staggerChildren: 0.04,
            }}
            style={{
              transformOrigin: "top",
              willChange: "transform, opacity",
            }}
            role="menu"
            aria-hidden={!logic.showNavbar}
          >
            {staticText.links.map((link, index) => {
              const MotionLink = motion(Link);
              return (
                <MotionLink
                  key={index}
                  to={link.to}
                  onClick={() => dispatch(toggleNavbar())}
                  className="block rounded-2xl p-4 uppercase tracking-tighter text-center  duration-500 hover:shadow-2xl hover:text-blue-500 "
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -4, opacity: 0 }}
                  transition={{ duration: 0.16 }}
                >
                  {link.id === 6 ? (
                    <p className="text-xl font-light flex justify-center">
                      <CiShoppingCart />
                      <sub>{storeState.shoppingCart.length}</sub>
                    </p>
                  ) : link.id === 7 ? (
                    <div>
                      {logic.isLoggedIn ? (
                        <p
                          onClick={(e) => {
                            e.preventDefault();
                            handleSignOut();
                            dispatch(toggleNavbar());
                          }}
                          className="cursor-pointer"
                        >
                          logout
                        </p>
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
                </MotionLink>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
