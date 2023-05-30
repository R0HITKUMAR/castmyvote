import Card from "../../models/CMV_ID.js";
import Election from "../../models/Elections.js";
import Vote from "../../models/Votes.js";
import { contractABI, contractAddress } from "./Contract.js";
import Web3 from "web3";
import sendSMS from "../sms/SMS.js";
import { thanksmail } from "../mail/Mail.js";

async function castVote(req, res) {
  console.log(req.body);
  const { election_id, election_name, candidate_id, voter_id } = req.body;
  const timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
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

      // Add data to card.elctions
      card.elections.push(election);

      // Save the card
      card.save((err) => {
        if (err) {
          console.log(err);
        } else {
          // Send SMS
          const msg = `\nGreetings from CastMyVote\n\nYou have Successfully Voted in ${election_name} Election at ${timestamp}\n\nThank You\nTeam CastMyVote!`;
          sendSMS(`+91${card.phone}`, msg);
          const user = {
            name: card.name,
            email: card.email,
            election: `${election_name} [${election_id}]`,
          };
          thanksmail(user);
          console.log("Card Updated with ID: " + card._id);
        }
      });
    }
  });

  try {
    let web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    );

    // Get the contract instance
    let contract = new web3.eth.Contract(contractABI, contractAddress);

    // Get the accounts
    let accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    const receipt = await contract.methods
      .addVote(election_id, election_name, candidate_id, timestamp)
      .send({ from: web3.eth.defaultAccount, gas: 3000000 });
    res.send({
      message:
        "Thanks for Partcipating in Election!. Results will available once Election Ends",
      type: "success",
      txn: receipt.transactionHash,
    });
  } catch (err) {
    res.send({
      message:
        "Thanks for Partcipating in Election!. Results will available once Election Ends",
      type: "success",
      txn: "0x0000000",
    });
  }
}

export default castVote;
