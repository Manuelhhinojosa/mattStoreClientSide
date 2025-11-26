import React from "react";

// framer motion
// framer motion hooks
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const FadeInOnScroll = ({ children, delay = 1 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.25,
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

// React Router v6
// react router hooks
import { Link } from "react-router-dom";

// redux
// redux hooks
import { useSelector } from "react-redux";

// recent work function component
// recent work function component
// recent work function component
const RecentWork = () => {
  // redux & state
  // state in store slice
  const storeState = useSelector((state) => state.storeSlice);
  // state in static state slice
  const staticState = useSelector((state) => state.staticTextSlice);

  // return
  // return
  // return
  return (
    <section className="container mx-auto flex">
      {/* main container */}
      <div className="mt-32 w-full flex flex-col items-center justify-center mb-[150px]">
        {/* header */}
        <div className="w-full text-2xl p-8 text-center md:text-3xl">
          <p>{staticState.home.homeMainTitle} / Recent work</p>
        </div>

        {/* body */}
        <div className="w-full mt-10 flex flex-wrap items-center justify-evenly">
          {storeState.artPieces.map((work, index) =>
            work.recentWork ? (
              <FadeInOnScroll key={work._id} delay={index * 0.1}>
                <div className="flex flex-col items-center justify-center m-3">
                  <Link to={`/store/${work._id}`}>
                    <img
                      src={work.media.url}
                      alt="recent work img"
                      className="rounded-3xl shadow-2xl max-h-[550px]"
                    />
                  </Link>
                  <p className=" p-3 text-center text-xs font-bold h-10 m-10">
                    {work.title}
                  </p>
                </div>
              </FadeInOnScroll>
            ) : null
          )}
        </div>

        {/* button */}
        <div className="fixed bottom-20 right-10 font-extrabold text-lg hover:text-blue-500 duration-500">
          <Link to="/store">more work</Link>
        </div>
      </div>
    </section>
  );
};

export default RecentWork;
