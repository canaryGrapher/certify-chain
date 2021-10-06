import React from "react";

const Admin = (props) => {
  return (
    <React.Fragment>
      <p>Fuck you admin from {props.name}</p>
      <p>{props.address}</p>
    </React.Fragment>
  );
};

export default Admin;
