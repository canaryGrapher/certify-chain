import React from "react";
import CertificateCards from "./CertificateCards";
import web3 from "../../ethereum/web3";

const Generated = () => {
  const [info, setInfo] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  const refreshCertificates = async () => {
    setRefresh(!refresh);
  };

  React.useEffect(() => {
    const fetchCertificates = async () => {
      const accounts = await web3.eth.getAccounts();
      const response = await fetch(
        `/api/certificate/?walletAddress=${accounts[0]}&type=admin`
      );
      const data = await response.json();
      setInfo(data.message);
    };

    fetchCertificates();
  }, [refresh]);

  return (
    <React.Fragment>
      <h2 className="text-2xl font-medium">Issued Certificates</h2>
      {info && info.length != 0 ? (
        info.map((info, index) => (
          <CertificateCards
            key={index}
            {...info}
            refreshFunction={refreshCertificates}
          />
        ))
      ) : (
        <div className="text-lg h-32 flex flex-col justify-center text-center">
          No certificates issued yet
        </div>
      )}
    </React.Fragment>
  );
};

export default Generated;
