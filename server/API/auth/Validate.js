import express from "express";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";

var app = express.Router();

function verifyJWT(req, res, next) {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.send({
          isLogged: false,
          message: "Failed to Authenticate",
        });
      }
      res.email = decoded.email;
      res.id = decoded.id;
      next();
    });
  } else {
    console.log("Incorrect Token");
    return res.send({
      isLogged: false,
      message: "Incorrect Token Provided",
    });
  }
}

app.get("/validate/:token", verifyJWT, (req, res) => {
  User.findOne({ _id: res.id }, (err, user) => {
    if (err) {
      console.log(err);
      return res.send({
        isLogged: false,
        message: "Failed to Authenticate",
      });
    }
    if (user) {
      return res.send({
        isLogged: true,
        message: "Logged In",
        email: res.email,
        user: user,
      });
    }
  });
});

export default app;
