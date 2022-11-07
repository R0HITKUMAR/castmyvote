import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import Applications from "./components/application/Applications";
import Voters from "./components/voter/Voters";
import Modal from "./components/single/Modal";

export default function Admin(props) {
  const [global, setGlobal] = React.useState({
    doc: "https://s3.amazonaws.com/files.rohitkumar/cmv_id/CMVJEPIQE864-635775cc4168e717fcb0a1f5.pdf",
  });
  const hideSidebar = () => {
    document.querySelector("html").classList.remove("layout-menu-expanded");
  };

  return (
    <>
      {global.doc && <Modal global={global} setGlobal={setGlobal} />}
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar hideSidebar={hideSidebar} logout={props.logout} />
          <div className="layout-page">
            <Navbar logout={props.logout} />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <Routes>
                  <Route path="/*" element={<Home />} />
                  <Route
                    path="/applications"
                    element={
                      <Applications global={global} setGlobal={setGlobal} />
                    }
                  />
                  <Route
                    path="/voters"
                    element={<Voters global={global} setGlobal={setGlobal} />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={hideSidebar}
          className="layout-overlay layout-menu-toggle"
        ></div>
      </div>
    </>
  );
}
