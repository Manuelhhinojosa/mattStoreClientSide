import React from "react";

//React Router 6
import { Link } from "react-router-dom";

// redux
import { useSelector } from "react-redux";

const RecentWork = () => {
  // redux & state
  const storeState = useSelector((state) => state.storeSlice);
  return (
    <section className="container mx-auto flex">
      <div className="mt-32 w-full flex flex-row flex-wrap mb-[150px]">
        <div className="ml-5 w-full text-2xl p-8 md:text-center md:text-3xl">
          <p>Matt Marotti / Recent work</p>
        </div>
        {storeState.artPieces.map((work) =>
          work.recentWork ? (
            <div className="flex flex-col items-center justify-center mt-8 md:w-1/2 lg:w-1/3">
              <Link to={`/store/${work.id}`}>
                <img
                  src={work.imgSrcHref}
                  alt="recent work img"
                  className="p-2 rounded-3xl"
                />
              </Link>
              <p className=" p-3 text-center text-xs h-10">{work.title}</p>
            </div>
          ) : null
        )}
        <div className="fixed bottom-20 right-10 font-extrabold text-lg hover:text-slate-700">
          <Link to="/store">more work</Link>
        </div>
      </div>
    </section>
  );
};

export default RecentWork;
