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

  const details = await fetch(url);

  console.log(await details.json());
};

const User = () => {
  const [userWallet, setUserWallet] = React.useState("");
  React.useEffect(() => {
    web3.eth.getAccounts().then((res) => {
      const displayAddress = res[0].slice(0, 6) + ".." + res[0].slice(-5);
      setUserWallet(displayAddress);
      fetchUserDetails(res[0]);
    });
  }, []);

  return (
    <React.Fragment>
      <h1 className="text-3xl">Yash Aryan, {userWallet}</h1>
      <p>180934136</p>
      <div className="mt-10">
        {info.map((item) => (
          <CertificateComponent {...item} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default User;
