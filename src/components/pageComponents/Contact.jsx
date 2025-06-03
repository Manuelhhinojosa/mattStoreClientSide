import React from "react";

// react icons
import { CiInstagram } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";

// React Hooks
import { useRef } from "react";

// emailJS
import emailjs from "@emailjs/browser";

// Toastify for error and success message handling
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// error handling state (for styling)
import { toastStyleObject } from "../../tostifyStyle";

// redux
import { useSelector } from "react-redux";

const Contact = () => {
  // redux & state
  const staticState = useSelector((state) => state.staticTextSlice);

  // form state ref
  // Initial state (emply fields)
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const subjectRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  // handle send form function
  const handleUserData = (e) => {
    e.preventDefault();
    // handleling form filling error

    if (
      nameRef.current.value === "" ||
      subjectRef.current.value === "" ||
      emailRef.current.value === "" ||
      messageRef.current.value === ""
    ) {
      nameRef.current.focus();
      toast("All fields must be completed.", toastStyleObject());
      return;
    }
    // Send data
    emailjs
      .sendForm(
        "service_jmj41g7", // service ID
        "template_9pokvbn", // template ID
        formRef.current, // form data
        "tYhN-ZrthmkJGHLfG" // key
      )
      .then(
        (result) => {
          console.log("Success. Result:", result);
          nameRef.current.value = "";
          subjectRef.current.value = "";
          emailRef.current.value = "";
          messageRef.current.value = "";
          nameRef.current.focus();
          toast("Message received. Thanks.", toastStyleObject());
        },
        (error) => {
          console.log("Failure. Error:", error);
          toast(error.text, toastStyleObject());
        }
      );
  };

  return (
    <section className="container mx-auto h-[700px]">
      <div className="mt-32 w-ful">
        <div className="h-[150px] text-center border-b-[1px] border-b-slate-700">
          <div className="flex justify-center items-center text-3xl h-1/2">
            {staticState.home.homeMainTitle} / Contact
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
          ref={formRef}
        >
          <input
            name="name"
            type="text"
            placeholder="Name"
            autocomplete="off"
            className="h-10 w-3/4 text-center md:w-1/2 focus:outline-none border-b-[1px] border-b-transparent  hover:border-b-black"
            ref={nameRef}
          />
          <input
            name="subject"
            type="text"
            placeholder="Subject"
            autocomplete="off"
            className="h-10 w-3/4 text-center md:w-1/2 focus:outline-none border-b-[1px] border-b-transparent hover:border-b-black"
            ref={subjectRef}
          />
          <input
            name="email"
            type="text"
            placeholder="E-mail"
            autocomplete="off"
            className="h-10 w-3/4 text-center md:w-1/2 focus:outline-none border-b-[1px] border-b-transparent hover:border-b-black"
            ref={emailRef}
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Message"
            className="w-3/4 text-center md:w-1/2 border-b-[1px] border-b-transparent hover:border-b-black focus:outline-none"
            ref={messageRef}
          ></textarea>
          <button
            onClick={handleUserData}
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
