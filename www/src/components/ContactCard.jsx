import React from "react";

export default function ContactCard() {
    return (
        <div
            className="fancy-short-banner-two mt-100 mb-100 lg-mt-100 wow fadeInUp"
            style={{ visibility: "visible", animationName: "fadeInUp" }}
        >
            <div className="container">
                <div className="bg-wrapper ms-xxl-4 me-xxl-4 position-relative">
                    <div className="shapes rounded-circle shape-one" />
                    <div className="inner-wrapper m-auto">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center text-md-start sm-mb-30">
                                <h6 className="mb-5">Need more Help?</h6>
                                <h3 className="fw-normal m0">Send us message for Help.</h3>
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <a href="https://aboutrohit.in" className="btn-six fw-500">
                                    Contact us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
