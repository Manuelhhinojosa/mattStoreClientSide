import React from "react";

// dependencies
//
// stripe
// import { loadStripe } from "@stripe/stripe-js";

// axios
import axios from "axios";

// framer motion
import { motion } from "framer-motion";

// toast
// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

// react icons
import { FaTimes } from "react-icons/fa";

// React Router V6
// react router hooks
import { Link, useNavigate } from "react-router-dom";

// redux
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// functions in redux store slice
import { removeProdShoppingCart } from "../../redux/slices/state/storeSlice";
// functions
import { setShowEditShippingInfoToTrue } from "../../redux/slices/staticState/logicSlice";

// helper vars
// headers config
import { getHeadersConfig } from "../../utils/vars";

// helper functions
import { getApiErrorMessage } from "../../utils/helpers";

// shopping cart function component
// shopping cart function component
// shopping cart function component
const ShoppingCart = () => {
  // redux & state
  // state in store slice
  const storeState = useSelector((state) => state.storeSlice);
  // state in logic slice
  const logicState = useSelector((state) => state.logicSlice);
  // state in static text slice
  const staticState = useSelector((state) => state.staticTextSlice);
  // redux hooks
  const dispatch = useDispatch();

  // react router hooks
  const navigate = useNavigate();

  // helper vars
  // helper vars
  // helper vars
  // calculate amounts to pay
  let subtotal = 0;
  let taxes = 0;
  let newSubTotal = 0;

  // stripe
  // const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  // functions
  // functions
  // functions

  // calculate amounts subtotal
  // calculate amounts subtotal
  // calculate amounts subtotal
  storeState.shoppingCart.map((p) => {
    subtotal = p.cost + subtotal;
    taxes =
      logicState.user.shippingCountry.toLowerCase() === "canada"
        ? subtotal * 0.13
        : subtotal * 0.16;
    newSubTotal = subtotal + taxes;
  });

  // handle checkout
  // handle checkout
  // handle checkout
  const handleCheckout = async () => {
    if (
      logicState.user.shippingPhoneNumber === "" ||
      !logicState.user.shippingPhoneNumber ||
      logicState.user.shippingAddress === "" ||
      !logicState.user.shippingAddress ||
      logicState.user.shippingCountry === "" ||
      !logicState.user.shippingCountry ||
      logicState.user.shippingProvinceOrState === "" ||
      !logicState.user.shippingProvinceOrState ||
      logicState.user.shippingCity === "" ||
      !logicState.user.shippingCity ||
      logicState.user.shippingPostalCode === "" ||
      !logicState.user.shippingPostalCode
    ) {
      dispatch(setShowEditShippingInfoToTrue());
      navigate("/editprofile");
      toast("First let's verify your shipping address.", toastStyleObject());
      return;
    }

    try {
      // const stripe = await stripePromise;

      // Extract product IDs
      const productIds = storeState.shoppingCart.map((p) => p._id);

      // state to send to backend
      const body = {
        products: productIds,
        userId: logicState.user._id,
        shippingSameAsContact: logicState.user.shippingSameAsContactInfo,
        deliveryFee:
          logicState.user.shippingCountry?.toLowerCase() === "canada"
            ? storeState.nationalDeliveryFee
            : storeState.internationalDeliveryFee,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_ORDERS_URL}/create-checkout-session`,
        body,
        getHeadersConfig()
      );

      const { url } = response.data;
      window.location.href = url;
      // const { sessionId } = response.data;
      // const result = await stripe.redirectToCheckout({
      //   sessionId,
      // });
    } catch (error) {
      console.error("Error starting checkout:", error);

      // error message
      toast(getApiErrorMessage(error), toastStyleObject());
    }
  };

  // return
  // return
  // return
  return (
    // main conatiner
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto flex items-end lg:justify-center mb-32"
    >
      {/* secondary container */}
      <div className="mt-32 w-full flex flex-col lg:w-2/3">
        {/* header */}
        <div className="ml-5 text-2xl p-8 md:text-center md:text-3xl">
          {staticState.home.homeMainTitle} / Shopping cart
        </div>

        {storeState.shoppingCart.length > 0 ? (
          // list of prods in shopping cart
          storeState.shoppingCart.map((prod) => (
            // prod container
            <div
              key={prod._id}
              className=" m-5 p-2 border-b-[1px] border-b-black "
            >
              <div className="flex items-center justify-between">
                {/* quantity */}
                <div>
                  <p className="text-center">1</p>
                </div>
                {/* image */}
                <div>
                  <Link to={`/store/${prod._id}`}>
                    <img
                      src={prod.media.url}
                      alt="prod img"
                      className="max-h-[150px] max-w-[175px]  p-2 rounded-xl"
                    />
                  </Link>
                </div>
                {/* title */}
                <div className="p-2 w-1/3">
                  <p className="text-center">{prod.title}</p>
                </div>
                {/* price */}
                <div className="p-2">{`${prod.cost} CAD`}</div>
                {/* remove item button */}
                <div className="p-2 hover:text-blue-500 duration-500">
                  <button
                    onClick={() => dispatch(removeProdShoppingCart(prod._id))}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          // renders if shopping cart is empty
          <div className="text-center text-lg font-semibold m-10">
            <p className="font-light">Your shopping cart is empty</p>
          </div>
        )}

        {/* subotal */}
        <div className="h-8 flex justify-between p-5 items-center border-b-[1px] border-b-black mx-10">
          <div>Subtotal</div>
          <div>{`$${subtotal} CAD`}</div>
        </div>
        {/* taxes */}
        <div className="h-8 flex justify-between p-5 items-center border-b-[1px] border-b-black mx-10">
          <div>Taxes</div>
          <div>{`$${taxes} CAD`}</div>
        </div>
        {/* delivery fee */}
        <div className="h-8 flex justify-between p-5 items-center border-b-[1px] border-b-black mx-10">
          <div>Delivery fee</div>
          <div>Calculated @ checkout</div>
        </div>
        {/* new subtotal */}
        <div className="h-8 flex justify-between p-5 items-center border-b-[1px] border-b-black mx-10">
          <div>New subtotal</div>
          <div>{`$${Number(newSubTotal).toFixed(2)} CAD`}</div>
        </div>

        <div className="h-[100px]  flex justify-center items-center">
          {storeState.shoppingCart.length > 0 ? (
            // checkout button if shoppint cart has items
            <button
              onClick={handleCheckout}
              className="font-extrabold hover:text-blue-500 duration-500"
            >
              Checkout
            </button>
          ) : (
            // checout and shop buttons if shopping cart is empty
            <span className="font-extrabold text-gray-400 cursor-not-allowed">
              Checkout
            </span>
          )}
        </div>
        {/* continue shopping button */}
        <div className=" mb-10 text-center font-extrabold hover:text-blue-500 duration-500">
          <Link to="/store">Continue shopping</Link>
        </div>
      </div>
    </motion.section>
  );
};

export default ShoppingCart;
