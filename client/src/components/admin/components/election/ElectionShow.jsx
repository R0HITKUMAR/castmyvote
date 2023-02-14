import React from "react";
import axios from "../../../common/axios.js";
import { useNavigate } from "react-router-dom";

export default function ElectionShow() {
  const navigate = useNavigate();
  const [elections, setElections] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [i, setI] = React.useState(0);
  const [len, setLen] = React.useState(0);

  React.useEffect(() => {
    axios
      .get("/election/retrieveAll")
      .then((res) => {
        setElections(res.data.elections);
        setLen(res.data.elections.length);
        setData(elections[i]);
      })
      .catch((err) => console.log(err));
  }, [elections]);

  function increment() {
    if (i < len - 1) {
      setI(i + 1);
    } else {
      setI(0);
    }
  }

  function decrement() {
    if (i > 0) {
      setI(i - 1);
    } else {
      setI(len - 1);
    }
  }
  return (
    <div className="col-12 mb-3">
      <div className="card">
        <h5 className="card-header pb-1">
          Elections Show
          <div style={{ float: "right" }}>
            <button onClick={() => navigate("/elections/addElection")} className="btn btn-primary btn-sm m-1">
              <i className="fa-solid fa-plus" /> Add Election
            </button>
          </div>
        </h5>
        {data && (
          <div className="row row-bordered g-0">
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
            </div>
            <div className="card-footer">
              <center>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ float: "left" }}
                  onClick={decrement}
                >
                  <i className="fa-solid fa-backward" /> Previous
                </button>

                <button
                  onClick={() => navigate(`/elections/${data.election_id}`)}
                  className="btn btn-primary btn-sm"
                >
                  More Details
                </button>

                <button
                  style={{ float: "right" }}
                  onClick={increment}
                  className="btn btn-primary btn-sm"
                >
                  Next <i className="fa-solid fa-forward" />
                </button>
              </center>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
