import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FaLeaf, FaAlignJustify, FaBars, FaUser, FaBeer } from "react-icons/fa";
import { HeadsetRounded } from "@material-ui/icons";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios({
      method: "POST",
      url: "http://localhost/PrimeAgriBackend/AccountFiles/account/fetch.php",
      headers: {
        "content-Type": "application/json",
      },
      data: {
        action: "fetch",
      },
    })
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <a>
        <span
          style={{
            color: "#009900",
            marginLeft: "700px",
            fontSize: "60px",
          }}
        >
          <FaLeaf />
        </span>
      </a>

      <div class="container">
        <h2
          style={{
            color: "#009900",
            textAlign: "center",
          }}
        >
          Prime Agriculture registered Users
        </h2>

        <table class="table">
          <thead>
            <tr>
              <th>profilephoto</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Phone</th>
              <th>County</th>
              
              <th>Email</th>
              <th>LastLogin</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length == 0 ? (
              <h3>There are no any users</h3>
            ) : (
              users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${user.profilephoto}`}
                      alt=""
                      style={{
                        width: "70px",
                        height: "70px",
                        border: "1px solid black",
                        borderRadius: "50%",
                      }}
                    />
                  </td>
                  <td>{user.Fname}</td>
                  <td>{user.Lname}</td>
                  <td>{user.Phone}</td>
                  <td>{user.county}</td>
                  <td>{user.Email}</td>
                  <td>{user.lastlogintimestring}</td>
                  <td>
                    <button className="btn btn-warning">Update</button>
                  </td>
                  <td>
                    <button className="btn btn-success">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Users;
