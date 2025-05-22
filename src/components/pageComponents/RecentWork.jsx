import React from "react";

// assets
import img1 from "../../assets/1.png";
import img2 from "../../assets/2.png";
import img3 from "../../assets/3.png";
import img4 from "../../assets/4.png";
import img5 from "../../assets/5.png";
import img6 from "../../assets/6.png";
import img7 from "../../assets/7.png";
import img8 from "../../assets/8.png";
import img9 from "../../assets/9.png";
import img10 from "../../assets/10.png";

const RecentWork = () => {
  const imagesArr = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
  ];

  return (
    <section className="container mx-auto flex">
      <div className="mt-32 w-full flex flex-col items-center bg-red-200">
        {imagesArr.map((img) => (
          <div className="flex flex-col mt-8">
            <img
              src={img}
              alt="recent work img"
              className="w-auto p-2 rounded-3xl"
            />
            <p className="p-3 text-center text-xs h-fit">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentWork;
