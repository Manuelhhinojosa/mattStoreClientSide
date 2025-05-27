import React from "react";

// react icons
import { CiInstagram } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";

// React Hooks
import { useRef } from "react";

// emailJS
import emailjs from "@emailjs/browser";

// redux
import { useSelector } from "react-redux";

const Contact = () => {
  // redux & state
  const staticState = useSelector((state) => state.staticTextSlice);
  // form state ref
  // Initial state
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
      // toast("*** Todos los campos son obligatorios ***", toastStyleObject());
      alert("all fields are mandatory");
      return;
    } else {
      alert("form sent");
    }
    // Send data
    // emailjs
    //   .sendForm(
    //     "service_b3bqjep", // service ID
    //     "template_ubefjka", // template ID
    //     formRef.current, // form data
    //     "7RhgiDzoqn1bPUjZk" // key
    //   )
    //   .then(
    //     (result) => {
    //       console.log("Success!! Result:", result);
    //       nameRef.current.value = "";
    //       subjectRef.current.value = "";
    //       emailRef.current.value = "";
    //       messageRef.current.value = "";
    //       nameRef.current.focus();
    //       toast(
    //         "*** Tu mensaje me ha llegado. Pronto me pondré en contacto. :) ***",
    //         toastStyleObject()
    //       );
    //     },
    //     (error) => {
    //       console.log("Failure. Error:", error);
    //       toast(error.text, toastStyleObject());
    //     }
    //   );
  };

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
          ref={formRef}
        >
          <input
            type="text"
            placeholder="Name"
            name="name"
            autocomplete="off"
            className="h-10 w-3/4 text-center md:w-1/2 focus:outline-none border-b-[1px] border-b-transparent  hover:border-b-black"
            ref={nameRef}
          />
          <input
            type="text"
            placeholder="Subject"
            name="subject"
            autocomplete="off"
            className="h-10 w-3/4 text-center md:w-1/2 focus:outline-none border-b-[1px] border-b-transparent hover:border-b-black"
            ref={subjectRef}
          />
          <input
            type="text"
            placeholder="E-mail"
            name="email"
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
