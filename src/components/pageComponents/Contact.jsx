import React from "react";
// react icons
import { CiInstagram } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";

const Contact = () => {
  return (
    <section className="container mx-auto">
      <div className="mt-32 w-full h-screen">
        <div className="h-1/4 text-center">
          <div className="h-1/2 flex justify-center items-center text-3xl">
            Contact
          </div>
          <div className="h-1/2 flex justify-center gap-7 items-center text-3xl border-b-[1px] border-b-slate-700">
            <a
              href="mailto:matt.marotti@gmail.com"
              className="hover:text-slate-600 transition-all duration-500"
            >
              <TfiEmail />
            </a>
            <a
              href="https://www.instagram.com/martysville/"
              target="_blank"
              className=" hover:text-slate-600 transition-all duration-500"
            >
              <CiInstagram />
            </a>
          </div>
        </div>
        <form
          action=""
          className="h-3/4 flex flex-col items-center justify-evenly"
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            autocomplete="off"
            className="h-10 w-3/4 text-center md:w-1/2 focus:outline-none border-b-[1px] border-b-transparent  hover:border-b-black"
          />
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            autocomplete="off"
            className="h-10 w-3/4 text-center md:w-1/2 focus:outline-none border-b-[1px] border-b-transparent hover:border-b-black"
          />
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            autocomplete="off"
            className="h-10 w-3/4 text-center md:w-1/2 focus:outline-none border-b-[1px] border-b-transparent hover:border-b-black"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Message"
            className="w-3/4 text-center md:w-1/2 border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
          ></textarea>
          <button
            onClick={""}
            className="h-10 hover:text-slate-600 font-extrabold text-lg transition-all duration-500"
          >
            send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
