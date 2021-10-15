import React from "react";
import web3 from "../../ethereum/web3";

//importing components
import CertificateComponent from "./CertificateComponent";

const fetchUserDetails = async (userWallet) => {
  const url = `/api/user/?walletAddress=${userWallet}`;

  const response = await fetch(url);
  const details = await response.json();

  return details.data;
};

const fetchUserCertificates = async(walletAddress) => {
  const response = await fetch(`/api/certificate/?walletAddress=${walletAddress}&type=owned`);
  const data = await response.json();
  console.log(data.message);
  return data.message;
}

const User = () => {
  const [userWallet, setUserWallet] = React.useState("");
  const [regNo, setRegNo] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [info, setInfo] = React.useState([]);

  React.useEffect(() => {
    const fetchUtil = async () => {
      const wallet = await web3.eth.getAccounts();
      setUserWallet(wallet[0]);
      const data = await fetchUserDetails(wallet[0]);
      setRegNo(data.regNo);
      setUserName(data.name);

      const userCertificates = await fetchUserCertificates(wallet[0]);
      setInfo(userCertificates);
    };
    fetchUtil();
  }, []);

  return (
    <React.Fragment>
      <h1 className="text-3xl">{userName}</h1>
      <p className="text-lg text-gray-400">{userWallet.slice(0, 6) + ".." + userWallet.slice(-5)}</p>
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
