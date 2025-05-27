import React from "react";

// react icons
import { CiInstagram } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";

// redux
import { useSelector } from "react-redux";

const Contact = () => {
  // redux & state
  const staticState = useSelector((state) => state.staticTextSlice);

  return (
    <section className="container mx-auto h-[700px]">
      <div className="mt-32 w-ful">
        <div className="h-[150px] text-center border-b-[1px] border-b-slate-700">
          <div className="flex justify-center items-center text-3xl h-1/2">
            Contact
          </div>
          <div className=" flex justify-center gap-7 items-center text-3xl h-1/2">
            <a
              href={`mailto:${staticState.contact.email}`}
              className="hover:text-slate-600"
            >
              <TfiEmail />
            </a>
            <a
              href={staticState.contact.IGlink}
              target="_blank"
              className=" hover:text-slate-600"
            >
              <CiInstagram />
            </a>
          </div>
        </div>
        <form
          action=""
          className="h-[550px] flex flex-col items-center justify-evenly"
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
