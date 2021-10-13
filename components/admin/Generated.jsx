import React from "react";
import CertificateCards from "./CertificateCards";

const info = [
  {
    description: "This certificate is valid for the following domains:",
    regno: "123456789",
    date: "01/01/2020",
  },
  {
    description: "This certificate is valid for the following domains:",
    regno: "123456789",
    date: "01/01/2021",
  },
  {
    description: "This certificate is valid for the following domains:",
    regno: "123456789",
    date: "01/01/2022",
  },
  {
    description: "This certificate is valid for the following domains:",
    regno: "123456789",
    date: "01/01/2023",
  },
];

const Generated = () => {
  return (
    <React.Fragment>
      <h2 className="text-2xl font-medium">Issued Certificates</h2>
      {info.length != 0 ? (
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
