import twilio from "twilio";
import config from "../../config.js";

const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

function sendWhatsAppMsg(msg) {
  client.messages
    .create({
      from: config.SMS_FROM,
      to: "whatsapp:+919084950475",
      body: msg,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => {
      console.log(err);
    });
}

function sendWhatsAppDoc(doc) {
  client.messages
    .create({
      from: config.SMS_FROM,
      to: "whatsapp:+919084950475",
      mediaUrl: [doc],
    })
    .then((message) => console.log(message.sid))
    .catch((err) => {
      console.log(err);
    });
}

export { sendWhatsAppMsg, sendWhatsAppDoc };
