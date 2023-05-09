import React from "react";
import img from "../../assets/img/no-record.svg";

export default function NoRecord() {
  return (
    <div className="text-center norecord">
      <img src={img} alt="No Record" style={{ height: "55vh" }} />
    </div>
  );
}
