import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button, Divider,CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  BrowserRouter,  Routes,  Route, Link, NavLink, useParams, useNavigate} from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import NavBar from './navbar';
import NavBar2 from './navbar2';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {PhotoCamera} from '@material-ui/icons';
import avatar  from '../images/avatar.png';
import { userContext } from '../userContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function SignInPage() {
  const user = useContext(userContext);
  const navigate = useNavigate();
  const teststatus = JSON.stringify(user.loggeduserdetails.loggedstatus);
  const isMounted = useRef(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [activestatus,setActiveStatus] = useState("");
  const [emailcheckmessage,setEmailCheckMessage] = useState("");
  const [regresponse,setRegResponse] = useState("");
  const [loggedin,setLoggedIn] = useState(false);
  const [resdivvis,setResponseVisibility] = useState(false);
  //check for email availability
  const checkEmailavailability = (e) => {
    //const path = "http://localhost/PrimeAgriBackend/AccountFiles/account/checkemail.php?email="+email;
    const emailtocheck = {
      'sendemail': email
    }
    e.preventDefault();
    axios({
      method: 'POST',
        url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/checkemail.php',
        headers: {
          'Content-Type': 'application/json',
        },
      data: emailtocheck
    })
    .then((response) => {
      if(response.data === "Registered") {
        setEmailCheckMessage("");
        setActiveStatus('');
      }else {
        setEmailCheckMessage("This Email is not Registered.Enter the Correct Email to Continue");
        setActiveStatus('disabled');
      }
      ;
    })
    .catch((error) => {
      console.log(error);
    })
  }
  //handle login
  const handlelogin = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    const formdata = new FormData();
    formdata.append('username',email);
    formdata.append('password',password);
    axios({
      method: 'POST',
      url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/login.php',
      header: {
        'Content-Type': 'application/json',
      },
      data: formdata
    })
    .then((response) =>{
      if (response.data === 'IncorrectPass') {
        setRegResponse("You entred Incorrect Passord");
        setResponseVisibility(true);
        setLoggedIn(false);
      }
      else {
        setEmail('');
        setPassword('');
        setLoggedIn(false);
        const details = response.data;
        user.setLoggedInuserDetails({
          userno: details.SN,
          fname: details.Fname,
          lname: details.Lname,
          email: details.Email,
          phone: details.Phone,
          county: details.county,
          profile: details.profilephoto,
          verified: details.verified,
          loggedstatus: true
        });
      } 
    })
    .catch((error)=>{
      setRegResponse("Sorry! Server is unreachable, Please try again Later");
      setResponseVisibility(true);
      setLoggedIn(false);
    })
  }
  //Hide Response Text
  const hideresponsetext = (e) => {
    e.preventDefault();
    setResponseVisibility(false);
  }
  //set LocalState to to the current logged User
  useEffect(() =>{
    if (isMounted.current) {
        const loginvalue = JSON.stringify(user.loggeduserdetails.loggedstatus);
        sessionStorage.setItem('loginstatus',loginvalue);
        sessionStorage.setItem('userid',user.loggeduserdetails.userno);
        sessionStorage.setItem('fname',user.loggeduserdetails.fname);
        sessionStorage.setItem('lname',user.loggeduserdetails.lname);
        sessionStorage.setItem('email',user.loggeduserdetails.email);
        sessionStorage.setItem('phone',user.loggeduserdetails.phone);
        sessionStorage.setItem('county',user.loggeduserdetails.county);
        sessionStorage.setItem('profile',user.loggeduserdetails.profile);
        sessionStorage.setItem('verified',user.loggeduserdetails.verified);
        console.log(sessionStorage)
        console.log(sessionStorage.length);
        navigate("/accounthome");
    } else {
      isMounted.current = true;
    }
  },[user.loggeduserdetails])

  //show sessionData
  useEffect(() =>{
    console.log(sessionStorage);
    console.log(sessionStorage.length);
  },[])

  return teststatus === 'true' || sessionStorage.length > 1 ? navigate("/accounthome") : 
  (<div>
   <NavBar2/>
   <div className="maincontent">
     <div className="container">
       <div className="row d-flex justify-content-center align-item-center">
         <div className="col-md-5">
            <div className="card shadow">
              <div className="card-header bg-success">
              <h3 style={{display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                <span style={{fontSize: "30px",border: '2px solid green',
              background: 'white',borderRadius: '50%',display: 'flex',
              alignItems: 'center',justifyContent: 'center',width: '50px',height: '50px'}}><FaLeaf className="logoicon"/></span></h3>
              </div>
              <div className="card-body">
                <form method="POST" action="#">
                <div className={ resdivvis ? 'responsetext' : 'hiddendiv' }>
                <p className="text-center" style={{ backgroundColor: '#ff8080',
            padding: '10px' }}>{regresponse}<span><a style={{ marginLeft: '10px' }} href="#" onClick={hideresponsetext}><FaTimes/></a></span></p>
            </div>
                <FormControl className="mb-2" style={{ width: '99%' }}>
                  <InputLabel className="text-info" htmlFor="username">Enter your Email</InputLabel>
                  <FilledInput value={email} onBlur={checkEmailavailability} onChange={(e) => setEmail(e.target.value)} type="email"/>
                  <span className="text-danger" style={{ fontWeight: 'bold'}}>{emailcheckmessage}</span>
                </FormControl>
                <FormControl className="mb-2" style={{ width: '99%' }}>
                  <InputLabel className="text-info" htmlFor="username">Enter your Password</InputLabel>
                  <FilledInput value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                  <span><Link className="text-success" style={{ textDecoration: 'none',fontWeight: 'bold' }} to="resetpass">Forgot Password?Click to Reset</Link></span>
                </FormControl>
                <FormControl className="mb-2" style={{ width: '99%' }}>
                  <Button onClick={handlelogin} variant="contained" color="primary" disabled={activestatus}>
                    { loggedin ? <CircularProgress color="secondary"/> : 'LOGIN' }</Button>
                </FormControl>
                </form>
              </div>
              <div className="card-footer">
                <h6 style={{ textAlign: 'center' }}>Do not have an account? <Link to="/SignUp">Sign Up</Link></h6>
              </div>
            </div>
         </div>
       </div>
       </div>      
    </div>
    </div>
  );
} 

export default SignInPage;
