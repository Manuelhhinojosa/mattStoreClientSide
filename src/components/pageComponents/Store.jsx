import React from "react";

// react router V6
import { Link } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
// redux reducers
import { addProdShoppingCart } from "../../redux/slices/state/storeSlice";

const Store = () => {
  // redux & state
  const dispatch = useDispatch();
  const storeState = useSelector((state) => state.storeSlice);
  const staticState = useSelector((state) => state.staticTextSlice);

  return (
    <section className="container mx-auto flex overflow-hidden overflow-y-scroll">
      <div className="mt-32 w-full flex flex-row flex-wrap overflow-hidden p-8">
        <div className="ml-5 w-full text-2xl p-8 md:text-center md:text-3xl">
          <p> {staticState.home.homeMainTitle} / Store</p>
        </div>

        {[...storeState.artPieces].reverse().map((art) => (
          <div
            key={art.id}
            className="flex flex-col items-center justify-center mt-8 md:w-1/2 lg:w-1/3"
          >
            <Link to={`/store/${art._id}`}>
              <img
                src={art.media.url}
                alt="art piece img"
                className="p-2 rounded-3xl"
              />
            </Link>
            <p className=" p-3 text-center text-xs h-5">{art.title}</p>
            <p className=" p-3 text-center text-xs h-5 mt-5">{art.shortDesc}</p>
            <p className=" p-3 text-center text-xs h-5">{`${art.cost} CAD`}</p>
            <button
              className={`p-3 text-center text-sm h-5 font-extrabold ${
                !art.added
                  ? "hover:text-slate-700 cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
              onClick={() =>
                art.inStock && dispatch(addProdShoppingCart(art._id))
              }
              disabled={art.added}
            >
              {!art.inStock ? (
                <p className="hover:cursor-not-allowed">Sold</p>
              ) : art.added ? (
                <p>Added</p>
              ) : (
                <p>Add to cart</p>
              )}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Store;
