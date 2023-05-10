import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    timestamp: String,
    phone: String,
    email: String,
    message: String,
    status: { type: String, default: "Submitted" },
  },
  {
    timestamps: true,
  }
);

const Query = new mongoose.model("Query", querySchema);

export default Query;
