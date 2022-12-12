import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Intro from "./components/home/Intro";
import Form from "./components/form/Form";
import Duplicate from "./components/form/Duplicate";
import Home from "./components/home/Home";
import Modal from "../common/Modal";
import EPage from "./components/election/info/EPage";
import EResult from "./components/election/result/EResult";
import EVote from "./components/election/vote/EVote";

export default function User(props) {
  const [global, setGlobal] = React.useState({
    doc: "",
  });
  return (
    <>
      {global.doc && <Modal global={global} setGlobal={setGlobal} />}
      <div className="layout-wrapper layout-content-navbar layout-without-menu">
        <div className="layout-container">
          <div className="layout-page">
            <Navbar user={props.user} logout={props.logout} />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  <Routes>
                    <Route
                      path="/*"
                      element={
                        <>
                          <Home user={props.user} setGlobal={setGlobal} />
                        </>
                      }
                    />
                    <Route
                      path="/registration"
                      element={
                        <>
                          {props.user.application_no || props.user.id_no ? (
                            <Duplicate user={props.user} />
                          ) : (
                            <Form
                              user={props.user}
                              global={global}
                              setGlobal={setGlobal}
                            />
                          )}
                        </>
                      }
                    />
                    <Route path="/election/:id" element={<EPage user={props.user} />} />
                    <Route path="/election/:id/vote" element={<EVote user={props.user} />} />
                    <Route path="/election/:id/result" element={<EResult user={props.user} />} />
                    <Route path="*" element={<div>Not Found</div>} />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
