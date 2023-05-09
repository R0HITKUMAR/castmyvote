import React from "react";
import { useNavigate } from "react-router-dom";

export default function UpcomingElections({ elections }) {
  const navigate = useNavigate();
  const [futureElections, setFutureElections] = React.useState([]);
  React.useEffect(() => {
    //Filter the elections on basic of status
    const futureElections = elections.filter(
      (election) => election.status === "Upcoming"
    );
    setFutureElections(futureElections);
  }, [elections]);

  return (
    <div className="">
      <div className="list-group list-group-flush">
        {futureElections.map((election) => {
          return (
            <div className="list-group-item">
              <div className="row">
                <div
                  className="col-10"
                  onClick={() => navigate(`/election/${election.election_id}`)} style={{cursor: "pointer"}}
                >
                  <b>{election.election_id}</b> | {election.name} [
                  {election.code}]
                </div>
                <div className="col-2"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
