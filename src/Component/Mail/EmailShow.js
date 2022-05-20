import React from "react";
import { Link } from "react-router-dom";

const EmailShow = (props) => {
 
  return (
    <li>
      <Link to={`/email/${props.emailId}`}>
          {!props.read && (
            <img src="icons8-blue-circle-48.png" width="15px" height="15px" />
          )}
          {props.email}       
      </Link>
    </li>
  );
};

export default EmailShow;
