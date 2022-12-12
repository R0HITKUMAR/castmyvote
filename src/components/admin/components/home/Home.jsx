import React from "react";
import Welcome from "./Welcome";
import PVoters from "../stats/PVoters";
import RVoters from "../stats/RVoters";
import Election from "../stats/Elections";
import ElectionShow from "../election/ElectionShow";

export default function Home({ count }) {
  return (
    <div className="row">
      <div className="col-lg-8 col-md-8 col-12">
        <Welcome />
        <br />
        <ElectionShow />
      </div>
      <div className="col-lg-4 col-md-4">
        <div className="row">
          <RVoters num={count.voters} />
          <PVoters num={count.applications} />
        </div>
        <div className="row">
          <Election num={count} />
        </div>
      </div>
    </div>
  );
}
