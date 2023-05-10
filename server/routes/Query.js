import express from "express";
var app = express.Router();

import {
  addQuery,
  retrieveAllQuery,
  deleteQuery,
  updateQuery,
} from "../API/forms/Query.js";

// Query Functions
app.post("/add", addQuery);
app.get("/retrieveAll", retrieveAllQuery);
app.delete("/delete/:id", deleteQuery);
app.get("/update/:id/:Status", updateQuery);

export default app;
