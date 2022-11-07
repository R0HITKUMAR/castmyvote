import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Intro from "./components/home/Intro";
import CMV from "./components/card/CMV";
import Application from "./components/application/Application";
import NApplication from "./components/application/NApplication";
import Form from "./components/form/Form";
import Duplicate from "./components/form/Duplicate";

export default function User(props) {
  return (
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
                        <Intro user={props.user} />
                        {props.user.id_no && <CMV user={props.user} />}
                        {props.user.application_no && !props.user.id_no && (
                          <Application user={props.user} />
                        )}
                        {!props.user.application_no && !props.user.id_no && (
                          <NApplication />
                        )}
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
                          <Form user={props.user} />
                        )}
                      </>
                    }
                  />
                  <Route path="*" element={<div>Not Found</div>} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
