import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Toast from "../../../../common/SweetAlert";

export default function CForm() {
  const navigate = useNavigate();
  const [perc, setPerc] = React.useState(0);
  const { id } = useParams();
  const [files, setFiles] = React.useState({
    image: "",
    logo: "",
  });
  const [images, setImages] = React.useState({
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLqfekg_kitC_QJ5kgBUTh2tt5EIcxEnQDQ&usqp=CAU",
    logo: "https://sambadenglish.com/wp-content/uploads/2016/12/poll-election-symbol-wikipedia.png",
  });

  const handleImageFile = (e) => {
    setImages({ ...images, image: URL.createObjectURL(e.target.files[0]) });
    setFiles({ ...files, image: e.target.files[0] });
  };

  const handleLogoFile = (e) => {
    setImages({ ...images, logo: URL.createObjectURL(e.target.files[0]) });
    setFiles({ ...files, logo: e.target.files[0] });
  };

  const handleImgUpload = async (e) => {
    e.preventDefault();
    if (files.image) {
      setPerc(perc + 10);
      const formData = new FormData();
      formData.append("file", files.image);
      formData.append("location", "castmyvote/img");
      setPerc(perc + 20);
      try {
        const res = await axios.post(
          "https://server.castmyvote.ml/file/upload",
          formData
        );
        setPerc(100);
        console.log(res.data.Location);
        Toast.fire({
          icon: "success",
          title: "Image Uploaded Successfully",
        });
        setData((prev) => {
          return {
            ...prev,
            candidate_dp: res.data.Location,
          };
        });
        setPerc(0);
      } catch (err) {
        console.log(err);
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "Please Select a File",
      });
    }
  };
  const handleLogoUpload = async (e) => {
    e.preventDefault();
    if (files.logo) {
      setPerc(perc + 10);
      const formData = new FormData();
      formData.append("file", files.logo);
      formData.append("location", "castmyvote/img");
      setPerc(perc + 20);
      try {
        const res = await axios.post(
          "https://server.castmyvote.ml/file/upload",
          formData
        );
        setPerc(100);
        console.log(res.data.Location);
        Toast.fire({
          icon: "success",
          title: "Image Uploaded Successfully",
        });
        setData((prev) => {
          return {
            ...prev,
            candidate_logo: res.data.Location,
          };
        });
        setPerc(0);
      } catch (err) {
        console.log(err);
      }
    } else {
      Toast.fire({
        icon: "error",
        title: "Please Select a File",
      });
    }
  };

  const [data, setData] = React.useState({
    candidate_name: "",
    candidate_party: "",
    candidate_dp: "",
    candidate_logo: "",
    candidate_phone: "",
    candidate_email: "",
    candidate_address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.candidate_name &&
      data.candidate_party &&
      data.candidate_dp &&
      data.candidate_logo &&
      data.candidate_phone &&
      data.candidate_email &&
      data.candidate_address
    ) {
      axios
        .post(`https://server.castmyvote.ml/election/${id}/addCandidate`, data)
        .then((res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Candidate Added",
            text:
              "Candidate has been added successfully with ID: " + res.data.id,
          });

          navigate(`/elections/${id}`);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Please fill all the fields",
      });
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        {perc !== 0 ? (
          <div className="progress m-1" style={{ width: "100%" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: perc + "%" }}
              aria-valuenow={perc}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {perc}%
            </div>
          </div>
        ) : null}
        <form>
          <div className="row mb-3">
            <div className="col-3 text-center">
              <center>
                <div className="user-img p-1">
                  <label>
                    <img
                      src={data.candidate_dp || images.image}
                      alt="user-avatar"
                      className="d-block rounded"
                      width={100}
                      height={100}
                    />
                    <input
                      type="file"
                      id="upload"
                      name="image"
                      onChange={handleImageFile}
                      className="account-file-input"
                      accept="image/png, image/jpeg"
                      hidden
                    />
                  </label>
                  {!data.candidate_dp && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={handleImgUpload}
                    >
                      Upload
                    </button>
                  )}
                </div>
                <div className="user-logo p-1">
                  <label>
                    <img
                      src={data.candidate_logo || images.logo}
                      alt="user-avatar"
                      className="d-block rounded"
                      width={100}
                      height={100}
                    />

                    <input
                      type="file"
                      id="upload"
                      name="logo"
                      onChange={handleLogoFile}
                      className="account-file-input"
                      accept="image/png, image/jpeg"
                      hidden
                    />
                  </label>
                  {!data.candidate_logo && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={handleLogoUpload}
                    >
                      Upload
                    </button>
                  )}
                </div>
              </center>
            </div>
            <div className="col-9">
              <label className="col-form-label">Fullname</label>
              <div className="input-group input-group-merge">
                <span className="input-group-text">
                  <i className="bx bx-user" />
                </span>
                <input
                  type="text"
                  name="candidate_name"
                  className="form-control"
                  onChange={handleChange}
                  value={data.candidate_name}
                  placeholder="Enter Fullname"
                />
              </div>
              <label className="col-form-label">Party Name</label>
              <div className="input-group input-group-merge">
                <span className="input-group-text">
                  <i className="bx bx-buildings" />
                </span>
                <input
                  type="text"
                  name="candidate_party"
                  className="form-control"
                  onChange={handleChange}
                  value={data.candidate_party}
                  placeholder="Enter Party Name"
                />
              </div>
              <label className="col-form-label">Phone No.</label>
              <div className="input-group input-group-merge">
                <span className="input-group-text">
                  <i className="bx bx-phone" />
                </span>
                <input
                  type="number"
                  name="candidate_phone"
                  className="form-control"
                  onChange={handleChange}
                  value={data.candidate_phone}
                  placeholder="Enter Phone No."
                />
              </div>
              <label className="col-form-label">Email Address</label>
              <div className="input-group input-group-merge">
                <span className="input-group-text">
                  <i className="bx bx-envelope" />
                </span>
                <input
                  type="text"
                  name="candidate_email"
                  className="form-control"
                  onChange={handleChange}
                  value={data.candidate_email}
                  placeholder="Enter Email Address"
                />
              </div>
            </div>
            <label className="col-form-label">Address</label>
            <div className="input-group input-group-merge">
              <span className="input-group-text">
                <i className="bx bx-buildings" />
              </span>
              <textarea
                type="text"
                rows={3}
                name="candidate_address"
                className="form-control"
                onChange={handleChange}
                value={data.candidate_address}
                placeholder="Enter Address"
              />
            </div>
          </div>
          <div className="justify-content-end">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary btn-sm m-1"
              style={{ float: "right" }}
            >
              Send
            </button>{" "}
            <button
              type="submit"
              onClick={() => navigate(`/elections/${id}`)}
              className="btn btn-primary btn-sm m-1"
              style={{ float: "right" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
