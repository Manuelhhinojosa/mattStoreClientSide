import React from "react";

// framer motion
import { motion } from "framer-motion";

// redux
// redux hooks
import { useSelector } from "react-redux";

// About function component
// About function component
// About function component
const About = () => {
  // redux hooks and state
  // state in static text slice
  const staticState = useSelector((state) => state.staticTextSlice);

  // return
  // return
  // return
  return (
    // main container
    <section className="container h-auto mx-auto mb-20 flex items-end">
      <div className="mt-32 w-full flex flex-col items-center lg:flex-row lg:justify-evenly ">
        {/* img container */}
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="mt-8 h-96"
        >
          <img
            src={staticState.about.aboutImgSrcHref}
            alt="about image"
            className="h-full rounded-xl shadow-2xl"
          />
        </motion.div>

        {/* text container */}
        <motion.div
          initial={{ x: 120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col items-center"
        >
          {/* title */}
          <h1 className="text-3xl text-center mt-8  underline">Matt Marotti</h1>
          {/* body */}
          <p className="w-3/4 text-justify mt-8">
            {staticState.about.aboutText.slice(0, 201)}
            <br />
            <br />
            {staticState.about.aboutText.slice(202, 388)}
            <br />
            <br />
            {staticState.about.aboutText.slice(388)}
          </p>
          {/* CV link */}
          <a
            href={staticState.about.cvSrcHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 mb-8 bg-black text-white rounded-lg p-3 hover:text-blue-500 duration-300"
          >
            Download my CV
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
