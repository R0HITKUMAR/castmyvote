import Newsletter from "../../models/Newsletter.js";
import { sendSubscriptionMail } from "../mail/Mail.js";

async function addNewsletter(req, res) {
  const newsletter = new Newsletter(req.body);
  newsletter.timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  // Check if email already exists
  await Newsletter.findOne({ email: newsletter.email })
    .then((newsl) => {
      if (newsl) {
        return res.send({ message: "You are already Subscribed!" });
      } else {
  newsletter
    .save()
    .then(() => {
      sendSubscriptionMail(newsletter.email);
      res.send({ message: "Subscription Successfull" });
    })
    .catch((err) => res.send({ message: err }));
}
})
.catch((err) => console.log(err));
}

function retrieveNewsletters(req, res) {
  Newsletter.find({})
    .then((newsletters) => res.send(newsletters))
    .catch((err) => res.send({ message: err }));
}

function deleteNewsletter(req, res) {
  Newsletter.findByIdAndDelete(req.params.id)
    .then(() => res.send({ message: "Subscription Deleted" }))
    .catch((err) => res.send({ message: err }));
}

export { addNewsletter, retrieveNewsletters, deleteNewsletter };
