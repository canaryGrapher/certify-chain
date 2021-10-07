import React from "react";

const User = (props) => {
  return (
    <React.Fragment>
      <p>Fuck you user</p>
      <p>{props.address}</p>
    </React.Fragment>
  );
};

export default User;
