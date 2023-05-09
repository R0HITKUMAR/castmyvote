import React from "react";
import Admin from "../assets/images/election/admin.png";
import Voter from "../assets/images/election/voter.png";
import Icon from "../assets/images/icon/icon_18.svg";

export default function Levels() {
  return (
    <div className="fancy-feature-six position-relative mt-225 lg-mt-100 xs-mt-80">
      <div className="container">
        <div className="row gx-xxl-5 align-items-center">
          <div
            className="col-lg-4 col-md-6 mt-40 wow fadeInUp"
            style={{ visibility: "visible", animationName: "fadeInUp" }}
          >
            <div className="title-style-three mb-65 lg-mb-40">
              <h2 className="main-title fw-normal">
                Levels <br />
                <span className="d-inline-block position-relative me-3">
                  for
                  <span
                    className="mark-bg pe-3"
                    style={{ backgroundColor: "#E1EDFF" }}
                  />
                </span>
                Users
              </h2>
            </div>
            <a
              href="javascript:void(0)"
              className="btn-five tran3s fw-500 fs-17 text-decoration-underline"
            >
              Try Now <i className="bi bi-chevron-right" />
            </a>
          </div>
          <div
            className="col-lg-4 col-md-6 mt-40 wow fadeInUp"
            data-wow-delay="0.1s"
            style={{
              visibility: "visible",
              animationDelay: "0.1s",
              animationName: "fadeInUp",
            }}
          >
            <div className="card-style-three">
              <div className="icon d-flex align-items-end">
                <img
                  src={Admin}
                  alt=""
                  className="lazy-img"
                  style={{}}
                />
              </div>
              <h4 className="mt-25 mb-20">Admin</h4>
              <p className="mb-50">
                The Services available to admin are:
                <ul>
                  <li>Voter Addition and New Voter Form Approval</li>
                  <li>Generate Voter Card</li>
                  <li>Election Management </li>
                  <li>Results Management</li>
                </ul>
              </p>
              <a href="https://app.castmyvote.ml" target="_blank" rel="noreffer" >
                <img
                  src={Icon}
                  alt=""
                  className="lazy-img"
                  style={{}}
                />
              </a>
            </div>
          </div>
          <div
            className="col-lg-4 col-md-6 mt-40 wow fadeInUp"
            data-wow-delay="0.2s"
            style={{
              visibility: "visible",
              animationDelay: "0.2s",
              animationName: "fadeInUp",
            }}
          >
            <div className="card-style-three">
              <div className="icon d-flex align-items-end">
                <img
                  src={Voter}
                  alt=""
                  className="lazy-img"
                  style={{}}
                />
              </div>
              <h4 className="mt-25 mb-20">Voter</h4>
              <p className="mb-50">
                The Services available to user are:
                <ul>
                  <li>New Voter Enrollment</li>
                  <li>Election View </li>
                  <li>Vote Cast</li>
                  <li>Access Voter Card</li>
                  <li>Complaints & Queries</li>
                </ul>
              </p>
              <a href="https://app.castmyvote.ml" target="_blank" rel="noreffer" >
                <img
                  src={Icon}
                  alt=""
                  className="lazy-img"
                  style={{}}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="shapes shape-one rounded-circle" />
      <div className="shapes shape-three rounded-circle" />
    </div>
  );
}
