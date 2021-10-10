import React from "react";

//importing stylesheets
import styles from "./navbar.module.css";

const Navbar = () => (
  <div className="h-16 shadow-xl fixed top-0 w-screen flex flex-row justify-between px-10 z-50 bg-gray-200">
    <p className="my-auto text-xl font-bold">CERTIFY-BLOCK</p>
    <div className="my-auto">
      <button className={`px-6 py-1 bg-gray-600 text-white ${styles.button}`}>
        Login
      </button>
    </div>
  </div>
);

export default Navbar;
