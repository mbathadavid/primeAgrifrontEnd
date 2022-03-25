import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaLeaf, FaAlignJustify, FaBars, FaUser, FaBeer } from "react-icons/fa";

import axios from "axios";

function AdminPage() {
  return (
    <div>
      <div className="admin">
        <a>
          <span
            style={{
              color: "#009900",

              fontSize: "60px",
            }}
          >
            <FaLeaf />
          </span>
        </a>
        <h1
          style={{
            color: "#009900",
            textAlign: "center",
          }}
        >
          Prime Agriculture Management Panel
        </h1>
      </div>
      <nav>
        <ul className="nav9">
          <li>
            <NavLink to="/" className="link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/Users" className="link">
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/Logs" className="link">
              Logs
            </NavLink>
          </li>
          <li>
            <NavLink to="/Services" className="link">
              Services
            </NavLink>
          </li>
        </ul>
      </nav>
      <div
        style={{
          backgroundImage: "",
        }}
      >
        <p>
          Prime Agriculture the future of Agriculture, Taking agriculture to
          another level.
        </p>
      </div>
    </div>
  );
}

export default AdminPage;
