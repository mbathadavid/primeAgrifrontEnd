import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button, Divider,CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter,  Routes,  Route, Link, useParams, useNavigate} from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {PhotoCamera} from '@material-ui/icons';
import { userContext } from '../../userContext';
import AccountsideNav from './sidenav';
import Navigation from './navigation';
import TopNav from './topnav';
import './accountfiles.css';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function ProfilePage() {
const loggedinuserdetails = useContext(userContext);
const [userid,setUserid] = useState("");
const [fname,setFname] = useState("");
const [lname,setLname] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");
const [county,setCounty] = useState("");
const [profile,setProfile] = useState("");
const [verified,setVerfied] = useState("");
const navigate = useNavigate();
const teststatus = JSON.stringify(loggedinuserdetails.loggeduserdetails.loggedstatus);

//update local status on page load
useEffect(() => {
    setUserid(sessionStorage.getItem('userid'));
    setFname(sessionStorage.getItem('fname'));
    setLname(sessionStorage.getItem('lname'));
    setEmail(sessionStorage.getItem('email'));
    setPhone(sessionStorage.getItem('phone'));
    setCounty(sessionStorage.getItem('county'));
    setProfile(sessionStorage.getItem('profile'));
    setVerfied(sessionStorage.getItem('verified'));
},[])


  return teststatus === 'false' && sessionStorage.length <= 1 ? (navigate("/SignIn")) : 
  (<div>
    <Navigation image={profile} fname={fname} lname={lname}/>
    <div className= {loggedinuserdetails.sidenavvis ? "mainaccountcontent" : "hiddenmainaccountcontent" }>
    <div className="profilediv">
      <div className="imgdiv">
        <img className="img-fluid img-thumbnail profimage" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${profile}`}/>
      </div>
      <div className="otherdetails">
        <h3>{fname}</h3>
      </div>
    </div>
    </div>
    </div>
  )
} 

export default ProfilePage;
