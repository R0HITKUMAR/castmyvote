import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NoRecord from "../../../common/NoRecord";
import MyVoterCard from "./Voter";

export default function Voters(props) {
  const navigate = useNavigate();
  const [cards, setCards] = React.useState();
  const [offcanvas, setOffcanvas] = React.useState();

  React.useEffect(() => {
    axios.get("https://server.castmyvote.ml//cmv/retrieveAllCards").then((res) => {
      setCards(res.data.cards);
    });
  }, [cards]);

  return (
    <>
      <h4 className="fw-bold py-3 mb-1">
        <span className="text-muted fw-light">Home /</span> Voter
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
      <div className="card">
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Voter ID</th>
                <th>Timestamp</th>
                <th>Name</th>
                <th>Details</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {cards && cards.length > 0 ? (
                cards.map((application, index) => (
                  <MyVoterCard
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
                  <button
                    className="btn btn-sm btn-primary"
                    type="button"
                    data-bs-dismiss="offcanvas"
                    data-bs-toggle="modal"
                    data-bs-target="#attachmentModal"
                    
                    onClick={() => props.setGlobal({ doc: offcanvas.proof })}
                  >
                    <i className="fa-solid fa-eye" /> View Attachment
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
