import React from "react";
import Shape1 from "../assets/images/shape/shape_26.svg";
import Shape2 from "../assets/images/shape/shape_27.svg";
import Shape3 from "../assets/images/shape/shape_25.svg";
import Shape4 from "../assets/images/shape/shape_28.svg";
import Shape6 from "../assets/images/shape/shape_30.svg";
import Img5 from "../assets/images/media/img_05.jpg";
import Lazy from "../assets/images/lazy.svg";

export default function Hero(props) {
  return (
    <div className="hero-banner-two position-relative pt-250 lg-pt-200 md-pt-150">
      <img
        src={Shape1}
        alt=""
        className="lazy-img shapes shape-left"
        style={{}}
      />
      <img
        src={Shape2}
        alt=""
        className="lazy-img shapes shape-right"
        style={{}}
      />
      <div className="container">
        <div className="row">
          <div
            className="col-lg-8 col-md-9 m-auto text-center wow fadeInUp"
            style={{ visibility: "visible", animationName: "fadeInUp" }}
          >
            <h1 className="hero-heading fw-normal font-recoleta position-relative">
              <img
                src={Shape3}
                alt=""
                className="lazy-img shapes line-shape"
                style={{}}
              />
              Everything Online <br />
              Why not
              <span className="position-relative d-inline-block px-3">
                Election? <br />
              </span>
            </h1>
            <p className="text-lg mb-75 pt-20 lg-mb-50 lg-pt-10">
              CastMyVote: A platform to conduct elections online. <br />
              Developed by <b>Rohit Kumar.</b>
            </p>
            <div className="d-sm-flex justify-content-center align-items-center">
              <a
                href="https://app.castmyvote.ml"
                target="_blank"
                rel="noreferrer"
                
                className="tran3s fs-17 fw-500 btn-three mb-25 ms-2 me-3"
              >
                Try Now
              </a>
              <a
                className="fancybox video-icon tran3s mb-25 ms-2 me-3 d-flex align-items-center justify-content-center"
                href="javascript:void(0)"
                onClick={() => props.setDoc("Video")}
              >
                <i className="fas fa-play" />
                <div className="ps-3 text-start">
                  <span className="d-block">Watch</span>
                  <strong className="fs-18 fw-500 tx-dark d-block">
                    Intro video
                  </strong>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div
          className="illustration-holder position-relative mt-120 lg-mt-80 xs-mt-30"
          data-wow-delay="0.2s"
          style={{
            animationDelay: "0.2s",
            animationName: "none",
          }}
        >
          <div className="bg-wrapper">
            <img
              src={Img5}
              alt=""
              className="lazy-img main-screen w-100"
              style={{}}
            />
          </div>
          <img
            src={Shape4}
            alt=""
            className="lazy-img shapes shape-one"
            style={{}}
          />
          <img
            src={Shape6}
            alt=""
            className="lazy-img shapes shape-three"
            style={{}}
          />
        </div>
      </div>
    </div>
  );
}
