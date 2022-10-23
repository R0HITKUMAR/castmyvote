import React from "react";
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";
import Swal from "sweetalert2";
import fontkit from "@pdf-lib/fontkit";
import PDF from "../../../../assets/CMD_ID.pdf";
import CodeBold from "../../../../assets/fonts/code_bold.otf";
import CodeLight from "../../../../assets/fonts/code_light.otf";

export default function Card({ data }) {
  const [base64, setBase64] = React.useState(null);

  const generatePDF = async (data) => {
    data && Swal.fire({
      title: "Generating Voter Card...",
      text: "Please wait...",
      icon: "info",
      allowOutsideClick: false,
    });
    data && Swal.showLoading();
    document.getElementById("cmv-voter-id").classList.add("d-none");

    const existingPdfBytes = await fetch(PDF).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    pdfDoc.setAuthor("Cast My Vote");
    pdfDoc.setSubject("CMV Voter ID issued by Cast My Vote");
    pdfDoc.setProducer("CMV");
    pdfDoc.setCreator("CMV (https://castmyvote.ml)");

    // Get Font & Embeed
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const cBold = await fetch(CodeBold).then((res) => res.arrayBuffer());
    const codeBoldFont = await pdfDoc.embedFont(cBold);

    const cLight = await fetch(CodeLight).then((res) => res.arrayBuffer());
    const codeLightFont = await pdfDoc.embedFont(cLight);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const photoImageBytes = await fetch(data.photo).then((res) =>
      res.arrayBuffer()
    );
    const photoImage = await pdfDoc.embedPng(photoImageBytes);
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

    firstPage.drawText(data.id_no, {
      x: 185,
      y: 680,
      size: 10,
      font: codeBoldFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(data.name, {
      x: 140,
      y: 650.5,
      size: 10,
      font: codeLightFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(data.fName, {
      x: 146,
      y: 637,
      size: 10,
      font: codeLightFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(data.dob, {
      x: 138,
      y: 623.5,
      size: 10,
      font: codeLightFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(data.gender, {
      x: 144,
      y: 610,
      size: 10,
      font: codeLightFont,
      color: rgb(0, 0, 0),
    });

    firstPage.drawText(data.phone, {
      x: 390,
      y: 680,
      size: 8,
      font: codeLightFont,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(data.email, {
      x: 390,
      y: 670,
      size: 8,
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
      x: 40,
      y: 636,
      size: 5,
      font: codeLightFont,
      color: rgb(0, 0, 0),
      rotate: degrees(90),
    });

    // Today Date
    const today = new Date();
    const todayDate = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;
    firstPage.drawText(todayDate, {
      x: 532.5,
      y: 582.5,
      size: 5,
      font: codeLightFont,
      color: rgb(0, 0, 0),
    });

    const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
    const pdfBytes = await pdfDoc.save();

    setBase64(pdfDataUri);
    Swal.close();
    document.getElementById("cmv-voter-id").classList.remove("d-none");
  };

  React.useEffect(() => {
    generatePDF(data);
  }, [data]);

  return (
    <div
      className="modal fade"
      id="cmv-voter-id"
      data-bs-backdrop="static"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setBase64(null)}
            />
          </div>
          <div className="modal-body" style={{ padding: "0px" }}>
            <object
              data={base64}
              type="application/pdf"
              width="100%"
              height="500px"
            >
              <embed src={base64} type="application/pdf" />
            </object>
          </div>
        </div>
      </div>
    </div>
  );
}
