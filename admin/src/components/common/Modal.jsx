import React from "react";

export default function Modal({ global, setGlobal }) {
  return (
    <div
      className="modal fade"
      id="attachmentModal"
      data-bs-backdrop="static"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Document Viewer</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={() => setGlobal({ doc: "" })}
              aria-label="Close"
            />
          </div>
          <div className="modal-body" style={{ padding: "0px" }}>
            <object
              data={global.doc}
              type="application/pdf"
              width="100%"
              height="500px"
            >
              <embed src={global.doc} type="application/pdf" />
            </object>
          </div>
        </div>
      </div>
    </div>
  );
}
