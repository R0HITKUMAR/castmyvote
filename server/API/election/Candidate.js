import Election from "../../models/Elections.js";
import { sendCandidateMail } from "../mail/Mail.js";
import Generator from "pattern-string-generator";

function addCandidate(req, res) {
  const body = req.body;
  // console.log(body);
  const eid = req.params.eid;
  const generator = new Generator();
  const pattern = "/CMVCD/CV//0000";
  const id = generator.pattern(pattern);
  Election.findOne({ election_id: eid })
    .then((election) => {
      if (election) {
        const candidates = election.candidates;
        const candidate = {
          candidate_id: id,
          candidate_name: body.candidate_name,
          candidate_dp: body.candidate_dp,
          candidate_logo: body.candidate_logo,
          candidate_party: body.candidate_party,
          candidate_phone: body.candidate_phone,
          candidate_email: body.candidate_email,
          candidate_address: body.candidate_address,
          candidate_votes: 0,
        };
        candidates.push(candidate);
        election.candidates = candidates;
        election
          .save()
          .then((election) => {
            sendCandidateMail(election, candidate);
            return res.send({
              election: election,
              id: id,
              message: "Candidate Added Successfully",
              status: 0,
            });
          })
          .catch((err) => {
            return res.send({
              message: "Error in Updating Election",
              status: 2,
            });
          });
      } else {
        return res.send({
          message: "Election Not Found",
          status: 1,
        });
      }
    })
    .catch((err) => {
      return res.send({
        message: "Error in Updating Election",
        status: 2,
      });
    });
}

function deleteCandidate(req, res) {
  const eid = req.params.eid;
  const cid = req.params.cid;
  Election.findOne({ election_id: eid })
    .then((election) => {
      if (election) {
        const candidates = election.candidates;
        const newCandidates = candidates.filter((candidate) => {
          return candidate.candidate_id !== cid;
        });
        election.candidates = newCandidates;
        election
          .save()
          .then((election) => {
            return res.send({
              message: "Candidate Deleted Successfully",
            });
          })
          .catch((err) => {
            return res.send({
              message: "Error in Deleting Candidate",
            });
          });
      } else {
        return res.send({
          message: "Election Not Found",
        });
      }
    })
    .catch((err) => {
      return res.send({
        message: "Error in Updating Election",
      });
    });
}

export { addCandidate, deleteCandidate };
