import React from "react";

//importing stylesheets
import styles from "./styles/CertificateComponent.module.css";

const CertificateComponent = (props) => {
  const certificateDate = new Date(props.dateOfIssue);
  return(
     <div className={`bg-gray-100 w-100 my-5 p-10 rounded-lg ${styles.cards}`}>
      <p className="text-center">{props.description}</p>
      <div className="flex flex-row justify-between w-full my-5">
        <p>
          <span className="font-bold">Certificate ID: </span>
          {props.certificateId}
        </p>
        <p>
          <span className="font-bold">Issue date: </span>
          {certificateDate.getDate() +
            "-" +
            certificateDate.getMonth() +
            "-" +
            certificateDate.getFullYear()}
        </p>
      </div>
      <div className="flex flex-row justify-between w-full my-5">
        <button
          className={`px-5 py-1 text-white ${styles.button} h-12 w-3/4 md:w-1/4 bg-blue-400`}
        >
          View Certificate
        </button>
        <button
          className={`px-5 py-1 text-white ${styles.button} h-12 w-3/4 md:w-1/4 bg-green-400`}
        >
          Download
        </button>
      </div>
    </div>
  );
}
export default CertificateComponent;
