import Card from "../../models/CMV_ID.js";
import Election from "../../models/Elections.js";
import Vote from "../../models/Votes.js";

function castVote(req, res) {
  const { election_id, election_name, candidate_id, voter_id } = req.body;
  const timestamp = new Date().toLocaleString();
  const vote = new Vote({
    election_id,
    election_name,
    candidate_id,
    timestamp,
  });

  // Increase the candidate's vote count
  Election.findOne({ election_id: election_id }, (err, election) => {
    if (err) {
      console.log(err);
    } else {
      // Find the candidate
      const candidate = election.candidates.find(
        (candidate) => candidate.candidate_id === candidate_id
      );
      // Increase the candidate's vote count
      candidate.candidate_votes += 1;
      // Save the election
      election.save((err) => {
        if (err) {
          console.log(err);
        } else {
          // Save the vote
          vote
            .save()
            .then((data) => {
              console.log("Vote Saved with ID: " + data._id);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  });

  // Add Election Details to Card
  Card.findOne({ id_no: voter_id }, (err, card) => {
    if (err) {
      console.log(err);
    } else {
      // Add the election to the card
      const election = {
        id: election_id,
        name: election_name,
        timestamp: timestamp,
      };
      card.elections.push(election);
      // Save the card
      card.save((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Card Updated with ID: " + card._id);
        }
      });
    }
  });

  res.send({
    message:
      "Thanks for Partcipating in Election!. Results will available once ELection Ends.",
    type: "success",
  });
}

export default castVote;
