import React from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ApproveVoterCard from "./ApproveVoterCard";

export default function ApproveVoters() {
  const [applications, setApplications] = React.useState();
  const [offcanvas, setOffcanvas] = React.useState();

  React.useEffect(() => {
    axios.get("http://localhost:5000/cmv/retrieveAll").then((res) => {
      setApplications(res.data.cards);
    });
  }, [applications]);

  const approve = (id) => {
    axios
      .post("http://localhost:5000/cmv/approve", {
        id: id,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Approved",
          text: "Voter has been approved",
        });
        console.log(res);
      });
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-1">
        <span className="text-muted fw-light">Home /</span> Approve Voters
      </h4>
      <div className="card">
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Application No.</th>
                <th>Timestamp</th>
                <th>Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {applications &&
                applications.map(
                  (application, index) =>
                    application.status !== "Approved" && (
                      <>
                        <ApproveVoterCard
                          key={application._id}
                          index={index + 1}
                          data={application}
                          setOffcanvas={setOffcanvas}
                        />
                      </>
                    )
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
                onClick={() => approve(offcanvas._id)}
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
