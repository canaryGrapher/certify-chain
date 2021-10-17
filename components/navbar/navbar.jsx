import React from "react";
import Link from "next/link";

const Navbar = () => (
  <div className="h-16 shadow-xl fixed top-0 w-screen flex flex-row justify-start px-10 z-50 bg-gray-200">
    <p className="my-auto text-xl font-bold">CERTIFY-BLOCK</p>
    <Link href="/admin">
      <a className="my-auto ml-5">Dashboard</a>
    </Link>
    <Link href="/home">
      <a className="my-auto ml-5">Dashboard</a>
    </Link>
    <Link href="/">
      <a className="my-auto ml-5">Verify Certificates</a>
    </Link>
  </div>
);

export default Navbar;
