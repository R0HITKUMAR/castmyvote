import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import Welcome from "./components/intro/Welcome";
import PVoters from "./components/stats/PVoters";
import RVoters from "./components/stats/RVoters";
import ApproveVoters from "./components/voters/ApproveVoters";
import MyVoters from "./components/voters/MyVoters";
import Modal from "./components/Modal";

export default function Admin(props) {
  const [doc, setDoc] = React.useState(null);
  const hideSidebar = () => {
    document.querySelector("html").classList.remove("layout-menu-expanded");
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar hideSidebar={hideSidebar} logout={props.logout} />
        <div className="layout-page">
          <Navbar logout={props.logout} />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <Routes>
                <Route
                  path="/*"
                  element={
                    <>
                      <div className="row">
                        <Welcome />
                        <div className="col-lg-4 col-md-4 order-1">
                          <div className="row">
                            <RVoters />
                            <PVoters />
                          </div>
                        </div>
                      </div>
                    </>
                  }
                />
                <Route path="/voters/Approve" element={<ApproveVoters />} />
                <Route path="/voters" element={<MyVoters/>} />
              </Routes>
              <Modal doc={doc} setDoc={setDoc} />
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={hideSidebar}
        className="layout-overlay layout-menu-toggle"
      ></div>
    </div>
  );
}
