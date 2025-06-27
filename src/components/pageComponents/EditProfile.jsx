import React from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { setShowEditPasswordTofalse } from "../../redux/slices/staticState/logicSlice";

// React router V6
import { useNavigate } from "react-router-dom";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

const EditProfile = () => {
  // redux & state
  const dispatch = useDispatch();
  const logic = useSelector((state) => state.logicSlice);

  // react router v6
  const navigate = useNavigate();

  // functions
  const handleEditPassword = (e) => {
    e.preventDefault();
    dispatch(setShowEditPasswordTofalse());
    navigate("/profile");
    toast(`Password updated`, toastStyleObject());
  };
  const handleCancelEditPassword = (e) => {
    e.preventDefault();
    dispatch(setShowEditPasswordTofalse());
    navigate("/profile");
  };

  return (
    <section className="container mx-auto h-auto mt-32">
      {logic.showEditPassword ? (
        <>
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-center text-3xl">Edit password</p>
          </div>
          <div className="h-[600px] w-full">
            <form
              action=""
              className="h-full flex flex-col items-center justify-center"
            >
              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="password"
                placeholder="Enter old password"
                name="password"
                autoComplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="password"
                placeholder="Enter new password"
                name="password"
                autoComplete="off"
              />

              <input
                className="my-2 w-2/3 md:w-1/3 text-center border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
                type="password"
                placeholder="Confirm new password"
                name="password"
                autoComplete="off"
              />

              <button
                className="mt-5 hover:text-slate-600"
                onClick={handleEditPassword}
              >
                Edit Password
              </button>
              <button className="mt-5" onClick={handleCancelEditPassword}>
                Cancel
              </button>
            </form>
          </div>
        </>
      ) : null}
    </section>
  );
};

export default EditProfile;
