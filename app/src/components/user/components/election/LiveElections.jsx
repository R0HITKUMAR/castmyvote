import React from "react";
import { useNavigate } from "react-router-dom";

export default function LiveElections({ elections }) {
  const navigate = useNavigate();
  const [liveElections, setLiveElections] = React.useState([]);
  React.useEffect(() => {
    //Filter the elections on basic of status
    const liveElections = elections.filter(
      (election) => election.status === "Live"
    );
    setLiveElections(liveElections);
  }, [elections]);

  return (
    <div className="">
      <div className="list-group list-group-flush">
        {liveElections.map((election) => {
          return (
            <div className="list-group-item">
              <div className="row">
              <div
                  className="col-10"
                  onClick={() => navigate(`/election/${election.election_id}`)} style={{cursor: "pointer"}}
                >
                  <b>{election.election_id} </b>| {election.name} [
                  {election.code}]
                </div>
                <div className="col-2">
                  <span className="float-end">
                    <button
                      onClick={() =>
                        navigate(`/election/${election.election_id}/vote`)
                      }
                      className="btn btn-primary btn-sm"
                    >
                      Vote
                    </button>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
