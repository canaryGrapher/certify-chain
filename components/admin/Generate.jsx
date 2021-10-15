import React from "react";
import web3 from "../../ethereum/web3";
import { v4 as uuid_v4 } from "uuid";
import { createCertificate } from "../../utilities/admin";

//importinf stylesheets
import homestyles from "../../styles/home.module.css";

const Generate = () => {
  const [name, setName] = React.useState("");
  const [regNo, setRegNo] = React.useState("");
  const [issueDate, setIssueDate] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [certificateId, setCertificateId] = React.useState("");

  const submitCertificate = async () => {
    const certificateId = uuid_v4();
    const status = await createCertificate(
      certificateId,
      regNo,
      name,
      organization,
      issueDate,
      description
    );
    const wallet = await web3.eth.getAccounts();

    if (status === true) {
      const dataSubmit = await fetch(`/api/certificate`, {
        method: "POST",
        body: JSON.stringify({
          studentName: name,
          regNo: regNo,
          dateOfIssue: issueDate,
          description: description,
          organization: organization,
          walletAddress: wallet[0],
          certificateId: certificateId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await dataSubmit.json();
      console.log(response);
    } else {
      //Show error message indicating error due to web3/metamask
      console.log("The certificate could not be generated!!");
    }
  };

  return (
    <React.Fragment>
      <h2 className="text-2xl font-medium">Issue a new certificate</h2>
      <div className="my-2 w-full">
        <p className="mb-2 ml-3">Certificate ID</p>
        <input
          type="text"
          placeholder="Certificate ID"
          className={`w-full mx-auto h-12 p-5 border-2 ${homestyles.input}`}
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="my-2 w-full">
          <p className="mb-2 ml-3">Name of the user</p>
          <input
            type="text"
            placeholder="Name"
            className={`w-full mx-auto h-12 p-5 border-2 ${homestyles.input}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-2 w-full">
          <p className="mb-2 ml-3">Registration Number</p>
          <input
            type="number"
            placeholder="Registration number of the user"
            className={`w-full mx-auto h-12 p-5 border-2 ${homestyles.input}`}
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="my-2 w-full">
          <p className="mb-2 ml-3">Date of Issue</p>
          <input
            type="date"
            placeholder="Date of issue of certificate"
            className={`w-full mx-auto h-12 p-5 border-2 ${homestyles.input}`}
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
          />
        </div>
        <div className="my-2 w-full">
          <p className="mb-2 ml-3">Organization</p>
          <input
            type="text"
            placeholder="Name of issuing organization"
            className={`w-full mx-auto h-12 p-5 border-2 ${homestyles.input}`}
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          />
        </div>
      </div>
      <div className="my-2 w-full">
        <p className="mb-2 ml-3">Description</p>
        <textarea
          type="text"
          rows={5}
          placeholder="About the certificate"
          className={`w-full mx-auto h-12 p-5 border-2 ${homestyles.textarea}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button
        className={`${homestyles.button} mx-auto w-full border-2 bg-green-400 border-green-400 hover:text-black hover:bg-white text-white`}
        onClick={() => submitCertificate()}
      >
        Issue Certificate
      </button>
    </React.Fragment>
  );
};

export default Generate;
