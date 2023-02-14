import mongoose from "mongoose";

const cmv_idSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    fName: { type: String },
    gender: { type: String },
    phone: { type: String },
    address: { type: String },
    dob: { type: String },
    photo: { type: String },
    application_no: { type: String },
    timestamp: { type: String },
    status: { type: String },
    id_no: { type: String },
    id_date: { type: String },
    id_doc: { type: String },
    proof: { type: String },
    elections: [
      {
        id: { type: String },
        name: { type: String },
        timestamp: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cmv_idSchema);

export default Card;
