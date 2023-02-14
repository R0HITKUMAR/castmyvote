import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    election_id: { type: String },
    candidate_id: { type: String },
    timestamp: { type: String },
    snapshot: { type: String },
  },
  {
    timestamps: true,
  }
);

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
