import Card from "../../models/CMV_ID.js";
import User from "../../models/User.js";
import Generator from "pattern-string-generator";
import generatePDF from "./GenerateCard.js";
import { sendVoterID, sendApplication } from "../mail/Mail.js";
import { sendWhatsAppDoc, sendWhatsAppMsg } from "../sms/WhatsApp.js";
import sendSMS from "../sms/SMS.js";

function register(req, res) {
  const card = req.body;
  const newCard = new Card({
    name: card.name,
    email: card.email,
    fName: card.fName,
    phone: card.phone,
    gender: card.gender,
    address: card.address,
    dob: card.dob,
    photo: card.photo,
    application_no: "CMV" + Date.now("en-US", { timeZone: "Asia/Kolkata" }),
    timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    status: "Submitted",
    proof: card.proof,
    id_no: card.id_no,
    id_date: card.id_date,
    id_doc: card.id_doc,
  });
  newCard
    .save()
    .then((card) => {
      sendApplication(card);
      const msg = `\nGreetings from CMV!\n\n Your Application for new Voter ID has been submitted Successfully with Application No. ${card.application_no
        } at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })}\n\nYou will receive your Voter ID through mail once your application is approved. or You can track status by User Login.\n\nThank You\nTeam CastMyVote!`;
      sendSMS(`+91${card.phone}`, msg);
      User.findOne({ email: card.email }).then((user) => {
        if (user) {
          user.application_no = card.application_no;
          user.save();
        }
      });
      return res.send({
        application_no: card.application_no,
        message:
          "Your Application has been Submitted Successfully with Application No. " +
          card.application_no,
        status: 0,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        message: "Error in Submitting Form",
        status: 2,
      });
    });
}

function retrieveAllCards(req, res) {
  Card.find({ status: "Approved" })
    .then((cards) => {
      return res.send({
        cards: cards,
        status: 0,
      });
    })
    .catch((err) => {
      return res.send({
        message: "Error in Retrieving Cards",
        status: 2,
      });
    });
}

function retrieveAllApplications(req, res) {
  Card.find({ status: { $ne: "Approved" } })
    .then((cards) => {
      return res.send({
        cards: cards,
        status: 0,
      });
    })
    .catch((err) => {
      return res.send({
        message: "Error in Retrieving Cards",
        status: 2,
      });
    });
}

function retrieveOne(req, res) {
  Card.findOne({ id_no: req.params.id })
    .then((card) => {
      return res.send({
        card: card,
        status: 0,
      });
    })
    .catch((err) => {
      return res.send({
        message: "Error in Retrieving Card",
        status: 2,
      });
    });
}

function retrieveOneApplication(req, res) {
  Card.findOne({ application_no: req.params.id })
    .then((card) => {
      return res.send({
        application: card,
        status: 0,
      });
    })
    .catch((err) => {
      return res.send({
        message: "Error in Retrieving Application",
        status: 2,
      });
    });
}


function approve(req, res) {
  const id = req.body.id;
  console.log(req.body.id);
  const generator = new Generator();
  const pattern = "/CMV/CVCVCV//000";
  const cmv_id = generator.pattern(pattern);

  Card.findOne({ application_no: id })
    .then((card) => {
      card.status = "Approved";
      card.id_no = cmv_id;
      card.id_date = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      card.id_doc = "";
      card.save();

      User.findOne({ email: card.email }).then((user) => {
        if (user) {
          user.id_no = cmv_id;
          user.save();
        }
      });
      generatePDF(card);
      return res.send({
        message: "Card Approved Successfully",
        status: 0,
        data: card,
        id: cmv_id,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.send({
        message: "Error in Approving Card",
        error: err,
        status: 2,
      });
    });
}

export {
  register,
  retrieveAllCards,
  retrieveAllApplications,
  approve,
  retrieveOne,
  retrieveOneApplication,
};
