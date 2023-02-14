import express from "express";
const app = express.Router();

import {
  register,
  retrieveAllCards,
  retrieveAllApplications,
  retrieveOne,
  retrieveOneApplication,
  approve,
} from "../API/card/CMV.js";

app.post("/new", register);
app.post("/approve", approve);
app.get("/retrieveAllCards", retrieveAllCards);
app.get("/retrieveAllApplications", retrieveAllApplications);
app.get("/retrieveOne/:id", retrieveOne);
app.get("/retrieveOneApplication/:id", retrieveOneApplication);

export default app;
