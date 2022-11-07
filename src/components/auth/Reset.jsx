import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo/logo.svg";

export default function Reset() {
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState("");
  const [step, setStep] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    otp: "",
    systemOTP: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const sendOTP = (e) => {
    e.preventDefault();
    if (data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      axios
        .post("http://localhost:5000/otp/reset", data)
        .then((res) => {
          setData({
            ...data,
            systemOTP: res.data,
          });
          setAlert("OTP sent to your email & Phone");
          setStep(1);
        })
        .catch((err) => {
          setAlert(err.response.data.message);
        });
    } else {
      setAlert("Please fill all the fields");
    }
  };

  const verifyOTP = (e) => {
    e.preventDefault();
    if (data.otp.toString() === data.systemOTP.toString()) {
      setAlert("OTP Verified Successfully");
      setStep(2);
    } else {
      setAlert("Invalid OTP");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 2) {
      axios
        .post("http://localhost:5000/auth/reset", data)
        .then((res) => {
          setAlert(res.data.message);
          if (res.data.success === true) {
            setStep(0);
            setData({
              ...data,
              email: "",
            });
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      setAlert("Something Went Wrong");
    }
  };

  return (
    <div className="container-xxl">
      <div className="authentication-wrapper authentication-basic container-p-y">
        <div className="authentication-inner py-4">
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
              <h4 className="mb-2">Forgot Password? 🔒</h4>
              <p className="mb-4">
                Enter your email and we'll send you OTP to reset your password
              </p>
              <p className="text-center" style={{ color: "red" }}>
                {alert}
              </p>
              <form className="mb-3">
                {step === 0 && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                    </div>
                    <button
                      onClick={sendOTP}
                      className="btn btn-primary d-grid w-100"
                    >
                      Send OTP
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
                    <div className="mb-3">
                      <label className="form-label">OTP</label>
                      <input
                        type="text"
                        className="form-control"
                        name="otp"
                        onChange={handleChange}
                        placeholder="Enter OTP Send over your Email"
                      />
                    </div>
                    <button
                      onClick={verifyOTP}
                      className="btn btn-primary d-grid w-100"
                    >
                      Verify OTP
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
                        value={data.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        readOnly
                      />
                    </div>
                    <div className="mb-3 form-password-toggle">
                      <div className="d-flex justify-content-between">
                        <label className="form-label">Password</label>
                      </div>
                      <div className="input-group input-group-merge">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          onChange={handleChange}
                          value={data.password}
                          name="password"
                          placeholder="Enter your Password"
                        />
                        <span className="input-group-text cursor-pointer">
                          <i
                            onClick={() => setShowPassword(!showPassword)}
                            className={
                              showPassword ? "bx bx-show" : "bx bx-hide"
                            }
                          />
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary d-grid w-100"
                    >
                      Change Password
                    </button>
                  </>
                )}
              </form>
              <div className="text-center">
                <a
                  onClick={() => navigate("/login")}
                  href="javascript:void(0)"
                  className="d-flex align-items-center justify-content-center"
                >
                  <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm" />
                  Back to login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
