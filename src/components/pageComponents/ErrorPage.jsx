import React from "react";

//React Router 6
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="relative  h-screen w-screen flex flex-col items-center justify-center">
      <div className="mb-10 text-2xl">
        <p>This URL does not exist</p>
      </div>
      <div>
        <Link
          className="border-b-[1px] border-trasnparent hover:text-slate-600 hover:border-slate-600"
          to="/store"
        >
          continue shopping
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
