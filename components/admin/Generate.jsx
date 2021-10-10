import React from "react";

//importinf sttylesheets
import homestyles from "../../styles/home.module.css";

const Generate = () => {
  return (
    <React.Fragment>
      <h2 className="text-2xl font-medium">Issue a new certificate</h2>
      <div className="grid grid-cols-2 gap-5">
        <div className="my-2 w-full">
          <p className="mb-2 ml-3">Name of the user</p>
          <input
            type="text"
            placeholder="Name"
            className={`w-full mx-auto h-12 p-5 border-2 ${homestyles.input}`}
          />
        </div>
        <div className="my-2 w-full">
          <p className="mb-2 ml-3">Registration Number</p>
          <input
            type="number"
            placeholder="Registration number of the user"
            className={`w-full mx-auto h-12 p-5 border-2 ${homestyles.input}`}
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
          />
        </div>
        <div className="my-2 w-full">
          <p className="mb-2 ml-3">Organization</p>
          <input
            type="text"
            placeholder="Name of issuing organization"
            className={`w-full mx-auto h-12 p-5 border-2 ${homestyles.input}`}
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
        ></textarea>
      </div>
      <button
        className={`${homestyles.button} mx-auto w-full border-2 bg-green-400 border-green-400 hover:text-black hover:bg-white text-white`}
      >
        Issue Certificate
      </button>
    </React.Fragment>
  );
};

export default Generate;
