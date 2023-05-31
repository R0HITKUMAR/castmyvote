import React from "react";
import axios from "../../../../common/axios.js";
import { useParams, useNavigate, Route, Routes } from "react-router-dom";
import Swal from "sweetalert2";
import CView from "../candidate/CView";
import CForm from "../candidate/CForm";
import NoRecord from "../../../../common/NoRecord";

export default function Election() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [len, setLen] = React.useState(0);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/election/retrieveOne/${id}`)
      .then((res) => {
        setData(res.data.election);
        const len = res.data.election.candidates.length;
        setLen(len);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const deleteElection = (id) => {
    if (data.status === "Upcoming") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .get(`/election/deleteOne/${id}`)
            .then((res) => {
              Swal.fire("Deleted!", res.data.message, "success");
              navigate("/elections");
            });
        }
      });
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-1">
        <span className="text-muted fw-light">Home / Election </span> / {id}
        <button
          onClick={() => navigate("/")}
          type="button"
          class="btn btn-primary btn-sm m-1"
          style={{ float: "right" }}
        >
          <i className="fa-solid fa-house"></i>
        </button>
        <button
          onClick={() => navigate("/elections")}
          type="button"
          class="btn btn-primary btn-sm m-1"
          style={{ float: "right" }}
        >
          <i className="fa-solid fa-backward"></i>
        </button>
      </h4><br />
      <div className="row" style={{ overflow: "hidden" }}>
        <div className="col-md-6 col-12">
          <div
            className="card mb-4"
            style={{
              height: "350px",
            }}
          >
            <div className="card-body">
              <h6 className="card-subtitle mb-1">
                Election ID: <b>{data.election_id}</b>
                <span
                  className="badge bg-label-primary me-1"
                  style={{ float: "right" }}
                >
                  {data.status}
                </span>
                <br />
              </h6>
              <h5 className="card-title">
                {data.name} [{data.code}]
              </h5>
              <p className="card-text">{data.description}</p>
              <p className="card-text">
                Starts : <b>{data.start_date}</b>
                <br />
                Ends : <b>{data.end_date}</b>
              </p>
              Total Candidates : <b>{len}</b>
              <br />
              Status : <b>{data.status}</b>
              <br />
              {data.status === "Completed" && (
                <div style={{ marginTop: "1rem", float: "right" }}>
                  <button
                    className="btn btn-primary btn-sm m-1"
                    onClick={() =>
                      navigate(`/elections/${data.election_id}/result`)
                    }
                  >
                    <i className="fa-solid  fa-square-poll-vertical m-1" /> Results
                  </button>
                  <button
                    className="btn btn-primary btn-sm m-1"
                    onClick={() =>
                      navigate(`/elections/${data.election_id}/report`)
                    }
                  >
                    <i className="fa-solid  fa-square-poll-vertical m-1" /> Report
                  </button>
                </div>
              )}
              {data.status === "Upcoming" && (
                <div style={{ marginTop: "1rem", float: "right" }}>
                  <button
                    className="btn btn-primary btn-sm m-1"
                    onClick={() =>
                      navigate(`/elections/updateElection/${data.election_id}`)
                    }
                  >
                    <i className="fa-solid fa-edit m-1" /> Update
                  </button>
                  <button
                    className="btn btn-primary btn-sm m-1"
                    onClick={() => deleteElection(data.election_id)}
                  >
                    <i className="fa-solid fa-trash m-1" /> Delete
                  </button>

                  <button
                    className="btn btn-primary btn-sm m-1"
                    onClick={() =>
                      navigate(`/elections/${data.election_id}/addCandidate`)
                    }
                  >
                    <i className="fa-solid fa-plus m-1" /> Add Candidate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12" id="candidates" style={{ height: "350px", overflowY: "scroll", overflowX: "hidden" }}>
          <Routes>
            <Route
              path="/*"
              element={<>{len === 0 ? <NoRecord /> : <CView info={data} />}</>}
            />
            <Route path="/addCandidate" element={<CForm />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
