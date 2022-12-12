import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EResult() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = React.useState([]);
  const [winner, setWinner] = React.useState(null);

  React.useEffect(() => {
    axios.get(`https://server.castmyvote.ml//election/${id}/results`)
      .then(res => {
        setData(res.data.election)
        setWinner(res.data.winner)
      }).catch(err => console.log(err))
  }, [id]);

  return (
    <>
      <h4 className="fw-bold py-3 mb-1">
        <span className="text-muted fw-light">Home / Election / {id}</span> / Results
        <button
          onClick={() => navigate("/")}
          type="button"
          class="btn btn-primary btn-sm m-1"
          style={{ float: "right" }}
        >
          <i className="fa-solid fa-house"></i>
        </button>
      </h4>
      <div className="row">
        <div className="col-5">
          <div className="card mb-3">
            <div className="card-body">
              <span className="fw-semibold d-block mb-1 text-center">Election Details</span>
              <dl className="row mt-2">
                <dt className="col-sm-3">Election ID</dt>
                <dd className="col-sm-9">{data.election_id}</dd>
                <dt className="col-sm-3">Election Details</dt>
                <dd className="col-sm-9">{data.name} [{data.code}]</dd>
                <dt className="col-sm-3">Description</dt>
                <dd className="col-sm-9">{data.description}</dd>
                <dt className="col-sm-3 text-truncate">Ends</dt>
                <dd className="col-sm-9">{data.end_date}</dd>
              </dl>
              {winner && <> <span className="fw-semibold d-block mb-1 text-center text-bold">Winner</span>
                <div className="row">
                  <div className="col-3">
                    <img
                      src={winner[0].candidate_dp}
                      alt="Candidate"
                      className="d-block rounded"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="col-5 my-2 text-center pl-2">
                    <span>{winner[0].candidate_id}</span>
                    <h5>
                      {winner[0].candidate_name}
                      <br />
                      <small>({winner[0].candidate_party})</small><br />
                      <small>Votes: {winner[0].candidate_votes}</small>
                    </h5>
                  </div><div className="col-3">
                    <img
                      src={winner[0].candidate_logo}
                      alt="Candidate"
                      className="d-block rounded"
                      width={100}
                      height={100}
                    />
                  </div>
                </div></>}
            </div>

          </div>
        </div>
        <div className="col-7">
          <div className="row justify-content-center">
            {winner && winner.map((winner, index) => {
              return (
                <div className="col-6 p-1" >
                  <div className="card">
                    <div className="row">
                      <div className="col-4">
                        <img
                          src={winner.candidate_dp}
                          alt="Candidate"
                          className="d-block rounded"
                          width={100}
                          height={100}
                        />
                        <img
                          src={winner.candidate_logo}
                          alt="Candidate"
                          className="d-block rounded"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="col-1 align-self-center">
                        <h1>{index + 1}</h1>
                      </div>
                      <div className="col-6 align-self-center">
                        <span>{winner.candidate_id}</span>
                        <h5>
                          {winner.candidate_name}
                          <br />
                          <small>({winner.candidate_party})</small><br />
                          <small>Total Votes: {winner.candidate_votes}</small>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>)
            })}
          </div>
        </div>
      </div>
    </>
  )
}
