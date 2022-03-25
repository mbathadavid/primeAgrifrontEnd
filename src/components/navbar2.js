import React, { useState,useEffect,useContext } from 'react';
//import { Button, Divider } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart } from 'react-icons/fa';
//import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import {  BrowserRouter,  Routes,  Route, Link, NavLink, useParams, useNavigate} from "react-router-dom";
import './navbar.css';
import { yellow } from '@material-ui/core/colors';
import { Dropdown } from 'react-bootstrap';

function NavBar2() {
  const [classname,setClassname] = useState("openmenu");
  const [navbar,setnavbar] = useState(false);

  const handlemenuShow = (e) =>{
    e.preventDefault();
    setnavbar(!navbar);
  }

  return ( 
    <div className="container-fluid">
        <div className="navigationbar">
          <a href="#" onClick={handlemenuShow} className="openmenu">{ navbar ? <FaTimes/> : <FaBars/> }</a>
          <NavLink className="logo" to="/"><FaLeaf className="logoicon"/><span style={{paddingLeft: "5px"}} className="companyname">Prime-Agriculture</span></NavLink>
        <div className={ navbar ? "hide" : "navlinks" }>
          
         <NavLink to="/"><FaHome/>&nbsp;Home</NavLink>
         
         
         <NavLink to="about" activeStyle={{ color: "#ff1a1a",background: 'yellow' }}>About Us</NavLink>
         
         
         <a href="#services" activeStyle={{ color: "#ff1a1a",background: 'yellow' }}>Services</a>
         
         
         <NavLink to="SignUp" activeStyle={{ color: "#ff1a1a",background: 'yellow' }}>Sign Up</NavLink>
         
         
         <NavLink to="SignIn" activeStyle={{ color: "#ff1a1a",background: 'yellow' }}>Sign In</NavLink>
         
         
         <NavLink to="market" activeStyle={{ color: "#ff1a1a",background: 'yellow' }}><FaShoppingCart/>&nbsp;Market</NavLink>
         
         
         <a href="#contacts"><FaPhone/>&nbsp;Contacts</a>
         
        </div>
    </div>
    </div>
  );
} 

export default NavBar2;
