import React from "react";

// redux
// redux hooks
import { useSelector } from "react-redux";

// framer motion
import { motion } from "framer-motion";

// home function component
// home function component
// home function component
const Home = () => {
  // redux
  // state in staticText slice
  const staticText = useSelector((state) => state.staticTextSlice);

  // return
  // return
  // return
  return (
    // main section
    <section className="relative flex h-screen w-screen items-center justify-center">
      {/* img container */}
      <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden">
        <img
          src={staticText.home.homeImgSrcHref}
          alt="home img"
          className="h-full w-full object-cover"
        />
      </div>
      {/* background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-70% to-black"></div>

      {/* header container */}
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="relative z-20  flex  flex-col justify-center"
      >
        <h1 className="text-3xl hover:cursor-none">
          {staticText.home.homeMainTitle}
        </h1>
      </motion.div>
    </section>
  );
};

export default Home;
