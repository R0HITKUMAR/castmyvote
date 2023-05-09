import React from "react";
import axios from "../../../common/axios.js";
import img from "../../../../assets/img/icons/registered_voter.png";

export default function CMV(props) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`/cmv/retrieveOne/${props.user.id_no}`)
      .then((res) => {
        setData(res.data.card);
      });
  }, [props.user.id_no]);

  return (
    <>
      <div className="col-12">
        <div className="card text-center" style={{height:"200px"}}>
          <div className="card-body">
            <div className="card-title d-flex align-items-start justify-content-center">
              <div className="avatar flex-shrink-0">
                <img src={img} alt="-" className="rounded" />
              </div>
            </div>
            <span className="fw-semibold d-block mb-1">CMV ID No.</span>
            <h3 className="card-title mb-2">{props.user.id_no}</h3>
            <button
              type="button"
              class="btn btn-primary btn-sm"
              onClick={() => props.setGlobal({ doc: data.id_doc })}
              data-bs-toggle="modal"
              data-bs-target="#attachmentModal"
            >
              Download ID Card
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
