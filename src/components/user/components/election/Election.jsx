import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LiveElections from "./LiveElections";
import UpcomingElections from "./UpcomingElections";
import PastElections from "./CompletedElection";

export default function Election() {
  const navigate = useNavigate();
  const [elections, setElections] = React.useState([]);
  const [stats, setStats] = React.useState({
    live: 0,
    upcoming: 0,
    past: 0,
  });

  React.useEffect(() => {
    axios.get("https://server.castmyvote.ml//election/retrieveAll").then((res) => {
      setElections(res.data.elections);
      const live = res.data.elections.filter(
        (election) => election.status === "Live"
      );
      const upcoming = res.data.elections.filter(
        (election) => election.status === "Upcoming"
      );

      const past = res.data.elections.filter(
        (election) => election.status === "Completed"
      );

      setStats({
        live: live.length,
        upcoming: upcoming.length,
        past: past.length,
      });
    });
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="nav-align-top">
          <ul className="nav nav-tabs nav-fill" role="tablist">
            <li className="nav-item">
              <button
                type="button"
                className="nav-link active"
                role="tab"
                data-bs-toggle="tab"
                data-bs-target="#navs-justified-home"
                aria-controls="navs-justified-home"
                aria-selected="true"
              >
                Live Elections
                <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-danger m-1">
                  {stats.live}
                </span>
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-link"
                role="tab"
                data-bs-toggle="tab"
                data-bs-target="#navs-justified-profile"
                aria-controls="navs-justified-profile"
                aria-selected="false"
              >
                Upcoming Elections
                <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-warning m-1">
                  {stats.upcoming}
                </span>
              </button>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-link"
                role="tab"
                data-bs-toggle="tab"
                data-bs-target="#navs-justified-messages"
                aria-controls="navs-justified-messages"
                aria-selected="false"
              >
                Completed Elections
                <span className="badge rounded-pill badge-center h-px-20 w-px-20 bg-label-dark m-1">
                  {stats.past}
                </span>
              </button>
            </li>
          </ul>
          <div
            className="tab-content"
            style={{ height: "315px", overflow: "scroll" }}
          >
            <div
              className="tab-pane fade show active"
              id="navs-justified-home"
              role="tabpanel"
            >
              <LiveElections elections={elections} />
            </div>
            <div
              className="tab-pane fade"
              id="navs-justified-profile"
              role="tabpanel"
            >
              <UpcomingElections elections={elections} />
            </div>
            <div
              className="tab-pane fade"
              id="navs-justified-messages"
              role="tabpanel"
            >
              <PastElections elections={elections} />
              <span style={{ float: "right" }}>
                <button

                  type="button"
                  className="btn btn-primary btn-sm my-5"
                  onClick={() => navigate('/history')}
                >
                  My History
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
