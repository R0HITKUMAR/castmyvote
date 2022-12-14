import axios from "../../../../common/axios.js";
import React from "react";
import Swal from "sweetalert2";

export default function CView({ info, index }) {
  const [sendColId, setSendColId] = React.useState("");

  const handleexpand = (id) => {
    if (sendColId === id) {
      setSendColId("");
    } else {
      setSendColId(id);
    }
  };

  const deleteCandidate = (id) => {
    if (info.status === "Upcoming") {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .get(
              `/election/${info.election_id}/deleteOneCandidate/${id}`
            )
            .then((res) => {
              Swal.fire("Deleted!", res.data.message, "success");
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            });
        }
      });
    }
  };

  return (
    <>
      {info.candidates &&
        info.candidates.map((item, index) => {
          return (
            <div className="row">
              <div className="card mb-2" key={index}>
                <div className="row p-1">
                  <div className="col-md-2 col-6">
                    <img
                      src={item.candidate_dp}
                      alt="Candidate"
                      className="d-block rounded"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="col-md-7 col-5 p-1">
                    <div className="text-center">
                      <span>{item.candidate_id}</span>
                      <h5>
                        {item.candidate_name}
                        <br />
                        <small>({item.candidate_party})</small>
                      </h5>
                      <i
                        className={
                          sendColId === item.candidate_id
                            ? "fa-solid fa-chevron-up"
                            : "fa-solid fa-chevron-down"
                        }
                        style={{ cursor: "pointer" }}
                        onClick={() => handleexpand(item.candidate_id)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <img
                      src={item.candidate_logo}
                      alt="Logo"
                      className="d-block rounded"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                {sendColId === item.candidate_id && (
                  <div className="text-center">
                    <p>
                      {item.candidate_address}
                      <br />
                      {item.candidate_email} | Phone : {item.candidate_phone}
                      <br />
                      {info.status === "Upcoming" && (
                        <i
                          onClick={() => deleteCandidate(item.candidate_id)}
                          className="fa-solid fa-trash"
                          style={{ cursor: "pointer" }}
                        ></i>
                      )}
                    </p>
                  </div>
                )}
              </div></div>
          );
        })}
    </>
  );
}
