import React from "react";

//importing stylesheets
import styles from "./navbar.module.css";

const Navbar = () => (
  <div className="h-16 shadow-xl fixed top-0 w-screen flex flex-row justify-center px-10 z-50 bg-gray-200">
    <p className="my-auto text-xl font-bold">CERTIFY-BLOCK</p>
  </div>
);

export default Navbar;
