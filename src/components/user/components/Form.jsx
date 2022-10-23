import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AWS from "aws-sdk";
import Swal from "sweetalert2";
import img from "../../../assets/img/avatars/1.png";

export default function Form(props) {
  const navigate = useNavigate();
  const [Alert, setAlert] = React.useState("");
  const [avtar, setAvtar] = React.useState(img);
  const [file, setFile] = useState("");
  const [perc, setPerc] = useState(0);

  const handleFile = (e) => {
    setAvtar(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const [data, setData] = React.useState({
    name: props.user.name,
    email: props.user.email,
    fName: "",
    gender: "",
    phone: props.user.phone,
    address: "",
    dob: "",
    photo: "",
    application_no: "",
    timestamp: "",
    status: "",
    id_no: "",
    id_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (file) {
      //Setting File Name
      var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
      const filename =
        timestamp +
        "xxxxxxxxxxxxxxxx"
          .replace(/[x]/g, function () {
            return ((Math.random() * 16) | 0).toString(16);
          })
          .toLowerCase() +
        ".png";

      // Upload file to S3
      const s3 = new AWS.S3({
        accessKeyId: "AKIAVOENIHH7GYLY5QBK",
        secretAccessKey: "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",
        region: "us-east-1",
      });

      s3.upload({
        Bucket: "files.rohitkumar",
        Key: filename,
        Body: file,
        ContentType: file.type,
      })
        .on("httpUploadProgress", function (evt) {
          setPerc(parseInt((evt.loaded / evt.total) * 100));
        })
        .send(function (err, data) {
          if (err) {
            console.log(err);
          } else {
            setAvtar(data.Location);
            setData((prev) => {
              return {
                ...prev,
                photo: data.Location,
              };
            });
          }
        });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (document.getElementById("registerterms").checked) {
      if (data.fName && data.address && data.dob && data.photo) {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Submit",
        }).then((result) => {
          if (result.isConfirmed) {
            axios
              .post("http://localhost:5000/cmv/new", data)
              .then((res) => {
                setAlert(res.data.message);
                Swal.fire({
                  title: "Success!",
                  text: res.data.message,
                  icon: "success",
                  confirmButtonText: "Ok",
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate("/");
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }
                });
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      }
    } else {
      setAlert("Please accept the terms and conditions");
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="fw-bold py-3 mb-4">
        <span className="text-muted fw-light">Home /</span> Registration Form
      </h4>
      <div className="row">
        <div className="col-md-12">
          <ul className="nav nav-pills flex-column flex-md-row mb-3">
            <li className="nav-item">
              <a className="nav-link active" href="javascript:void(0);">
                <i className="bx bx-user me-1" /> Home
              </a>
            </li>
          </ul>
          <div className="card mb-4">
            <h5 className="card-header">Register as 1st Time Voter</h5>
            <div className="card-body">
              <div className="d-flex align-items-end align-items-sm-center gap-4">
                <img
                  src={avtar}
                  alt="user-avatar"
                  className="d-block rounded"
                  height={100}
                  width={100}
                />
                <div className="button-wrapper">
                  {!data.photo && (
                    <label className="btn btn-primary me-2 mb-4" tabIndex={0}>
                      <span className="d-none d-sm-block">Choose Photo</span>
                      <i className="bx bx-upload d-block d-sm-none" />
                      <input
                        type="file"
                        onChange={handleFile}
                        className="account-file-input"
                        accept="image/png"
                        hidden
                      />
                    </label>
                  )}
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="btn btn-outline-primary mb-4 me-2"
                    disabled={data.photo !== ""}
                  >
                    <i className="bx bx-reset d-block d-sm-none" />
                    <span className="d-none d-sm-block">
                      {data.photo ? "Uploaded" : "Upload"}
                    </span>
                  </button>
                  <p className="text-muted mb-0">
                    Allowed JPG, GIF or PNG. Max size of 800K
                  </p>
                </div>
                {perc !== 0 ? (
                  <div className="progress" style={{ width: "60%" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: perc + "%" }}
                      aria-valuenow={perc}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      {perc}%
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <hr className="my-0" />
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="mb-3 col-md-4 col-12">
                    <label className="form-label">Full Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={data.name}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="mb-3 col-md-4 col-12">
                    <label className="form-label">Fathers Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="fName"
                      placeholder="Enter your father's name"
                      value={data.fName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-4 col-12">
                    <label className="form-label">DOB</label>
                    <input
                      className="form-control"
                      type="date"
                      name="dob"
                      placeholder="Enter your date of birth"
                      value={data.dob}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="email" className="form-label">
                      E-mail
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      value={data.email}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label className="form-label" htmlFor="phoneNumber">
                      Phone Number
                    </label>
                    <div className="input-group input-group-merge">
                      <input
                        className="form-control"
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={`IN (+91) - ${data.phone}`}
                        onChange={handleChange}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="mb-3 col-md-2">
                    <label htmlFor="gender" className="form-label">
                      Gender
                    </label>
                    <select
                      className="select2 form-select"
                      name="gender"
                      onChange={handleChange}
                      value={data.gender}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3 col-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      rows={4}
                      name="address"
                      placeholder="Enter your address"
                      value={data.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="card">
            <h5 className="card-header">Acknowledgement</h5>
            <div className="card-body">
              <div className="mb-3 col-12 mb-0">
                <div className="alert alert-primary">
                  <h6 className="alert-heading fw-bold mb-1">
                    <i className="bx bx-info-circle me-1" /> Important
                  </h6>
                  <p className="mb-0">
                    All the information provided by you is true and correct to
                    the best of your knowledge. You are solely responsible for
                    the authenticity of the information provided by you. In case
                    of any discrepancy, you will be solely responsible for the
                    same.
                  </p>
                </div>
                {Alert && (
                  <div className="alert alert-primary">
                    <h6 className="alert-heading fw-bold mb-1">
                      <i className="bx bx-info-circle me-1" /> Alert
                    </h6>
                    <p className="mb-0">{Alert}</p>
                  </div>
                )}
              </div>
              <form>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="registerterms"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="accountActivation"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
                <button onClick={handleSubmit} className="btn btn-danger">
                  Submit Form
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
