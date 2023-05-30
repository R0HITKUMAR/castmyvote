import mongoose from "mongoose";
import User from "../../models/User.js";
import bcrypt from "bcrypt";

function changepassword(req, res) {
  const user = req.body;
  // Update Password
  const dbUser = User.findOne({ email: user.email });
  user.password = bcrypt.hash(user.password, 10).then((hash) => {
    dbUser
      .updateOne({ password: hash })
      .then((user) => {
        const msg = `\nGreetings from CastMyVote\n\nPassword Reset Successfully at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })}\n\nIf not kindly Reset your Password\nhttps://castmyvote.ml/reset.\n\nThank You\nTeam CastMyVote!`;
        sendSMS(`+91${dbUser.phone}`, msg);
        return res.send({
          success: true,
          message: "Password Changed Successfully",
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: "Password Change Failed",
        });
      });
  });
}

export default changepassword;
