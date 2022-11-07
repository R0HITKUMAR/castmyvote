import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo/logo.svg";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    repassword: "",
    otp: "",
    systemOTP: "",
  });

  const [alert, setAlert] = React.useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    setAlert("");
  };

  const regStart = () => {
    if (data.name !== "" && data.phone !== "" && data.email !== "") {
      if (data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        if (data.phone.length === 10) {
          setStep(1);
        } else {
          setAlert("Invalid Phone Number");
        }
      } else {
        setAlert("Please Enter Valid Email Address");
      }
    } else {
      setAlert("Please fill all the fields");
    }
  };

  const sendOTP = (e) => {
    e.preventDefault();
    if (data.password === data.repassword) {
      if (data.password.length >= 6) {
        axios
          .post("http://localhost:5000/otp/NewUser", data)
          .then((res) => {
            setData({
              ...data,
              systemOTP: res.data,
            });
            setAlert("OTP sent to your email & phone");
            setStep(2);
          })
          .catch((err) => {
            setAlert(err.response.data.message);
          });
      } else {
        setAlert("Password must be atleast 6 characters long");
      }
    } else {
      setAlert("Password & Re-Password did not match");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (document.getElementById("terms").checked) {
      if (data.otp.toString() === data.systemOTP.toString()) {
        axios
          .post("http://localhost:5000/auth/register", data)
          .then((res) => {
            setAlert(res.data.message);
            setStep(0);
            setData("");
          })
          .catch((err) => {
            setAlert(err.response.data.message);
          });
      } else {
        setAlert("Invalid OTP");
      }
    } else {
      setAlert("Please accept the terms and conditions");
    }
  };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner">
          <div className="card">
            <div className="card-body">
              <div className="app-brand justify-content-center">
                <img
                  className="app-brand-logo"
                  src={Logo}
                  alt="logo"
                  height={"100px"}
                />
              </div>
              <h4 className="mb-2">Welcome to Cast My Vote! 👆</h4>
              <p className="mb-4">Please Register to get Started!</p>
              <p className="text-center" style={{ color: "red" }}>
                {alert}
              </p>
              <form className="mb-3">
                {step === 0 && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        value={data.name}
                        placeholder="Enter Full Name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Contact No.</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={handleChange}
                        value={data.phone}
                        placeholder="Enter Phone No. without Country Code"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        placeholder="Enter your email"
                      />
                    </div>
                    <button
                      onClick={regStart}
                      className="btn btn-primary d-grid w-100"
                    >
                      Continue
                    </button>
                  </>
                )}
                {step === 1 && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        placeholder="Enter your email"
                        readOnly
                      />
                    </div>
                    <div className="mb-3 form-password-toggle">
                      <label className="form-label">Password</label>
                      <div className="input-group input-group-merge">
                        <input
                          type={showPassword1 ? "text" : "password"}
                          className="form-control"
                          name="password"
                          onChange={handleChange}
                          value={data.password}
                          placeholder="Enter your password"
                        />
                        <span className="input-group-text cursor-pointer">
                          <i
                            onClick={() => setShowPassword1(!showPassword1)}
                            className={
                              showPassword1 ? "bx bx-show" : "bx bx-hide"
                            }
                          />
                        </span>
                      </div>
                    </div>
                    <div className="mb-3 form-password-toggle">
                      <label className="form-label">Re-Password</label>
                      <div className="input-group input-group-merge">
                        <input
                          type={showPassword2 ? "text" : "password"}
                          className="form-control"
                          name="repassword"
                          onChange={handleChange}
                          value={data.repassword}
                          placeholder="Enter your password again"
                        />
                        <span className="input-group-text cursor-pointer">
                          <i
                            onClick={() => setShowPassword2(!showPassword2)}
                            className={
                              showPassword2 ? "bx bx-show" : "bx bx-hide"
                            }
                          />
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={sendOTP}
                      className="btn btn-primary d-grid w-100"
                    >
                      Send OTP
                    </button>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        placeholder="Enter your email"
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">OTP</label>
                      <input
                        type="text"
                        className="form-control"
                        name="otp"
                        onChange={handleChange}
                        value={data.otp}
                        placeholder="Enter OTP Receive on your email"
                      />
                    </div>
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="terms"
                          name="terms"
                        />
                        <label className="form-check-label">
                          I agree to
                          <a href="javascript:void(0);">
                            &nbsp;Privacy Policy &amp; Terms
                          </a>
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary d-grid w-100"
                    >
                      Continue
                    </button>
                  </>
                )}
              </form>
              <p className="text-center">
                <span>Already have an account? </span>
                <button onClick={() => navigate("/login")}>
                  <span>Login Now</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
