import React from "react";

// react icons
import { FaTimes } from "react-icons/fa";

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
  // calculate subtotal
  storeState.shoppingCart.map((p) => {
    subtotal = p.cost + subtotal;
    taxes = subtotal * 0.13;
    newSubTotal = subtotal + taxes;
  });

  // return
  // return
  // return
  return (
    <section className="container mx-auto flex items-end lg:justify-center">
      <div className="mt-32 w-full flex flex-col lg:w-2/3">
        <div className="ml-5 text-2xl p-8 md:text-center md:text-3xl">
          {staticState.home.homeMainTitle} / Shopping cart
        </div>

        {storeState.shoppingCart.length > 0 ? (
          storeState.shoppingCart.map((prod) => (
            <div key={prod._id} className=" m-5  border-b-[1px] border-b-black">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-center">1</p>
                </div>
                <div>
                  <Link to={`/store/${prod._id}`}>
                    <img
                      src={prod.media.url}
                      alt="prod img"
                      className="h-[150px] p-2 rounded-xl"
                    />
                  </Link>
                </div>
                <div className="p-2 w-1/3">
                  <p className="text-center">{prod.title}</p>
                </div>
                <div className="p-2">{`${prod.cost} CAD`}</div>
                <div className="p-2">
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
          <div className="text-center text-lg font-semibold m-10">
            <p className="font-light">Your shopping cart is empty</p>
          </div>
        )}

        <div className="h-8 flex justify-between p-5 items-center border-b-[1px] border-b-black">
          <div>Subtotal</div>
          <div>{`$${subtotal} CAD`}</div>
        </div>
        <div className="h-8 flex justify-between p-5 items-center border-b-[1px] border-b-black">
          <div>Taxes</div>
          <div>{`$${taxes} CAD`}</div>
        </div>
        <div className="h-8 flex justify-between p-5 items-center border-b-[1px] border-b-black">
          <div>Delivery fee</div>
          <div>Calculated @ checkout</div>
        </div>
        <div className="h-8 flex justify-between p-5 items-center border-b-[1px] border-b-black">
          <div>New subtotal</div>
          <div>{`$${newSubTotal} CAD`}</div>
        </div>

        <div className="h-[100px] mb-5 flex justify-center items-center">
          {storeState.shoppingCart.length > 0 ? (
            <Link
              to="/checkout"
              className="font-extrabold hover:text-slate-700"
            >
              Checkout
            </Link>
          ) : (
            <span className="font-extrabold text-gray-400 cursor-not-allowed">
              Checkout
            </span>
          )}
        </div>
        <div className=" mb-10 text-center font-extrabold hover:text-slate-700">
          <Link to="/store">Continue shopping</Link>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
