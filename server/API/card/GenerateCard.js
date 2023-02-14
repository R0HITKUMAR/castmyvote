import { PDFDocument, rgb, degrees } from "pdf-lib";
import fs, { readFileSync } from "fs";
import fetch from "node-fetch";
import fontkit from "@pdf-lib/fontkit";
import Card from "../../models/CMV_ID.js";
import AWS from "aws-sdk";
import { sendWhatsAppDoc } from "../sms/WhatsApp.js";
import { sendVoterID } from "../mail/Mail.js";
import sendSMS from "../sms/SMS.js";

const generatePDF = async (data) => {
  // Fetch
  const pdfRaw = await fetch(
    "https://s3.us-east-1.amazonaws.com/rohit-kumar/castmyvote/assets/CMV_ID.pdf"
  ).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(pdfRaw);
  pdfDoc.registerFontkit(fontkit);

  pdfDoc.setAuthor("Cast My Vote");
  pdfDoc.setSubject("CMV Voter ID issued by Cast My Vote");
  pdfDoc.setProducer("CMV");
  pdfDoc.setCreator("CMV (https://castmyvote.ml)");

  // Load Font

  const codeBold = await fetch(
    "https://s3.us-east-1.amazonaws.com/rohit-kumar/castmyvote/assets/fonts/code_bold.otf"
  ).then((res) => res.arrayBuffer());
  const codeBoldFont = await pdfDoc.embedFont(codeBold);
  const codeLight = await fetch(
    "https://s3.us-east-1.amazonaws.com/rohit-kumar/castmyvote/assets/fonts/code_light.otf"
  ).then((res) => res.arrayBuffer());
  const codeLightFont = await pdfDoc.embedFont(codeLight);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  //Fetch Image from URL
  const photoImageBytes = await fetch(data.photo).then((res) =>
    res.arrayBuffer()
  );
  const photoImage = await pdfDoc.embedPng(photoImageBytes);

  firstPage.drawText(data.id_no, {
    x: 180,
    y: 680,
    size: 10,
    font: codeBoldFont,
    color: rgb(0, 0, 0),
  });
  firstPage.drawImage(photoImage, {
    // QR Code
    x: 48,
    y: 595,
    width: 50,
    height: 70,
  });

  const pngImageBytes = await fetch(
    `https://www.cognex.com/api/Sitecore/Barcode/Get?data=${data.id_no}&code=BCL_CODE128&width=1000&imageType=PNG&foreColor=%23000000&backColor=%23FFFFFF&rotation=RotateNoneFlipNone`
  ).then((res) => res.arrayBuffer());
  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  firstPage.drawImage(pngImage, {
    x: 35,
    y: 672,
    width: 130,
    height: 20,
  });

  firstPage.drawText(
    `${data.name} \n${data.fName} \n${data.dob} \n${data.gender}`,
    {
      x: 145,
      y: 650.5,
      size: 10,
      lineHeight: 14,
      font: codeLightFont,
      color: rgb(0, 0, 0),
    }
  );

  firstPage.drawText(`${data.phone}\n${data.email}`, {
    x: 390,
    y: 680,
    size: 8,
    lineHeight: 11.5,
    font: codeLightFont,
    color: rgb(0, 0, 0),
  });

  // Multi Line Text with 50 character limit
  const address = data.address;
  const addressArray = address.match(/.{1,50}/g);
  let y = 648;
  addressArray.forEach((line) => {
    firstPage.drawText(line, {
      x: 338,
      y: y,
      size: 8,
      font: codeLightFont,
      color: rgb(0, 0, 0),
    });
    y -= 10;
  });

  // Issued Date
  // Get Date in DD/MM/YYYY format
  const date = data.id_date.split(",")[0];
  firstPage.drawText(date, {
    x: 39,
    y: 638,
    size: 5,
    font: codeLightFont,
    color: rgb(0, 0, 0),
    rotate: degrees(90),
  });

  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  const pdfBytes = await pdfDoc.save();

  if (pdfDataUri) {
    var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
    const filename =
      timestamp +
      "xxxxxxxxxxxxxxxx"
        .replace(/[x]/g, function () {
          return ((Math.random() * 16) | 0).toString(16);
        })
        .toLowerCase() +
      ".pdf";
    // Upload file to S3
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });

    s3.upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: "castmyvote/cmv_id/" + data.id_no + "-" + filename,
      Body: pdfBytes,
      ContentType: "application/pdf",
    })
      .on("httpUploadProgress", function (evt) {
        // console.log(parseInt((evt.loaded / evt.total) * 100));
      })
      .send(function (err, aws) {
        if (err) {
          console.log(err);
        } else {
          console.log(aws.Location);
          Card.findOne({ id_no: data.id_no })
            .then((card) => {
              card.id_doc = aws.Location;
              card.save();
              sendVoterID(card);
              const msg = `\nGreetings from CMV!\n\n Your Application No. ${card.application_no}  has been approved\n\nYou Voter ID No. : ${card.id_no}\n\nYou will receive your Voter ID through mail or you can download it from User Dashboard \n\nThank You\nTeam CastMyVote!`;
              sendSMS(`+91${card.phone}`, msg);
              sendWhatsAppDoc(aws.Location);
              console.log("Card Generated ID: " + card.id_no);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  }
};

export default generatePDF;
