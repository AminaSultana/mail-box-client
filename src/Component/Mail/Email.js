import React from "react";
import { useSelector } from "react-redux";
import EmailShow from "./EmailShow";

const Email = () => {
  const emails = useSelector((state) => state.email.email);
  console.log("Email", emails);
  const data = emails.map((email)=>{
    return (
      <EmailShow
      email={email.email}
      emailAddress={email.emailAddress}
      />
      )
  })

  return (
    <div>
      <ul>
        {data}
      </ul>
    </div>
  );
};

export default Email;
