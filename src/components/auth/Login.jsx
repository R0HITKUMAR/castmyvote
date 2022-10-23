import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo/logo.svg";

export default function Login(props) {
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState("");
  const [step, setStep] = React.useState(0);
  const [showPassword, setShowPassword] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
    otp: "",
    systemOTP: "",
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
    const { email, password } = data;
    if (email !== "" && password !== "" && email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      axios
        .post("http://localhost:5000/otp/login", data)
        .then((res) => {
          setData({
            ...data,
            systemOTP: res.data,
          });
          setAlert("OTP sent to your email");
          setStep(1);
        })
        .catch((err) => {
          setAlert(err.response.data.message);
        });
    } else {
      setAlert("Please fill all the fields Correctly");
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.otp.toString() === data.systemOTP.toString()) {
      axios
        .post("http://localhost:5000/auth/login", data)
        .then((res) => {
          setAlert(res.data.message);
          if (res.data.status === 0) {
            localStorage.setItem("token", res.data.token);
            props.setUser(res.data.user);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    } else {
      setAlert("Incorrect OTP");
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
              <p className="mb-4">Please Login to your account</p>
              <p className="text-center" style={{ color: "red" }}>
                {alert}
              </p>
              <form className="mb-3">
                {step === 0 && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        onChange={handleChange}
                        value={data.email}
                        placeholder="Enter your Email Address"
                      />
                    </div>
                    <div className="mb-3 form-password-toggle">
                      <div className="d-flex justify-content-between">
                        <label className="form-label">Password</label>
                        <button onClick={() => navigate("/reset")}>
                          <small>Forgot Password?</small>
                        </button>
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
                    <div className="mb-3">
                      <button
                        onClick={sendOTP}
                        className="btn btn-primary d-grid w-100"
                      >
                        Continue
                      </button>
                    </div>
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
                        placeholder="Enter your Email Address"
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
                        placeholder="Enter your OTP"
                      />
                    </div>
                    <div className="mb-3">
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary d-grid w-100"
                      >
                        Login
                      </button>
                    </div>
                  </>
                )}
              </form>
              <p className="text-center">
                <span>Not Registered?</span>
                <button onClick={() => navigate("/register")}>
                  <span>Create an account</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
