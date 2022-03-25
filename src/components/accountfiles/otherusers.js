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
import {PhotoCamera,Send,FileCopy} from '@material-ui/icons';
import { userContext } from '../../userContext';
import AccountsideNav from './sidenav';
import Navigation from './navigation';
import TopNav from './topnav';
import Snappy from '../../Sounds/Piggyback.ogg';
import './accountfiles.css';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function OtherUsers(props) {
const isMounted = useRef(false);
const [otherusers,setOtherusers] = useState([]);
const [currentdatetime,setCurrenttime] = useState('');
const [serverlogintime,setServerLoginTime] = useState('');
const [lastseen,setLastSeen] = useState('');
//function to fetch other users
const fetchusers = () => {
    axios({
        method: 'POST',
        url: 'http://localhost/PrimeAgriBackend/AccountFiles/account/fetchotherusers.php',
        headers: {
        'Content-Type': 'application/json',
        },
        data : {
            cuser: props.userid
        }
    })
    .then((res) => {
        setOtherusers(res.data);
        setServerLoginTime(res.data.lastlogin);
        setLastSeen(res.data.lastlogin);
    })
    .catch((error) => {

    })
}
//time users fetching
useEffect(() => {
  if (isMounted.current) {
    setInterval(fetchusers,1000);
  } else {
    isMounted.current = true;
  } 
},[props.userid])
//return current date and time
/* const datetime = () => {
  const today = new Date();
  const month = ("0" + (today.getMonth() +1)).slice(-2);
  const todaysdate = ("0" + (today.getDate())).slice(-2);
  const hour = ("0" + (today.getHours())).slice(-2);
  const minute = ("0" + (today.getMinutes())).slice(-2);
  const second = ("0" + (today.getSeconds())).slice(-2);
  const date = today.getFullYear()+'-'+month+'-'+todaysdate;
  const time = hour + ":" + minute + ":" + second;
  const dateTime = date+' '+time;
  setCurrenttime(dateTime);
} */
//update this on state change
useEffect(() => {
  if (isMounted.current) {
    const today = new Date();
    const month = ("0" + (today.getMonth() +1)).slice(-2);
    const todaysdate = ("0" + (today.getDate())).slice(-2);
    //const hour = ("0" + (today.getHours())).slice(-2);
    const hour = today.getHours() < 10 ? '0'+today.getHours() : today.getHours();
    const hour2 = today.getHours() > 12 ? today.getHours() - 12 : today.getHours();
    const hour3 = ("0" + hour2).slice(-2);
    const minute = ("0" + (today.getMinutes())).slice(-2);
    const second = ("0" + (today.getSeconds())).slice(-2);
    const date = today.getFullYear()+'-'+month+'-'+todaysdate;
    const time = hour3 + ":" + minute;
    const dateTime = date+' '+time;
    setCurrenttime(dateTime);
  } else {
    isMounted.current = true;
  }
},[otherusers])


  return  (
    <>
    <div style={{ marginBottom: '10px',position: 'static',zIndex: '99',width: '100%' }}>
      <form action="#" method="POST">
        <input placeholder="Search here" type="search" className="form-control"/>
      </form>
    </div>
    {
        otherusers.length == 0 ? '' :
        otherusers.map((otheruser,index) => (
            <div key={index} style={{ width: '100%' }}>
              
              <div style={{ height: 'auto',width: '100%',marginBottom: '30px' }}>
              { 
                otheruser.lastlogin === currentdatetime ? <div className="onlineicon"></div> : 
                <div className="lastseen"><span style={{ color:'green'}}>Last logged in on</span> <span style={{ color: '#ff1a1a' }}>{otheruser.lastlogintimestring}</span></div> 
              }
                <img style={{ borderRadius: '50%',height: '70px',width: '70px' }} className="img-fluid img-thumbnail" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${otheruser.profilephoto}`}/>  
                <h6>{otheruser.Fname} {otheruser.Lname}</h6>
            </div>
            
            </div>
        ))
    } 
  </>
  )
} 

export default OtherUsers;
