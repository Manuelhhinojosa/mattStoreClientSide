import React from "react";

// react router V6
// react router hooks
import { Link } from "react-router-dom";

// framer motion
// framer motion hooks
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const FadeInOnScroll = ({ children, delay = 1 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 2, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

// redux
// redux hooks
import { useSelector, useDispatch } from "react-redux";
// redux functions in store slice
import { addProdShoppingCart } from "../../redux/slices/state/storeSlice";

// store function component
// store function component
// store function component
const Store = () => {
  // redux & state
  // state in store slice
  const storeState = useSelector((state) => state.storeSlice);
  // state in static text slice
  const staticState = useSelector((state) => state.staticTextSlice);
  // redux hooks
  const dispatch = useDispatch();

  // retrune
  // retrune
  // retrune
  return (
    <section className="container mx-auto flex ">
      {/* main container */}
      <div className="mt-32 w-full  flex flex-col items-center justify-center mb-[150px]">
        {/* header */}
        <div className="w-full text-2xl p-8 md:text-center md:text-3xl">
          <p> {staticState.home.homeMainTitle} / Store</p>
        </div>

        {/* art pieces container */}
        <div className="w-full mt-10 flex flex-wrap items-center justify-evenly">
          {[...storeState.artPieces].reverse().map((art, index) => (
            // art piece container
            <FadeInOnScroll key={art._id} delay={index * 0.1}>
              <div
                key={art._id}
                className="flex flex-col items-center justify-center m-3"
              >
                {/* img / link to single product */}
                <Link to={`/store/${art._id}`}>
                  <img
                    src={art.media.url}
                    alt="art piece img"
                    className=" shadow-2xl max-h-[550px] mt-5"
                  />
                </Link>
                {/* title */}
                <p className=" p-3 text-center text-sm h-5 font-bold">
                  {art.title}
                </p>
                {/* description */}
                <p className=" p-3 text-center text-xs h-5 mt-5">
                  {art.shortDesc}
                </p>
                {/* price */}
                <p className=" p-3 text-center text-xs h-5">{`${art.cost} CAD`}</p>
                {/* add to cart button */}
                <button
                  className={`p-3 text-center text-sm h-5 font-extrabold ${
                    !art.added
                      ? "hover:text-blue-500 cursor-pointer"
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
            </FadeInOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Store;
