import React, { useState,useEffect,useContext } from 'react';
import { Button, Divider } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer } from 'react-icons/fa';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

function NavBar() {
  return (
      <nav className="navbar navbar-expand-md">
    <div className="container-fluid">
        <div className="applogo">
            <a className="navbar-brand"><FaLeaf/><span style={{paddingLeft: "5px"}}>Prime-Agriculture</span></a>
        </div>
        <button className="navbar-toggler"><span><FaBars/></span></button>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto">
                <li className="nav-item active">
                    <a className="nav-link">Home</a> 
                </li>
                <li className="nav-item">
                    <a className="nav-link">About Us</a> 
                </li>
                <li className="nav-item">
                    <a className="nav-link">Services</a> 
                </li>
                <li className="nav-item">
                    <a className="nav-link">Help Center</a> 
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                        <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <FaUser/>
                            Sign Up
                        </button>
                        <div className="dropdown-menu">
                            <a href="#" className="dropdown-item">
                                <div className="text-center">
                                    <a href="tologinpage"><i class="fa fa-sign-in" aria-hidden="true"></i>Sign Up</a>
                                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">
                                <div className="text-center">
                                    <a href="tologinpage"><FaUser/>Login</a>
                                </div>
                            </a>
                        </div>
                    </a> 
                </li>
                <li className="nav-item">
                    <a className="nav-link">     
                    <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        
                        Contacts
                    </button>
                    <div className="dropdown-menu">
                        <a href="#" className="dropdown-item">
                            <div className="text-center">
                                <a href="tologinpage"><i class="fa fa-phone" aria-hidden="true"></i>Dial us</a>
                            </div>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="#" className="dropdown-item">
                            <div className="text-center">
                                <a href="tologinpage"><i class="fa fa-envelope"></i> Us</a>
                            </div>
                        </a>
                    </div></a> 
                </li>
            </ul>
        </div>
    </div>
</nav>
  );
} 

export default NavBar;
