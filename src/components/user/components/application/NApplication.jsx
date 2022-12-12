import React from 'react';
import { useNavigate } from 'react-router-dom';
import img from "../../../../assets/img/icons/registered_voter.png"

export default function CMV() {
    const navigate = useNavigate();

    return (
        <div className="col-12">
            <div className="card text-center" style={{ height: "200px" }}>
                <div className="card-body">
                    <div className="card-title d-flex align-items-start justify-content-center">
                        <div className="avatar flex-shrink-0">
                            <img
                                src={img}
                                alt="-"
                                className="rounded"
                            />
                        </div>
                    </div>
                    <span className="fw-semibold d-block mb-1">
                        No Record Found
                    </span>
                    <h3 className="card-title mb-2">**************</h3>
                    <button onClick={() => navigate("/registration")} type="button" class="btn btn-primary">Register for 1st Time Voter</button>
                </div>
            </div>
        </div>
    )
}
