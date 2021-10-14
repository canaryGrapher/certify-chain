import React from "react";
import web3 from "../../ethereum/web3";

//importing components
import CertificateComponent from "./CertificateComponent";

const info = [
  {
    description: "This certificate is valid for the following domains:",
    date: "01/01/2020",
    id: "HD73DJ0",
  },
  {
    description: "This certificate is valid for the following domains:",
    date: "01/01/2021",
    id: "HD73DJ0",
  },
  {
    description: "This certificate is valid for the following domains:",
    date: "01/01/2022",
    id: "HD73DJ0",
  },
  {
    description: "This certificate is valid for the following domains:",
    date: "01/01/2023",
    id: "HD73DJ0",
  },
];

const fetchUserDetails = async (userWallet) => {
  const url = `/api/user/?walletAddress=${userWallet}`;

  const response = await fetch(url);
  const details = await response.json();

  return details.data;
};

const User = () => {
  const [userWallet, setUserWallet] = React.useState("");
  const [regNo, setRegNo] = React.useState("");
  const [userName, setUserName] = React.useState("");

  React.useEffect(() => {
    const fetchUtil = async () => {
      const wallet = await web3.eth.getAccounts();
      // const displayAddress = wallet[0].slice(0, 6) + ".." + wallet[0].slice(-5);
      setUserWallet(wallet[0]);
      const data = await fetchUserDetails(wallet[0]);
      setRegNo(data.regNo);
      setUserName(data.name);
    };
    fetchUtil();
  }, []);

  return (
    <React.Fragment>
      <h1 className="text-3xl">{userName}</h1>
      <p>{regNo}</p>
      <div className="mt-10">
        {info.map((item) => (
          <CertificateComponent {...item} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default User;
