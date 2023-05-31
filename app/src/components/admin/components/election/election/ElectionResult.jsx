import axios from 'axios';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ElectionResult() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [data, setData] = React.useState([]);
    const [winner, setWinner] = React.useState(null);

    React.useEffect(() => {
        axios.get(`/election/${id}/results`)
            .then(res => {
                setData(res.data.election)
                setWinner(res.data.winner)
            }).catch(err => console.log(err))
    }, [id])

    return (
        <>
            <h4 className="fw-bold py-3 mb-1">
                <span className="text-muted fw-light">Home / Election / {id}</span> / Result
                <button
                    onClick={() => navigate("/")}
                    type="button"
                    class="btn btn-primary btn-sm m-1"
                    style={{ float: "right" }}
                >
                    <i className="fa-solid fa-house"></i>
                </button>
                <button
                    onClick={() => navigate(`/elections/${id}`)}
                    type="button"
                    class="btn btn-primary btn-sm m-1"
                    style={{ float: "right" }}
                >
                    <i className="fa-solid fa-backward"></i>
                </button>
            </h4>
            <div className="row">
                <div className="col-md-6 col-12">
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
                        {winner && <> <span className="fw-semibold d-block mb-1 text-center text-bold">Winner</span>
                            <div className="winner-section p-1" >
                                <img
                                    src={winner[0].candidate_dp}
                                    alt="Candidate"
                                    className="d-block rounded"
                                    width={100}
                                    height={100}
                                />
                                <span className="text-center">
                                    <span>{winner[0].candidate_id}</span>
                                    <h5>
                                        {winner[0].candidate_name}
                                        <br />
                                        <small>({winner[0].candidate_party})</small><br />
                                        <small>Votes: {winner[0].candidate_votes}</small>
                                    </h5>
                                </span>
                                <img
                                    src={winner[0].candidate_logo}
                                    alt="Candidate"
                                    className="d-block rounded"
                                    width={100}
                                    height={100}
                                />
                            </div>
                        </>}
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="row justify-content-center" style={{ height: "390px", overflowY: "scroll", overflowX: "hidden" }}>
                        {winner && winner.map((winner, index) => {
                            return (
                                <div className="col-12 p-1" >
                                    <div className="card">
                                        <div className="winner-section" >
                                            <img
                                                src={winner.candidate_dp}
                                                alt="Candidate"
                                                className="d-block rounded"
                                                width={100}
                                                height={100}
                                            />
                                            <span className='text-center p-1'>
                                                <h1>{index + 1}</h1>
                                                <h5>
                                                    <small>{winner.candidate_id}</small><br />
                                                    {winner.candidate_name}
                                                    <br />
                                                    <small>({winner.candidate_party})</small><br />
                                                    <small>Total Votes: {winner.candidate_votes}</small>
                                                </h5></span>
                                            <img
                                                src={winner.candidate_logo}
                                                alt="Candidate"
                                                className="d-block rounded"
                                                width={100}
                                                height={100}
                                            />
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
