import React from "react";
import axios from "axios";
import img from "../../../../assets/img/icons/registered_voter.png";

export default function CMV(props) {
  const [data, setData] = React.useState(null);

  function retriveCard() {
    axios
      .get(`http://localhost:5000/cmv/retrieveOne/${props.user.id_no}`)
      .then((res) => {
        setData(res.data.card);
      });
  }

  return (
    <>
      <div className="col-lg-4 mb-4 order-1">
        <div className="card text-center">
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
              class="btn btn-primary"
              onClick={retriveCard}
              data-bs-toggle="modal"
              data-bs-target="#cmv-voter-id"
            >
              Download ID Card
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
