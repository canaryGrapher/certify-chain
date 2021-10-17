import React from "react";
import CertificateCards from "./CertificateCards";
import web3 from "../../ethereum/web3";

const Generated =  () => {
  const [info, setInfo] = React.useState([]);

  React.useEffect(() => {
    const fetchCertificates = async() => {
      const accounts = await web3.eth.getAccounts();
      const response = await fetch(`/api/certificate/?walletAddress=${accounts[0]}&type=admin`);
      const data = await response.json();
      console.log(data.message);
      setInfo(data.message);
      // console.log(typeof info);
      // console.log(info.length);
    };

    fetchCertificates();
  }, []);

  return (
    <React.Fragment>
      <h2 className="text-2xl font-medium">Issued Certificates</h2>
      {(info && info.length != 0) ? (
        info.map((info, index) => <CertificateCards key={index} {...info} />)
      ) : (
        <div className="text-lg h-32 flex flex-col justify-center text-center">
          No certificates issued yet
        </div>
      )}
    </React.Fragment>
  );
};

export default Generated;
