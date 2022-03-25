import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button, Divider,CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {PhotoCamera} from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { userContext } from '../../userContext';
import './accountfiles.css';
import axios from 'axios';

function TopNav(props) {
    const loggedinuserdetails = useContext(userContext);
    const [sidenavvis,setSideNavVisibility] = useState(true);
    //Handle greeting
    const greeting = () =>{
    const time = new Date();
    const hour = time.getHours();
    if (hour<= 12) {
        return <Link className="greeting" to="/accounthome">Good Morning {props.fname}</Link>
    } else if(hour > 12 && hour <= 15 ){
        return <Link className="greeting" to="/accounthome">Good Afternoon {props.fname}</Link>
    } else {
        return <Link className="greeting" to="/accounthome">Good Evening {props.fname}</Link>
    }
   }
   //handle logout
   const handleLogout = (e) => {
       e.preventDefault();
   }
   //handleside navbartoggle
   const handlesidenavbartoggle = (e) => {
        e.preventDefault();
        setSideNavVisibility(false);
   }
    
  return (
   <div className="topnav">
       <a href="#" onClick={handlesidenavbartoggle} className="navtoggler"><FaBars/></a>
     {
         greeting()
     }     
    <a href="#" className="logouticon" onClick={handleLogout}><ExitToAppIcon/>&nbsp;Log Out</a>
   </div>
     
  )
} 

export default TopNav;
