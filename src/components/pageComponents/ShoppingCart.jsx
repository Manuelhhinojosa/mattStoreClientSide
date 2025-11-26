import React from "react";

// react icons
import { FaTimes } from "react-icons/fa";

// framer motion
import { motion } from "framer-motion";

// React Router V6
// react router hooks
import { Link } from "react-router-dom";

// redux
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// functions in redux store slice
import { removeProdShoppingCart } from "../../redux/slices/state/storeSlice";

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

  // helper vars
  let subtotal = 0;
  let taxes = 0;
  let newSubTotal = 0;

  // helper functions
  // helper functions
  // helper functions

  // calculate new subtotal
  // calculate new subtotal
  // calculate new subtotal
  storeState.shoppingCart.map((p) => {
    subtotal = p.cost + subtotal;
    taxes = subtotal * 0.13;
    newSubTotal = subtotal + taxes;
  });

  // return
  // return
  // return
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="container mx-auto flex items-end lg:justify-center"
    >
      <div className="mt-32 w-full flex flex-col lg:w-2/3">
        {/* header */}
        <div className="ml-5 text-2xl p-8 md:text-center md:text-3xl">
          {staticState.home.homeMainTitle} / Shopping cart
        </div>

        {/* list of prods in shopping cart */}
        {storeState.shoppingCart.length > 0 ? (
          storeState.shoppingCart.map((prod) => (
            <div
              key={prod._id}
              className=" m-5  border-b-[1px] border-b-black "
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
                      className="h-[150px] p-2 rounded-xl"
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
            <Link
              to="/checkout"
              className="font-extrabold hover:text-blue-500 duration-500"
            >
              Checkout
            </Link>
          ) : (
            // checout and shop buttons if shopping cart is empty
            <span className="font-extrabold text-gray-400 cursor-not-allowed">
              Checkout
            </span>
          )}
        </div>
        <div className=" mb-10 text-center font-extrabold hover:text-blue-500 duration-500">
          <Link to="/store">Continue shopping</Link>
        </div>
      </div>
    </motion.section>
  );
};

export default ShoppingCart;
