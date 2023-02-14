import express from "express";
import User from "../models/User.js";
const app = express.Router();
import { registerOTP, loginOTP, resetOTP } from "../API/mail/Mail.js";
import sendSMS from "../API/sms/SMS.js";

app.post("/:reason", (req, res) => {
  const data = req.body;
  const OTP = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(OTP);

  if (req.params.reason === "NewUser") {
    registerOTP(data, OTP);
    const msg = `\n\nGreetings from CMV!\n\n Your OTP for registration is ${OTP}.\n\nThank You\nTeam CastMyVote!`;
    sendSMS(`+91${data.phone}`, msg);
  } else if (req.params.reason === "login") {
    loginOTP(data, OTP);
    User.findOne({ email: data.email }, (err, user) => {
      if (err) {
        console.log(err);
      } else if (user) {
        const msg = `\nGreetings from CMV!\n\n Your OTP for Login into your Account is ${OTP}.\n\nThank You\nTeam CastMyVote!`;
        sendSMS(`+91${user.phone}`, msg);
      }
    });
  } else if (req.params.reason === "reset") {
    resetOTP(data, OTP);
    User.findOne({ email: data.email }, (err, user) => {
      if (err) {
        console.log(err);
      } else if (user) {
        const msg = `\nGreetings from CMV!\n\n Your OTP to reset your Password is ${OTP}.\n\nThank You\nTeam CastMyVote!`;
        sendSMS(`+91${user.phone}`, msg);
      }
    });
  }

  return res.send(OTP);
});

export default app;
