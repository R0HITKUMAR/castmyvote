import express from "express";
const app = express.Router();

import castVote from "../API/vote/Vote.js";

app.post("/castVote", castVote);

export default app;
