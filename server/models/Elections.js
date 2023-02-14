import mongoose from "mongoose";

const electionSchema = new mongoose.Schema(
  {
    election_id: { type: String },
    code: { type: String },
    name: { type: String },
    description: { type: String },
    start_date: { type: String },
    s_date: { type: String },
    end_date: { type: String },
    e_date: { type: String },
    status: { type: String },
    candidates: [
      {
        candidate_id: { type: String },
        candidate_name: { type: String },
        candidate_dp: { type: String },
        candidate_logo: { type: String },
        candidate_party: { type: String },
        candidate_phone: { type: String },
        candidate_email: { type: String },
        candidate_address: { type: String },
        candidate_votes: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Election = mongoose.model("Election", electionSchema);

export default Election;
