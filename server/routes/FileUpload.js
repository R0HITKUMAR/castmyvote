import express from "express";
import fs from "fs";
import AWS from "aws-sdk";
import multer from "multer";
var cmv = express.Router();

const upload = multer();
cmv.post("/upload", upload.single("file"), function (req, res, next) {
  const file = req.file;
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

    // Upload file to S3
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    s3.upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: location + "/" + filename,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
      .on("httpUploadProgress", function (evt) {
        // console.log(parseInt((evt.loaded / evt.total) * 100));
      })
      .send(function (err, data) {
        if (err) {
          console.log(err);
        } else {
          res.send(data);
          console.log(data);
        }
      });
  }
});

export default cmv;
