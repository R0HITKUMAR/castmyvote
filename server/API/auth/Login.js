import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendSMS from "../sms/SMS.js";

async function Login(req, res) {
  const userLoggingIn = req.body;
  let tokentime = "15m";

  await User.findOne({ email: userLoggingIn.email }).then((dbUser) => {
    if (!dbUser) {
      return res.send({
        message: "No Account Found with this Email",
        status: 1,
      });
    }
    bcrypt
      .compare(userLoggingIn.password, dbUser.password)
      .then((isCorrect) => {
        if (dbUser.role === "admin") {
          tokentime = "365d";
        }

        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            email: dbUser.email,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: tokentime },
            (err, token) => {
              if (err) return res.data({ message: err });
              const msg = `\nGreetings from CastMyVote\n\nLogin in attempted Successfully at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })}\n\nIf not kindly Reset your Password\nhttps://castmyvote.aboutrohit.in/reset.\n\nThank You\nTeam CastMyVote!`;
              sendSMS(`+91${dbUser.phone}`, msg);
              return res.send({
                message: "Logged In Successfully",
                status: 0,
                token: token,
                user: dbUser,
              });
            }
          );
        } else {
          return res.send({ message: "Incorrect Password", status: 2 });
        }
      });
  });
}

export { Login };
