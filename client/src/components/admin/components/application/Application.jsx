import React from "react";

export default function Application({ index, data, setOffcanvas, setGlobal }) {
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
            type="button"
            className="btn btn-sm btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#attachmentModal"
            onClick={() => setGlobal({ doc: data.proof })}
          >
            View
          </button>
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
