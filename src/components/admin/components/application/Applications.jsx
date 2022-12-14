import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../common/axios.js";
import NoRecord from "../../../common/NoRecord";
import ApproveVoterCard from "./Application";

export default function Applications(props) {
  const navigate = useNavigate();
  const [applications, setApplications] = React.useState();
  const [offcanvas, setOffcanvas] = React.useState();

  React.useEffect(() => {
    axios
      .get("/cmv/retrieveAllApplications")
      .then((res) => {
        setApplications(res.data.cards);
      });
  }, [applications]);

  const approve = (id) => {
    axios
      .post("/cmv/approve", {
        id: id,
      })
      .then((res) => {
        if (res.data.status === 0) {
          Swal.fire({
            icon: "success",
            title: "Approved",
            text:
              "Voter has been approved with Voter ID: " + res.data.data.id_no,
          });
          navigate("/voters");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong",
          });
        }
        console.log(res);
      });
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-1">
        <span className="text-muted fw-light">Home /</span> Applications
        <button
          onClick={() => navigate("/")}
          type="button"
          class="btn btn-primary btn-sm m-1"
          style={{ float: "right" }}
        >
          <i className="fa-solid fa-house"></i>
        </button>
        <button
          onClick={() => navigate("/voters/newVoter")}
          type="button"
          class="btn btn-primary btn-sm m-1"
          style={{ float: "right" }}
        >
          <i className="fa-solid fa-plus m-1"></i> New Voter
        </button>
      </h4>
      <div className="card col-12">
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Application No.</th>
                <th>Timestamp</th>
                <th>Name</th>
                <th>Status</th>
                <th>Proof</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {applications && applications.length > 0 ? (
                applications.map((application, index) => (
                  <ApproveVoterCard
                    key={application._id}
                    setGlobal={props.setGlobal}
                    index={index + 1}
                    data={application}
                    setOffcanvas={setOffcanvas}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6">
                    <NoRecord />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {offcanvas ? (
        <div className="col-lg-3 col-md-6">
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasEnd"
            aria-labelledby="offcanvasEndLabel"
          >
            <div className="offcanvas-header">
              <h5 id="offcanvasEndLabel" className="offcanvas-title">
                Approve Voter
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              />
            </div>
            <div className="offcanvas-body mx-0 flex-grow-0">
              <div>
                <p className="card-text">
                  <dl className="row mt-2">
                    <div className="col-9 row">
                      <dt className="col-sm-12">
                        ID: {offcanvas.application_no}
                      </dt>
                      <dd className="col-sm-0"></dd>
                      <dt className="col-sm-3">Name</dt>
                      <dd className="col-sm-9">
                        {offcanvas.name} ({offcanvas.gender[0]})
                      </dd>
                      <dt className="col-sm-3">DOB</dt>
                      <dd className="col-sm-9">{offcanvas.dob}</dd>
                    </div>
                    <div className="col-3">
                      <img
                        src={offcanvas.photo}
                        className="card-img-top"
                        style={{ width: "70px" }}
                      />
                    </div>
                    <dt className="col-sm-3">F Name</dt>
                    <dd className="col-sm-9">{offcanvas.fName}</dd>
                    <dt className="col-sm-3">Email</dt>
                    <dd className="col-sm-9">{offcanvas.email}</dd>
                    <dt className="col-sm-3">Phone No.</dt>
                    <dd className="col-sm-9">{offcanvas.phone}</dd>
                    <dt className="col-sm-3">Address</dt>
                    <dd className="col-sm-9">
                      <p>{offcanvas.address}</p>
                    </dd>
                    <dt className="col-sm-3">Timestamp</dt>
                    <dd className="col-sm-9">
                      <p>{offcanvas.timestamp}</p>
                    </dd>
                  </dl>
                </p>
              </div>

              <button
                type="button"
                onClick={() => approve(offcanvas.application_no)}
                className="btn btn-primary mb-2 d-grid w-100"
              >
                Approve
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary d-grid w-100"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
