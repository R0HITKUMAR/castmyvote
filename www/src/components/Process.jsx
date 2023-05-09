import React from "react";
import Img1 from "../assets/images/media/voter_process.png";
import Img2 from "../assets/images/media/voting_process.png";
import Img3 from "../assets/images/media/auth_ways.png";

export default function Process() {
    return (
        <div className="fancy-feature-four pt-250 lg-pt-120">
            <div className="container">
                <div className="row">
                    <div
                        className="col-xxl-7 col-md-8 m-auto text-center wow fadeInUp"
                        style={{ visibility: "visible", animationName: "fadeInUp" }}
                    >
                        <div className="title-style-three">
                            <h2 className="main-title fw-normal">
                                What process we follow for{" "}
                                <span className="d-inline-block position-relative mx-3">
                                    Online
                                    <span
                                        className="mark-bg"
                                        style={{ backgroundColor: "#F7E4FF" }}
                                    />
                                </span>
                                Voting
                            </h2>
                        </div>
                        <p className="text-lg mt-40 mb-100 lg-mt-20 lg-mb-50">
                            After a thorough review of a client’s circumstances and needs.
                        </p>
                    </div>
                </div>
                <ul
                    className="nav nav-tabs d-block d-md-flex justify-content-between wow fadeInUp"
                    role="tablist"
                    style={{ visibility: "visible", animationName: "fadeInUp" }}
                >
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            data-bs-toggle="tab"
                            data-bs-target="#sp1"
                            type="button"
                            role="tab"
                        >
                            Process  for <br />
                            <span className="d-none d-lg-inline-block">
                                Voter
                            </span>
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#sp2"
                            type="button"
                            role="tab"
                        >
                            Process for<br />
                            <span className="d-none d-lg-inline-block">Voting</span>
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link"
                            data-bs-toggle="tab"
                            data-bs-target="#sp3"
                            type="button"
                            role="tab"
                        >
                            Authentication <br />
                            <span className="d-none d-lg-inline-block">Ways</span>
                        </button>
                    </li>
                </ul>
                <div
                    className="tab-content position-relative mt-120 lg-mt-80 wow fadeInUp"
                    style={{ visibility: "visible", animationName: "fadeInUp" }}
                >
                    <div className="shapes shape-one rounded-circle" />
                    <div className="shapes shape-two rounded-circle" />
                    <div className="tab-pane active show" id="sp1">
                        <img
                            src={Img1}
                            alt=""
                            className="lazy-img main-screen w-100"
                            style={{}}
                        />
                    </div>
                    <div className="tab-pane" id="sp2">
                        <img
                            src={Img2}
                            alt=""
                            className="main-screen w-100"
                        />
                    </div>
                    <div className="tab-pane" id="sp3">
                        <img
                            src={Img3}
                            alt=""
                            className="main-screen w-100"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
