import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);

  const  getData = async() => {
    await axios.get("http://localhost:8082/sub/read")
      .then((res) => {
        setData(res.data);
      });
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:8082/${id}`)
      .then(() => {
        getData();
      });
  }

  const setToLocalStorage = (id, name, password) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", password);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      
      <div className="d-flex justify-content-between m-2">
        <h2>usersData</h2>
        <Link to="/">
          <button className="btn btn-secondary">Create</button>
        </Link>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">password</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        {data.map((eachData,i) => {
          return (
            <>
              <tbody>
                <tr>
                <td key={i+1}></td>
                  <td>{eachData.username}</td>
                  <td>{eachData.password}</td>
                  <td>
                    <Link to="/update">
                      <button
                        className="btn-success"
                        onClick={() =>
                          setToLocalStorage(
                            eachData.id,
                            eachData.username,
                            eachData.password
                          )
                        }
                      >
                        Edit{" "}
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(eachData.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
};

export default Read;