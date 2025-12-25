import React from "react";
// dependencies
// react hooks
import { useEffect, useState } from "react";

// react router hooks
import { useNavigate } from "react-router-dom";

// redux
// redux hooks
import { useDispatch } from "react-redux";
// functions in redux store slice
import { emptyShoppingCart } from "../../redux/slices/state/storeSlice";

// axios
import axios from "axios";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

// order success function component
// order success function component
// oreder succes function component
const OrderSuccess = () => {
  // redux hooks
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
    try {
      const sessionId = new URLSearchParams(window.location.search).get(
        "session_id"
      );

      if (!sessionId) {
        toast("Invalid. Redirecting to your shopping cart", toastStyleObject());
        navigate("/cart");
        return;
      }

      console.log("Order created");
      toast("order created", toastStyleObject());

      dispatch(emptyShoppingCart());
      localStorage.removeItem("shoppingCart");
      setIsSuccess(true);
    } catch (err) {
      console.error("Error confirming order:", err);
      toast("Error confirming order", { type: "error" });
      navigate("/cart");
    }
  }, []);

  // return
  // return
  // return
  return (
    <section className="success-page">
      {isSuccess ? (
        <>
          <h1>Thank You!</h1>
          <p>Your payment was successful and your order has been placed.</p>
          <a href="/store" className="btn">
            Continue Shopping
          </a>
        </>
      ) : (
        <p>
          We’re processing your order. If you are not redirected, please check
          your order status in a moment.
        </p>
      )}
    </section>
  );
};

export default OrderSuccess;
