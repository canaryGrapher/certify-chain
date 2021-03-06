import React from "react";
import { revokeCertificate } from "../../utilities/admin";

//importing stylesheets
import styles from "./styles/CertificateCards.module.css";
import homestyles from "../../styles/home.module.css";

const revoke = async (
  certificateId,
  refreshFunction,
  openLoading,
  closeLoading
) => {
  //Revoke smart contract
  openLoading();
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
        closeLoading();
        refreshFunction();
      } else {
        alert("Could not delete from db!");
        closeLoading();
      }
    } else {
      alert("Could not revoke Certificate!");
      closeLoading();
    }
  } catch (err) {
    alert("DD: " + err.message);
    closeLoading();
  }
};

const CertificateCards = (props) => {
  const [loading, setLoading] = React.useState(false);
  const certificateDate = new Date(props.dateOfIssue);
  const closeLoading = () => {
    setLoading(false);
  };
  const openLoading = () => {
    setLoading(true);
  };
  return (
    <div className={`bg-gray-100 w-100 my-5 p-5 rounded-lg ${styles.cards}`}>
      <div className="flex flex-row justify-between my-4 text-xl">
        <p className="font-medium">{props.regNo}</p>
        <p className="font-medium">
          {certificateDate.getDate() +
            "-" +
            certificateDate.getMonth() +
            "-" +
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
        {!loading ? (
          <button
            className={`px-5 py-1 text-white ${styles.button}  h-12 w-1/3 bg-red-400`}
            onClick={() =>
              revoke(
                props.certificateId,
                props.refreshFunction,
                openLoading,
                closeLoading
              )
            }
          >
            Revoke
          </button>
        ) : (
          <div
            className={`px-5 py-1 text-white ${styles.button} h-12 w-1/3 bg-red-400 flex flex-col justify-center`}
          >
            <div
              className={`${homestyles.loader_red} ease-linear rounded-full border-4 border-t-4 border-white h-6 w-6 mx-auto mt-2`}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateCards;
