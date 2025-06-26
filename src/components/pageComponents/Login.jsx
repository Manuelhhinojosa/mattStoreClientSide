import React from "react";

// React router V6
import { Link, useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
// redux reducers
import {
  setisLoggedInToTrue,
  setAdminUser,
  setNonAdminUser,
} from "../../redux/slices/staticState/logicSlice";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

const login = () => {
  // redux & state
  const logic = useSelector((state) => state.logicSlice);
  const dispatch = useDispatch();

  // React router V6
  const navigate = useNavigate();

  // sign in function as admin (temp)
  const handleAdminSignIn = (e) => {
    e.preventDefault();
    dispatch(setisLoggedInToTrue());
    dispatch(setAdminUser());
    navigate("/admin");
    toast(`Welcome Matt :)`, toastStyleObject());
  };

  // sign in function as non-admin (temp)
  const handleNonAdminSignIn = (e) => {
    e.preventDefault();
    dispatch(setisLoggedInToTrue());
    dispatch(setNonAdminUser());
    navigate("/profile");
    toast(`Welcome TestName :)`, toastStyleObject());
  };

  return (
    <section className="container mx-auto flex items-end">
      <div className="mt-32 w-full h-[700px] flex flex-col items-center justify-center">
        {/*  */}
        <form
          action=""
          className="flex flex-col items-center justify-around h-1/3"
        >
          <input
            type="text"
            name="username"
            placeholder="email"
            autoComplete="off"
            className="border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none text-center"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="off"
            className="border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none text-center"
          />

          <button
            // onClick={handleAdminSignIn}
            onClick={handleNonAdminSignIn}
            className="hover:text-slate-600"
          >
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
