import React from "react";

export default function Navbar(props) {
  const [profileOpen, setProfileOpen] = React.useState(false);

  const showSidebar = () => {
    document.querySelector("html").classList.add("layout-menu-expanded");
  };

  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
          <i onClick={showSidebar} className="bx bx-menu bx-sm" />
        </a>
      </div>
      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <div className="navbar-nav align-items-center">
          <div className="nav-item d-flex align-items-center"></div>
        </div>
        <ul className="navbar-nav flex-row align-items-center ms-auto">
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
              <span className="fw-semibold d-block m-1">
                Rohit Kumar
              </span>
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
                  <span className="fw-semibold d-block">Rohit Kumar</span>
                  <small className="text-muted">Admin</small>
                </div>
              </div>
            </a>
          </li>
          <li>
            <div className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <i className="bx bx-user me-2" />
              <span className="align-middle">My Profile</span>
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <i className="bx bx-cog me-2" />
              <span className="align-middle">Settings</span>
            </a>
          </li>
          <li>
            <div className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item" onClick={props.logout}>
              <i className="bx bx-power-off me-2" />
              <span className="align-middle">Log Out</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
