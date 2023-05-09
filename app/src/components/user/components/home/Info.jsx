import React from "react";

export default function Info(props) {
  return (
    <>
      <div className="col-12">
        <div className="card text-center" style={{ height: "200px" }}>
          <div className="card-body">
            <span className="fw-semibold d-block mb-1">Logged In As:</span>
            <h3 className="card-title mb-2">{props.user.name}</h3>
            <p>
              Email: {props.user.email}
              <br />
              Phone: {props.user.phone}
              <br />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
