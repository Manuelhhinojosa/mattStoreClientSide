import React from "react";
// dependencies
// react hooks
import { useEffect, useState } from "react";

// react router hooks
import { useNavigate } from "react-router-dom";

// redux
// redux hooks
import { useDispatch, useSelector } from "react-redux";
// functions from redux / logic slice
import { setUser } from "../../redux/slices/staticState/logicSlice";
// helper functions
import { refreshUserData } from "../../utils/helpers";

// functions in redux store slice
import { emptyShoppingCart } from "../../redux/slices/state/storeSlice";

//React Router v6
// react router hooks
import { Link } from "react-router-dom";

// framer motion
import { motion } from "framer-motion";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

// order success function component
// order success function component
// oreder succes function component
const OrderSuccess = () => {
  // redux
  // state in logic slice
  const logic = useSelector((state) => state.logicSlice);

  // hooks
  const dispatch = useDispatch();

  //   react router hooks
  const navigate = useNavigate();

  //    helper vars
  //    helper vars
  //    helper vars
  const [isSuccess, setIsSuccess] = useState(false);

  //   functions
  //   functions
  //   functions

  useEffect(() => {
    // if users/me has not finished running
    if (!logic.user || !logic.userToken) return;

    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    // if there is no confirmation from stripe
    if (!sessionId) {
      toast("Invalid session. Redirecting to cart.", toastStyleObject());
      navigate("/cart");
      return;
    }

    // success
    // refresh user
    refreshUserData(logic.user._id, logic.userToken, dispatch, setUser);
    // empty shopping cart
    dispatch(emptyShoppingCart());
    localStorage.removeItem("shoppingCart");

    // display success page
    setIsSuccess(true);
  }, [logic.user]);

  // return
  // return
  // return
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="relative flex flex-col h-screen w-screen items-center justify-center"
    >
      {isSuccess ? (
        <div className="p-10 flex flex-col items-center justiy-center shadow-2xl rounded-2xl">
          <h1 className="text-2xl font-bold">Order confimation.</h1>
          <br />
          <h2 className="text-xl font-semibold">
            Thank You for your purchase!
          </h2>
          <br />
          <p className="text-sm">
            Your payment was successful and your order has been placed.
          </p>
          <br />
          <p className="text-sm">
            An email with the order details has been sent to {logic.user.email}
          </p>
          <p className="text-sm">
            If you have any questions about your order feel free to reach out to
            me.
          </p>
          <br />
          <Link
            className="underline hover:text-blue-500 duration-300"
            to={"/store"}
          >
            continue Shopping
          </Link>
        </div>
      ) : (
        <p>
          We’re processing your order. If you are not redirected, please check
          your order status in a moment.
        </p>
      )}
    </motion.section>
  );
};

export default OrderSuccess;
