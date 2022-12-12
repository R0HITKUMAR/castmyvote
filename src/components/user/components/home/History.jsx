import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function History({ user }) {
    const navigate = useNavigate();
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        axios
            .get(`https://server.castmyvote.ml//cmv/retrieveOne/${user.id_no}`)
            .then((res) => {
                setData(res.data.card.elections.reverse());
            });
    }, [user.id_no]);

    return (
        <div className="row">
            <div className="col-12">
                <div className="card" style={{ height: "400px" }}>
                    <div className="card-body">
                        <h5 className="card-title text-center mb-2">Voting History of ID: {user.id_no} </h5>
                        <div className="table-responsive">
                            <table className="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th colSpan={3} className="text-center">Election Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data &&
                                        data.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td colSpan={3}>
                                                        <div>
                                                            <span style={{ float: "left" }}>Election ID:<b> {item.id} </b></span>
                                                            <span style={{ float: "right" }}>At: <b>{item.timestamp}</b> </span>
                                                        </div><small>{item.name}</small>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        )}
                                </tbody>
                            </table>
                        </div>
                        <span style={{ float: "right" }}>
                            <button

                                type="button"
                                className="btn btn-primary btn-sm my-5"
                                onClick={() => navigate('/')}
                            >
                                Back to Home
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
