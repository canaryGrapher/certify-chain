import React from "react";
import Link from "next/link";
import web3 from "../../ethereum/web3";

const Navbar = () => {
  const [isUser, setIsUser] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const fetchUtil = async () => {
      if (window.ethereum) {
        const accounts = await web3.eth.getAccounts();
        const userDetails = await fetch(
          `/api/user?walletAddress=${accounts[0]}`
        );
        const response = await userDetails.json();

        //check if the address is associated with any account on database
        if (response.data && response.data.walletAddress === accounts[0]) {
          // redirect to admin dashboard if user is admin
          setIsUser(true);
          if (response.data.admin) {
            setIsAdmin(true);
          }
        } else {
          setIsUser(false);
        }
      }
    };

    fetchUtil();
  }, []);

  return (
    <div className="h-16 shadow-xl fixed top-0 w-screen flex flex-row justify-start px-10 z-50 bg-gray-200">
      <p className="my-auto text-xl font-bold">CERTIFY-BLOCK</p>
      {isUser ? (
        <Link href={isAdmin ? "/admin" : "/home"}>
          <a className="my-auto ml-5">Dashboard</a>
        </Link>
      ) : null}
      <Link href="/">
        <a className="my-auto ml-5">Verify Certificates</a>
      </Link>
    </div>
  );
};

export default Navbar;
