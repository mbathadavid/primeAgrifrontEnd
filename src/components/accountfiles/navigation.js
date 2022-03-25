import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button,Badge, Divider,CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter,  Routes, Route, Link, NavLink, useNavigate } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route,NavLink, Link, useHistory, Redirect } from 'react-router-dom';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart,FaBell} from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { PhotoCamera,Dashboard,AccountCircleOutlined,Storefront,FilterDrama,Message,Forum,TrendingUp,Publish  } from '@material-ui/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { userContext } from '../../userContext';
import './accountfiles.css';
import axios from 'axios';

function Navigation(props) {
    const loggedinuserdetails = useContext(userContext);
    const [sidenavvis,setSideNavVisibility] = useState(true);
    const navigate = useNavigate();
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
       sessionStorage.clear();
       loggedinuserdetails.setLoggedInuserDetails({
             userno: '',
             fname: '',
             lname: '',
             email: '',
             phone: '',
             county: '',
             profile: '',
             verified: 0,
             loggedstatus: false
       });
   }
   //handleside navbartoggle
   const handlesidenavbartoggle = (e) => {
        e.preventDefault();
        loggedinuserdetails.setSideNavVisibility(!loggedinuserdetails.sidenavvis);
   }
    
  return (
      <div className="fullpage">
        <div className={ loggedinuserdetails.sidenavvis ? "sidenav" : "hiddensidenav" }>
        <a className="navbartogglersms" href="#" onClick={handlesidenavbartoggle}><FaTimes/></a>
        <h6 className="text-center">Welcome {props.fname} {props.lname}</h6>   
        <div className="profilediv">
        <img className=" img-fluid img-thumbnail sidenavprofile" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${props.image}`}/>
        </div>
        <hr/>
        <div className="navigationlinks">

        <div class="dropdown mb-3" style={{ width: '100%' }}>
        <button style={{ width: '100%' }} class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        <span><Storefront/>&nbsp;</span>Market
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ width: '100%',padding: '5px',background: '#12536d' }}>
            <li><NavLink activeStyle={{ background: "white",width: '100%',color: 'darkslategray' }} to="/accountfarmsupplies">Farm Supplies</NavLink></li>
            <li><NavLink activeStyle={{ background: "white",width: '100%',color: 'darkslategray' }} to="/accountfarmproduce">Fresh Farm Produce</NavLink></li>
            <li><NavLink activeStyle={{ background: "white",width: '100%',color: 'darkslategray' }} to="/accountagriservices">Agricultural Services</NavLink></li>
        </ul>
        </div>
        
        <NavLink activeStyle={{ background: "white",width: '100%',color: 'darkslategray' }} to="/accounthome"><span><Forum/>&nbsp;</span>FarmDiscuss</NavLink>
        <NavLink activeStyle={{ background: "white",width: '100%',color: 'darkslategray' }} to="/profile"><span><AccountCircleOutlined/>&nbsp;</span>Profile</NavLink>        
        <NavLink activeStyle={{ background: "white",width: '100%',color: 'darkslategray' }} to="/weather"><span><FilterDrama/>&nbsp;</span>Weather Info</NavLink>
        <NavLink activeStyle={{ background: "white",width: '100%',color: 'darkslategray' }} to="/messages"><span><Message/></span>&nbsp;Messages</NavLink>
        <NavLink activeStyle={{ background: "white",width: '100%',color: 'darkslategray' }} to="/notifications"><span><FaBell/></span>&nbsp;Notifications<sup>0</sup></NavLink>
        <NavLink activeStyle={{ background: "white",width: '100%',color: 'darkslategray' }} to="/uploadedproducts">My Published Products</NavLink>
        <NavLink activeStyle={{ background: "white",width: '100%',color: 'darkslategray' }} to="/accountshops">My Shops</NavLink>

   </div>
        </div>

        <div className={ loggedinuserdetails.sidenavvis ? "topnav" : "hiddentopnav" }>
            <a href="#" onClick={handlesidenavbartoggle} className="navtoggler"><FaBars/></a>
            {
                greeting()
            }     
            <a href="#" className="logouticon" onClick={handleLogout}><ExitToAppIcon/>&nbsp;Log Out</a>
        </div>
        </div>
  )
} 

export default Navigation;
