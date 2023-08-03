import React from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo/logo.svg";

export default function Main(props) {
  const navigate = useNavigate();
  return (
    <section id="main-landing" className="text-light text-center">
      <div
        style={{ float: "right", marginRight: "20px", marginTop: "20px" }}
      ></div>
      <img src={logo} alt="logo" className="logo img-fluid" />
      <br />
      {props.global.s_status ? (
        <span className="badge bg-label-primary">• Live</span>
      ) : (
        <span class="badge bg-label-dark">• Offline</span>
      )}
      <br></br>
      <button className="btn" onClick={() => navigate("/login")}>
        Login
      </button>
      <button className="btn" onClick={() => navigate("/register")}>
        Sign Up
      </button>
      <br />
      <div className="footer bottom-fixed bottom-0 text-center text-dark mt-5">
        <p className="m-0" style={{ fontFamily: "monospace" }}>
          Developed, Maintained and Hosted with ❤️ by{" "}
          <a
            href="https://aboutrohit.in"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none", color: "black" }}
          >
            <u>Rohit Kumar</u>
          </a>
        </p>
      </div>
    </section>
  );
}
