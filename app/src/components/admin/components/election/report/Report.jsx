import axios from "axios";
import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../../../../assets/img/logo/logo.svg";
import Sign from "../../../../../assets/img/icons/sign.png";

export default function ElectionResult() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = React.useState([]);
  const [winner, setWinner] = React.useState(null);
  const [nvotes, setNvotes] = React.useState(0);

  const printRef = React.useRef();
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ElectionReport.pdf");
  };

  const handlePrint = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.autoPrint();
    window.open(pdf.output("bloburl"), "_blank");
  };

  React.useEffect(() => {
    axios
      .get(`/election/${id}/results`)
      .then((res) => {
        setData(res.data.election);
        console.log(res.data.election);
        getVotes(res.data.election.candidates);
        setWinner(res.data.winner);
        console.log(res.data.winner);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const getVotes = (candidate) => {
    candidate.forEach((vote) => {
      setNvotes((prev) => prev + vote.candidate_votes);
    });
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-1">
        <span className="text-muted fw-light">Home / Election / {id}</span> /
        Report
        <button
          onClick={() => navigate("/")}
          type="button"
          class="btn btn-primary btn-sm m-1"
          style={{ float: "right" }}
        >
          <i className="fa-solid fa-house"></i>
        </button>
        <button
          onClick={() => navigate(`/elections/${id}`)}
          type="button"
          class="btn btn-primary btn-sm m-1"
          style={{ float: "right" }}
        >
          <i className="fa-solid fa-backward"></i>
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm m-1"
          style={{ float: "right" }}
          onClick={handleDownloadPdf}
        >
          <i className="fa-solid fa-download"></i>
        </button>
        <button
          type="button"
          class="btn btn-primary btn-sm m-1"
          style={{ float: "right" }}
          onClick={handlePrint}
        >
          <i className="fa-solid fa-print"></i>
        </button>
      </h4>
      <div className="row">
        <div className="col-md-12 col-12">
          <div className="card p-2 mb-4" ref={printRef}>
            <div className="card-header border-bottom">
              <div className="text-center">
                <img
                  src={Logo}
                  alt="logo"
                  className="img-fluid"
                  style={{ height: "50px" }}
                />
              </div>
            </div>
            <div className="card-body my-4">
              <div className="text-center">
                <span className="fw-bold d-block mb-1 text-center">
                  Election Report
                </span>
                <hr className="my-3" />
              </div>
              <div className="row">
                <div className="col-6">
                  <span className="fw-semibold d-block mb-1 text-center">
                    Election Information
                  </span>
                  <dl className="row mt-2">
                    <dt className="col-sm-3">Election ID</dt>
                    <dd className="col-sm-9">{data.election_id}</dd>
                    <dt className="col-sm-3">Election Details</dt>
                    <dd className="col-sm-9">
                      {data.name} [{data.code}]
                    </dd>
                    <dt className="col-sm-3">Description</dt>
                    <dd className="col-sm-9">{data.description}</dd>
                    <dt className="col-sm-3 text-truncate">Ends</dt>
                    <dd className="col-sm-9">{data.end_date}</dd>
                  </dl>
                </div>
                <div className="col-6">
                  <span className="fw-semibold d-block mb-1 text-center">
                    Election Details
                  </span>
                  <dl className="row mt-2">
                    <dt className="col-sm-3 text-truncate">Status</dt>
                    <dd className="col-sm-9">Completed</dd>
                    <dt className="col-sm-3 text-truncate">Starts</dt>
                    <dd className="col-sm-9">{data.start_date}</dd>
                    <dt className="col-sm-3 text-truncate">Ends</dt>
                    <dd className="col-sm-9">{data.end_date}</dd>
                    <dt className="col-sm-3 text-truncate">Total Votes</dt>
                    <dd className="col-sm-9">{nvotes}</dd>
                  </dl>
                </div>
              </div>

              <hr className="my-2" />
              <span className="fw-semibold d-block mb-1 px-4">
                List of Candidates & Winner
              </span>
              <hr className="my-2" />
              <table className="table table-striped mb-3">
                <thead>
                  <tr>
                    <th scope="col">S No.</th>
                    <th scope="col">Candidate ID</th>
                    <th scope="col">Candidate Name & Party</th>
                    <th scope="col">Votes</th>
                    <th scope="col" className=" text-center">
                      Photo
                    </th>
                    <th scope="col">Symbol</th>
                  </tr>
                </thead>
                <tbody>
                  {winner &&
                    winner.map((candidate, index) => (
                      <tr key={index}>
                        <th scope="row">
                          {index + 1}
                          {index === 0 && (
                            <span
                              className="badge bg-success m-0"
                              style={{ transform: "rotate(90deg)" }}
                            >
                              Winner
                            </span>
                          )}
                        </th>
                        <td>{candidate.candidate_id}</td>
                        <td>
                          {candidate.candidate_name} <br />
                          <small>({candidate.candidate_party})</small>
                        </td>
                        <td>{candidate.candidate_votes}</td>
                        <td className="text-center">
                          <img
                            src={candidate.candidate_dp}
                            alt="Candidate"
                            className="rounded text-center img-fluid"
                            width={50}
                            height={50}
                          />
                        </td>
                        <td className="text-center">
                          <img
                            src={candidate.candidate_logo}
                            alt="Candidate"
                            className="rounded text-center img-fluid"
                            width={50}
                            height={50}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <span className="fw-semibold d-block mb-1 px-4">
                Instructions
              </span>
              <hr className="my-2" />
              <span className="d-block mb-1 px-4 mb-3">
                <ul>
                  <li>
                    All the information in this report is based on the data
                    provided by the server.
                  </li>
                  <li>
                    All the information are correct to the best of our knowledge.
                  </li>
                  <li>
                    This is a report of the election conducted on CastMyVote
                  </li>
                  <li>
                    This report contains the details of the election and the
                    winner of the election.
                  </li>
                </ul>
              </span>
              <hr className="my-2" />
              <span className="fw-semibold d-block mb-1 px-4">
                Acknowledgement
              </span>
              <hr className="my-2" />
              <span className="d-block mb-1 px-4">
                We would like to express our gratitude to everyone who
                votes. We recognize the importance of the
                information contained in this report and will make every effort
                to ensure its dissemination to relevant stakeholders.
              </span>
              <span
                className="d-block mb-1 px-4 mt-5"
                style={{ float: "right" }}
              >
                <img
                  src={Sign}
                  alt="sign"
                  className="img-fluid mb-2"
                  style={{ width: "100px" }}
                />
                <hr className="my-2" />
                Rohit Kumar
                <br />
                <small>(Chief Election Officer)</small>
              </span>
            </div>
            <div className="card-footer text-center border-top">
              <span className="fw-semibold d-block mb-1 text-center">
                from
                <br />
                Cast My Vote
                <br />
                (Powered by Blockchain & Smart Contracts, Made with ❤️ in India)
                <br />© Cast My Vote, Ghaziabad, Uttar Pradesh, India
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
