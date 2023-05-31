import Election from "../../models/Elections.js";
import sortJsonArray from "sort-json-array";
import Generator from "pattern-string-generator";
import jwt from "jsonwebtoken";

function createElection(req, res) {
  const body = req.body;
  const generator = new Generator();
  const pattern = "/CMVEL/CV//0000";
  const id = generator.pattern(pattern);
  body.election_id = id;
  body.status = "";
  const election = new Election(body);
  election
    .save()
    .then((election) => {
      console.log(election);
      const msg = `\nGreetings from CastMyVote\n\nYou are invited to take part in the ${election.name} [${election.code}].\nPlease vote before ${election.end_date}\nTo know more about ELection visit https://castmyvote.ml/election/${election.election_id} \n\nThank You\nTeam CastMyVote!`;
      sendSMS(`+919084950475`, msg);
      return res.send({
        election: election,
        message: "Election Created Successfully",
        status: 0,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        message: "Error in Creating Election",
        status: 2,
      });
    });
}

function retrieveAllElections(req, res) {
  Election.find()
    .then((elections) => {
      for (let i = 0; i < elections.length; i++) {
        const s = new Date(elections[i].s_date);
        const e = new Date(elections[i].e_date);
        // Get new date() in asia/kolkata
        const date = new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });
        const now = new Date(date);
        if (now >= s && now <= e) {
          elections[i].status = "Live";
        } else if (now < s) {
          elections[i].status = "Upcoming";
        } else if (now > e) {
          elections[i].status = "Completed";
        }
      }
      // console.log(elections);

      return res.send({
        elections: elections.reverse(),
        status: 0,
      });
    })
    .catch((err) => {
      return res.send({
        message: "Error in Retrieving Elections",
        status: 2,
      });
    });
}

function retrieveOneElection(req, res) {
  Election.findOne({ election_id: req.params.id })
    .then((election) => {
      const s = new Date(election.s_date);
      const e = new Date(election.e_date);
      const date = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
      const now = new Date(date);
      if (now >= s && now <= e) {
        election.status = "Live";
      } else if (now < s) {
        election.status = "Upcoming";
      } else if (now > e) {
        election.status = "Completed";
      }
      return res.send({
        election: election,
        status: 0,
      });
    })
    .catch((err) => {
      return res.send({
        message: "Error in Retrieving Election",
        status: 2,
      });
    });
}

function updateElection(req, res) {
  Election.findOneAndUpdate({ election_id: req.body.election_id }, req.body)
    .then((election) => {
      return res.send({
        election: election,
        message: "Election Updated Successfully",
        status: 0,
      });
    })
    .catch((err) => {
      return res.send({
        message: "Error in Updating Election",
        status: 2,
      });
    });
}

function deleteElection(req, res) {
  const id = req.params.id;
  Election.findOneAndDelete({ election_id: id })
    .then((election) => {
      return res.send({
        election: election,
        message: "Election Deleted Successfully",
        status: 0,
      });
    })
    .catch((err) => {
      return res.send({
        message: "Error in Deleting Election",
        status: 2,
      });
    });
}

function getResults(req, res) {
  const id = req.params.id;
  // Check for End Date
  Election.findOne({ election_id: id })
    .then((election) => {
      const e = new Date(election.e_date);
      const date = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      });
      const now = new Date(date);
      if (now < e) {
        return res.send({
          message: "Election Not Completed",
          status: 2,
        });
      } else {
        const candidates = election.candidates;
        const winner = sortJsonArray(candidates, "candidate_votes", "des");
        return res.send({
          winner: winner,
          election: election,
          status: "success",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        message: "Error in Retrieving Election",
        status: 2,
      });
    });
}

export {
  createElection,
  retrieveAllElections,
  retrieveOneElection,
  updateElection,
  deleteElection,
  getResults,
};
