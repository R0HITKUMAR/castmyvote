import React from "react";
import ViewSDKClient from "./ViewSDKClient.js";

export default function Modal(props) {
    const [show, setShow] = React.useState(true);

    if (show) {
        document.body.style.overflow = "hidden";
    }
    const handleClose = () => {
        setShow(false);
        props.doc("");
        document.body.style.overflow = "auto";
    };

    const loadPDF = (url) => {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            viewSDKClient.previewFile(
                "pdf-div",
                {
                    // Remove Top Bar
                    showAnnotationTools: false,
                    showLeftHandPanel: false,
                    showDownloadPDF: false,
                    showPrintPDF: false,
                    showPageControls: false,
                    showFullScreen: false,
                },
                url,
                {
                    embedMode: "LIGHT_BOX",
                }
            );
        });
    };
    loadPDF(props.url);
    return (
        <div
            className="modal show"
            tabIndex={-1}
            aria-hidden="true"
            style={{
                display: show ? "block" : "none",
                backgroundColor: "rgba(0,0,0,0.6)",
            }}
            onClick={handleClose}
        >
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div
                    className="modal-content"
                    style={{ backgroundColor: "#fff0", border: "none" }}
                >
                    <div className="modal-body text-center">
                        {props.url === "Video" ? (
                            <iframe
                                src="https://www.youtube.com/embed/QnlutQpxSSU"
                                title="YouTube video player"
                                frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                style={{ width: "100%", height: "80vh" }}
                            />
                        ) : (
                            <div
                                id="pdf-div"
                                style={{ height: "90vh" }}
                                className="light-box-container"
                            ></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
