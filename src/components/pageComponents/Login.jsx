import React from "react";

// React router V6
import { useNavigate } from "react-router-dom";

const login = () => {
  // React router V6
  const navigate = useNavigate();
  // sign in function (temp)
  const handleSignIn = async (e) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <section className="container mx-auto flex items-end">
      <div className="mt-32 w-full h-[700px] flex items-center justify-center">
        {/*  */}
        <form
          action=""
          className="flex flex-col items-center justify-around h-1/3"
        >
          <input
            type="text"
            name="username"
            placeholder="User"
            autoComplete="off"
            className="border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none text-center"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            autoComplete="off"
            className="border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none text-center"
          />

          <button
            onClick={handleSignIn}
            className="hover:text-slate-600 ont-extrabold text-lg transition-all
            duration-500"
          >
            Enter
          </button>
        </form>
        {/*  */}
      </div>
    </section>
  );
};

export default login;
