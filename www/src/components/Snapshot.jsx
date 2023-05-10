import React from "react";
import Img from "../assets/images/election/process.png";
// import Img7 from "../assets/images/shape/shape_32.svg"

export default function Snapshot() {
  return (
    <div className="fancy-feature-three pt-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-7">
            <div
              className="block-style-two pe-xxl-5 md-mb-50 wow fadeInLeft"
              style={{ visibility: "visible", animationName: "fadeInLeft" }}
            >
              <div className="title-style-three">
                <div className="sc-title text-uppercase">Get Started</div>
                <h2 className="main-title fw-normal">
                  Why Should You <br />
                  <span className="d-inline-block position-relative mx-3">
                    Consider
                    <span
                      className="mark-bg"
                      style={{ backgroundColor: "#D6F9EF" }}
                    />
                  </span>
                  Us?
                </h2>
              </div>
              <p className="text-lg mt-25 mb-60 lg-mb-40">
                We provide a platform to conduct free and fair elections online.{" "}
                <br />
              </p>
              <a href="https://app.castmyvote.ml" className="btn-four fw-500">
                Get Started
              </a>
            </div>
          </div>
          <div className="col-lg-5 col-md-5 text-center">
            <img src={Img} alt="" style={{ height: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
