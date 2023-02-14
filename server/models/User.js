import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, },
    phone: { type: String, },
    email: { type: String},
    password: { type: String, },
    registeredOn: { type: String },
    role: { type: String },
    id_no: { type: String },
    application_no: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
