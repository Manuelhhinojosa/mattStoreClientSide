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
// redux hooks
import { useSelector } from "react-redux";

// contat function component
// contat function component
// contat function component
const Contact = () => {
  // redux & state
  // state in static text slice
  const staticState = useSelector((state) => state.staticTextSlice);

  // form state ref
  // Initial state (emply fields)
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const subjectRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  // handle send form function
  // handle send form function
  // handle send form function
  const handleUserData = (e) => {
    e.preventDefault();

    // form validation
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
    // Send data to emailjs
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("Success. Result:", response);
          console.log("Message sent successfully:", {
            config: response.config,
            data: response.data,
            status: response.status,
            headers: response.headers,
          });

          // resetting values
          nameRef.current.value = "";
          subjectRef.current.value = "";
          emailRef.current.value = "";
          messageRef.current.value = "";
          nameRef.current.focus();

          // success messsage
          toast("Message received. Thanks.", toastStyleObject());
        },
        (error) => {
          console.log("Failure. Error:", error);
          toast(error.text, toastStyleObject());
        }
      );
  };

  // return
  // return
  // return
  return (
    <section className="container mx-auto h-[700px] mt-32 ">
      <div className="w-full">
        <div className="h-[150px] text-center border-b-[1px] border-b-black">
          {/* header */}
          <div className="flex justify-center items-center text-3xl h-1/2 ">
            {staticState.home.homeMainTitle} / Contact
          </div>

          {/* social media navbar */}
          <div className=" flex justify-center gap-7 items-center text-4xl h-1/2">
            <a
              href={`mailto:${staticState.contact.email}`}
              className="hover:text-blue-500"
            >
              <TfiEmail />
            </a>
            <a
              href={staticState.contact.IGlink}
              target="_blank"
              className=" hover:text-blue-500"
            >
              <CiInstagram />
            </a>
          </div>
        </div>

        {/* form */}
        <form
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
            className="h-10 hover:text-blue-500 font-extrabold text-lg transition-all duration-500"
          >
            send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
