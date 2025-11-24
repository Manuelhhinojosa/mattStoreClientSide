import React from "react";

// React router V6
// react router hooks
import { Link, useNavigate } from "react-router-dom";

// Axios
import axios from "axios";

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

// utils functions
import {
  refreshOrdersData,
  refreshUsersData,
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
      getApiSuccessMessage(result);

      const loggedInUser = result.data.user;

      // store user + auth state
      dispatch(setisLoggedInToTrue());
      dispatch(setUser(loggedInUser));
      dispatch(setUserToken(result.data.token));

      dispatch(setEnteredUsernameEmpty());
      dispatch(setEnteredUserpasswordEmpty());

      // if admin, load admin dashboard data
      if (loggedInUser.role === "admin") {
        // refresh users
        await refreshUsersData(result.data.token, dispatch, setUsers);

        // refresh orders
        await refreshOrdersData(result.data.token, dispatch, setOrders);

        navigate("/admin");
      } else {
        navigate("/profile");
      }

      toast(`Welcome ${loggedInUser.name}`, toastStyleObject());
    } catch (error) {
      // error handling
      console.log("Error logging in:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());
    }
  };

  return (
    <section className="container mx-auto flex items-end">
      <div className="mt-32 w-full h-[700px] flex flex-col items-center justify-center">
        {/*  */}
        <form
          encType="multipart/form-data"
          className="flex flex-col items-center justify-around h-1/3"
        >
          <input
            type="text"
            placeholder="email"
            name="username"
            autoComplete="off"
            className="border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none text-center min-w-[350px]"
            value={logic.enteredUserUsername}
            onChange={(e) => dispatch(setEnteredUsername(e.target.value))}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            autoComplete="off"
            className="border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none text-center min-w-[350px]"
            value={logic.enteredUserPassword}
            onChange={(e) => dispatch(setEnteredUserpassword(e.target.value))}
          />

          <button onClick={handleSignIn} className="hover:text-slate-600">
            Login
          </button>
        </form>
        <div>
          <p>
            Don't have an account yet?{" "}
            <Link
              to="/signup"
              className="hover:text-slate-600 border-b-[1px] border-b-black hover:border-b-slate-600"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default login;
