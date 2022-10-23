import React from "react";

export default function Modal(props) {
  return (
    <div
      className="modal fade"
      id="backDropModal"
      data-bs-backdrop="static"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="backDropModalTitle">
              Document Viewer
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => props.setDoc(null)}
            />
          </div>
          <div className="modal-body" style={{ padding: "0px" }}>
            <object
              data={props.doc}
              type="application/pdf"
              width="100%"
              height="500px"
            >
              <embed src={props.doc} type="application/pdf" />
            </object>
          </div>
        </div>
      </div>
    </div>
  );
}
