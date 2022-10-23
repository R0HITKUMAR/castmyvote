import React from 'react';
import img from "../../../../assets/img/illustrations/man-with-laptop-light.png"

export default function Welcome() {
  return (
    <div className="col-lg-8 mb-4 order-0">
      <div className="card">
        <div className="d-flex align-items-end row">
          <div className="col-sm-8">
            <div className="card-body">
              <h5 className="card-title text-primary">
                Welcome Admin 🎉
              </h5>
              <p className="mb-4">
                Hey! Admin Welome to CastMyVote advanced Voting System Powered by Blockchain & SmartContracts
              </p>
              <a
                href="javascript:;"
                className="btn btn-sm btn-outline-primary"
              >
                Get Started
              </a>
            </div>
          </div>
          <div className="col-sm-4 text-center text-sm-left">
            <div className="card-body pb-0 px-0 px-md-4">
              <img
                src={img}
                height={120}
                alt="View Badge User"
                data-app-dark-img="illustrations/man-with-laptop-dark.png"
                data-app-light-img="illustrations/man-with-laptop-light.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
