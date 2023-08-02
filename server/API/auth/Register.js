import express from "express";
var app = express.Router();
app.use(express.json());
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import { welcomeMail } from "../../API/mail/Mail.js";
import sendSMS from "../sms/SMS.js";

app.post("/register", async (req, res) => {
  const user = req.body;
  const takenEmail = await User.findOne({ email: user.email });
  const registeredOn = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  if (takenEmail) {
    return res.send({
      message: "User Exists Already! Please try with another Email Address",
      status: 1,
    });
  } else {
    user.password = await bcrypt.hash(user.password, 10);
    const dbUser = new User({
      name: user.name,
      phone: user.phone,
      email: user.email,
      password: user.password,
      registeredOn: registeredOn,
      role: "voter",
    });
    dbUser
      .save()
      .then((user) => {
        welcomeMail(user.name, user.email);
        const msg = `\nWelcome to CastMyVote\n\nYour account has been Created Successfully\n\nYou can now login into Voter Dashboard to access our services\nhttps://castmyvote.aboutrohit.in.\n\nThank You\nTeam CastMyVote!`;
        sendSMS(`+91${user.phone}`, msg);
        return res.send({
          message: "User Registered Successfully",
          status: 0,
        });
      })
      .catch((err) => {
        return res.send({
          message: "Error in Registering User",
          status: 2,
        });
      });
  }
});

export default app;
