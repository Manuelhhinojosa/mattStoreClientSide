import React from "react";

// React router V6
import { Link, useNavigate } from "react-router-dom";

// Axios
import axios from "axios";

// redux
import { useSelector, useDispatch } from "react-redux";
// redux reducers
import {
  setisLoggedInToTrue,
  setUser,
  setUserToken,
  setEnteredUsername,
  setEnteredUsernameEmpty,
  setEnteredUserpassword,
  setEnteredUserpasswordEmpty,
} from "../../redux/slices/staticState/logicSlice";

import { setUsers } from "../../redux/slices/state/storeSlice";

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

  // sign in function
  const handleSignIn = (e) => {
    e.preventDefault();

    const { enteredUserUsername, enteredUserPassword } = logic;

    if (!enteredUserUsername || !enteredUserPassword) {
      toast("Make sure all the fields are filled", toastStyleObject());
      return;
    }

    const data = { email: enteredUserUsername, password: enteredUserPassword };

    const loginUrl = "http://localhost:3000/users/login";

    // API call
    axios
      .post(loginUrl, data)
      .then(async (result) => {
        console.log("Result: ", result);
        console.log("SUCCESS! user loged in. Result:", {
          config: result.config,
          data: result.data,
          status: result.status,
          headers: result.headers,
        });

        const logedInUser = result.data.user;

        dispatch(setisLoggedInToTrue());
        dispatch(setUser(logedInUser));
        dispatch(setUserToken(result.data.token));

        dispatch(setEnteredUsernameEmpty());
        dispatch(setEnteredUserpasswordEmpty());

        if (logedInUser.role === "admin") {
          navigate("/admin");

          const usersData = await axios.get(
            "http://localhost:3000/users/allusers",
            {
              headers: {
                Authorization: `Bearer ${result.data.token}`,
              },
            }
          );

          dispatch(setUsers(usersData.data));
        } else {
          navigate("/profile");
        }

        toast(`Welcome ${logedInUser.name}`, toastStyleObject());
      })
      .catch((error) => {
        console.log(error);
      });
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
            className="border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none text-center"
            value={logic.enteredUserUsername}
            onChange={(e) => dispatch(setEnteredUsername(e.target.value))}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            autoComplete="off"
            className="border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none text-center"
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
