import React from "react";

const Footer = () => {
  return (
    <footer className="p-5 flex justify-end text-sm shadow-2xl">
      <span>
        Created by{" "}
        <a
          href="https://manuelhinojosa.netlify.app"
          target="_blank"
          rel="noreferrer"
          style={{ color: "#0070f3", textDecoration: "none" }}
        >
          Manuel Hinojosa
        </a>
      </span>
    </footer>
  );
};

export default Footer;
