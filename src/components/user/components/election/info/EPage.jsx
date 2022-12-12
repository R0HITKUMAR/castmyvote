import React from "react";
import axios from "axios";
import { useParams, useNavigate, Route, Routes } from "react-router-dom";
import CView from "./CView";
import NoRecord from "../../../../common/NoRecord";

export default function Election() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const [len, setLen] = React.useState(0);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`https://server.castmyvote.ml//election/retrieveOne/${id}`)
      .then((res) => {
        setData(res.data.election);
        const len = res.data.election.candidates.length;
        setLen(len);
      })
      .catch((err) => console.log(err));
  }, [id]);

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
      </h4>
      <div className="row" style={{ overflow: "hidden" }}>
        <div className="col-6">
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
            </div>
          </div>
        </div>
        <div className="col-6" style={{ height: "350px", overflow: "scroll" }}>
          <Routes>
            <Route
              path="/*"
              element={<>{len === 0 ? <NoRecord /> : <CView info={data} />}</>}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}
