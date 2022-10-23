import React from "react";

export default function ApproveVoterCard({ index, data, setOffcanvas }) {
 
  return (
    <>
      <tr>
        <td>
          <strong>{index}</strong>
        </td>
        <td>{data.application_no}</td>
        <td>{data.timestamp}</td>
        <td>
          <img src={data.photo} height="30px" alt="Avatar" className="me-2" />
          {data.name}
        </td>
        <td>
          <span className="badge bg-label-primary me-1">{data.status}</span>
        </td>
        <td>
          <button
            className="btn btn-sm btn-primary"
            type="button"
            onClick={() => setOffcanvas(data)}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasEnd"
            aria-controls="offcanvasEnd"
          >
            View
          </button>
        </td>
      </tr>
    </>
  );
}
