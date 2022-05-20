import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { emailActions, updateReadStatusToTrue } from "../../store/email";

const EmailDetail = () => {
  const dispatch = useDispatch();
  const { emailId } = useParams();
  const emails = useSelector((state) => state.email.email);
  const email = emails.filter((email) => {
    return email.emailId === emailId;
  });
  const updateEmail = {
      emailAddress:email[0].emailAddress,
      emailId:email[0].emailId,
      email:email[0].email,
      read:true,
  }
  dispatch(updateReadStatusToTrue(updateEmail));
  dispatch(emailActions.updateUnread())
  return (
    <div>
      <p>{email[0].emailAddress}</p>
      <p>{email[0].email}</p>
    </div>
  );
};

export default EmailDetail;
