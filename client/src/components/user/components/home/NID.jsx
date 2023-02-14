import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NID(props) {

    const navigate = useNavigate();
    return (
        <div className="col-12">
            <div className="card" style={{ height: "400px" }}>
                <div className="card-body text-center py-5">
                    <i class="fa-sharp fa-solid fa-check-to-slot m-3" style={{ fontSize: "5rem" }}></i>
                    <h3 className="card-title mb-5">You are not allowed to take Part in Election</h3>
                    {!props.user.application_no && (
                        <>
                            <h5 className="card-title mb-2">You are not registered with us as a Voter</h5>
                            <button onClick={() => navigate("/registration")} type="button" class="btn btn-primary">Register for 1st Time Voter</button>
                        </>
                    )}
                    {props.user.application_no && (<>
                        <h5 className="card-title mb-2">You have a Pending Application with ID: {props.user.application_no}. <br />Once Verified You may allowed to take Part in Election</h5>
                    </>)}
                </div>
            </div>
        </div>
    )
}
