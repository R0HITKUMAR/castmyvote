import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/img/logo/logo.svg";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = React.useState(false);
  // const [logoutTime, setLogoutTime] = React.useState("");

  // Load the time countdown
  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     const logouttime = localStorage.getItem("logoutTime");
  //     // Calculate the time remaining
  //     const timeLeft = logouttime - new Date().getTime();
  //     // Convert the time remaining to minutes and seconds
  //     const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  //     const seconds = Math.floor((timeLeft / 1000) % 60);
  //     // Display the time remaining
  //     setLogoutTime(`${minutes}:${seconds} mins`);
  //     if (timeLeft < 0) {
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("logoutTime");
  //       window.location.reload();
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [logoutTime]);

  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <img
          src={Logo}
          alt="Logo"
          className="navbar-brand-img"
          style={{ height: "50px" }}
        />
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <span className="text-danger mr-2">
            {/* Lime Left: <b>{logoutTime}</b> */}
          </span>
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              onClick={() => setProfileOpen(!profileOpen)}
              href="javascript:void(0);"
            >
              <div className="avatar avatar-online">
                <img
                  src="https://www.shareicon.net/data/2016/05/24/770139_man_512x512.png"
                  alt=""
                  className="w-px-40 h-auto rounded-circle"
                />
              </div>
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link dropdown-toggle hide-arrow"
              onClick={() => setProfileOpen(!profileOpen)}
              href="javascript:void(0);"
            >
              <span className="fw-semibold d-block m-1">{props.user.name}</span>
            </a>
          </li>
        </ul>
        <ul
          className={`dropdown-menu dropdown-menu-end ${profileOpen ? "show" : ""
            }`}
          data-bs-popper="none"
        >
          <li>
            <a className="dropdown-item" href="#">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar avatar-online">
                    <img
                      src="https://www.shareicon.net/data/2016/05/24/770139_man_512x512.png"
                      alt=""
                      className="w-px-40 h-auto rounded-circle"
                    />
                  </div>
                </div>
                <div className="flex-grow-1">
                  <span className="fw-semibold d-block">{props.user.name}</span>
                  <small className="text-muted">(Voter)</small>
                </div>
              </div>
            </a>
          </li>
          <li>
            {props.user.id_no && (<small className="dropdown-item text-center">{props.user.id_no}</small>)}
          </li>
          <li>
            <div className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" onClick={() => navigate("/")} href="javascript:void(0)">
              <i className="bx bx-user me-2" />
              <span className="align-middle">Home</span>
            </a>
          </li>
          {!props.user.id_no && !props.user.application_no && <li>
            <a className="dropdown-item" onClick={() => navigate("/registration")} href="javascript:void(0)">
              <i className="bx bx-cog me-2" />
              <span className="align-middle">Apply Now</span>
            </a>
          </li>}
          {props.user.id_no && <li>
            <a className="dropdown-item" onClick={() => navigate("/history")} href="javascript:void(0)">
              <i className="bx bx-cog me-2" />
              <span className="align-middle">My Voting History</span>
            </a>
          </li>}
          <li>
            <div className="dropdown-divider" />
          </li>
          <li>
            <a
              className="dropdown-item"
              href="javascript:void(0);"
              onClick={props.logout}
            >
              <i className="bx bx-power-off me-2" />
              <span className="align-middle">Log Out</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
