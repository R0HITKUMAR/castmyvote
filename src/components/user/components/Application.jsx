import React from "react";
import img from "../../../assets/img/icons/registered_voter.png";

export default function Application(props) {
  return (
    <div className="col-lg-4 mb-4 order-1">
      <div className="card text-center">
        <div className="card-body">
          <div className="card-title d-flex align-items-start justify-content-center">
            <div className="avatar flex-shrink-0">
              <img src={img} alt="-" className="rounded" />
            </div>
          </div>
          <span className="fw-semibold d-block mb-1">Pending Application</span>
          <h3 className="card-title mb-2">{props.user.application_no}</h3>
          <button type="button" class="btn btn-primary">
            Track Status
          </button>
        </div>
      </div>
    </div>
  );
}
