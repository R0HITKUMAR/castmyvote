import React from "react";

export default function CView({ info, index }) {
  const [sendColId, setSendColId] = React.useState("");

  const handleexpand = (id) => {
    if (sendColId === id) {
      setSendColId("");
    } else {
      setSendColId(id);
    }
  };

  return (
    <>
      {info.candidates &&
        info.candidates.map((item, index) => {
          return (
            <div className="card mb-2" key={index}>
              <div className="row p-1">
                <div className="col-md-2">
                  <img
                    src={item.candidate_dp}
                    alt="Candidate"
                    className="d-block rounded"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="col-md-7 p-1">
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
                <div className="col-md-2">
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
                  </p>
                </div>
              )}
            </div>
          );
        })}
    </>
  );
}
