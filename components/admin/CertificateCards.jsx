import React from "react";
import { revokeCertificate } from "../../utilities/admin";

//importing stylesheets
import styles from "./styles/CertificateCards.module.css";

const revoke = async (certificateId) => {
  //Revoke smart contract
  try {
    const status = await revokeCertificate(certificateId);

    if (status === false) {
      const deleteCertificate = await fetch(
        `/api/certificate/?certificateId=${certificateId}`,
        {
          method: "DELETE",
        }
      );

      const response = await deleteCertificate.json();
      if (response.success === true) {
        alert("Certificated successfully deleted and revoked!!");
        props.refreshFunction();
      } else {
        alert("Could not delete from db!");
      }
    } else {
      alert("Could not revoke Certificate!");
    }
  } catch (err) {
    alert("DD: " + err.message);
  }
};

const CertificateCards = (props) => {
  const certificateDate = new Date(props.dateOfIssue);
  return (
    <div className={`bg-gray-100 w-100 my-5 p-5 rounded-lg ${styles.cards}`}>
      <div className="flex flex-row justify-between my-4 text-xl">
        <p className="font-medium">{props.regNo}</p>
        <p className="font-medium">
          {certificateDate.getDate() +
            "/" +
            certificateDate.getMonth() +
            "/" +
            certificateDate.getFullYear()}
        </p>
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
          onClick={() => revoke(props.certificateId)}
        >
          Revoke
        </button>
      </div>
    </div>
  );
};

export default CertificateCards;
