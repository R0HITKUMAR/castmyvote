import React from "react";
import axios from "../../../common/axios";
import NoRecord from "../../../common/NoRecord";

export default function Newsletter() {
    const [newsletter, setNewsletter] = React.useState([]);

    React.useEffect(() => {
        axios
            .get("/newsletter/retrieveAll")
            .then((res) => {
                setNewsletter(res.data);
            })
            .catch((err) => console.log(err));
    }, [newsletter]);

    const deleteNewsletter = (id) => {
        axios
            .delete(`/newsletter/delete/${id}`)
            .then((res) => {
                console.log(res.data);
                setNewsletter(newsletter.filter((item) => item._id !== id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <h4 className="fw-bold py-3 mb-1">
                <span className="text-muted fw-light">Home /</span> Newsletter
            </h4>
            <div className="card">
                <div className="table-responsive text-nowrap">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S No.</th>
                                <th>Email</th>
                                <th>Timestamp</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-border-bottom-0">
                            {newsletter.length > 0 && newsletter.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.timestamp}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => deleteNewsletter(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {newsletter.length === 0 && <NoRecord />}
            </div>
        </>
    );
}
