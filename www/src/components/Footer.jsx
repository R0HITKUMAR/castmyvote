import React from "react";
import Logo from "../assets/images/logo/logo-white.svg";
import PPT from "../assets/docs/ppt.pdf";
import Report from "../assets/docs/report.pdf";
import Paper from "../assets/docs/paper.pdf";
import Paper2 from "../assets/docs/paper2.pdf";
import axios from "../Axios";

export default function Footer(props) {
  const [alert, setAlert] = React.useState(
    "We only send interesting and relevant emails."
  );
  const [data, setData] = React.useState({
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.email !== "" &&
      data.email.match(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/
      )
    ) {
      axios
        .post("/newsletter/add", data)
        .then((res) => {
          setAlert(res.data.message);
          setData({ email: "" });
        })
        .catch((err) => {
          setAlert("Something went wrong. Please try again later.");
        });
    } else {
      setAlert("Please enter a valid email address.");
    }
  };

  return (
    <div className="footer-style-nine theme-basic-footer zn2 position-relative px-4">
      <div className="bg-wrapper">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-3 col-12 footer-intro mb-40 text-center">
              <h5 className="footer-title fw-normal ">About Us</h5>
              <div className="logo ps-4 sm-pt-20">
                <a href="javascript:void(0)">
                  <img src={Logo} alt="" width={150} />
                </a>
              </div>
              <p
                className="mt-20"
                style={{ color: "white", lineHeight: "1.5" }}
              >
                We provide a platform to conduct free and fair elections online.
              </p>
            </div>
            <div className="col-md-2 col-5 mb-30">
              <h5 className="footer-title fw-normal">Links</h5>
              <ul className="footer-nav-link style-none">
                <li>
                  <a href="javascript:void(0)">Home</a>
                </li>
                <li>
                  <a href="javascript:void(0)">About</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Rohit Kumar</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Try Now</a>
                </li>
              </ul>
            </div>
            <div className="col-md-3 col-7 mb-30 docs">
              <h5 className="footer-title fw-normal">Docs</h5>
              <ul className="footer-nav-link style-none">
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={() => props.setDoc(Report)}
                  >
                    Project Report
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={() => props.setDoc(PPT)}
                  >
                    Project Presentation
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={() => props.setDoc("Video")}
                  >
                    Project Overview
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={() => props.setDoc(Paper)}
                  >
                    Research Paper - 1
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0)"
                    onClick={() => props.setDoc(Paper2)}
                  >
                    Research Paper - 2
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 col-12 mb-30 form-widget">
              <h5 className="footer-title fw-normal">Newsletter</h5>
              <h6 className="pt-15 pb-20 text-white">Join our newsletter</h6>
              <form action="#" className="position-relative">
                <input
                  type="text"
                  onChange={(e) => setData({ email: e.target.value })}
                  value={data.email}
                  placeholder="Enter your email"
                />
                <button
                  className="tran3s fw-500 position-absolute"
                  onClick={handleSubmit}
                >
                  Subscribe
                </button>
              </form>
              <div className="fs-14 mt-10 text-white opacity-50">{alert}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="bottom-footer">
          <div className="row">
            <div className="col-lg-12 mt-15">
              <p
                className="copyright text-center m0"
                style={{ lineHeight: "1.5" }}
              >
                Copyright @ 2023 | CastMyVote | All Rights Reserved
                <br />
                <small>
                  (Powered by Blockchain & Smart Contracts, Made with ❤️ in
                  India)
                  <br />© Cast My Vote, Ghaziabad, Uttar Pradesh, India
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
