import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Toast from "../../../common/SweetAlert.js";
import img from "../../../../assets/img/avatars/1.png";

export default function Form(props) {
  const navigate = useNavigate();
  const [Alert, setAlert] = React.useState("");
  const [avtar, setAvtar] = React.useState(img);
  const [file, setFile] = useState("");
  const [fileF, setFileF] = useState("");
  const [perc, setPerc] = useState(0);
  const [percF, setPercF] = useState(0);

  const handleFile = (e) => {
    setAvtar(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const handleFileF = (e) => {
    setFileF(e.target.files[0]);
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
    proof: "",
    application_no: "",
    timestamp: "",
    status: "",
    id_no: "",
    id_date: "",
    id_doc: "",
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

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (file) {
      setPerc(perc + 10);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("location", "castmyvote/img");
      setPerc(perc + 20);
      try {
        const res = await axios.post(
          "http://localhost:5000/file/upload",
          formData
        );
        setPerc(100);
        console.log(res.data.Location);
        Toast.fire({
          icon: "success",
          title: "Image Uploaded Successfully",
        });
        setData((prev) => {
          return {
            ...prev,
            photo: res.data.Location,
          };
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "Please Select a File",
      });
    }
  };

  const handleFileUploadF = async (e) => {
    e.preventDefault();
    if (fileF) {
      setPercF(percF + 10);
      const formData = new FormData();
      formData.append("file", fileF);
      formData.append("location", "castmyvote/doc");
      setPercF(percF + 20);
      try {
        const res = await axios.post(
          "http://localhost:5000/file/upload",
          formData
        );
        setPercF(100);
        console.log(res.data.Location);
        Toast.fire({
          icon: "success",
          title: "Document Uploaded Successfully",
        });
        setData((prev) => {
          return {
            ...prev,
            proof: res.data.Location,
          };
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "Please Select a File",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (document.getElementById("registerterms").checked) {
      if (data.fName && data.address && data.dob && data.photo && data.proof) {
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
      } else {
        Toast.fire({
          icon: "error",
          title: "Please fill all the fields",
        });
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "Please Accept Terms and Conditions",
      });
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
                  <div className="mb-3 col-12 row">
                    <label htmlFor="address" className="form-label">
                      Supporting Document
                    </label>
                    {!data.proof && (
                      <div className="col-6">
                        <div className="input-group">
                          <input
                            type="file"
                            className="form-control"
                            aria-label="Upload"
                            onChange={handleFileF}
                            accept="application/pdf"
                          />
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleFileUploadF}
                          >
                            Upload
                          </button>
                        </div>
                      </div>
                    )}
                    {!data.proof && (
                      <div className="col-6">
                        {percF !== 0 && (
                          <div className="progress mt-2">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${percF}%` }}
                              aria-valuenow={percF}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              {percF}%
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {data.proof && (
                      <h5 className="card-header" style={{ color: "red" }}>
                        File Uploaded Successfully
                      </h5>
                    )}
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
