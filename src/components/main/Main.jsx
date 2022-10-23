import React from "react";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo/logo.svg";

export default function Main() {
  const navigate = useNavigate();
  return (
    <section id="main-landing" className="text-light text-center">
      <img src={logo} alt="logo" className="logo img-fluid" />
      <br></br>
      <button className="btn" onClick={() => navigate("/login")}>
        Login
      </button>
      <button className="btn" onClick={() => navigate("/register")}>
        Sign Up
      </button>
    </section>
  );
}
