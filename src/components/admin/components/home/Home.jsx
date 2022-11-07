import React from "react";
import Welcome from "./Welcome";
import PVoters from "../stats/PVoters";
import RVoters from "../stats/RVoters";

export default function Home() {
  return (
    <div className="row">
      <Welcome />
      <div className="col-lg-4 col-md-4 order-1">
        <div className="row">
          <RVoters />
          <PVoters />
        </div>
      </div>
    </div>
  );
}
