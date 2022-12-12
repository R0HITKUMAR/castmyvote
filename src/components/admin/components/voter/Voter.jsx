import React from "react";

export default function Voter({ index, data, setOffcanvas, setGlobal }) {
  return (
    <>
      <tr>
        <td>
          <strong>{index}</strong>
        </td>
        <td>{data.id_no}</td>
        <td>{data.id_date}</td>
        <td>
          <img src={data.photo} height="30px" alt="Avatar" className="me-2" />
          {data.name}
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
            <i className="fa-solid fa-eye" /> View
          </button>
        </td>
        <td>
          <button
            className="btn btn-sm btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#attachmentModal"
            onClick={() => setGlobal({ doc: data.id_doc })}
            disabled={data.id_doc === "" ? true : false}
          >
            <i className="fa-solid fa-eye" /> View
          </button>
        </td>
      </tr>
    </>
  );
}
