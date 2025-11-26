import React from "react";

// React Router V6
// reactu router hooks
import { useLocation, Link } from "react-router-dom";

// redux
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// redux fucntions from store slice
import { addProdShoppingCart } from "../../redux/slices/state/storeSlice";

// single prod function component
// single prod function component
// single prod function component
const SingleProd = () => {
  // redux & state
  // redux hooks
  const dispatch = useDispatch();
  // state in static state slice
  const staticState = useSelector((state) => state.staticTextSlice);
  // state in store slice
  const storeState = useSelector((state) => state.storeSlice);

  // react router hooks
  const location = useLocation();

  // helper vars
  let reference = location.pathname.slice(7);
  let product = {};

  // functions
  // functions
  // functions

  // identifying single product by id in the url
  // identifying single product by id in the url
  // identifying single product by id in the url
  storeState.artPieces.forEach((p) => {
    if (p._id == reference) {
      product = p;
      return;
    }
  });

  // return
  // return
  // return
  return (
    <section className="container mx-auto flex items-end">
      {/* main container */}
      <div className="mt-32 w-full">
        {/* header */}
        <div>
          <p className="ml-5 text-2xl p-8 md:text-center md:text-3xl">
            {staticState.home.homeMainTitle}
          </p>
        </div>
        {/* image */}
        <div className="flex justify-center items-center">
          <img
            src={product.media.url}
            alt="Product image"
            className="mb-10 max-h-[400px] shadow-2xl transition-transform duration-300 hover:scale-105 cursor-zoom-in"
          />
        </div>
        {/* title */}
        <div>
          <div className="mb-8">
            <p className="text-center font-bold">{product.title}</p>
          </div>
          {/* price */}
          <div>
            <p className="text-center">{`${product.cost} CAD`}</p>
          </div>
          {/* description */}
          <div>
            <p className="text-center text-sm">{product.shortDesc}</p>
          </div>
        </div>
        {/* button add */}
        <div className="my-8 text-center">
          <button
            className={`p-3 text-center  h-5 font-extrabold ${
              !product.added
                ? "hover:text-blue-500 cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
            }`}
            onClick={() =>
              product.inStock && dispatch(addProdShoppingCart(product._id))
            }
            disabled={product.added}
          >
            {!product.inStock ? (
              <p className="hover:cursor-not-allowed">sold</p>
            ) : product.added ? (
              <p>Added</p>
            ) : (
              <p>Add to cart</p>
            )}
          </button>
        </div>
        {/* back to store button */}
        <div className="my-8 text-center">
          <Link to="/store" className="font-extrabold hover:text-blue-500">
            Back to store
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SingleProd;
