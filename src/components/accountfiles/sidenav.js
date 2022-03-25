import React, { useState,useEffect,useContext, useRef } from 'react';
import { Button, Divider,CircularProgress } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route,NavLink, Link, useHistory, Redirect } from 'react-router-dom';
import { FaLeaf,FaAlignJustify,FaBars,FaUser,FaBeer,FaHome,FaPhone,FaTimes,FaShoppingCart } from 'react-icons/fa';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {PhotoCamera} from '@material-ui/icons';
import { userContext } from '../../userContext';
import './accountfiles.css';
import axios from 'axios';

function AccountsideNav(props) {

  return (
  <div className="sidenav">
    <div className="profilediv">
   <img className=" img-fluid img-thumbnail sidenavprofile" src={`http://localhost/PrimeAgriBackend/AccountFiles/Uploads/${props.image}`}/>
   </div>
   
   </div>
  )
} 

export default AccountsideNav;
