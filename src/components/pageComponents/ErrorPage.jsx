import React from "react";

//React Router 6
// react router hooks
import { Link } from "react-router-dom";

// error message function component
// error message function component
// error message function component
const ErrorPage = () => {
  return (
    <section className="relative  h-screen w-screen flex flex-col items-center justify-center">
      <div className="mb-10 text-2xl">
        <p>This URL does not exist</p>
      </div>
      <div>
        <Link className="underline hover:text-blue-500 " to="/store">
          continue shopping
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
