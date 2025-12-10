import React from "react";

// React router V6
// react router hooks
import { Link, useNavigate } from "react-router-dom";

// Axios
import axios from "axios";

// framer motion
import { motion } from "framer-motion";

// redux
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// redux functions from logic slice
import {
  setisLoggedInToTrue,
  setUser,
  setUserToken,
  setEnteredUsername,
  setEnteredUsernameEmpty,
  setEnteredUserpassword,
  setEnteredUserpasswordEmpty,
} from "../../redux/slices/staticState/logicSlice";
// redux functions from store slice
import { setUsers, setOrders } from "../../redux/slices/state/storeSlice";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

// herlper functions
import {
  refreshOrdersData,
  refreshUsersData,
  // success and error console log handleing
  getApiErrorMessage,
  getApiSuccessMessage,
} from "../../utils/helpers";

// login function component
// login function component
// login function component
const login = () => {
  // redux & state
  // state in logic slice
  const logic = useSelector((state) => state.logicSlice);
  // redux hooks
  const dispatch = useDispatch();

  // React router hooks
  const navigate = useNavigate();

  // functions
  // functions
  // functions

  // sign in
  // sign in
  // sign in
  const handleSignIn = async (e) => {
    e.preventDefault();

    const { enteredUserUsername, enteredUserPassword } = logic;

    // form validation
    if (!enteredUserUsername || !enteredUserPassword) {
      toast("Make sure all the fields are filled", toastStyleObject());
      return;
    }

    try {
      const data = {
        email: enteredUserUsername,
        password: enteredUserPassword,
      };

      // API call - user login
      const result = await axios.post(
        `${import.meta.env.VITE_API_USERS_URL}/login`,
        data
      );

      // API success

      // console result
      getApiSuccessMessage(result);

      const loggedInUser = result.data.user;

      // save token for session persistence
      localStorage.setItem("token", result.data.token);

      // user status + user state + token state
      dispatch(setisLoggedInToTrue());
      dispatch(setUser(loggedInUser));
      dispatch(setUserToken(result.data.token));

      // if admin, load admin dashboard data and navigate to admin page
      if (loggedInUser.role === "admin") {
        // refresh users
        await refreshUsersData(result.data.token, dispatch, setUsers);

        // refresh orders
        await refreshOrdersData(result.data.token, dispatch, setOrders);

        // admin page
        navigate("/admin");

        // resetting
        dispatch(setEnteredUsernameEmpty());
        dispatch(setEnteredUserpasswordEmpty());
      } else {
        // if user non admin navigate to profile page
        navigate("/profile");
      }

      // success / welcome message
      toast(`Welcome ${loggedInUser.name}`, toastStyleObject());
    } catch (error) {
      // error handling
      console.log("Error logging in:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());
    }
  };

  // return
  // return
  // return
  return (
    // main container
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="container mx-auto flex items-end"
    >
      {/* form container */}
      <div className="mt-32 w-full h-[700px] flex flex-col items-center justify-center">
        {/* form */}
        <form
          encType="multipart/form-data"
          className="flex flex-col items-center justify-around h-1/3"
        >
          {/* email */}
          <input
            type="text"
            placeholder="email"
            name="username"
            autoComplete="off"
            className="border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none text-center min-w-[350px] duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
            value={logic.enteredUserUsername}
            onChange={(e) => dispatch(setEnteredUsername(e.target.value))}
          />

          {/* password */}
          <input
            type="password"
            placeholder="password"
            name="password"
            autoComplete="off"
            className="border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none text-center min-w-[350px] duration-500 transition-colors  ease-out focus:border-b-black focus:ring-0 focus-visible:ring-0 will-change-[border-color] -webkit-tap-highlight-color-transparent"
            value={logic.enteredUserPassword}
            onChange={(e) => dispatch(setEnteredUserpassword(e.target.value))}
          />

          {/* login button */}
          <button
            onClick={handleSignIn}
            className="hover:text-blue-500 underline duration-500"
          >
            Login
          </button>
        </form>

        {/* sign up */}
        <div>
          <p>
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="hover:text-blue-500 underline duration-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default login;
