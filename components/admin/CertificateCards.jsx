import React from "react";

//importing stylesheets
import styles from "./styles/CertificateCards.module.css";

const CertificateCards = (props) => (
  <div className={`bg-gray-100 w-100 my-5 p-5 rounded-lg ${styles.cards}`}>
    <div className="flex flex-row justify-between my-4 text-xl">
      <p className="font-medium">{props.regNo}</p>
      <p className="font-medium">{props.dateOfIssue}</p>
    </div>
    <p>{props.description}</p>
    <div className="flex flex-row justify-between mt-4">
      <button
        className={`px-5 py-1 text-white ${styles.button} h-12 w-1/3 bg-blue-400`}
      >
        View
      </button>
      <button
        className={`px-5 py-1 text-white ${styles.button}  h-12 w-1/3 bg-red-400`}
      >
        Revoke
      </button>
    </div>
  </div>
);

export default CertificateCards;
