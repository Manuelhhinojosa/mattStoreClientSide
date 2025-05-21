import React from "react";

// assets
import aboutImg from "../../assets/aboutImg.png";

const About = () => {
  return (
    <section className="container mx-auto w-screen h-screen flex items-end">
      <div className=" h-3/4 w-full flex flex-col items-center ">
        <div className=" h-96 ">
          <img src={aboutImg} alt="about image" className="h-full" />
        </div>
        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl text-center mt-8">Matt Marotti</h1>
          <p className="w-3/4 text-justify mt-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            suscipit amet cumque delectus ipsa obcaecati expedita, cum iure,
            beatae tempora mollitia laudantium eos totam illum id eaque
            necessitatibus at. Architecto. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit.
            <br />
            <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            suscipit amet cumque delectus ipsa obcaecati expedita, cum iure,
            beatae tempora mollitia laudantium eos totam illum id eaque
            necessitatibus at. Architecto. Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Itaque suscipit amet cumque delectus
            ipsa obcaecati expedita, cum iure, beatae tempora mollitia
            laudantium eos totam illum id eaque necessitatibus at.
            <br />
            <br />
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            suscipit amet cumque delectus ipsa obcaecati expedita, cum iure,
            beatae tempora mollitia laudantium eos totam illum id eaque
            necessitatibus at.
          </p>
          <a href="" target="_blank" className="mt-8 mb-8">
            Download my CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
