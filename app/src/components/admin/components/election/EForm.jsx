import React from "react";
import axios from "../../../common/axios.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function EForm() {
  const navigate = useNavigate();
  const [data, setData] = React.useState({
    code: "",
    name: "",
    description: "",
    start_date: "",
    s_date: "",
    end_date: "",
    e_date: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.code !== "" &&
      data.name !== "" &&
      data.description !== "" &&
      data.s_date !== "" &&
      data.e_date !== ""
    ) {
      if (data.s_date < data.e_date) {
        data.start_date = new Date(data.s_date).toLocaleString();
        data.end_date = new Date(data.e_date).toLocaleString();
        axios
          .post("/election/add", data)
          .then((res) => {
            console.log(res.data.election);
            Swal.fire({
              title: "Success!",
              text:
                "Election added successfully with Election ID: " + res.data,
              icon: "success",
            });
            navigate("/elections");
          })
          .catch((err) => console.log(err));
      } else {
        Swal.fire({
          title: "Error!",
          text: "Start date should be less than end date",
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the fields",
        icon: "error",
      });
    }
  };

  return (
    <div className="row">
      <h4 className="fw-bold py-3 mb-1">
        <span className="text-muted fw-light">Home / Elections </span> / Add
        Election
        <button
          onClick={() => navigate("/")}
          type="button"
          class="btn btn-primary btn-sm m-1"
          style={{ float: "right" }}
        >
          <i className="fa-solid fa-house"></i>
        </button>
        <button
          onClick={() => navigate("/elections")}
          type="button"
          class="btn btn-primary btn-sm m-1"
          style={{ float: "right" }}
        >
          <i className="fa-solid fa-backward"></i>
        </button>
      </h4>
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <form>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Election Name</label>
                <div className="col-sm-8">
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={data.name}
                    className="form-control"
                    placeholder="Enter Election Code"
                  />
                </div>
                <div className="col-sm-2">
                  <input
                    type="text"
                    name="code"
                    onChange={handleChange}
                    value={data.code}
                    className="form-control"
                    placeholder="Enter Election Code"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Start Date</label>
                <div className="col-sm-10">
                  <input
                    type="datetime-local"
                    name="s_date"
                    onChange={handleChange}
                    value={data.s_date}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">End Date</label>
                <div className="col-sm-10">
                  <input
                    type="datetime-local"
                    name="e_date"
                    onChange={handleChange}
                    value={data.e_date}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                  <textarea
                    name="description"
                    onChange={handleChange}
                    value={data.description}
                    rows="3"
                    className="form-control"
                    placeholder="Enter Election Description"
                  />
                </div>
              </div>
              <div style={{ float: "right" }}>
                <button
                  onClick={() => navigate("/elections")}
                  className="btn btn-primary btn-sm m-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="btn btn-primary btn-sm m-1"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
