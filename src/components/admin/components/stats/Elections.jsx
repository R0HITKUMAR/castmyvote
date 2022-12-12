import React from "react";

export default function Elections({ num }) {
  return (
    <div className="col-md-12 col-6 mb-4">
      <div className="card h-100">
        <div className="card-header d-flex align-items-center justify-content-between pb-0">
          <div className="card-title mb-0">
            <h5 className="m-0 me-2">Elections</h5>
            <small className="text-muted">Last updated: {num.now}</small>
            <br />
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex flex-column align-items-center gap-1">
              <h2 className="mb-2">{num.elections}</h2>
              <span>Elections Category</span>
            </div>
            <div id="orderStatisticsChart" />
          </div>
          <ul className="p-0 m-0">
            <li className="d-flex pb-1">
              <div className="avatar flex-shrink-0 me-3">
                <span className="avatar-initial rounded bg-label-primary">
                  <i className="bx bx-mobile-alt" />
                </span>
              </div>
              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div className="me-2">
                  <h6 className="mb-0">Live</h6>
                </div>
                <div className="user-progress">
                  <small className="fw-semibold">{num.ongoing_elections}</small>
                </div>
              </div>
            </li>
            <li className="d-flex  pb-1">
              <div className="avatar flex-shrink-0 me-3">
                <span className="avatar-initial rounded bg-label-success">
                  <i className="bx bx-closet" />
                </span>
              </div>
              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div className="me-2">
                  <h6 className="mb-0">Upcoming</h6>
                </div>
                <div className="user-progress">
                  <small className="fw-semibold">
                    {num.upcoming_elections}
                  </small>
                </div>
              </div>
            </li>
            <li className="d-flex pb-1">
              <div className="avatar flex-shrink-0 me-3">
                <span className="avatar-initial rounded bg-label-info">
                  <i className="bx bx-home-alt" />
                </span>
              </div>
              <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                <div className="me-2">
                  <h6 className="mb-0">Completed</h6>
                </div>
                <div className="user-progress">
                  <small className="fw-semibold">
                    {num.completed_elections}
                  </small>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
