import React from "react";
import { useNavigate } from "react-router-dom";

export default function Duplicate(props) {
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h2 className="mb-2 mx-2">Already Registered</h2>
      <p className="mb-4 mx-2">
        Hi {props.user.name}, you have already registered with us. You can
        download your ID card or track the status of your application.
        <br />
        {props.user.id_no && <>CMV ID No.: {props.user.id_no}</>}
        {props.user.application_no && (
          <>Application No.: {props.user.application_no}</>
        )}
      </p>
      <button onClick={() => navigate("/")} className="btn btn-primary">
        Back to home
      </button>
    </div>
  );
}
