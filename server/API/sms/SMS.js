import twilio from "twilio";
import config from "../../config.js";

const client = twilio(
  config.TWILIO_ACCOUNT_SID,
  config.TWILIO_AUTH_TOKEN
);

function sendSMS(to, body) {
  // console.log("Sending SMS to " + to);
  const from = config.SMS_FROM;
  client.messages
    .create({ from, to, body })
    .then((message) => {
      console.log(
        `SMS message sent from ${from} to ${to}. Message SID: ${message.sid}`
      );
    })
    .catch((error) => {
      console.error(error);
    });
}

export default sendSMS;
