import React from "react";
import axios from "axios";
import MyVoterCard from "./MyVoterCard";
import Card from "./Card";

export default function ApproveVoters(props) {
  const [applications, setApplications] = React.useState();
  const [offcanvas, setOffcanvas] = React.useState();
  const [CMVData, setCMVData] = React.useState();

  React.useEffect(() => {
    axios.get("http://localhost:5000/cmv/retrieveAll").then((res) => {
      setApplications(res.data.cards);
    });
  }, [applications]);

  return (
    <>
    <Card data={CMVData} />
      <h4 className="fw-bold py-3 mb-1">
        <span className="text-muted fw-light">Home /</span> Voter
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
                <th>Details</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {applications &&
                applications.map(
                  (application, index) =>
                    application.status === "Approved" && (
                      <>
                        <MyVoterCard
                          key={application._id}
                          doc={props.doc}
                          setCMVData={setCMVData}
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
                Voter - {offcanvas.id_no}
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
                        CMV_ID: {offcanvas.id_no}
                        <br />
                        {offcanvas.id_date}
                        <br />
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
                    <dt className="col-sm-5">Application No.</dt>
                    <dd className="col-sm-7">
                      <p>{offcanvas.application_no}</p>
                    </dd>
                    <dt className="col-sm-5">Application Date</dt>
                    <dd className="col-sm-7">
                      <p>{offcanvas.timestamp}</p>
                    </dd>
                  </dl>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
