import express from "express";
import {
  createElection,
  retrieveAllElections,
  retrieveOneElection,
  updateElection,
  deleteElection,
  getResults,
} from "../API/election/Election.js";

import { addCandidate, deleteCandidate } from "../API/election/Candidate.js";

const app = express.Router();

// Election Routes
app.post("/add", createElection);
app.get("/retrieveAll", retrieveAllElections);
app.get("/retrieveOne/:id", retrieveOneElection);
app.post("/updateOne/:id", updateElection);
app.get("/deleteOne/:id", deleteElection);
app.get("/:id/results", getResults);

// Election Candidate Routes
app.post("/:eid/addCandidate", addCandidate);
app.get("/:eid/deleteOneCandidate/:cid", deleteCandidate);

export default app;
