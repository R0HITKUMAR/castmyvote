import React from "react";

export default function Contact() {
  return (
    <div className="fancy-feature-twentyTwo position-relative pt-100 mt-100">
      <div className="fancy-short-banner-eight">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-5 wow fadeInLeft"
              style={{ visibility: "visible", animationName: "fadeInLeft" }}
            >
              <img
                src="images/icon/icon_60.svg"
                alt=""
                className="lazy-img"
                style={{}}
              />
              <div className="title-style-one mt-35 mb-30">
                <h2 className="main-title fw-normal tx-dark m0">
                  Let’s talk <br /> with <span>Us</span>.
                </h2>
              </div>
              {/* /.title-style-one */}
              <p className="text-lg tx-dark mb-55 lg-mb-30">
                We are here to help and answer any question you might have. We
                look forward to hearing from you.
              </p>
            </div>
            <div
              className="col-xl-5 col-lg-6 ms-auto wow fadeInRight"
              style={{ visibility: "visible", animationName: "fadeInRight" }}
            >
              <div className="form-bg-wrapper position-relative rounded bg-white pe-4 ps-4 pe-lg-5 ps-lg-5 pt-60 pb-50 md-mt-60">
                <div className="form-style-two">
                  <form
                    action="inc/contact.php"
                    id="contact-form"
                    data-toggle="validator"
                    noValidate="true"
                  >
                    <div className="messages" />
                    <div className="row controls">
                      <div className="col-12">
                        <div className="input-group-meta form-group mb-20">
                          <input
                            type="text"
                            placeholder="Your name*"
                            name="name"
                            required="required"
                            data-error="Name is required."
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-group-meta form-group mb-20">
                          <input
                            type="email"
                            placeholder="Email*"
                            name="email"
                            required="required"
                            data-error="Valid email is required."
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="input-group-meta form-group mb-15">
                          <textarea
                            placeholder="Your message*"
                            name="message"
                            required="required"
                            data-error="Please,leave us a message."
                            defaultValue={""}
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn-thirteen w-100 fw-500 tran3s text-uppercase">
                          SEND MESSAGE
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="shapes shape-text fw-500 fs-20 tx-dark text-center">
                  Fill the <br />
                  form
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shapes shape-three rounded-circle" />
      <div className="shapes shape-four rounded-circle" />
      <div className="shapes shape-five rounded-circle" />
      <div className="shapes shape-six rounded-circle" />
    </div>
  );
}
