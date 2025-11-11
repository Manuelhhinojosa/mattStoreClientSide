import React from "react";

// redux
import { useSelector } from "react-redux";

const About = () => {
  // redux
  const staticState = useSelector((state) => state.staticTextSlice);

  return (
    <section className="container mx-auto  flex items-end">
      <div className="mt-32 w-full flex flex-col items-center">
        <div className="mt-8 h-96">
          <img
            src={staticState.about.aboutImgSrcHref}
            alt="about image"
            className="h-full rounded-xl shadow-2xl"
          />
        </div>
        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl text-center mt-8">Matt Marotti</h1>
          <p className="w-3/4 text-justify mt-8">
            {staticState.about.aboutText.slice(0, 201)}
            <br />
            <br />
            {staticState.about.aboutText.slice(202, 388)}
            <br />
            <br />
            {staticState.about.aboutText.slice(388)}
          </p>
          <a
            href={staticState.about.cvSrcHref}
            target="_blank"
            className="mt-8 mb-8"
          >
            Download my CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
