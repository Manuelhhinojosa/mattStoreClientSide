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
  const location = useLocation();
  let reference = location.pathname.slice(7);
  // identifying single product by id in the url
  let product = {};
  storeState.artPieces.forEach((p) => {
    if (p.id == reference) {
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
            src={product.imgSrcHref}
            alt="product image"
            className="p-8 lg:w-1/2"
          />
        </div>
        <div>
          <div className="mb-8">
            <p className="text-center">{product.title}</p>
          </div>
          <div>
            <p className="text-center">{product.cost}</p>
          </div>
          <div>
            <p className="text-center text-sm">{product.shortDesc}</p>
          </div>
          <div className="h-[150px] mt-8 flex flex-col items-center justify-center">
            <p className="text-sm">{product.largeDesc}</p>
          </div>
        </div>
        <div className="my-8 text-center">
          <button
            className={`p-3 text-center text-sm h-5 font-extrabold ${
              product.inStock
                ? "hover:text-slate-700 cursor-pointer"
                : "text-gray-400 cursor-not-allowed"
            }`}
            onClick={() =>
              product.inStock && dispatch(addProdShoppingCart(product.id))
            }
            disabled={!product.inStock}
          >
            {product.inStock ? <p>Add to cart</p> : <p>Added to cart</p>}
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
