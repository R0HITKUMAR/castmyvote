import express from "express";
var app = express.Router();

import {
  addNewsletter,
  retrieveNewsletters,
  deleteNewsletter,
} from "../API/forms/Newsletter.js";

// Query Functions
app.post("/add", addNewsletter);
app.get("/retrieveAll", retrieveNewsletters);
app.delete("/delete/:id", deleteNewsletter);

export default app;
