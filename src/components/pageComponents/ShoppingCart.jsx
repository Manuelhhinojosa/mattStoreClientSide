import React from "react";

// react icons
import { FaTimes } from "react-icons/fa";

// React Router V6
import { Link } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

const ShoppingCart = () => {
  // redux & state
  const storeState = useSelector((state) => state.storeSlice);
  return (
    <section className="container mx-auto flex items-end lg:justify-center">
      <div className="mt-32 w-full flex flex-col lg:w-2/3">
        <div className="ml-5 text-2xl p-8 md:text-center md:text-3xl">
          Shoping cart
        </div>
        {storeState.shoppingCart.map((prod) => (
          <div className="mx-5 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-center">1</p>
              </div>
              <div>
                <img
                  src={prod.imgSrcHref}
                  alt="prod img"
                  className="h-[150px] p-2 rounded-xl"
                />
              </div>
              <div className=" p-2 w-1/3">
                <p className="text-center">{prod.title}</p>
              </div>
              <div className=" p-2"></div>
              <div className=" p-2"> {prod.cost}</div>

              <div className=" p-2">
                <button>
                  <FaTimes />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="h-8 flex justify-between p-5 items-center border-b-[1px] border-b-black">
          <div>Subtotal</div>
          <div>$0.00 CAD</div>
        </div>
        <div className="h-[100px] mb-10 flex justify-center items-center">
          <Link className="font-extrabold hover:text-slate-700">checkout</Link>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
