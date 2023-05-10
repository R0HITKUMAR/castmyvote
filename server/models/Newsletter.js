import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: String,
    timestamp: String,
    
  },
  {
    timestamps: true,
  }
);

const Newsletter = new mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;
