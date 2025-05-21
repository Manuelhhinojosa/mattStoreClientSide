import React from "react";
// assets
import homeImg from "../../assets/homeImg.png";

const Home = () => {
  return (
    <section className="relative flex h-screen w-screen items-center justify-center">
      <div className="absolute inset-0 -z-20 h-full w-full overflow-hidden">
        <img src={homeImg} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent from-70% to-black"></div>

      <div className="relative z-20 flex h-full flex-col justify-center pb-20">
        <h1 className="text-3xl">Matt</h1>
      </div>
    </section>
  );
};

export default Home;
