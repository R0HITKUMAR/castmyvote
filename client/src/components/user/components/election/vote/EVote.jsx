import React from "react";
import axios from "../../../../common/axios.js";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function EVote(props) {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data, setData] = React.useState([]);
  const [card, setCard] = React.useState([])

  const [voteLedger, setVoteLedger] = React.useState({
    election_id: id,
    election_name: "",
    candidate_id: "",
    vote_time: "",
    voter_id: props.user.id_no,
  });

  React.useEffect(() => {
    axios
      .get(`/cmv/retrieveOne/${props.user.id_no}`)
      .then((res) => {
        setCard(res.data.card.elections);
      });
    axios
      .get(`/election/retrieveOne/${id}`)
      .then((res) => {
        setData(res.data.election);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleVote = () => {
    voteLedger.election_name = `${data.name} [${data.code}]`
    if (voteLedger.candidate_id === "") {
      alert("Please select a candidate");
    } else {
      axios
        .post(`/vote/castVote`, voteLedger)
        .then((res) => {
          if (res.data.type === "success") {
            Swal.fire({
              title: "Success!",
              text: res.data.message + " with ID: " + res.data.txn,
              icon: "success",
            })
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

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
      {/* Check for already Voted in Card Election Array using Find Method*/}
      {card.find((item) => item.id === id) ? (<>
        <div className="row">
          <div className="col-12  align-self-center " >
            <div className="card" style={{ height: "300px" }}>
              <div className="card-body text-center p-5">
                <i class="fa-sharp fa-solid fa-check-to-slot" style={{ fontSize: "5rem" }}></i>
                <h1 className="card-title mb-2">You have already voted in this election</h1>
                <h5 className="card-title mb-2">Thank you for your participation</h5>
                <button className="btn btn-primary my-3" onClick={() => navigate("/")}>Back to Home</button>
              </div>
            </div>
          </div>
        </div>
      </>) : (<>
        <div className="row">
          <div className="col-8">
            <div className="row justify-content-center">
              {data.candidates && data.candidates.map((item, index) => {
                return (
                  <div className="col-6 p-1" >
                    <div className="card" onClick={() => setVoteLedger({ ...voteLedger, candidate_id: item.candidate_id })} style={{ border: item.candidate_id === voteLedger.candidate_id ? "2px solid black" : "none", cursor: "pointer" }}>
                      <div className="row">
                        <div className="col-3">
                          <img
                            src={item.candidate_dp}
                            alt="Candidate"
                            className="d-block rounded"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="col-5 my-2 text-center pl-2">
                          <span>{item.candidate_id}</span>
                          <h5>
                            {item.candidate_name}
                            <br />
                            <small>({item.candidate_party})</small>
                          </h5>
                        </div><div className="col-3">
                          <img
                            src={item.candidate_logo}
                            alt="Candidate"
                            className="d-block rounded"
                            width={100}
                            height={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>)
              })}
            </div>
          </div>
          <div className="col-4">
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
              </div>
            </div>
            {voteLedger.candidate_id && <div className="text-center">
              <button type="button" onClick={handleVote} className="btn btn-primary btn-block text-center px-5 py-3">
                <i className="fa-solid fa-vote-yea"></i> Vote Now <br /> {voteLedger.candidate_id}
              </button>
            </div>}

          </div>

        </div></>)}
    </>
  );
}
