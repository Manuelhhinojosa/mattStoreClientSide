import React from "react";

// React Router V6
import { useLocation, Link } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
// redux reducers
import { addProdShoppingCart } from "../../redux/slices/state/storeSlice";

const SingleProd = () => {
  // redux & state
  const dispatch = useDispatch();
  const staticState = useSelector((state) => state.staticTextSlice);
  const storeState = useSelector((state) => state.storeSlice);
  // react router v6
  const location = useLocation();
  // identifying single product by id in the url
  let reference = location.pathname.slice(7);
  let product = {};
  storeState.artPieces.forEach((p) => {
    if (p._id == reference) {
      product = p;
      return;
    }
  });

  return (
    <section className="container mx-auto flex items-end">
      <div className="mt-32 w-full">
        <div>
          <p className="ml-5 text-2xl p-8 md:text-center md:text-3xl">
            {staticState.home.homeMainTitle}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={product.media.url}
            alt="Product image"
            className="p-8 lg:w-1/2"
          />
        </div>
        <div>
          <div className="mb-8">
            <p className="text-center">{product.title}</p>
          </div>
          <div>
            <p className="text-center">{`${product.cost} CAD`}</p>
          </div>
          <div>
            <p className="text-center text-sm">{product.shortDesc}</p>
          </div>
        </div>
        <div className="my-8 text-center">
          <button
            className={`p-3 text-center text-sm h-5 font-extrabold ${
              !product.added
                ? "hover:text-slate-700 cursor-pointer"
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
        <div className="my-8 text-center">
          <Link to="/store" className="font-extrabold hover:text-slate-700">
            Back to store
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SingleProd;
