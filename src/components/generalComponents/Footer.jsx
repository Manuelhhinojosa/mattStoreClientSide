import React from "react";

// footer function component
// footer function component
// footer function component
const Footer = () => {
  return (
    <footer className="p-5 flex justify-end text-sm shadow-2xl">
      <span>
        Created by{" "}
        <a
          href="https://manuelhinojosa.netlify.app"
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
          className="hover:text-blue-500 duration-300"
        >
          Manuel Hinojosa
        </a>
      </span>
    </footer>
  );
};

export default Footer;
