import Query from "../../models/Query.js";
import { sendQueryMail } from "../mail/Mail.js";

function addQuery(req, res) {
  const id = "CMV" + Date.now();
  req.body.id = id;
  req.body.timestamp = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const query = new Query(req.body);
  // Generate ID
  sendQueryMail(query);

  query
    .save()
    .then(() => {
      res.send({ message: "Thanks for Contacting Us", id: id });
    })
    .catch((err) => res.send({ message: err }));
}

function retrieveAllQuery(req, res) {
  Query.find({})
    .then((queries) => res.send(queries))
    .catch((err) => res.send({ message: err }));
}

function deleteQuery(req, res) {
  Query.findByIdAndDelete(req.params.id)
    .then(() => res.send({ message: "Query deleted successfully" }))
    .catch((err) => res.send({ message: err }));
}

// Update Status of Query
function updateQuery(req, res) {
  console.log(req.params);
  Query.findByIdAndUpdate(req.params.id, {
    $set: {
      status: req.params.Status,
    },
  })
    .then(() => res.send({ message: "Query status updated successfully" }))
    .catch((err) => {
      console.log(err);
      res.send({ message: err });
    });
}

export { addQuery, retrieveAllQuery, deleteQuery, updateQuery };
