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
  const [loading, setLoading] = React.useState(false);

  const clearFields = () => {
    setName("");
    setRegNo("");
    setIssueDate("");
    setOrganization("");
    setDescription("");
  };

  const submitCertificate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const certificateId = uuid_v4();
    try {
      const status = await createCertificate(
        certificateId,
        regNo,
        name,
        organization,
        issueDate,
        description
      );
      const wallet = await web3.eth.getAccounts();
      console.log(status);

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
        clearFields();
        setLoading(false);
      } else {
        //Show error message indicating error due to web3/metamask
        alert("The certificate could not be generated!!");
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <h2 className="text-2xl font-medium">Issue a new certificate</h2>
      <form onSubmit={submitCertificate}>
        <div className="grid grid-cols-2 gap-5">
          <div className="my-2 w-full">
            <p className="mb-2 ml-3">Name of the user</p>
            <input
              required={true}
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
              required={true}
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
              required={true}
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
              required={true}
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
            required={true}
            type="text"
            rows={5}
            placeholder="About the certificate"
            className={`w-full mx-auto h-12 p-5 border-2 ${homestyles.textarea}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {!loading ? (
          <button
            type="submit"
            className={`${homestyles.button} mx-auto h-10 w-full border-2 bg-green-400 border-green-400 hover:text-black hover:bg-white text-white`}
          >
            Issue Certificate
          </button>
        ) : (
          <div
            className={`flex justify-center items-center ${homestyles.button} mx-auto h-10 w-full border-2 bg-green-400 border-green-400`}
          >
            <div
              className={`${homestyles.loader} ease-linear rounded-full border-4 border-t-4 border-white h-8 w-8 mx-auto`}
            ></div>
          </div>
        )}
      </form>
    </React.Fragment>
  );
};

export default Generate;
