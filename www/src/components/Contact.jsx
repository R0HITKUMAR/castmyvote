import React from "react";
import axios from "../Axios";

export default function Contact() {
  const [alert, setAlert] = React.useState("");
  const [data, setData] = React.useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });

  const handleChange = (e) => {
    setAlert("");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.email !== "" &&
      data.email.match(
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/
      ) &&
      data.name !== "" &&
      data.phone !== "" &&
      data.message !== "" &&
      data.phone.match(/^[0-9]{10}$/)
    ) {
      axios
        .post("/query/add", data)
        .then((res) => {
          setAlert(res.data.message);
          setData({
            name: "",
            email: "",
            message: "",
            phone: "",
          });
        })
        .catch((err) => {
          setAlert(err.response.data.message);
        });
    } else {
      {
        setAlert("Please fill all the fields correctly");
      }
    }
  };

  return (
    <div className="fancy-feature-twentyTwo position-relative pt-100 mt-100">
      <div className="fancy-short-banner-eight">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-md-6 col-12 wow fadeInLeft"
              style={{ visibility: "visible", animationName: "fadeInLeft" }}
            >
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
              className="col-md-6 col-12 ms-auto wow fadeInRight"
              style={{ visibility: "visible", animationName: "fadeInRight" }}
            >
              <div className="form-bg-wrapper position-relative rounded bg-white pe-4 ps-4 pe-lg-5 ps-lg-5 pt-60 pb-50 md-mt-60">
                <div className="form-style-two">
                  <form id="contact-form">
                    <div className="row controls">
                      <div className="col-6">
                        <div className="input-group-meta form-group mb-20">
                          <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={data.name}
                            placeholder="Your Name*"
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="input-group-meta form-group mb-20">
                          <input
                            type="number"
                            name="phone"
                            onChange={handleChange}
                            value={data.phone}
                            placeholder="Your Phone*"
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
                            onChange={handleChange}
                            value={data.email}
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
                            onChange={handleChange}
                            value={data.message}
                          />
                          <div className="help-block with-errors" />
                        </div>
                      </div>
                      <div className="col-12">
                        {alert && (
                          <div className="alert alert-warning text-center">
                            {alert}
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <button
                          className="btn-thirteen w-100 fw-500 tran3s text-uppercase"
                          onClick={handleSubmit}
                        >
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
