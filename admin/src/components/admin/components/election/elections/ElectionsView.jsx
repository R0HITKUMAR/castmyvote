import React from "react";
import axios from "../../../../common/axios.js";
import NoRecord from "../../../../common/NoRecord";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ElectionRow from "./ElectionRow";

export default function Elections(props) {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/election/retrieveAll")
      .then((res) => {
        setData(res.data.elections);
      })
      .catch((err) => console.log(err));
  }, [data]);

  const deleteElection = (id, status) => {
    if (status === "Upcoming") {
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
            .get(`/election/deleteOne/${id}`)
            .then((res) => {
              Swal.fire("Deleted!", res.data.message, "success");
            });
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You can't delete this election!",
      });
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-1">
        <span className="text-muted fw-light">Home /</span> Elections
        <button
          onClick={() => navigate("/elections/addElection")}
          type="button"
          class="btn btn-primary btn-sm"
          style={{ float: "right" }}
        >
          Add Election
        </button>
      </h4>
      <div className="card">
        <div className="table-responsive text-nowrap">
          <table className="table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>S No.</th>
                <th>Election ID</th>
                <th>Election Name</th>
                <th>Status</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {data && data.length > 0 ? (
                data.map((item, index) => {
                  return (
                    <ElectionRow
                      key={index}
                      deleteE={deleteElection}
                      index={index}
                      data={item}
                    />
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">
                    <NoRecord />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
