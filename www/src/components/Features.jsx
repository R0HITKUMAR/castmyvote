import React from "react";
import Shape1 from "../assets/images/shape/shape_26.svg";
import Shape2 from "../assets/images/shape/shape_27.svg";
import Shape3 from "../assets/images/shape/shape_25.svg";
import Shape4 from "../assets/images/shape/shape_28.svg";
import Shape6 from "../assets/images/shape/shape_30.svg";
import Img from "../assets/images/media/features.png";

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
            <h2 className="fw-normal font-recoleta position-relative">
              <img
                src={Shape3}
                alt=""
                className="lazy-img shapes line-shape"
                style={{}}
              />
              Features <br />
            </h2>
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
              src={Img}
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
