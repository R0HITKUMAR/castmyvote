import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ConnectDB from "./database.js";
import Auth from "./routes/Auth.js";
import OTP from "./routes/OTP.js";
import Card from "./routes/Card.js";
import File from "./routes/FileUpload.js";
import Election from "./routes/Election.js";
import Vote from "./routes/Vote.js";
import Newsletter from "./routes/Newsletter.js";
import Query from "./routes/Query.js";
import config from "./config.js";
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const PORT = config.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(bodyParser.json(), urlencodedParser);
// Routes

app.use("/auth", Auth);
app.use("/otp", OTP);
app.use("/cmv", Card);
app.use("/file", File);
app.use("/election", Election);
app.use("/vote", Vote);
app.use("/newsletter", Newsletter);
app.use("/query", Query);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the Election Portal",
    live: true,
  });
});

app.listen(PORT, () => {
  ConnectDB()
    .then(() => console.log(`Server is Running  at Port ✌`))
    .catch(() =>
      console.log(
        "Error in Connecting to Database. Please Check your Database Configurations"
      )
    );
});
