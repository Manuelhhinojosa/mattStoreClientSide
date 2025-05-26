import React from "react";

// react router V^
import { Link } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

const Store = () => {
  // redux & state
  const storeState = useSelector((state) => state.storeSlice);

  return (
    <section className="container mx-auto flex overflow-hidden overflow-y-scroll">
      <div className="mt-32 w-full flex flex-row flex-wrap overflow-hidden p-8">
        {storeState.artPieces.map((art) => (
          <div
            key={art.id}
            className="flex flex-col items-center justify-center mt-8 md:w-1/2 lg:w-1/3"
          >
            <Link to={`/store/${art.id}`}>
              <img
                src={art.imgSrcHref}
                alt="art piece img"
                className="p-2 rounded-3xl"
              />
            </Link>
            <p className=" p-3 text-center text-xs h-5">{art.title}</p>
            <p className=" p-3 text-center text-xs h-5 mt-5">{art.shortDesc}</p>
            <p className=" p-3 text-center text-xs h-5">{art.cost}</p>
            <button className=" p-3 text-center text-sm h-5 font-extrabold hover:text-slate-700">
              add to cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Store;
