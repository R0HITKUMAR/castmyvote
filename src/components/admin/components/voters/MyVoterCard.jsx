import React from "react";

export default function MyVoterCard({
  index,
  data,
  setOffcanvas,
  setDoc,
  setCMVData,
}) {
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
            View
          </button>
        </td>
        <td>
          <button
            className="btn btn-sm btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#cmv-voter-id"
            onClick={() => setCMVData(data)}
          >
            View
          </button>
        </td>
      </tr>
    </>
  );
}
