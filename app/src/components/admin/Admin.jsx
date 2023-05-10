import React from "react";
import axios from "../common/axios.js";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import Applications from "./components/application/Applications";
import Voters from "./components/voter/Voters";
import Elections from "./components/election/Elections";
import Form from "./components/application/Form";
import Modal from "../common/Modal";
import Stats from "./components/stats/Stats";
import Newsletter from "./components/forms/Newsletter";
import Query from "./components/forms/Query";

export default function Admin(props) {
  const [count, setCount] = React.useState({
    applications: 0,
    voters: 0,
    elections: 0,
    upcoming_elections: 0,
    ongoing_election: 0,
    completed_elections: 0,
  });

  const hideSidebar = () => {
    document.querySelector("html").classList.remove("layout-menu-expanded");
  };

  return (
    <>
      {props.global.doc && (
        <Modal global={props.global} setGlobal={props.setGlobal} />
      )}
      <Stats count={count} setCount={setCount} />
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Sidebar hideSidebar={hideSidebar} logout={props.logout} />
          <div className="layout-page">
            <Navbar logout={props.logout} global={props.global} />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <Routes>
                  <Route path="/*" element={<Home count={count} />} />
                  <Route
                    path="/applications/*"
                    element={
                      <Applications
                        global={props.global}
                        setGlobal={props.setGlobal}
                      />
                    }
                  />
                  <Route
                    path="/voters/*"
                    element={
                      <Voters
                        global={props.global}
                        setGlobal={props.setGlobal}
                      />
                    }
                  />
                  <Route
                    path="/voters/newVoter"
                    element={
                      <Form global={props.global} setGlobal={props.setGlobal} />
                    }
                  />
                  <Route
                    path="/elections/*"
                    element={
                      <Elections
                        global={props.global}
                        setGlobal={props.setGlobal}
                      />
                    }
                  />
                  <Route path="/newsletter/*" element={<Newsletter />} />
                  <Route path="/query/*" element={<Query />} />
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
