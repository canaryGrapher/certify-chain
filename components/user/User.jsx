import React from "react";

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

const User = () => {
  return (
    <React.Fragment>
      <h1 className="text-3xl">Yash Aryan</h1>
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
