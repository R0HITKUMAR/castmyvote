import React from "react";
import Intro from "./Intro";
import CMV from "../card/CMV";
import Application from "../application/Application";
import NApplication from "../application/NApplication";
import Election from "../election/Election";
import Info from "./Info";
import NID from "./NID";
import History from "./History";

export default function Home(props) {
  const path = window.location.pathname.split("/")[1];
  return (
    <>
      <div className="col-lg-7 mb-4">
        <Intro user={props.user} />
        <br />
        <div className="row">
          <div className="col-6">
            {props.user.id_no && (
              <CMV user={props.user} setGlobal={props.setGlobal} />
            )}
            {props.user.application_no && !props.user.id_no && (
              <Application user={props.user} />
            )}
            {!props.user.application_no && !props.user.id_no && (
              <NApplication />
            )}
          </div>
          <div className="col-6">
            <Info user={props.user} />
          </div>
        </div>
      </div>
      <div className="col-lg-5 mb-4">
        {path !== "history" && props.user.id_no && <Election user={props.user} />}
        {path === "history" && props.user.id_no && <History user={props.user} />}
        {!props.user.id_no && <NID user={props.user} />}

      </div>
    </>
  );
}
