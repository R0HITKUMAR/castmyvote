import React from "react";
import Logo from "../assets/images/logo/logo.svg";
import { useNavigate } from "react-router-dom";
import PPT from "../assets/docs/ppt.pdf";
import Report from "../assets/docs/report.pdf";
import Paper from "../assets/docs/paper.pdf";

export default function Navbar(props) {
  const navigate = useNavigate();
  return (
    <header className="theme-main-menu sticky-menu theme-menu-two">
      <div className="inner-content position-relative">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo order-lg-0">
            <a
              href="javascript:void(0)"
              onClick={() => navigate("/")}
              className="d-block"
            >
              <img src={Logo} alt="" width={120} />
            </a>
          </div>
          <div className="right-widget d-flex align-items-center ms-auto ms-lg-0 order-lg-3">
            <a
              href="https://app.castmyvote.ml"
              className="contact-btn-two fs-17 fw-500 tran3s d-none d-lg-block"
            >
              Login
            </a>
          </div>
          <nav className="navbar navbar-expand-lg order-lg-2">
            <button
              className="navbar-toggler d-block d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="d-block d-lg-none">
                  <div className="logo">
                    <a
                      href="javascript:void(0)"
                      onClick={() => navigate("/")}
                      className="d-block"
                    >
                      <img src={Logo} alt="" width={120} />
                    </a>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link"
                    href="javascript:void(0)"
                    onClick={() => props.setDoc("Video")}
                  >
                    Overview
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link" href="https://aboutrohit.in">
                    Contact Us
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                  >
                    Others
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        href="javascript:void(0)"
                        className="dropdown-item"
                        onClick={() => props.setDoc(Report)}
                      >
                        <span>Project Report</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        className="dropdown-item"
                        onClick={() => props.setDoc(PPT)}
                      >
                        <span>Project Report</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:void(0)"
                        className="dropdown-item"
                        onClick={() => props.setDoc(Paper)}
                      >
                        <span>Research Paper</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="mobile-content d-block d-lg-none">
                <div className="d-flex flex-column align-items-center justify-content-center mt-70">
                  <a
                    href="https://app.castmyvote.ml"
                    className="contact-btn-two fs-17 fw-500 tran3s"
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
