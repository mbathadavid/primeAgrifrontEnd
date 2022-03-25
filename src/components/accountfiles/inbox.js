import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button, Divider,CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,Link } from "react-router-dom";
//import { BrowserRouter as Router, Switch, Route, Link, useHistory, Redirect } from 'react-router-dom';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart,FaPaperPlane } from 'react-icons/fa';
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

function MessagesPage() {
const loggedinuserdetails = useContext(userContext);
const [userid,setUserid] = useState("");
const [fname,setFname] = useState("");
const [lname,setLname] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");
const [county,setCounty] = useState("");
const [profile,setProfile] = useState("");
const [verified,setVerfied] = useState("");
const [message,setMessage] = useState("");
const [chat,setChat] = useState('');
const [connected,setConnected] = useState('');
const navigate = useNavigate();
const teststatus = JSON.stringify(loggedinuserdetails.loggeduserdetails.loggedstatus);
var conn = new WebSocket('ws://localhost:8080');
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

//instantiate websocket\
conn.onopen = function(e) {
  setConnected('connected')
  console.log("Connection established!");
};
conn.onmessage = function(e) {
  console.log(e.data);
};
//send update state
/* useEffect(() =>{
const formdata = new FormData();
  formdata.append('userid',userid);
  formdata.append('action','updatestatus');

  conn.send(formdata);
},[userid,connected]); */
  

//submit form data
const handlesubmit = (e) => {
  e.preventDefault();
  const data = {
    'userId': userid,
    'message': message
  };  
  const formdata = new FormData();
  formdata.append('userid',userid);
  formdata.append('message',message);

  //conn.send(JSON.stringify(data));
  conn.send(formdata);
  }

  return teststatus === 'false' && sessionStorage.length <= 1 ? (navigate("/SignIn")) : 
  (<div>
    <Navigation image={profile} fname={fname} lname={lname}/>
    <div className= {loggedinuserdetails.sidenavvis ? "mainaccountcontent" : "hiddenmainaccountcontent" }>
    <div>
      <div className="card">

        <div className="card-header">
          <h3>Chat Room</h3>
        </div>
        
    <div className="card-body" id="messages-area">

    </div>

    </div>
      <form method="POST" id="chatform">
      <div className="input-group mb-3">
        <textarea onChange={(e) =>setMessage(e.target.value)} placeholder="Type your message here" className="form-control">

        </textarea>
        <div className="input-group-append">
          <button type="submit" onClick={handlesubmit} name="send" className="btn btn-primary"><FaPaperPlane/></button>
        </div>
      </div>
      </form>
    </div>
    </div>
    </div>
  )
} 

export default MessagesPage;
