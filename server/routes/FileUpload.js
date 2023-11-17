import express from "express";
import multer from "multer";
import { storage } from "../firebase.js";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
var server = express.Router();

const upload = multer();
server.post("/upload", upload.single("file"), function (req, res, next) {
  const file = req.file;
  console.log("File Upload Started");
  const location = req.body.location;
  if (file) {
    var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    const filename =
      timestamp +
      "xxxxxxxxxxxxxxxx"
        .replace(/[x]/g, function () {
          return ((Math.random() * 16) | 0).toString(16);
        })
        .toLowerCase() +
      "." +
      file.originalname.split(".")[1];

    const storageRef = ref(storage, `${location}/${filename}`);
    // Set the upload type.
    const metadata = {
      contentType: file.mimetype,
      cacheControl: "public",
    };
    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(storageRef, file.buffer, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          res.send({ Location: downloadURL });
        });
      }
    );
  }
});

export default server;
