import React from "react";
import axios from "../../../common/axios";
import NoRecord from "../../../common/NoRecord";

export default function query() {
  const [query, setQuery] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("/query/retrieveAll")
      .then((res) => {
        setQuery(res.data);
      })
      .catch((err) => console.log(err));
  }, [query]);

  const deletequery = (id) => {
    axios
      .delete(`/query/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        setQuery(query.filter((item) => item._id !== id));
      })
      .catch((err) => console.log(err));
  };

  const updatequery = (id) => {
    const news = prompt("Enter the new status");
    if (news) {
      axios
        .get(`/query/update/${id}/${news}`)
        .then((res) => {
          console.log(res.data);
          setQuery(query.filter((item) => {
            if (item._id === id) {
              item.status = news;
            }
            return item;
          }));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-1">
        <span className="text-muted fw-light">Home /</span> Query
      </h4>
      <div className="card">
        <div className="table-responsive text-nowrap">
          <table className="table">
            <thead>
              <tr>
                <th>S No.</th>
                <th>Personal Details</th>
                <th>Information</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {query.length > 0 &&
                query.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {item.name} <br />
                        {item.email} <br />
                        {item.phone}
                      </td>
                      <td>
                        {item.timestamp}
                        <br />
                        {item.message}
                        <br />
                        Sttaus : {item.status}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => updatequery(item._id)}
                        >
                          <i className="fa-solid fa-edit" />
                        </button>
                        <button
                          className="btn btn-sm btn-danger mx-2"
                          onClick={() => deletequery(item._id)}
                        >
                          <i className="fa-solid fa-trash" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {query.length === 0 && <NoRecord />}
      </div>
    </>
  );
}
