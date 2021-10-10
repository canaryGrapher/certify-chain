import React from "react";

//import stylesheets
import styles from "./footer.module.css";

const Footer = () => (
  <div
    className={`w-screen bg-gray-800 text-center flex flex-col justify-center text-gray-400 ${styles.footer}`}
  >
    <p>Support the project on GitHub</p>
  </div>
);

export default Footer;
