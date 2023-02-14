import React from "react";
import { useNavigate } from "react-router-dom";

export default function ElectionRow({ data, index, deleteE }) {
  const navigate = useNavigate();

  return (
    <>
      <tr>
        <td>
          <strong>{index + 1}</strong>
        </td>
        <td>{data.election_id}</td>
        <td>
          {data.name} [{data.code}]
        </td>
        <td>
          <span className="badge bg-label-primary me-1">{data.status}</span>
        </td>
        <td>
          <i
            style={{ cursor: "pointer" }}
            className="fa-solid fa-eye m-1"
            onClick={() => navigate(`/elections/${data.election_id}`)}
          ></i>
          {data.status === "Completed" && (<i
            style={{ cursor: "pointer" }}
            className="fa-solid fa-square-poll-vertical m-1"
            onClick={() =>
              navigate(`/elections/${data.election_id}/result`)
            }
          />)}
          {data.status === "Upcoming" && (
            <>
              <i
                style={{ cursor: "pointer" }}
                className="fa-solid fa-edit m-1"
                onClick={() =>
                  navigate(`/elections/updateElection/${data.election_id}`)
                }
              />
              <i
                style={{ cursor: "pointer" }}
                className="fa-solid fa-trash m-1"
                onClick={() => deleteE(data.election_id, data.status)}
              />
            </>
          )}
        </td>
      </tr>
    </>
  );
}
