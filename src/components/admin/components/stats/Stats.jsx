import React from "react";
import axios from "axios";

export default function Stats({ count, setCount }) {
  React.useEffect(() => {
    let past = 0;
    let upcoming = 0;
    let live = 0;
    let applications = 0;
    let voters = 0;
    let elections = 0;
    axios
      .get("https://server.castmyvote.ml//cmv/retrieveAllApplications")
      .then((res) => {
        applications = res.data.cards.length;
      });
    axios.get("https://server.castmyvote.ml//cmv/retrieveAllCards").then((res) => {
      voters = res.data.cards.length;
    });
    axios.get("https://server.castmyvote.ml//election/retrieveAll").then((res) => {
      elections = res.data.elections.length;
      const live = res.data.elections.filter(
        (election) => election.status === "Live"
      );
      const upcoming = res.data.elections.filter(
        (election) => election.status === "Upcoming"
      );

      const past = res.data.elections.filter(
        (election) => election.status === "Completed"
      );
      setCount({
        ...count,
        applications: applications,
        voters: voters,
        elections: elections,
        upcoming_elections: upcoming.length,
        ongoing_elections: live.length,
        completed_elections: past.length,
        now: new Date().toLocaleString(),
      });
    });
  }, []);

  return null;
}
