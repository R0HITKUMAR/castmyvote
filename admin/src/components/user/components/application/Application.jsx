import React from "react";
import axios from "../../../common/axios.js";
import img from "../../../../assets/img/icons/registered_voter.png";

export default function Application(props) {
  const [status, setStatus] = React.useState("");

  function getStatus() {
    axios
      .get(
        `/cmv/retrieveOneApplication/${props.user.application_no}`
      )
      .then((res) => {
        setStatus(res.data.application.status);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="col-12">
      <div className="card text-center"  style={{ height: "200px" }}>
        <div className="card-body">
          <div className="card-title d-flex align-items-start justify-content-center">
            <div className="avatar flex-shrink-0">
              <img src={img} alt="-" className="rounded" />
            </div>
          </div>
          <span className="fw-semibold d-block mb-1">Pending Application</span>
          <h3 className="card-title mb-2">{props.user.application_no}</h3>
          {status && (
            <h6 className="card-title mb-2">{`Current Status: ${status}`}</h6>
          )}
          <button type="button" class="btn btn-primary btn-sm" onClick={getStatus}>
            Track Status
          </button>
        </div>
      </div>
    </div>
  );
}
